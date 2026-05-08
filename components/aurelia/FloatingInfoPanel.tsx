"use client"

import { ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FloatingInfoPanelProps {
  children: ReactNode
  title?: string
  subtitle?: string
  position?: "left" | "right" | "center"
  delay?: number
}

export function FloatingInfoPanel({
  children,
  title,
  subtitle,
  position = "left",
  delay = 0,
}: FloatingInfoPanelProps) {
  const [isHovered, setIsHovered] = useState(false)

  const positionClasses = {
    left: "items-start",
    right: "items-end",
    center: "items-center",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col ${positionClasses[position]}`}
    >
      <motion.div
        className="relative group"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glass Panel */}
        <div className="relative overflow-hidden rounded-lg">
          {/* Background Blur */}
          <div className="absolute inset-0 bg-card/60 backdrop-blur-xl" />

          {/* Border Gradient */}
          <div className="absolute inset-0 rounded-lg border border-border/30" />
          <motion.div
            className="absolute inset-0 rounded-lg border border-gold/20"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Inner Glow */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"
              />
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="relative p-6">
            {(title || subtitle) && (
              <div className="mb-4">
                {subtitle && (
                  <span className="text-editorial text-[9px] tracking-[0.3em] text-gold">
                    {subtitle}
                  </span>
                )}
                {title && (
                  <h4 className="text-display text-lg text-foreground mt-1">
                    {title}
                  </h4>
                )}
              </div>
            )}
            {children}
          </div>

          {/* Reflection Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        {/* Ambient Shadow */}
        <div className="absolute -inset-4 bg-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </motion.div>
    </motion.div>
  )
}

// Specification Item for property details
export function SpecificationItem({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gold/70">{icon}</span>}
        <span className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
          {label}
        </span>
      </div>
      <span className="text-sm text-foreground font-medium">{value}</span>
    </div>
  )
}

// Measurement Line for blueprint-style annotations
export function MeasurementLine({
  value,
  orientation = "horizontal",
}: {
  value: string
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        orientation === "vertical" ? "flex-col" : ""
      }`}
    >
      <div
        className={`bg-gold/50 ${
          orientation === "vertical" ? "w-px h-12" : "h-px w-12"
        }`}
      />
      <span className="text-[9px] tracking-[0.1em] text-gold/70 font-mono">
        {value}
      </span>
      <div
        className={`bg-gold/50 ${
          orientation === "vertical" ? "w-px h-12" : "h-px w-12"
        }`}
      />
    </div>
  )
}
