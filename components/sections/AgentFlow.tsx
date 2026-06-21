"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface Agent {
  id: string
  label: string
  sublabel: string
  x: number
  y: number
  color: string
  glowColor: string
}

interface Packet {
  id: number
  from: string
  to: string
  progress: number
  speed: number
  color: string
}

const AGENTS: Agent[] = [
  { id: "user", label: "User Prompt", sublabel: "Input", x: 80, y: 120, color: "#a855f7", glowColor: "rgba(168,85,247,0.4)" },
  { id: "router", label: "Router", sublabel: "Orchestrator", x: 240, y: 60, color: "#22d3ee", glowColor: "rgba(34,211,238,0.4)" },
  { id: "coder", label: "Coder", sublabel: "Engineer", x: 400, y: 120, color: "#ec4899", glowColor: "rgba(236,72,153,0.4)" },
  { id: "qa", label: "QA Agent", sublabel: "Validator", x: 400, y: 200, color: "#a855f7", glowColor: "rgba(168,85,247,0.4)" },
  { id: "output", label: "Output", sublabel: "Ship", x: 240, y: 260, color: "#22d3ee", glowColor: "rgba(34,211,238,0.4)" },
]

const CONNECTIONS: [string, string][] = [
  ["user", "router"],
  ["router", "coder"],
  ["router", "qa"],
  ["coder", "output"],
  ["qa", "output"],
]

function getAgent(id: string): Agent {
  return AGENTS.find((a) => a.id === id)!
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getConnectionPath(from: Agent, to: Agent): string {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cx1 = from.x + dx * 0.4
  const cy1 = from.y
  const cx2 = to.x - dx * 0.4
  const cy2 = to.y
  return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`
}

function getPointOnPath(from: Agent, to: Agent, t: number): { x: number; y: number } {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cx1 = from.x + dx * 0.4
  const cy1 = from.y
  const cx2 = to.x - dx * 0.4
  const cy2 = to.y
  // Cubic bezier
  const mt = 1 - t
  const x = mt * mt * mt * from.x + 3 * mt * mt * t * cx1 + 3 * mt * t * t * cx2 + t * t * t * to.x
  const y = mt * mt * mt * from.y + 3 * mt * mt * t * cy1 + 3 * mt * t * t * cy2 + t * t * t * to.y
  return { x, y }
}

export function AgentFlow() {
  const [packets, setPackets] = useState<Packet[]>([])
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const packetIdRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)

  const spawnPacket = useCallback(() => {
    const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)]
    const colors = ["#a855f7", "#22d3ee", "#ec4899"]
    packetIdRef.current++
    return {
      id: packetIdRef.current,
      from: conn[0],
      to: conn[1],
      progress: 0,
      speed: 0.004 + Math.random() * 0.004,
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  }, [])

  useEffect(() => {
    let lastSpawn = 0
    const animate = (time: number) => {
      if (isHovered) {
        animFrameRef.current = requestAnimationFrame(animate)
        return
      }

      setPackets((prev) => {
        let next = prev
          .map((p) => ({ ...p, progress: p.progress + p.speed }))
          .filter((p) => p.progress <= 1)

        if (time - lastSpawn > 800 + Math.random() * 600) {
          next = [...next, spawnPacket()]
          lastSpawn = time
        }

        return next
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isHovered, spawnPacket])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16 mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-neon-violet animate-pulse" />
        <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
          Multi-Agent Pipeline — Live Visualization
        </span>
      </div>

      <div className="relative rounded-2xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-20" />

        <svg viewBox="0 0 520 340" className="w-full h-auto relative z-10" style={{ minHeight: 280 }}>
          <defs>
            {AGENTS.map((agent) => (
              <filter key={`glow-${agent.id}`} id={`glow-${agent.id}`}>
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor={agent.color} floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            <filter id="packet-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {CONNECTIONS.map(([fromId, toId], i) => {
            const from = getAgent(fromId)
            const to = getAgent(toId)
            return (
              <g key={i}>
                {/* Glow line */}
                <path
                  d={getConnectionPath(from, to)}
                  fill="none"
                  stroke={from.color}
                  strokeWidth="2"
                  opacity="0.15"
                  strokeLinecap="round"
                />
                {/* Core line */}
                <path
                  d={getConnectionPath(from, to)}
                  fill="none"
                  stroke={from.color}
                  strokeWidth="1"
                  opacity="0.4"
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                  className="animate-dash"
                />
              </g>
            )
          })}

          {/* Data packets */}
          {packets.map((packet) => {
            const from = getAgent(packet.from)
            const to = getAgent(packet.to)
            const pos = getPointOnPath(from, to, packet.progress)
            return (
              <g key={packet.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="5"
                  fill={packet.color}
                  filter="url(#packet-glow)"
                  opacity={0.9}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="2.5"
                  fill="#ffffff"
                  opacity={0.8}
                />
              </g>
            )
          })}

          {/* Agent nodes */}
          {AGENTS.map((agent) => {
            const isActive = activeNode === agent.id
            return (
              <g
                key={agent.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(agent.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Outer glow ring */}
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r={isActive ? 32 : 28}
                  fill="none"
                  stroke={agent.color}
                  strokeWidth="1"
                  opacity={isActive ? 0.5 : 0.2}
                  style={{ transition: "all 0.3s ease" }}
                />
                {/* Inner circle */}
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r={isActive ? 24 : 22}
                  fill={`${agent.color}15`}
                  stroke={agent.color}
                  strokeWidth="1.5"
                  opacity={isActive ? 1 : 0.7}
                  filter={isActive ? `url(#glow-${agent.id})` : undefined}
                  style={{ transition: "all 0.3s ease" }}
                />
                {/* Pulse ring */}
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r="22"
                  fill="none"
                  stroke={agent.color}
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    from="22"
                    to="35"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Label */}
                <text
                  x={agent.x}
                  y={agent.y - 2}
                  textAnchor="middle"
                  fill="#f0f0f5"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="var(--font-geist-mono), monospace"
                  opacity={isActive ? 1 : 0.8}
                >
                  {agent.label}
                </text>
                <text
                  x={agent.x}
                  y={agent.y + 10}
                  textAnchor="middle"
                  fill={agent.color}
                  fontSize="8"
                  fontFamily="var(--font-geist-mono), monospace"
                  opacity={isActive ? 1 : 0.5}
                >
                  {agent.sublabel}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Hover hint */}
        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-text-muted/40">
          {isHovered ? "Paused — hover off to resume" : "Hover to pause"}
        </div>
      </div>
    </motion.div>
  )
}
