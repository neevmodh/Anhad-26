import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function TrainBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const bodyColor = '#6366f1';
  const accentColor = '#818cf8';
  const windowColor = '#c7d2fe';
  const wheelColor = '#1e1b4b';

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
      {/* Main body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.5, 0.8, 0.9]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Roof - rounded */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3.4, 0.15, 0.85]} />
        <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.15} />
      </mesh>

      {/* Engine front - aerodynamic nose */}
      <mesh position={[2.1, 0.45, 0]} rotation={[0, 0, Math.PI * 0.05]}>
        <boxGeometry args={[0.8, 0.7, 0.85]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Front wedge */}
      <mesh position={[2.6, 0.35, 0]}>
        <coneGeometry args={[0.4, 0.6, 4]} />
        <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Windows */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0.46]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color={windowColor} metalness={0.9} roughness={0.05} emissive={windowColor} emissiveIntensity={0.2} />
        </mesh>
      ))}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <mesh key={`b${i}`} position={[x, 0.55, -0.46]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color={windowColor} metalness={0.9} roughness={0.05} emissive={windowColor} emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Front light */}
      <mesh position={[2.85, 0.4, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
      </mesh>

      {/* Stripe */}
      <mesh position={[0, 0.25, 0.46]}>
        <boxGeometry args={[3.5, 0.06, 0.01]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.25, -0.46]}>
        <boxGeometry args={[3.5, 0.06, 0.01]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>

      {/* Wheels */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <group key={`w${i}`}>
          <mesh position={[x, -0.05, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
            <meshStandardMaterial color={wheelColor} metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[x, -0.05, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
            <meshStandardMaterial color={wheelColor} metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Rail tracks */}
      <mesh position={[0, -0.18, 0.5]}>
        <boxGeometry args={[6, 0.03, 0.08]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.18, -0.5]}>
        <boxGeometry args={[6, 0.03, 0.08]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Rail ties */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`tie${i}`} position={[-2.5 + i * 0.45, -0.2, 0]}>
          <boxGeometry args={[0.15, 0.04, 1.2]} />
          <meshStandardMaterial color="#64748b" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#818cf8" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 2 - 2;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.5 + 1.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <MeshDistortMaterial
        color="#818cf8"
        emissive="#6366f1"
        emissiveIntensity={0.5}
        transparent
        opacity={0.15}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

export default function TrainScene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [3, 1.5, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#e0e7ff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#c084fc" />
        <pointLight position={[3, 0.5, 0]} intensity={0.5} color="#fbbf24" distance={5} />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <TrainBody />
        </Float>
        
        <FloatingParticles />
        <GlowOrb />
      </Canvas>
    </div>
  );
}
