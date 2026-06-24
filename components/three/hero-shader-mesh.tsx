"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { mouseState } from "./mouse-tracker"

// Section color palettes — one per section
const SECTION_PALETTES = [
  { a: new THREE.Color("#a855f7"), b: new THREE.Color("#22d3ee") },  // Hero: violet→cyan
  { a: new THREE.Color("#22d3ee"), b: new THREE.Color("#a855f7") },  // About: cyan→violet
  { a: new THREE.Color("#ec4899"), b: new THREE.Color("#a855f7") },  // Projects: magenta→violet
  { a: new THREE.Color("#a855f7"), b: new THREE.Color("#ec4899") },  // Skills: violet→magenta
  { a: new THREE.Color("#22d3ee"), b: new THREE.Color("#ec4899") },  // Blog: cyan→magenta
  { a: new THREE.Color("#ec4899"), b: new THREE.Color("#22d3ee") },  // Contact: magenta→cyan
]

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uSection;

  // Simplex noise (Ashima)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;

    // Organic breathing displacement
    float noise1 = snoise(pos * 1.5 + uTime * 0.3);
    float noise2 = snoise(pos * 3.0 - uTime * 0.2);
    float displacement = noise1 * 0.35 + noise2 * 0.15;

    // Scroll-driven morph: twist + bulge
    float twist = uScrollProgress * 0.8;
    float angle = pos.y * twist;
    mat2 R = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = R * pos.xz;

    // Bulge based on scroll
    float bulge = 1.0 + uScrollProgress * 0.15 * sin(pos.y * 2.0);
    pos *= bulge;

    // Mouse-reactive deformation
    float mouseInfluence = (uMouse.x * pos.x + uMouse.y * pos.y) * 0.08;
    displacement += mouseInfluence;

    vDisplacement = displacement;
    pos += normal * displacement;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uSection;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPosition);

    // Fresnel
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5);

    // Section-based palette crossfade
    float sectionMix = clamp(uSection / 5.0, 0.0, 1.0);
    vec3 baseColor = mix(uColorA, uColorB, sectionMix);

    // Iridescent shimmer
    float shimmer = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 - uTime * 0.5);
    baseColor += vec3(0.05, 0.02, 0.08) * shimmer;

    // Displacement-based glow
    float glowIntensity = abs(vDisplacement) * 1.5;
    vec3 glowColor = mix(uColorA, uColorB, 0.5) * glowIntensity;

    // Final color
    vec3 color = baseColor * fresnel + glowColor;
    color += baseColor * 0.15; // Ambient

    // Rim light
    float rim = pow(1.0 - max(dot(N, V), 0.0), 4.0);
    color += vec3(0.4, 0.2, 0.6) * rim * 0.4;

    gl_FragColor = vec4(color, 1.0);
  }
`

interface HeroShaderMeshProps {
  activeSection: number
  scrollProgress: number
}

export function HeroShaderMesh({ activeSection, scrollProgress }: HeroShaderMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSection: { value: 0 },
      uColorA: { value: SECTION_PALETTES[0].a },
      uColorB: { value: SECTION_PALETTES[0].b },
    }),
    []
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uScrollProgress.value = scrollProgress
    uniforms.uMouse.value.set(mouseState.smoothed.x, mouseState.smoothed.y)
    uniforms.uSection.value = activeSection

    // Crossfade palette
    const palette = SECTION_PALETTES[activeSection] || SECTION_PALETTES[0]
    uniforms.uColorA.value.lerp(palette.a, 0.05)
    uniforms.uColorB.value.lerp(palette.b, 0.05)

    // Gentle idle rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.8, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}
