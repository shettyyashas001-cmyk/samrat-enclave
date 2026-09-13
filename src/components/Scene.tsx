'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Sky, Stars } from '@react-three/drei'
import { ARButton, XR } from '@react-three/xr'
import * as THREE from 'three'

function Skyscraper() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  // Procedural skyscraper generation
  const floors = 40
  const floorHeight = 0.5
  const width = 2
  const depth = 2

  return (
    <group ref={groupRef} position={[0, -5, -10]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 1, floorHeight * 2, depth + 1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floors */}
      {Array.from({ length: floors }).map((_, i) => (
        <group key={i} position={[0, floorHeight * 2 + i * floorHeight, 0]}>
          <mesh>
            <boxGeometry args={[width, floorHeight - 0.05, depth]} />
            <meshStandardMaterial 
              color="#0f172a" 
              metalness={1} 
              roughness={0} 
              envMapIntensity={2}
            />
          </mesh>
          {/* Glowing Windows */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[width + 0.01, floorHeight - 0.1, depth + 0.01]} />
            <meshBasicMaterial 
              color={Math.random() > 0.8 ? "#D4AF37" : "#000000"} 
              transparent 
              opacity={Math.random() > 0.8 ? 0.8 : 0.1}
            />
          </mesh>
        </group>
      ))}
      
      {/* Spire */}
      <mesh position={[0, floorHeight * 2 + floors * floorHeight + 1, 0]}>
        <cylinderGeometry args={[0, 0.2, 2, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function Scene() {
  const [arEnabled, setArEnabled] = useState(false)

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <ARButton 
          className="bg-[#D4AF37] text-slate-950 px-4 py-2 font-bold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-transform hover:scale-105" 
          sessionInit={{ requiredFeatures: ['hit-test'] }}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-slate-950">
        <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
          <XR>
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#D4AF37" />
            <pointLight position={[0, 10, 10]} intensity={1} color="#D4AF37" />
            
            <Skyscraper />
            
            <Sky distance={450000} sunPosition={[0, -1, 0]} inclination={0} azimuth={0.25} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2 + 0.1}
            />
            <Environment preset="night" />
          </XR>
        </Canvas>
      </div>
    </>
  )
}
