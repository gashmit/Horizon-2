"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}

export function WobbleCard({ children, containerClassName, className }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
          : "translate3d(0px, 0px, 0)",
        transition: "transform 0.12s ease-out",
      }}
      className={cn(
        // neon-friendly glass surface with tokenized colors
        "relative mx-auto w-full overflow-hidden rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur",
        containerClassName,
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.02, 1.02, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.12s ease-out",
          }}
          className={cn("h-full px-4 py-12 sm:px-10", className)}
        >
          <div
            className="pointer-events-none absolute inset-0 h-full w-full opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
            style={{
              backgroundImage: "url(/noise.webp)",
              backgroundSize: "30%",
            }}
          />
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}
