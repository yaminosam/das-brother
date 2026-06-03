import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.25;
          (mesh.material as THREE.MeshStandardMaterial).metalness = 0.85;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} position={position} />;
};

const SubstationModel: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const modelGroupRef = useRef<THREE.Group>(null);
  
  // Ref elements for glowing pulses
  const transformerGlowRef1 = useRef<THREE.MeshStandardMaterial>(null);
  const transformerGlowRef2 = useRef<THREE.MeshStandardMaterial>(null);

  // Procedural spark lines
  const sparkLineSub = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(15), 3));
    const mat = new THREE.LineBasicMaterial({ color: "#00D4FF", toneMapped: false });
    return new THREE.Line(geom, mat);
  }, []);

  // Set up camera movement/dolly and rotation tied to scroll
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotate substation group slowly based on time + scrollY
    if (modelGroupRef.current) {
      // Base continuous rotation
      const scrollOffset = scrollY * 0.0025; // Speed of scroll rotation
      modelGroupRef.current.rotation.y = (t * 0.05) + scrollOffset;
      
      // Gentle floating bob
      modelGroupRef.current.position.y = -0.5 + Math.sin(t * 0.7) * 0.08;
    }

    // Pulse the transformer emissive glow to represent "active electrical current"
    const pulse1 = 1.2 + Math.sin(t * 4.0) * 0.8;
    const pulse2 = 1.2 + Math.cos(t * 3.5) * 0.8;
    
    if (transformerGlowRef1.current) {
      transformerGlowRef1.current.emissiveIntensity = pulse1;
    }
    if (transformerGlowRef2.current) {
      transformerGlowRef2.current.emissiveIntensity = pulse2;
    }

    // Switchgear spark arcing logic
    const sparkCycle = Math.floor(t * 4) % 6 === 0;
    if (sparkCycle && Math.random() > 0.5) {
      sparkLineSub.visible = true;
      const geom = sparkLineSub.geometry;
      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      
      const pStart = new THREE.Vector3(-1.4, 0.75, 1.4);
      const pEnd = new THREE.Vector3(1.4, 0.75, 1.4);
      
      const segments = 4;
      const positions = new Float32Array((segments + 1) * 3);
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const pt = new THREE.Vector3().lerpVectors(pStart, pEnd, ratio);
        if (i > 0 && i < segments) {
          pt.x += (Math.random() - 0.5) * 0.15;
          pt.y += (Math.random() - 0.5) * 0.35;
          pt.z += (Math.random() - 0.5) * 0.15;
        }
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = pt.z;
      }
      posAttr.set(positions);
      posAttr.needsUpdate = true;
    } else {
      sparkLineSub.visible = false;
    }
  });

  // Power lines between structural poles
  const subPowerLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const makeCable = (p1: THREE.Vector3, p2: THREE.Vector3, sag = 0.25) => {
      const pts: THREE.Vector3[] = [];
      const steps = 15;
      for (let i = 0; i <= steps; i++) {
        const r = i / steps;
        const pt = new THREE.Vector3().lerpVectors(p1, p2, r);
        pt.y += Math.sin(r * Math.PI) * -sag;
        pts.push(pt);
      }
      return pts;
    };

    // Connect poles
    lines.push(makeCable(new THREE.Vector3(-1.8, 1.4, -1), new THREE.Vector3(0, 1.4, -0.6)));
    lines.push(makeCable(new THREE.Vector3(1.8, 1.4, -1), new THREE.Vector3(0, 1.4, -0.6)));
    lines.push(makeCable(new THREE.Vector3(-1.8, 1.4, 1), new THREE.Vector3(0, 1.4, 0.6)));
    lines.push(makeCable(new THREE.Vector3(1.8, 1.4, 1), new THREE.Vector3(0, 1.4, 0.6)));
    lines.push(makeCable(new THREE.Vector3(0, 1.4, -0.6), new THREE.Vector3(0, 1.4, 0.6), 0.1));

    return lines;
  }, []);

  return (
    <group ref={modelGroupRef} position={[0, -0.5, 0]}>
      {/* 1. Substation Concrete Pad foundation */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.8, 0.15, 4.8]} />
        <meshStandardMaterial 
          color="#334155" 
          roughness={0.25} 
          metalness={0.8} 
          emissive="#00D4FF"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Gravel textured sheet overlay */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[4.72, 0.01, 4.72]} />
        <meshStandardMaterial 
          color="#475569" 
          roughness={0.95} 
          metalness={0.05}
        />
      </mesh>
      
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[4.72, 0.005, 4.72]} />
        <meshBasicMaterial color="#00D4FF" wireframe opacity={0.12} transparent />
      </mesh>
      
      {/* Outer steel frame fence poles (4 corners) */}
      {[-2.3, 2.3].map((x) =>
        [-2.3, 2.3].map((z, idx) => (
          <mesh key={`${x}-${z}-${idx}`} position={[x, 0.8, z]}>
            <cylinderGeometry args={[0.025, 0.025, 1.6, 6]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
          </mesh>
        ))
      )}

      {/* 2. Main Transformer Units */}
      {/* Unit 1 (Left Transformer) */}
      <group position={[-1.2, 0.6, 0]}>
        {/* Core Tank */}
        <mesh castShadow>
          <boxGeometry args={[1.0, 1.0, 1.2]} />
          <meshStandardMaterial color="#64748B" roughness={0.15} metalness={0.9} />
        </mesh>
        
        {/* Conservator Expansion Tank */}
        <mesh position={[0, 0.62, -0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.52, -0.2]}>
          <boxGeometry args={[0.08, 0.15, 0.2]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        
        {/* Radiator Cooling Fins */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((zOffset, idx) => (
          <mesh key={idx} position={[-0.58, 0, zOffset]}>
            <boxGeometry args={[0.12, 0.8, 0.03]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* High Voltage Bushings (Glowing nodes) */}
        {[-0.3, 0, 0.3].map((zOffset, idx) => (
          <group key={idx} position={[0.2, 0.6, zOffset]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.04, 0.3, 6]} />
              <meshStandardMaterial color="#92400E" roughness={0.05} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial 
                ref={idx === 1 ? transformerGlowRef1 : undefined}
                color="#E87722" 
                emissive="#E87722" 
                emissiveIntensity={2.0}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Unit 2 (Right Transformer) */}
      <group position={[1.2, 0.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.0, 1.0, 1.2]} />
          <meshStandardMaterial color="#64748B" roughness={0.15} metalness={0.9} />
        </mesh>
        
        {/* Conservator Expansion Tank */}
        <mesh position={[0, 0.62, -0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.52, -0.2]}>
          <boxGeometry args={[0.08, 0.15, 0.2]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        
        {/* Radiator Cooling Fins */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((zOffset, idx) => (
          <mesh key={idx} position={[0.58, 0, zOffset]}>
            <boxGeometry args={[0.12, 0.8, 0.03]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Bushings */}
        {[-0.3, 0, 0.3].map((zOffset, idx) => (
          <group key={idx} position={[-0.2, 0.6, zOffset]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.04, 0.3, 6]} />
              <meshStandardMaterial color="#92400E" roughness={0.05} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial 
                ref={idx === 1 ? transformerGlowRef2 : undefined}
                color="#00D4FF" 
                emissive="#00D4FF" 
                emissiveIntensity={2.0}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. Substation Control Kiosk / Relay Room Panel */}
      <mesh position={[0, 0.45, -1.5]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshStandardMaterial color="#64748B" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Control Console display details */}
      <mesh position={[0, 0.5, -1.09]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshBasicMaterial color="#0A0F1D" />
      </mesh>
      {/* Oscilloscope mini screens */}
      {[-0.2, 0.2].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 0.5, -1.08]}>
          <planeGeometry args={[0.25, 0.25]} />
          <meshBasicMaterial 
            color={idx === 0 ? "#39FF14" : "#00D4FF"} 
            transparent 
            opacity={0.9} 
          />
        </mesh>
      ))}

      {/* 4. Steel Lattice Framework Gantry */}
      <group position={[0, 1.2, 0]}>
        {/* Support columns */}
        <mesh position={[-1.8, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.4, 6]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[1.8, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.4, 6]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Overhead beam */}
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 3.6, 6]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Insulator hanging columns from gantry */}
        {[-1.2, 0, 1.2].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
            <meshStandardMaterial color="#92400E" roughness={0.05} />
          </mesh>
        ))}
      </group>

      {/* 4b. Overhead Copper Busbars running horizontally */}
      {[-0.6, 0, 0.6].map((zOffset, idx) => (
        <mesh key={idx} position={[0, 1.9, zOffset]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 3.6, 6]} />
          <meshStandardMaterial 
            color="#E87722" 
            metalness={0.95} 
            roughness={0.15} 
            emissive="#E87722" 
            emissiveIntensity={0.25} 
          />
        </mesh>
      ))}

      {/* 4c. Lightning Surge Arrestors */}
      {[-1.6, 1.6].map((x) => (
        <group key={x} position={[x, 0.45, -0.8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.015, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
          </mesh>
          {/* Ribbed ceramic discs */}
          {[0.1, 0, -0.1, -0.2].map((offset, idx) => (
            <mesh key={idx} position={[0, offset, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.03, 6]} />
              <meshStandardMaterial color="#92400E" roughness={0.05} />
            </mesh>
          ))}
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#00D4FF" />
          </mesh>
        </group>
      ))}

      {/* 5. Switchgear Isolators (Low-poly breakers) */}
      {[-1.4, 1.4].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 0.4, 1.4]}>
          {/* Base */}
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.6, 0.4]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Disconnect switch poles */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* 6. Power lines hanging */}
      {subPowerLines.map((linePts, lineIdx) => {
        const curve = new THREE.CatmullRomCurve3(linePts);
        return (
          <mesh key={lineIdx}>
            <tubeGeometry args={[curve, 20, 0.015, 6, false]} />
            <meshStandardMaterial 
              color="#E87722" 
              emissive="#E87722" 
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}

      {/* 7. Dynamic Terminal Sparks */}
      <primitive object={sparkLineSub} />
    </group>
  );
};

export const SubstationScene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
      <Canvas
        camera={{ position: [isMobile ? 3.2 : 2.5, isMobile ? 3.2 : 2.5, isMobile ? 5.2 : 4.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        {/* Electric Arc blue and orange lights positioned closer to illuminate details */}
        <pointLight position={[3, 3, 3]} intensity={4.5} color="#00D4FF" />
        <pointLight position={[-3, 3, -3]} intensity={3.5} color="#E87722" />
        <directionalLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" />
        
        {modelsConfig.useRealisticScans.substation ? (
          <Suspense fallback={null}>
            <group position={[0, -0.5, 0]}>
              <ScannedModel 
                url={modelsConfig.scanPaths.substation} 
                scale={modelsConfig.scannedOffsets.substation.scale} 
                position={modelsConfig.scannedOffsets.substation.position} 
              />
            </group>
          </Suspense>
        ) : (
          <SubstationModel scrollY={scrollY} />
        )}
      </Canvas>
    </div>
  );
};

export default SubstationScene;
