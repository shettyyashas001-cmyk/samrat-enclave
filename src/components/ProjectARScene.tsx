'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from '@react-three/drei'
import { useParams } from 'next/navigation'
import * as THREE from 'three'

function LuxuryVillaModel() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Ground */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[16, 0.1, 16]} />
        <meshStandardMaterial
          color="#3f5135"
          roughness={0.9}
        />
      </mesh>

      {/* Driveway */}
      <mesh receiveShadow position={[-2, 0.01, 4]}>
        <boxGeometry args={[2, 0.02, 8]} />
        <meshStandardMaterial
          color="#1f2937"
          roughness={0.8}
        />
      </mesh>

      {/* Swimming Pool */}
      <group position={[4, 0.01, 3]}>
        <mesh receiveShadow>
          <boxGeometry args={[5, 0.02, 6]} />
          <meshPhysicalMaterial
            color="#2dd4bf"
            transmission={0.8}
            opacity={0.9}
            transparent
            roughness={0.05}
            metalness={0.2}
            ior={1.33}
          />
        </mesh>

        <mesh
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <boxGeometry args={[5, 0.02, 6]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
      </group>

      {/* Ground Floor */}
      <mesh
        castShadow
        receiveShadow
        position={[-1, 0.6, -1]}
      >
        <boxGeometry args={[6, 1.2, 5]} />
        <meshStandardMaterial
          color="#d4c3b3"
          roughness={0.7}
        />
      </mesh>

      {/* Ground Floor Glass */}
      <mesh
        castShadow
        position={[-1, 0.6, 1.51]}
      >
        <boxGeometry args={[5.8, 1, 0.1]} />
        <meshPhysicalMaterial
          color="#020617"
          transmission={0.9}
          ior={1.5}
          transparent
          opacity={0.7}
          roughness={0.1}
        />
      </mesh>

      <pointLight
        position={[-1, 0.6, 0]}
        color="#fef08a"
        intensity={2}
        distance={5}
      />

      {/* Upper Floor */}
      <mesh
        castShadow
        receiveShadow
        position={[1, 1.8, -0.5]}
      >
        <boxGeometry args={[8, 1.2, 6]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.2}
        />
      </mesh>

      {/* Upper Floor Glass */}
      <mesh
        castShadow
        position={[1, 1.8, 2.51]}
      >
        <boxGeometry args={[7.8, 1, 0.1]} />
        <meshPhysicalMaterial
          color="#020617"
          transmission={0.9}
          ior={1.5}
          transparent
          opacity={0.7}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>

      <pointLight
        position={[1, 1.8, 1]}
        color="#fde047"
        intensity={2.5}
        distance={6}
      />

      {/* Wooden Wall */}
      <mesh
        castShadow
        receiveShadow
        position={[-3, 1.2, -1]}
      >
        <boxGeometry args={[0.3, 2.4, 5.2]} />
        <meshStandardMaterial
          color="#8b5a2b"
          roughness={0.7}
        />
      </mesh>

      {/* Tree */}
      <group position={[-5, 0, 5]}>
        <mesh
          castShadow
          receiveShadow
          position={[0, 0.5, 0]}
        >
          <cylinderGeometry args={[0.1, 0.1, 1]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>

        <mesh
          castShadow
          receiveShadow
          position={[0, 1.5, 0]}
        >
          <coneGeometry args={[1, 2, 8]} />
          <meshStandardMaterial color="#228b22" />
        </mesh>
      </group>
    </group>
  )
}

function HighRiseTowerModel() {
  const floors = 15

  return (
    <group position={[0, -0.5, 0]}>
      {/* Ground */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.6}
        />
      </mesh>

      {/* Lobby */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.5, 0]}
      >
        <boxGeometry args={[5, 1, 5]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.5}
          opacity={0.8}
          transparent
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>

      <pointLight
        position={[0, 0.5, 0]}
        color="#fef08a"
        intensity={3}
        distance={10}
      />

      {/* Floors */}
      {Array.from({ length: floors }).map((_, index) => {
        const y = 1 + index * 0.4 + 0.2

        return (
          <group
            key={`floor-${index}`}
            position={[0, y, 0]}
          >
            <mesh castShadow>
              <boxGeometry args={[4, 0.35, 4]} />
              <meshPhysicalMaterial
                color="#020617"
                transmission={0.2}
                opacity={0.9}
                transparent
                roughness={0.05}
                metalness={0.9}
              />
            </mesh>

            <mesh
              castShadow
              receiveShadow
              position={[0, 0.18, 0]}
            >
              <boxGeometry args={[4.2, 0.05, 4.2]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        )
      })}

      {/* Rooftop */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 1 + floors * 0.4 + 0.1, 0]}
      >
        <cylinderGeometry
          args={[1.5, 1.5, 0.2, 16]}
        />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.5}
        />
      </mesh>

      {/* Rooftop Ring */}
      <mesh
        position={[0, 1 + floors * 0.4 + 0.21, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.5, 1.3, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function MasterplanPlotsModel() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Ground */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial
          color="#4d7c0f"
          roughness={0.9}
        />
      </mesh>

      {/* Vertical Road */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[4, 0.02, 20]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.8}
        />
      </mesh>

      {/* Horizontal Road */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[20, 0.02, 4]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.8}
        />
      </mesh>

      {/* Plots */}
      {[-1, 1].flatMap((xSign, xIndex) =>
        [-1, 1].map((zSign, zIndex) => (
          <group
            key={`plot-${xIndex}-${zIndex}`}
            position={[
              xSign * 6,
              0.02,
              zSign * 6,
            ]}
          >
            {/* Plot Border */}
            <mesh receiveShadow>
              <boxGeometry args={[7, 0.05, 7]} />
              <meshStandardMaterial
                color="#fcd34d"
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>

            {/* Plot Area */}
            <mesh
              receiveShadow
              position={[0, 0.03, 0]}
            >
              <boxGeometry
                args={[6.8, 0.05, 6.8]}
              />
              <meshStandardMaterial
                color="#65a30d"
                roughness={0.9}
              />
            </mesh>

            {/* Plot Marker */}
            <mesh
              castShadow
              receiveShadow
              position={[3.5, 0.3, 3.5]}
            >
              <cylinderGeometry
                args={[0.1, 0.1, 0.6]}
              />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))
      )}
    </group>
  )
}

interface ProjectARSceneProps {
  projectType?: string
  slug?: string
}

export default function ProjectARScene({
  projectType = '',
  slug = '',
}: ProjectARSceneProps) {
  const params = useParams()

  const rawParamSlug = params?.slug
    ? String(params.slug)
    : ''

  const rawKey = `${slug} ${rawParamSlug} ${projectType}`
    .toLowerCase()
    .replace(/samrat|enclave/g, '')
    .trim()

  const isApartment =
    rawKey.includes('tower') ||
    rawKey.includes('height') ||
    rawKey.includes('apartment') ||
    rawKey.includes('falcon') ||
    rawKey.includes('highrise')

  const isPlot =
    rawKey.includes('plot') ||
    rawKey.includes('masterplan') ||
    rawKey.includes('layout') ||
    rawKey.includes('tech') ||
    rawKey.includes('land')

  const resolvedKey = isApartment
    ? 'tower'
    : isPlot
      ? 'plot'
      : 'villa'

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
      {/* Model Label */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded border border-white/10 bg-black/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white backdrop-blur">
        {resolvedKey.toUpperCase()} MODEL PREVIEW
      </div>

      <Canvas
        key={resolvedKey}
        camera={{
          position: [12, 10, 15],
          fov: 45,
        }}
        shadows
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />

        <Environment preset="city" />

        <directionalLight
          position={[10, 20, 10]}
          intensity={1.8}
          castShadow
          shadow-bias={-0.0005}
        />

        {/* Model */}
        <Float
          speed={1.5}
          rotationIntensity={0}
          floatIntensity={0.2}
        >
          {resolvedKey === 'tower' && (
            <HighRiseTowerModel />
          )}

          {resolvedKey === 'plot' && (
            <MasterplanPlotsModel />
          )}

          {resolvedKey === 'villa' && (
            <LuxuryVillaModel />
          )}
        </Float>

        {/* Shadows */}
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.6}
          scale={30}
          blur={2.5}
          far={4}
        />

        {/* Camera Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={0.1}
        />
      </Canvas>
    </div>
  )
}