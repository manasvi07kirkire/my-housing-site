"use client"

import { useState, useEffect, RefObject } from "react"

interface ScrollProgressOptions {
  target?: RefObject<HTMLElement>
  offset?: number
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const [progress, setProgress] = useState(0)
  const { target, offset = 0 } = options

  useEffect(() => {
    const handleScroll = () => {
      if (target?.current) {
        const element = target.current
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY - offset
        const elementHeight = element.offsetHeight
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY
        
        const start = elementTop - windowHeight
        const end = elementTop + elementHeight
        const current = scrollY - start
        const total = end - start
        
        const newProgress = Math.min(Math.max(current / total, 0), 1)
        setProgress(newProgress)
      } else {
        const scrollY = window.scrollY
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        const newProgress = Math.min(Math.max(scrollY / documentHeight, 0), 1)
        setProgress(newProgress)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [target, offset])

  return progress
}
