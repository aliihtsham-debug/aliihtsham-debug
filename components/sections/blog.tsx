"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card3D } from "@/components/ui/card-3d"
import { blogPosts } from "@/lib/data"

export function Blog() {
  return (
    <section id="blog" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 neon-line-cyan" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-subtle-cyan/20 via-transparent to-transparent pointer-events-none" />

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
            className="text-neon-magenta text-sm font-mono tracking-widest uppercase mb-4 block"
            style={{ transform: "translateZ(-15px)" }}
          >
            // Writing
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            Thoughts on <span className="text-gradient-cyan">building</span> the web
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-magenta to-neon-cyan mx-auto rounded-full shadow-[0_0_15px_rgba(236,72,153,0.4)]" />
        </motion.div>

        {/* Blog posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <Card3D
                glowColor={
                  index % 3 === 0
                    ? "rgba(34,211,238,0.12)"
                    : index % 3 === 1
                      ? "rgba(168,85,247,0.12)"
                      : "rgba(236,72,153,0.12)"
                }
              >
                <article className="group p-6 rounded-2xl border border-border-subtle bg-bg-card hover:border-neon-cyan/30 transition-all duration-500 cursor-pointer hover:shadow-[0_0_35px_rgba(34,211,238,0.08)] h-full flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-5 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-neon-cyan-glow transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-neon-cyan opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/0 to-transparent group-hover:via-neon-cyan/40 transition-all duration-500" />
                </article>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button variant="ghost">
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
