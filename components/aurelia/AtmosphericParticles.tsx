"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  drift: number
}

export function AtmosphericParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 50,
    }))
    
    setParticles(newParticles)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDark ? "bg-gold/20" : "bg-gold/10"
          }`}
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            y: "100vh",
            x: 0,
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            x: [0, particle.drift, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: particle.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {/* Fog Layers */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-96 ${
          isDark
            ? "bg-gradient-to-t from-background/80 via-background/20 to-transparent"
            : "bg-gradient-to-t from-background/60 via-background/10 to-transparent"
        }`}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Drifting Fog */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 30% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 30% 80%, rgba(212, 175, 55, 0.02) 0%, transparent 50%)",
        }}
        animate={{
          x: ["-10%", "10%"],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
