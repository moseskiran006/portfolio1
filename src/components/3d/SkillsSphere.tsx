import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface TagSphereProps {
  skills: string[];
}

const TagSphere: React.FC<TagSphereProps> = ({ skills }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
  });

  // Position tags on a sphere
  const tags = useMemo(() => {
    const uniqueSkills = Array.from(new Set(skills)).slice(0, 30); // Limit to 30 tags for performance
    return uniqueSkills.map((skill, i) => {
      // Use fibonacci sphere distribution for even placement
      const phi = Math.acos(-1 + (2 * i) / uniqueSkills.length);
      const theta = Math.sqrt(uniqueSkills.length * Math.PI) * phi;
      
      const x = Math.cos(theta) * Math.sin(phi) * 4;
      const y = Math.sin(theta) * Math.sin(phi) * 4;
      const z = Math.cos(phi) * 4;
      
      // Scale by importance (here we just use a random value)
      const scale = 0.5 + Math.random() * 0.5;
      
      // Colors based on category (simplified)
      const colors = [
        '#0ea5e9', // primary
        '#14b8a6', // secondary
        '#f97316', // accent
      ];
      
      return (
        <Text
          key={i}
          position={[x, y, z]}
          fontSize={0.3 * scale}
          color={colors[i % colors.length]}
          anchorX="center"
          anchorY="middle"
          // Billboard mode - always face the camera
          rotation={[0, 0, 0]}
          // @ts-ignore - missing prop types
          fillOpacity={0.8}
          // @ts-ignore - missing prop types
          outlineWidth={0.01}
          // @ts-ignore - missing prop types
          outlineColor="#000000"
          // @ts-ignore - missing prop types
          outlineOpacity={0.2}
        >
          {skill}
        </Text>
      );
    });
  }, [skills]);

  return <group ref={groupRef}>{tags}</group>;
};

interface SkillsSphereProps {
  skills: string[];
}

const SkillsSphere: React.FC<SkillsSphereProps> = ({ skills }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <TagSphere skills={skills} />
    </Canvas>
  );
};

export default SkillsSphere;