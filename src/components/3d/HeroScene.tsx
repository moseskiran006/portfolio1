import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';
import { Sphere, MeshDistortMaterial, GradientTexture, Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    
    const t = clock.getElapsedTime();
    sphereRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    sphereRef.current.rotation.x = t * 0.1;
    sphereRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh 
        ref={sphereRef}
        position={[0, 0, 0]}
        scale={inView ? 1 : 0}
      >
        <Sphere args={[2, 128, 128]}>
          <MeshDistortMaterial
            distort={0.4}
            speed={3}
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.8}
          >
            <GradientTexture
              stops={[0, 0.2, 0.4, 0.6, 1]}
              colors={['#0ea5e9', '#14b8a6', '#f97316', '#0ea5e9', '#0284c7']}
              size={100}
            />
          </MeshDistortMaterial>
        </Sphere>
      </mesh>
    </Float>
  );
};

const GridPlane = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    
    const t = clock.getElapsedTime();
    gridRef.current.position.z = -Math.sin(t * 0.2) * 2;
    gridRef.current.rotation.x = Math.PI / 2;
    gridRef.current.rotation.z = t * 0.05;
    
    // Handle both single material and array of materials
    const materials = gridRef.current.material;
    const opacity = Math.sin(t * 0.5) * 0.3 + 0.5;
    
    if (Array.isArray(materials)) {
      materials.forEach(material => {
        material.opacity = opacity;
        material.transparent = true;
      });
    } else if (materials) {
      materials.opacity = opacity;
      materials.transparent = true;
    }
  });
  
  return (
    <gridHelper 
      ref={gridRef}
      args={[40, 40, '#6366f1', '#3730a3']}
      position={[0, -3, 0]}
    />
  );
};

const SmallParticles = ({ count = 150 }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const t = clock.getElapsedTime();
    particlesRef.current.rotation.y = t * 0.05;
    particlesRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    
    // Animate particle positions
    const positions = particlesRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      positions.setXYZ(
        i,
        x + Math.sin(t + x) * 0.01,
        y + Math.cos(t + y) * 0.01,
        z + Math.sin(t + z) * 0.01
      );
    }
    positions.needsUpdate = true;
  });
  
  const particlePositions = new Float32Array(count * 3);
  const particleSizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 8;
    
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    
    particleSizes[i] = Math.random() * 0.5 + 0.2;
  }
  
  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={particleSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.2} 
          color="#ffffff"
          sizeAttenuation
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <Sparkles 
        count={50}
        scale={12}
        size={1}
        speed={0.3}
        opacity={0.2}
        color="#ffffff"
      />
    </>
  );
};

const HeroScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Environment preset="city" />
      
      <AnimatedSphere />
      <GridPlane />
      <SmallParticles count={150} />
    </Canvas>
  );
};

export default HeroScene;