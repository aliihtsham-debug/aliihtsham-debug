"use client"

import React from "react"
import { motion } from "framer-motion"
import { ExternalLink, GitFork, ArrowUpRight, Layers, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card3D } from "@/components/ui/card-3d"
import { AgentFlow } from "./AgentFlow"
import { GitBranchLines } from "./GitBranchLines"
import { projects } from "@/lib/data"

export function Projects() {
  const displayProjects = projects

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 neon-line-cyan" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-subtle-violet/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header with 3D depth */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="text-neon-violet text-sm font-mono tracking-widest uppercase mb-4 block"
            style={{ transform: "translateZ(-15px)" }}
          >
            // Open Source
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            Code that <span className="text-gradient-violet">ships</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-violet to-neon-cyan mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
        </motion.div>

        {/* Multi-Agent Flow Visualization */}
        <AgentFlow />

        {/* Projects grid with git branch lines */}
        <div className="relative">
          <GitBranchLines />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              data-project-card
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card3D
                className="h-full"
                glowColor={
                  index % 3 === 0
                    ? "rgba(168,85,247,0.15)"
                    : index % 3 === 1
                      ? "rgba(34,211,238,0.15)"
                      : "rgba(236,72,153,0.15)"
                }
              >
                <article className="group relative h-full rounded-2xl border border-border-subtle bg-bg-card overflow-hidden transition-all duration-500 hover:border-neon-violet/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]">
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-neon-violet/10 via-transparent to-neon-cyan/10" />

                  {/* Project image area */}
                  <div className="aspect-[16/10] bg-bg-tertiary relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-12 h-12 text-text-muted/30 group-hover:text-neon-violet/40 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-violet/0 to-transparent group-hover:via-neon-violet/60 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-neon-violet-glow transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          {project.language && (
                            <span className="text-xs font-mono text-text-muted">{project.language}</span>
                          )}
                          {project.stars !== undefined && (
                            <span className="flex items-center gap-1 text-xs font-mono text-text-muted">
                              <Star className="w-3 h-3" />
                              {project.stars}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-neon-cyan transition-colors"
                            aria-label="GitHub"
                          >
                            <GitFork className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-neon-violet-glow transition-colors"
                            aria-label="Live site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant={index % 2 === 0 ? "default" : "cyan"}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </Card3D>
            </motion.div>
          ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg">
            View All Projects
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
