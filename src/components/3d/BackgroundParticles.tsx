import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Particle material
class ParticleMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0 - (distanceToCenter * 2.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }
}

// Register the custom material
extend({ ParticleMaterial });

interface ParticlesProps {
  count?: number;
}

const Particles: React.FC<ParticlesProps> = ({ count = 1000 }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleMaterialRef = useRef<ParticleMaterial>(null);

  // Create particles on mount
  useEffect(() => {
    if (!particlesRef.current) return;

    const geometry = particlesRef.current.geometry as THREE.BufferGeometry;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color('#0284c7'); // primary-600
    const color2 = new THREE.Color('#0d9488'); // secondary-600
    const color3 = new THREE.Color('#ea580c'); // accent-600

    for (let i = 0; i < count; i++) {
      // Positions: create a sphere of particles
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Colors: gradient between three colors
      const colorRand = Math.random();
      let particleColor = new THREE.Color();
      
      if (colorRand < 0.33) {
        particleColor.copy(color1);
      } else if (colorRand < 0.66) {
        particleColor.copy(color2);
      } else {
        particleColor.copy(color3);
      }
      
      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;

      // Sizes: random size for each particle
      sizes[i] = Math.random() * 5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  }, [count]);

  // Animate particles
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const time = clock.getElapsedTime() * 0.1;
    particlesRef.current.rotation.x = time * 0.05;
    particlesRef.current.rotation.y = time * 0.03;
    
    const positions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position;
    const sizes = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.size;
    
    for (let i = 0; i < count; i++) {
      // Subtle movement
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      positions.setXYZ(
        i,
        x + Math.sin(time + i * 0.1) * 0.01,
        y + Math.cos(time + i * 0.1) * 0.01,
        z
      );
      
      // Pulse size
      sizes.setX(i, (Math.sin(time + i) * 0.5 + 1.5) * sizes.getX(i) * 0.5);
    }
    
    positions.needsUpdate = true;
    sizes.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      {/* @ts-ignore */}
      <particleMaterial ref={particleMaterialRef} />
    </points>
  );
};

const BackgroundParticles: React.FC = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 25], fov: 60, near: 0.1, far: 1000 }}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <ambientLight intensity={0.5} />
      <Particles count={300} />
    </Canvas>
  );
};

export default BackgroundParticles;