import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@/components/AnimatedIcon/Box';

export const AnimatedIcon = () => {
  return (
    <Canvas
      camera={{ position: [3, 20, 14.25], fov: 8 }}
      style={{
        backgroundColor: '#fff'
      }}>
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Box />
      </Suspense>
    </Canvas>
  );
};
