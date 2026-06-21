"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { mouseState } from "./mouse-tracker"

interface ShapeConfig {
  position: [number, number, number]
  color: string
  geometry: string
  scale: number
  wireframe: boolean
  zone: number
}

const SHAPE_CONFIGS: ShapeConfig[] = [
  // Hero zone
  { position: [-3.5, -1.5, -4], color: "#a855f7", geometry: "sphere", scale: 0.28, wireframe: true, zone: 0 },
  { position: [3.5, 1.5, -5], color: "#22d3ee", geometry: "box", scale: 0.22, wireframe: true, zone: 0 },
  { position: [1.5, -2.5, -3], color: "#ec4899", geometry: "dodecahedron", scale: 0.18, wireframe: true, zone: 0 },
  { position: [-3, 2, -6], color: "#a855f7", geometry: "icosahedron", scale: 0.2, wireframe: false, zone: 0 },
  // About zone
  { position: [4, -4, -7], color: "#22d3ee", geometry: "octahedron", scale: 0.15, wireframe: true, zone: 1 },
  { position: [-4, -5, -8], color: "#ec4899", geometry: "torus", scale: 0.12, wireframe: true, zone: 1 },
  { position: [2, -6, -6], color: "#a855f7", geometry: "torusKnot", scale: 0.1, wireframe: false, zone: 1 },
  // Projects zone
  { position: [-5, -8, -9], color: "#22d3ee", geometry: "cone", scale: 0.18, wireframe: true, zone: 2 },
  { position: [5, -9, -10], color: "#ec4899", geometry: "cylinder", scale: 0.14, wireframe: true, zone: 2 },
  { position: [-2, -10, -8], color: "#a855f7", geometry: "tetrahedron", scale: 0.16, wireframe: false, zone: 2 },
  { position: [3, -11, -11], color: "#22d3ee", geometry: "dodecahedron", scale: 0.12, wireframe: true, zone: 2 },
  // Skills zone
  { position: [-4, -13, -12], color: "#ec4899", geometry: "icosahedron", scale: 0.2, wireframe: true, zone: 3 },
  { position: [4, -14, -13], color: "#a855f7", geometry: "box", scale: 0.15, wireframe: false, zone: 3 },
  { position: [0, -15, -11], color: "#22d3ee", geometry: "sphere", scale: 0.1, wireframe: true, zone: 3 },
  // Blog zone
  { position: [-3, -17, -14], color: "#a855f7", geometry: "octahedron", scale: 0.14, wireframe: true, zone: 4 },
  { position: [3, -18, -15], color: "#ec4899", geometry: "torus", scale: 0.1, wireframe: true, zone: 4 },
  // Contact zone
  { position: [-2, -20, -16], color: "#22d3ee", geometry: "dodecahedron", scale: 0.22, wireframe: true, zone: 5 },
  { position: [2, -21, -17], color: "#a855f7", geometry: "icosahedron", scale: 0.18, wireframe: false, zone: 5 },
]

function GeometryByType({ type }: { type: string }) {
  switch (type) {
    case "sphere": return <sphereGeometry args={[1, 16, 16]} />
    case "box": return <boxGeometry args={[1, 1, 1]} />
    case "dodecahedron": return <dodecahedronGeometry args={[1, 0]} />
    case "icosahedron": return <icosahedronGeometry args={[1, 0]} />
    case "octahedron": return <octahedronGeometry args={[1, 0]} />
    case "torus": return <torusGeometry args={[1, 0.4, 16, 32]} />
    case "torusKnot": return <torusKnotGeometry args={[1, 0.3, 64, 8]} />
    case "cone": return <coneGeometry args={[1, 1.5, 8]} />
    case "cylinder": return <cylinderGeometry args={[0.7, 0.7, 1.2, 8]} />
    case "tetrahedron": return <tetrahedronGeometry args={[1, 0]} />
    default: return <sphereGeometry args={[1, 16, 16]} />
  }
}

function FloatingShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const speed = useMemo(() => 0.08 + Math.random() * 0.12, [])
  const rotOffset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime + rotOffset
    meshRef.current.rotation.x = t * speed
    meshRef.current.rotation.y = t * speed * 1.3

    // Subtle mouse-reactive tilt
    meshRef.current.rotation.z += (mouseState.smoothed.x * 0.02 - meshRef.current.rotation.z) * 0.02
  })

  return (
    <Float
      speed={0.5 + Math.random() * 0.5}
      rotationIntensity={0.08}
      floatIntensity={0.25}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={config.position} scale={config.scale}>
        <GeometryByType type={config.geometry} />
        <meshStandardMaterial
          color={config.color}
          roughness={0.35}
          metalness={0.65}
          transparent
          opacity={config.wireframe ? 0.12 : 0.25}
          wireframe={config.wireframe}
        />
      </mesh>
    </Float>
  )
}

export function FloatingShapes() {
  return (
    <group>
      {SHAPE_CONFIGS.map((config, i) => (
        <FloatingShape key={i} config={config} />
      ))}
    </group>
  )
}
