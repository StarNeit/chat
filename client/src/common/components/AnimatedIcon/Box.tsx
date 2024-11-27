import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export const Box = () => {
  const car = useGLTF('/WireframeCube.glb');
  const rotationSpeed = 0.01;

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      car.scene.rotation.y += rotationSpeed;
    };

    animate(); // Start the animation loop
  }, [car.scene, rotationSpeed]);

  return (
    <mesh>
      <primitive object={car.scene} scale={2} position={[0, 0, 0]} />
    </mesh>
  );
};
