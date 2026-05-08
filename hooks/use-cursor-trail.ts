"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface CursorPosition {
  x: number
  y: number
}

interface TrailPoint extends CursorPosition {
  id: number
  timestamp: number
}

interface UseCursorTrailOptions {
  trailLength?: number
  minDistance?: number
  fadeTime?: number
}

export function useCursorTrail(options: UseCursorTrailOptions = {}) {
  const { trailLength = 20, minDistance = 10, fadeTime = 500 } = options
  
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isMoving, setIsMoving] = useState(false)
  
  const idRef = useRef(0)
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout>()

  const addTrailPoint = useCallback((x: number, y: number) => {
    const dx = x - lastPositionRef.current.x
    const dy = y - lastPositionRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance >= minDistance) {
      idRef.current += 1
      const newPoint: TrailPoint = {
        id: idRef.current,
        x,
        y,
        timestamp: Date.now(),
      }
      
      setTrail(prev => [...prev.slice(-trailLength), newPoint])
      lastPositionRef.current = { x, y }
    }
  }, [minDistance, trailLength])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setPosition(newPosition)
      addTrailPoint(e.clientX, e.clientY)
      setIsMoving(true)
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [addTrailPoint])

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setTrail(prev => prev.filter(point => now - point.timestamp < fadeTime))
    }, 50)
    
    return () => clearInterval(interval)
  }, [fadeTime])

  return {
    position,
    trail,
    isMoving,
  }
}
