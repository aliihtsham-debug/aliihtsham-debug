"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { mouseState } from "./mouse-tracker"

const CAMERA_KEYFRAMES = [
  { pos: new THREE.Vector3(0, 0, 8), target: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(2, -1, 6), target: new THREE.Vector3(0, -3, 0) },
  { pos: new THREE.Vector3(-2, -2, 5), target: new THREE.Vector3(0, -6, -2) },
  { pos: new THREE.Vector3(1, -3, 6), target: new THREE.Vector3(0, -9, 0) },
  { pos: new THREE.Vector3(-1, -4, 5), target: new THREE.Vector3(0, -12, -1) },
  { pos: new THREE.Vector3(0, -5, 7), target: new THREE.Vector3(0, -15, 0) },
]

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export function ScrollCamera() {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0, 8))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    const scrollY = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0

    const keyframeCount = CAMERA_KEYFRAMES.length - 1
    const scaledProgress = progress * keyframeCount
    const index = Math.min(Math.floor(scaledProgress), keyframeCount - 1)
    const localT = smoothstep(scaledProgress - index)

    const a = CAMERA_KEYFRAMES[index]
    const b = CAMERA_KEYFRAMES[index + 1]

    targetPos.current.lerpVectors(a.pos, b.pos, localT)
    targetLookAt.current.lerpVectors(a.target, b.target, localT)

    // Mouse parallax offset
    const mouseOffsetX = mouseState.smoothed.x * 0.4
    const mouseOffsetY = mouseState.smoothed.y * 0.25

    const finalPos = new THREE.Vector3(
      targetPos.current.x + mouseOffsetX,
      targetPos.current.y + mouseOffsetY,
      targetPos.current.z
    )

    camera.position.lerp(finalPos, 0.04)
    currentLookAt.current.lerp(targetLookAt.current, 0.04)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
