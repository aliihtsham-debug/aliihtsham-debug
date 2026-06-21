"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function DustMotes({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.005
      const positions = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += 0.002
        if (positions[i * 3 + 1] > 12) positions[i * 3 + 1] = -12
      }
      geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color="#a855f7"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function SectionMarkers() {
  const markers = useMemo(() => {
    const yPositions = [-3, -6, -9, -12, -15]
    return yPositions.map((y, i) => ({
      position: new THREE.Vector3(0, y, -2),
      color: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#22d3ee" : "#ec4899",
    }))
  }, [])

  return (
    <group>
      {markers.map((m, i) => (
        <mesh key={i} position={m.position}>
          <ringGeometry args={[3, 3.05, 64]} />
          <meshBasicMaterial color={m.color} transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export function EnvironmentEffects() {
  const { scene } = useThree()

  useMemo(() => {
    scene.fog = new THREE.FogExp2("#050508", 0.025)
  }, [scene])

  return (
    <>
      <DustMotes count={200} />
      <SectionMarkers />
    </>
  )
}
