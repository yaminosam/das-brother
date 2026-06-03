import React, { useRef, useMemo, useState, Suspense, useEffect } from "react";
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
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.2;
          (mesh.material as THREE.MeshStandardMaterial).metalness = 0.8;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} position={position} />;
};

interface PcbSceneProps {
  hoveredService: number | null;
  onHoverService: (index: number | null) => void;
}

const ServiceChip: React.FC<{
  index: number;
  position: [number, number, number];
  isGlobalHovered: boolean;
  onHover: (hovered: boolean) => void;
}> = ({ index, position, isGlobalHovered, onHover }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [localHovered, setLocalHovered] = useState(false);
  const isHovered = isGlobalHovered || localHovered;

  const phaseOffset = useMemo(() => index * (Math.PI / 3), [index]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    const yOffset = Math.sin(t * 1.5 + phaseOffset) * 0.12;
    meshRef.current.position.y = position[1] + yOffset;
    
    const targetScale = isHovered ? 1.25 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

    meshRef.current.rotation.x = Math.sin(t * 0.8 + phaseOffset) * 0.05;
    meshRef.current.rotation.y = Math.cos(t * 1.0 + phaseOffset) * 0.05;
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setLocalHovered(true);
        onHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setLocalHovered(false);
        onHover(false);
      }}
    >
      {/* 3D Chip Core */}
      <mesh>
        <boxGeometry args={[0.85, 0.22, 0.65]} />
        <meshStandardMaterial 
          color={isHovered ? "#E87722" : "#0F3460"}
          emissive={isHovered ? "#E87722" : "#1A1A2E"}
          emissiveIntensity={isHovered ? 1.2 : 0.25}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Glowing Indicator Dot */}
      <mesh position={[0.26, 0.12, 0.18]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={isHovered ? "#39FF14" : "#00D4FF"} />
      </mesh>

      {/* Chip Connection Pins (Small metal legs) */}
      {[-0.32, -0.12, 0.08, 0.28].map((xOffset, idx) => (
        <group key={idx}>
          {/* Left Pins */}
          <mesh position={[xOffset, -0.16, -0.35]}>
            <cylinderGeometry args={[0.015, 0.015, 0.14, 6]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.05} />
          </mesh>
          {/* Right Pins */}
          <mesh position={[xOffset, -0.16, 0.35]}>
            <cylinderGeometry args={[0.015, 0.015, 0.14, 6]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.05} />
          </mesh>
        </group>
      ))}

      {/* Subtext glow ring */}
      {isHovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <ringGeometry args={[0.48, 0.58, 16]} />
          <meshBasicMaterial color="#E87722" side={THREE.DoubleSide} transparent opacity={0.35} />
        </mesh>
      )}
    </group>
  );
};

const CircuitBoard: React.FC<{ hoveredService: number | null; onHoverService: (index: number | null) => void }> = ({
  hoveredService,
  onHoverService
}) => {
  const pcbRef = useRef<THREE.Group>(null);
  const flowsRef = useRef<THREE.Group>(null);

  // High-density trace paths leading towards CPU (center x=0, z=0)
  const traces = useMemo(() => {
    return [
      [new THREE.Vector3(-2, 0.06, -1.2), new THREE.Vector3(-1, 0.06, -1.2), new THREE.Vector3(-0.5, 0.06, -0.7), new THREE.Vector3(-0.1, 0.06, -0.7), new THREE.Vector3(-0.1, 0.06, -0.4)],
      [new THREE.Vector3(-2, 0.06, 1.2), new THREE.Vector3(-1.2, 0.06, 1.2), new THREE.Vector3(-0.7, 0.06, 0.7), new THREE.Vector3(-0.4, 0.06, 0.7), new THREE.Vector3(-0.4, 0.06, 0.4)],
      [new THREE.Vector3(-1.8, 0.06, 0), new THREE.Vector3(-0.8, 0.06, 0), new THREE.Vector3(-0.5, 0.06, 0.1)],
      [new THREE.Vector3(2, 0.06, 1.2), new THREE.Vector3(1, 0.06, 1.2), new THREE.Vector3(0.7, 0.06, 0.7), new THREE.Vector3(0.4, 0.06, 0.7), new THREE.Vector3(0.4, 0.06, 0.4)],
      [new THREE.Vector3(2, 0.06, -1.2), new THREE.Vector3(1.2, 0.06, -1.2), new THREE.Vector3(0.7, 0.06, -0.7), new THREE.Vector3(0.4, 0.06, -0.7), new THREE.Vector3(0.4, 0.06, -0.4)],
      [new THREE.Vector3(0.1, 0.06, 0.4), new THREE.Vector3(0.1, 0.06, 0.8), new THREE.Vector3(0.8, 0.06, 0.8), new THREE.Vector3(1.6, 0.06, 0.8)],
      [new THREE.Vector3(-0.1, 0.06, 0.4), new THREE.Vector3(-0.1, 0.06, 1.0), new THREE.Vector3(-0.8, 0.06, 1.0), new THREE.Vector3(-1.6, 0.06, 0.8)],
      [new THREE.Vector3(0, 0.06, -0.4), new THREE.Vector3(0, 0.06, -0.9), new THREE.Vector3(0.9, 0.06, -0.9), new THREE.Vector3(1.6, 0.06, -0.8)]
    ];
  }, []);

  // Gold Solder joints located at nodes
  const solderPads = useMemo(() => {
    const pads: THREE.Vector3[] = [];
    traces.forEach((trace) => {
      pads.push(trace[0]);
      pads.push(trace[trace.length - 1]);
      if (trace.length > 2) pads.push(trace[1]);
    });
    return pads;
  }, [traces]);

  // Realistic cylindrical hardware components (Capacitors)
  const capacitors = useMemo(() => {
    const list: { pos: [number, number, number]; size: [number, number]; color: string }[] = [];
    const seedPositions: [number, number][] = [
      [-1.0, -0.4], [1.0, 0.4], [-0.8, 0.8], [0.8, -0.8], 
      [-0.8, 1.0], [0.8, -1.0], [-1.9, 0.4], [1.9, -0.4]
    ];
    seedPositions.forEach(([x, z], idx) => {
      list.push({
        pos: [x, 0.16, z],
        size: [0.08 + (idx % 3) * 0.02, 0.22 + (idx % 2) * 0.1],
        color: idx % 2 === 0 ? "#00D4FF" : "#94A3B8"
      });
    });
    return list;
  }, []);

  const servicePositions: [number, number, number][] = [
    [-1.6, 0.25, -0.8], // 0: Design
    [-1.6, 0.25, 0.8],  // 1: Substation
    [0, 0.25, -1.2],    // 2: HT & LT
    [0, 0.25, 1.2],     // 3: Panel
    [1.6, 0.25, -0.8],  // 4: Emergency
    [1.6, 0.25, 0.8],   // 5: Commissioning
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (pcbRef.current) {
      pcbRef.current.position.y = Math.sin(t * 0.6) * 0.15;
      pcbRef.current.rotation.x = 0.35 + Math.sin(t * 0.4) * 0.02;
      pcbRef.current.rotation.y = t * 0.05;
      pcbRef.current.rotation.z = Math.cos(t * 0.5) * 0.02;
    }

    if (flowsRef.current) {
      flowsRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        const curveTraces = traces[index % traces.length];
        const progress = ((t * 0.25) + (index * 0.15)) % 1;
        
        const curve = new THREE.CatmullRomCurve3(curveTraces);
        const point = curve.getPointAt(progress);
        mesh.position.copy(point);
      });
    }
  });

  return (
    <group ref={pcbRef} position={[0, -0.2, 0]}>
      {/* 1. Main PCB Board Base */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.1, 3.2]} />
        <meshStandardMaterial 
          color="#0F172A" 
          roughness={0.35} 
          metalness={0.8}
        />
      </mesh>

      {/* 2. Copper PCB Edges / Gold borders */}
      <mesh position={[0, 0.055, 0]}>
        <boxGeometry args={[4.4, 0.01, 3.1]} />
        <meshStandardMaterial 
          color="#E87722" 
          wireframe
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* 3. Gold solder pads at trace nodes */}
      {solderPads.map((padPos, idx) => (
        <mesh key={idx} position={[padPos.x, 0.052, padPos.z]}>
          <cylinderGeometry args={[0.06, 0.06, 0.005, 8]} />
          <meshStandardMaterial color="#E87722" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* 4. Cylindrical Capacitors */}
      {capacitors.map((comp, idx) => (
        <group key={idx} position={comp.pos}>
          <mesh castShadow>
            <cylinderGeometry args={[comp.size[0], comp.size[0], comp.size[1], 8]} />
            <meshStandardMaterial color={comp.color} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, comp.size[1] / 2 + 0.005, 0]}>
            <cylinderGeometry args={[comp.size[0], comp.size[0], 0.01, 8]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* 5. Central CPU Microchip */}
      <group position={[0, 0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.0, 0.12, 1.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0, 0.061, 0]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
        </mesh>
        {[-0.4, -0.2, 0, 0.2, 0.4].map((offset, idx) => (
          <group key={idx}>
            <mesh position={[-0.54, -0.04, offset]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 0.1, 4]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh position={[0.54, -0.04, offset]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 0.1, 4]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.05} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. Circuit Traces (Lines) */}
      {traces.map((tracePts, index) => {
        const curve = new THREE.CatmullRomCurve3(tracePts);
        return (
          <mesh key={index} position={[0, 0.01, 0]}>
            <tubeGeometry args={[curve, 20, 0.012, 4, false]} />
            <meshStandardMaterial 
              color={hoveredService !== null ? "#00D4FF" : "#E87722"} 
              emissive={hoveredService !== null ? "#00D4FF" : "#E87722"}
              emissiveIntensity={hoveredService !== null ? 1.8 : 0.75}
            />
          </mesh>
        );
      })}

      {/* 7. Current Flowing Particles */}
      <group ref={flowsRef}>
        {traces.map((_, index) => (
          <mesh key={index}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial 
              color="#00D4FF" 
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* 8. 6 Floating Service Chips */}
      {servicePositions.map((pos, index) => (
        <ServiceChip
          key={index}
          index={index}
          position={pos}
          isGlobalHovered={hoveredService === index}
          onHover={(hovered) => {
            onHoverService(hovered ? index : null);
          }}
        />
      ))}
      
      {/* 9. Underlay Grid plane */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.9} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

export const PcbScene: React.FC<PcbSceneProps> = ({ hoveredService, onHoverService }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      <Canvas
        camera={{ position: [0, isMobile ? 2.5 : 1.8, isMobile ? 5.2 : 4.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00D4FF" />
        <pointLight position={[-5, 3, -5]} intensity={1.2} color="#E87722" />
        <directionalLight position={[0, 5, 0]} intensity={1.0} color="#ffffff" />
        
        {modelsConfig.useRealisticScans.pcb ? (
          <Suspense fallback={null}>
            <group rotation={[0.35, 0, 0]} position={[0, -0.2, 0]}>
              <ScannedModel 
                url={modelsConfig.scanPaths.pcb} 
                scale={modelsConfig.scannedOffsets.pcb.scale} 
                position={modelsConfig.scannedOffsets.pcb.position} 
              />
            </group>
          </Suspense>
        ) : (
          <CircuitBoard hoveredService={hoveredService} onHoverService={onHoverService} />
        )}
      </Canvas>
    </div>
  );
};

export default PcbScene;
