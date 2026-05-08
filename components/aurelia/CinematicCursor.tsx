"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  opacity: number
}

export function CinematicCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particleIdRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const addParticle = useCallback((x: number, y: number) => {
    const dx = x - lastPositionRef.current.x
    const dy = y - lastPositionRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance > 15) {
      particleIdRef.current += 1
      const newParticle: Particle = {
        id: particleIdRef.current,
        x,
        y,
        opacity: 1,
      }
      
      setParticles(prev => [...prev.slice(-15), newParticle])
      lastPositionRef.current = { x, y }
    }
  }, [])

  useEffect(() => {
    // Only enable on desktop
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      addParticle(e.clientX, e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible, cursorX, cursorY, addParticle])

  // Fade out particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.1 }))
          .filter(p => p.opacity > 0)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Particle Trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-gold"
          initial={{ scale: 1 }}
          animate={{ scale: 0, opacity: particle.opacity }}
          style={{
            left: particle.x - 2,
            top: particle.y - 2,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Outer Ring */}
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? "rgb(212 175 55 / 0.8)" : "rgb(212 175 55 / 0.3)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-10 h-10 rounded-full border-2 border-gold/30"
        />
        
        {/* Inner Dot */}
        <motion.div
          animate={{
            scale: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold"
        />

        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gold blur-xl"
        />
      </motion.div>
    </div>
  )
}
