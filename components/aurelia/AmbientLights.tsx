"use client"

import { motion } from "framer-motion"

export function AmbientLights() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary ambient glow - Top Right */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[200px]"
      />

      {/* Secondary ambient glow - Bottom Left */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[180px]"
      />

      {/* Tertiary subtle glow - Center */}
      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gold/5 blur-[250px]"
      />

      {/* Warm accent - Top Left */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/3 blur-[150px]"
      />
    </div>
  )
}
