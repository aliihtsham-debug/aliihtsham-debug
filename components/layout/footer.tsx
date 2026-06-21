import React from "react"
import Link from "next/link"
import { GitFork, Globe, Bird, Mail, Terminal } from "lucide-react"

const socialLinks = [
  { icon: GitFork, href: "https://github.com/aliihtsham-debug", label: "GitHub" },
  { icon: Globe, href: "https://linkedin.com/in/aliihtsham", label: "LinkedIn" },
  { icon: Bird, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:ali@codebrandstudio.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="relative">
      {/* Neon divider line */}
      <div className="neon-line" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <Terminal className="w-4 h-4 text-neon-violet" />
              <span className="text-sm font-bold text-text-primary">ali</span>
              <span className="text-xs font-mono text-text-muted">.dev</span>
            </Link>
            <p className="text-text-muted text-sm">
              AI Engineer & Founder @ Code Brand Studio
            </p>
            <p className="text-text-muted/50 text-xs mt-1 font-mono">
              Lahore, Pakistan — {new Date().getFullYear()}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-muted hover:text-neon-violet-glow hover:border-neon-violet/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-12 pt-8 border-t border-border-subtle text-center">
          <p className="text-xs text-text-muted/40 font-mono">
            Built with Next.js, TypeScript, Rust, AI Agents & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
