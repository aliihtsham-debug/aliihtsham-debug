import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-neon-violet/30 bg-neon-subtle-violet text-neon-violet-glow shadow-[0_0_10px_rgba(168,85,247,0.1)]",
        secondary:
          "border-border-subtle bg-bg-tertiary text-text-secondary",
        outline:
          "border-border text-text-secondary hover:border-neon-violet/40 hover:text-neon-violet-glow",
        cyan:
          "border-neon-cyan/30 bg-neon-subtle-cyan text-neon-cyan-glow shadow-[0_0_10px_rgba(34,211,238,0.1)]",
        magenta:
          "border-neon-magenta/30 bg-neon-subtle-magenta text-neon-magenta-glow shadow-[0_0_10px_rgba(236,72,153,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
