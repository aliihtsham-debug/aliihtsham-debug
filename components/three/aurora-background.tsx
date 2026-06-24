"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { mouseState } from "./mouse-tracker"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  #define NUM_OCTAVES 4

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
      u.y
    );
    return res * res;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.4;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.4;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= 1.5;

    // Mouse influence
    vec2 mouseOffset = (uMouse - 0.5) * 0.3;
    p += mouseOffset;

    float t = uTime * 0.08;

    // Aurora layers
    float n1 = fbm(vec2(p.x * 1.5 + t, p.y * 0.8 + t * 0.5));
    float n2 = fbm(vec2(p.x * 2.0 - t * 0.7, p.y * 1.2 - t * 0.3));
    float n3 = fbm(vec2(p.x * 1.0 + t * 0.3, p.y * 2.0 + t * 0.6));

    // Vertical curtain effect
    float curtain1 = smoothstep(0.0, 0.6, n1) * smoothstep(1.0, 0.4, abs(p.y - 0.2));
    float curtain2 = smoothstep(0.1, 0.7, n2) * smoothstep(0.9, 0.3, abs(p.y + 0.1));
    float curtain3 = smoothstep(0.2, 0.8, n3) * smoothstep(0.8, 0.2, abs(p.y + 0.4));

    // Colors
    vec3 violet = vec3(0.659, 0.333, 0.969);  // #a855f7
    vec3 cyan = vec3(0.133, 0.827, 0.933);     // #22d3ee
    vec3 magenta = vec3(0.925, 0.282, 0.6);   // #ec4899

    vec3 color = vec3(0.0);
    color += violet * curtain1 * 0.15;
    color += cyan * curtain2 * 0.12;
    color += magenta * curtain3 * 0.08;

    // Subtle base glow
    float baseGlow = fbm(vec2(p.x * 0.5, p.y * 0.3 + t * 0.2)) * 0.04;
    color += vec3(0.2, 0.1, 0.3) * baseGlow;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 1.2;
    color *= max(vig, 0.0);

    gl_FragColor = vec4(color, 1.0);
  }
`

export function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uMouse.value.set(
      mouseState.smoothed.x * 0.5 + 0.5,
      -mouseState.smoothed.y * 0.5 + 0.5
    )
  })

  return (
    <mesh ref={meshRef} renderOrder={-1}>
      <planeGeometry args={[4, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
