"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const SECTION_COLORS = [
  "#a855f7", // Hero — violet
  "#22d3ee", // About — cyan
  "#ec4899", // Projects — magenta
  "#a855f7", // Skills — violet
  "#22d3ee", // Blog — cyan
  "#ec4899", // Contact — magenta
]

const RING_Y_POSITIONS = [0, -3, -6, -9, -12, -15]

interface SectionDepthRingsProps {
  activeSection: number
}

function DepthRing({ y, color, index, activeSection }: {
  y: number
  color: string
  index: number
  activeSection: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (!meshRef.current) return

    // Distance from camera to ring
    const dist = Math.sqrt(
      Math.pow(camera.position.x, 2) +
      Math.pow(camera.position.y - y, 2) +
      Math.pow(camera.position.z - (-2), 2)
    )

    // Closer = brighter
    const proximity = THREE.MathUtils.clamp(1 - (dist - 4) / 15, 0.1, 1)

    // Active section pulse
    const isActive = index === activeSection
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = isActive ? 0.4 * proximity : 0.1 * proximity

    // Gentle rotation
    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(index * 0.5) * 0.1
    meshRef.current.rotation.z += 0.003 * (index % 2 === 0 ? 1 : -1)
  })

  return (
    <mesh ref={meshRef} position={[0, y, -2]}>
      <torusGeometry args={[2.5, 0.015, 8, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function SectionDepthRings({ activeSection }: SectionDepthRingsProps) {
  return (
    <group>
      {RING_Y_POSITIONS.map((y, i) => (
        <DepthRing
          key={i}
          y={y}
          color={SECTION_COLORS[i]}
          index={i}
          activeSection={activeSection}
        />
      ))}
    </group>
  )
}
