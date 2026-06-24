"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { MouseTracker } from "./mouse-tracker"
import { ScrollCamera } from "./scroll-camera"
import { EnhancedParticles } from "./enhanced-particles"
import { FloatingShapes } from "./floating-shapes"
import { LightingRig } from "./lighting-rig"
import { EnvironmentEffects } from "./environment-effects"
import { AuroraBackground } from "./aurora-background"
import { HeroShaderMesh } from "./hero-shader-mesh"
import { SectionDepthRings } from "./section-depth-rings"
import { PostProcessing } from "./post-processing"
import { useScrollProgress } from "@/hooks/useScrollProgress"

function SceneContent({ activeSection, scrollProgress }: {
  activeSection: number
  scrollProgress: number
}) {
  return (
    <>
      <MouseTracker />
      <ScrollCamera />
      <LightingRig activeSection={activeSection} />
      <EnvironmentEffects />
      <AuroraBackground />
      <HeroShaderMesh activeSection={activeSection} scrollProgress={scrollProgress} />
      <SectionDepthRings activeSection={activeSection} />
      <EnhancedParticles count={700} activeSection={activeSection} />
      <FloatingShapes activeSection={activeSection} />
      <PostProcessing />
    </>
  )
}

export function Scene3D() {
  const { progress, activeSection } = useScrollProgress()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent activeSection={activeSection} scrollProgress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
