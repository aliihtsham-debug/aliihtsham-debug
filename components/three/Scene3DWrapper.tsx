"use client"

import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/three/Scene3D").then((m) => m.Scene3D), {
  ssr: false,
  loading: () => null,
})

export function Scene3DWrapper() {
  return <Scene3D />
}
