"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { MouseTracker } from "./mouse-tracker"
import { ScrollCamera } from "./scroll-camera"
import { EnhancedParticles } from "./enhanced-particles"
import { FloatingShapes } from "./floating-shapes"
import { LightingRig } from "./lighting-rig"
import { EnvironmentEffects } from "./environment-effects"

function SceneContent() {
  return (
    <>
      <MouseTracker />
      <ScrollCamera />
      <LightingRig />
      <EnvironmentEffects />
      <EnhancedParticles count={1000} />
      <FloatingShapes />
    </>
  )
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
