import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { modelsConfig } from "../../config/modelsConfig";

const ScannedModel: React.FC<{ url: string; scale?: number; position?: [number, number, number] }> = ({ url, scale = 1, position = [0, 0, 0] }) => {
  const { scene } = useGLTF(url);
  
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.2;
          (mesh.material as THREE.MeshStandardMaterial).metalness = 0.8;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} position={position} />;
};

// Individual Tower Mesh to group the lattice elements
const TransmissionTower: React.FC<{ scrollY: number; mouse: { x: number; y: number }; isMobile: boolean }> = ({ scrollY, mouse, isMobile }) => {
  const towerGroupRef = useRef<THREE.Group>(null);
  const insulatorLeftRef = useRef<THREE.Mesh>(null);
  const insulatorRightRef = useRef<THREE.Mesh>(null);

  // Procedural lines to avoid SVG <line> tag type clashing in React 19
  const sparkLine1 = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(33), 3));
    const mat = new THREE.LineBasicMaterial({ color: "#00D4FF", toneMapped: false });
    return new THREE.Line(geom, mat);
  }, []);

  const sparkLine2 = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(27), 3));
    const mat = new THREE.LineBasicMaterial({ color: "#E87722", toneMapped: false });
    return new THREE.Line(geom, mat);
  }, []);
  
  // Create coordinates for lattice tower structure
  const steelBeams = useMemo(() => {
    const beams: [THREE.Vector3, THREE.Vector3][] = [];
    
    // 4 Main legs (pyramid-like base to middle peak)
    // Base: 4 points, Mid: 4 points, Top: peak
    const yBase = -5;
    const yMid = 1;
    const yTop = 4;
    const yPeak = 5.5;

    const baseWidth = 1.6;
    const midWidth = 0.6;
    const topWidth = 0.3;

    // Legs
    // Leg 1
    beams.push([new THREE.Vector3(-baseWidth, yBase, -baseWidth), new THREE.Vector3(-midWidth, yMid, -midWidth)]);
    beams.push([new THREE.Vector3(-midWidth, yMid, -midWidth), new THREE.Vector3(-topWidth, yTop, -topWidth)]);
    beams.push([new THREE.Vector3(-topWidth, yTop, -topWidth), new THREE.Vector3(0, yPeak, 0)]);

    // Leg 2
    beams.push([new THREE.Vector3(baseWidth, yBase, -baseWidth), new THREE.Vector3(midWidth, yMid, -midWidth)]);
    beams.push([new THREE.Vector3(midWidth, yMid, -midWidth), new THREE.Vector3(topWidth, yTop, -topWidth)]);
    beams.push([new THREE.Vector3(topWidth, yTop, -topWidth), new THREE.Vector3(0, yPeak, 0)]);

    // Leg 3
    beams.push([new THREE.Vector3(baseWidth, yBase, baseWidth), new THREE.Vector3(midWidth, yMid, midWidth)]);
    beams.push([new THREE.Vector3(midWidth, yMid, midWidth), new THREE.Vector3(topWidth, yTop, topWidth)]);
    beams.push([new THREE.Vector3(topWidth, yTop, topWidth), new THREE.Vector3(0, yPeak, 0)]);

    // Leg 4
    beams.push([new THREE.Vector3(-baseWidth, yBase, baseWidth), new THREE.Vector3(-midWidth, yMid, midWidth)]);
    beams.push([new THREE.Vector3(-midWidth, yMid, midWidth), new THREE.Vector3(-topWidth, yTop, topWidth)]);
    beams.push([new THREE.Vector3(-topWidth, yTop, topWidth), new THREE.Vector3(0, yPeak, 0)]);

    // Horizontal bars
    const floors = [-3.5, -2, -0.5, yMid, 2.5, yTop];
    floors.forEach((y) => {
      let w = 0;
      if (y <= yMid) {
        // Interpolate base to mid
        const t = (y - yBase) / (yMid - yBase);
        w = baseWidth * (1 - t) + midWidth * t;
      } else {
        // Interpolate mid to top
        const t = (y - yMid) / (yTop - yMid);
        w = midWidth * (1 - t) + topWidth * t;
      }

      beams.push([new THREE.Vector3(-w, y, -w), new THREE.Vector3(w, y, -w)]);
      beams.push([new THREE.Vector3(w, y, -w), new THREE.Vector3(w, y, w)]);
      beams.push([new THREE.Vector3(w, y, w), new THREE.Vector3(-w, y, w)]);
      beams.push([new THREE.Vector3(-w, y, w), new THREE.Vector3(-w, y, -w)]);

      // Diagonal crosses on faces
      beams.push([new THREE.Vector3(-w, y, -w), new THREE.Vector3(w, y, w)]);
      beams.push([new THREE.Vector3(-w, y, w), new THREE.Vector3(w, y, -w)]);
    });

    // Cross-arms (HT wire carriers)
    // Arm 1 (Low) at y = -0.5
    beams.push([new THREE.Vector3(-2.6, -0.5, 0), new THREE.Vector3(2.6, -0.5, 0)]);
    beams.push([new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(2.6, -0.5, 0)]);
    beams.push([new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(-2.6, -0.5, 0)]);

    // Arm 2 (Mid) at y = 1.8
    beams.push([new THREE.Vector3(-2.2, 1.8, 0), new THREE.Vector3(2.2, 1.8, 0)]);
    beams.push([new THREE.Vector3(0, 2.4, 0), new THREE.Vector3(2.2, 1.8, 0)]);
    beams.push([new THREE.Vector3(0, 2.4, 0), new THREE.Vector3(-2.2, 1.8, 0)]);

    // Arm 3 (High) at y = 3.6
    beams.push([new THREE.Vector3(-1.8, 3.6, 0), new THREE.Vector3(1.8, 3.6, 0)]);
    beams.push([new THREE.Vector3(0, 4.2, 0), new THREE.Vector3(1.8, 3.6, 0)]);
    beams.push([new THREE.Vector3(0, 4.2, 0), new THREE.Vector3(-1.8, 3.6, 0)]);

    return beams;
  }, []);

  // Set up procedural catenary power lines dropping from cross-arms
  const powerLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const createCatenary = (p1: THREE.Vector3, p2: THREE.Vector3, sag = 0.5, pointsCount = 30) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= pointsCount; i++) {
        const t = i / pointsCount;
        const pt = new THREE.Vector3().lerpVectors(p1, p2, t);
        // Catenary dip
        const dip = Math.sin(t * Math.PI) * -sag;
        pt.y += dip;
        pts.push(pt);
      }
      return pts;
    };

    // Draw lines spanning outward from the ends of the cross arms to the virtual edges
    lines.push(createCatenary(new THREE.Vector3(-2.6, -0.9, 0), new THREE.Vector3(-8, -2, -2), 0.8));
    lines.push(createCatenary(new THREE.Vector3(2.6, -0.9, 0), new THREE.Vector3(8, -2, -2), 0.8));
    lines.push(createCatenary(new THREE.Vector3(-2.2, 1.4, 0), new THREE.Vector3(-8, 0.5, -2), 0.6));
    lines.push(createCatenary(new THREE.Vector3(2.2, 1.4, 0), new THREE.Vector3(8, 0.5, -2), 0.6));
    
    return lines;
  }, []);

  // Update logic per frame
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (towerGroupRef.current) {
      // Slow rotation (Anti-gravity floating rotation)
      towerGroupRef.current.rotation.y = t * 0.08;
      
      // Gentle Bobbing up and down
      towerGroupRef.current.position.y = Math.sin(t * 0.5) * 0.2;

      // Scroll reactions - push deeper, rotate slightly
      const scrollRatio = Math.min(scrollY / 1000, 1.2);
      const baseOffsetX = isMobile ? 0 : 4.8;
      towerGroupRef.current.position.z = -scrollRatio * 6; // Move back
      towerGroupRef.current.position.x = baseOffsetX - scrollRatio * 2.0; // Slide to the left
      
      // Mouse parallax lerping
      const targetRotationX = (mouse.y * Math.PI) * 0.05;
      const targetRotationY = (mouse.x * Math.PI) * 0.08 + (t * 0.08);
      
      // Blend rotation
      towerGroupRef.current.rotation.x = THREE.MathUtils.lerp(towerGroupRef.current.rotation.x, targetRotationX, 0.1);
      // Main rotation has historical offset
      towerGroupRef.current.rotation.y = THREE.MathUtils.lerp(towerGroupRef.current.rotation.y, targetRotationY, 0.1);
    }

    // Insulator Pendulum movement
    if (insulatorLeftRef.current) {
      insulatorLeftRef.current.rotation.z = Math.sin(t * 1.2) * 0.08;
      insulatorLeftRef.current.rotation.x = Math.cos(t * 0.8) * 0.05;
    }
    if (insulatorRightRef.current) {
      insulatorRightRef.current.rotation.z = Math.cos(t * 1.1) * 0.08;
      insulatorRightRef.current.rotation.x = Math.sin(t * 0.9) * 0.05;
    }

    // Spark 1 Electric Arc Generator (flickers every ~1.5s)
    const sparkCycle = Math.floor(t * 2) % 3 === 0;
    if (sparkCycle && Math.random() > 0.4) {
      sparkLine1.visible = true;
      const geom = sparkLine1.geometry;
      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      
      // Define a spark path from peak to upper arm
      const pStart = new THREE.Vector3(0, 5.5, 0);
      const pEnd = new THREE.Vector3(-1.8, 3.6, 0);
      
      // Random zigzag vertex displacements
      const segments = 10;
      const positions = new Float32Array((segments + 1) * 3);
      
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const pt = new THREE.Vector3().lerpVectors(pStart, pEnd, ratio);
        if (i > 0 && i < segments) {
          // Displace randomly
          pt.x += (Math.random() - 0.5) * 0.5;
          pt.y += (Math.random() - 0.5) * 0.5;
          pt.z += (Math.random() - 0.5) * 0.5;
        }
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = pt.z;
      }
      posAttr.set(positions);
      posAttr.needsUpdate = true;
    } else {
      sparkLine1.visible = false;
    }

    // Spark 2 Electric Arc Generator
    const sparkCycle2 = Math.floor(t * 2.5) % 4 === 1;
    if (sparkCycle2 && Math.random() > 0.4) {
      sparkLine2.visible = true;
      const geom = sparkLine2.geometry;
      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      
      const pStart = new THREE.Vector3(2.2, 1.8, 0);
      const pEnd = new THREE.Vector3(2.6, -0.5, 0);
      
      const segments = 8;
      const positions = new Float32Array((segments + 1) * 3);
      
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const pt = new THREE.Vector3().lerpVectors(pStart, pEnd, ratio);
        if (i > 0 && i < segments) {
          pt.x += (Math.random() - 0.5) * 0.4;
          pt.y += (Math.random() - 0.5) * 0.4;
          pt.z += (Math.random() - 0.5) * 0.4;
        }
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = pt.z;
      }
      posAttr.set(positions);
      posAttr.needsUpdate = true;
    } else {
      sparkLine2.visible = false;
    }
  });

  return (
    <group ref={towerGroupRef} position={[0, -0.5, 0]} scale={1.1}>
      {/* 1. Main Lattice Steel Structure as Cylinders for thicker, lit tubes */}
      {steelBeams.map((beam, index) => {
        const start = beam[0];
        const end = beam[1];
        const distance = start.distanceTo(end);
        const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        
        // Compute rotation quaternion to align cylinder with beam direction
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        
        return (
          <mesh key={index} position={position} quaternion={quaternion}>
            <cylinderGeometry args={[0.02, 0.02, distance, 5]} />
            <meshStandardMaterial 
              color="#E87722" 
              emissive="#E87722" 
              emissiveIntensity={0.65} 
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        );
      })}

      {/* 2. Stacked Cylinder Insulators hanging off cross-arms */}
      {/* Left Low Insulator */}
      <group position={[-2.6, -0.5, 0]}>
        <mesh ref={insulatorLeftRef} position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.7} />
          {/* Add ribbing discs to look like high-voltage insulators */}
          {[0.1, 0, -0.1].map((offset, idx) => (
            <mesh key={idx} position={[0, offset, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 8]} />
              <meshStandardMaterial color="#0F172A" roughness={0.2} />
            </mesh>
          ))}
        </mesh>
      </group>

      {/* Right Low Insulator */}
      <group position={[2.6, -0.5, 0]}>
        <mesh ref={insulatorRightRef} position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.7} />
          {[0.1, 0, -0.1].map((offset, idx) => (
            <mesh key={idx} position={[0, offset, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 8]} />
              <meshStandardMaterial color="#0F172A" roughness={0.2} />
            </mesh>
          ))}
        </mesh>
      </group>

      {/* 3. Glowing Core Sphere at Peak (High Voltage Cap) */}
      <mesh position={[0, 5.5, 0]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF" 
          emissiveIntensity={2.5} 
          roughness={0} 
        />
        {/* Halo ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.03, 8, 32]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.6} />
        </mesh>
      </mesh>

      {/* 4. Power lines (catenary paths) */}
      {powerLines.map((linePts, lineIdx) => {
        const curve = new THREE.CatmullRomCurve3(linePts);
        return (
          <mesh key={lineIdx}>
            <tubeGeometry args={[curve, 40, 0.015, 6, false]} />
            <meshStandardMaterial 
              color="#1A1A2E" 
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        );
      })}

      {/* 5. Animated Electric Spark Lines (cyan and amber) */}
      <primitive object={sparkLine1} />
      <primitive object={sparkLine2} />
    </group>
  );
};

// 3,000 Floating Energy Upward Particles
const EnergyParticles: React.FC<{ scrollY: number; isMobile: boolean }> = ({ scrollY, isMobile }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 2800;

  // Initialize random particle positions, colors, speeds
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const amber = new THREE.Color("#E87722");
    const cyan = new THREE.Color("#00D4FF");

    for (let i = 0; i < particleCount; i++) {
      // Spread across a cylinder-like column around the tower
      const radius = 1.5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12; // -6 to +6 y
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      // Color selection (mostly amber, some cyan, some neutral gray)
      const colorRand = Math.random();
      let selectedCol = new THREE.Color("#0F3460");
      if (colorRand < 0.6) {
        selectedCol = amber;
      } else if (colorRand < 0.9) {
        selectedCol = cyan;
      }

      col[i * 3] = selectedCol.r;
      col[i * 3 + 1] = selectedCol.g;
      col[i * 3 + 2] = selectedCol.b;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const positionsArray = posAttr.array as Float32Array;
    
    // Slow drifting upwards
    for (let i = 0; i < particleCount; i++) {
      // Move up (y increases)
      positionsArray[i * 3 + 1] += 0.02 + Math.random() * 0.01;
      
      // Floating jitter (sine drift on x and z)
      positionsArray[i * 3] += Math.sin(state.clock.getElapsedTime() + i) * 0.003;
      positionsArray[i * 3 + 2] += Math.cos(state.clock.getElapsedTime() + i) * 0.003;

      // Recycle particles that float out of scope
      if (positionsArray[i * 3 + 1] > 6) {
        positionsArray[i * 3 + 1] = -6; // reset to bottom
      }
    }
    
    posAttr.needsUpdate = true;
    
    // Rotate particle cloud slowly
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    
    // Scroll depth reaction
    const scrollRatio = Math.min(scrollY / 1000, 1.2);
    const baseOffsetX = isMobile ? 0 : 4.8;
    pointsRef.current.position.x = baseOffsetX - scrollRatio * 2.0;
    pointsRef.current.position.z = -scrollRatio * 3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute 
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Scene Controller containing background infrastructure grid lines
const SceneController: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const { camera } = useThree();
  
  // Animate grid and background effects
  useFrame(() => {
    // Lerp camera back on scroll
    const targetZ = 8 + (scrollY * 0.0035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    
    // Push camera slightly upwards on scroll
    const targetY = scrollY * 0.001;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 10, 5]} intensity={1.5} color="#00D4FF" />
      <pointLight position={[-5, -5, -5]} intensity={1.0} color="#E87722" />
      <directionalLight position={[0, 10, 0]} intensity={1.2} color="#ffffff" />
      
      {/* Substation ground grid representing Pune's electrical network */}
      <gridHelper 
        args={[30, 30, new THREE.Color("#002f3a"), new THREE.Color("#0e1220")]} 
        position={[0, -5, 0]} 
      />
    </>
  );
};

export const TowerScene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneController scrollY={scrollY} />
        {modelsConfig.useRealisticScans.tower ? (
          <Suspense fallback={null}>
            <group position={[0, -0.5, 0]} scale={1.1}>
              <ScannedModel 
                url={modelsConfig.scanPaths.tower} 
                scale={modelsConfig.scannedOffsets.tower.scale} 
                position={modelsConfig.scannedOffsets.tower.position} 
              />
            </group>
          </Suspense>
        ) : (
          <TransmissionTower scrollY={scrollY} mouse={mouse} isMobile={isMobile} />
        )}
        <EnergyParticles scrollY={scrollY} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default TowerScene;
