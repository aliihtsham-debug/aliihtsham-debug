"use client"

import { useIsMobile } from "@/hooks/useIsMobile"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Vector2 } from "three"

export function PostProcessing() {
  const isMobile = useIsMobile()
  const shouldReduceMotion = useReducedMotion()

  if (isMobile || shouldReduceMotion) return null

  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
