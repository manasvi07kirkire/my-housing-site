"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const scrollTexts = [
  {
    range: [0, 0.2],
    title: "Redefining Luxury",
    subtitle: "Where architecture meets artistry",
  },
  {
    range: [0.25, 0.45],
    title: "Visionary Design",
    subtitle: "Crafted by world-renowned architects",
  },
  {
    range: [0.5, 0.7],
    title: "Timeless Elegance",
    subtitle: "Residences that transcend generations",
  },
  {
    range: [0.75, 0.95],
    title: "Your Legacy Awaits",
    subtitle: "Begin your journey today",
  },
]

export function ScrollTextOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
    >
      {scrollTexts.map((text, index) => {
        const start = text.range[0]
        const end = text.range[1]
        const midpoint = (start + end) / 2
        
        return (
          <ScrollText 
            key={index}
            title={text.title}
            subtitle={text.subtitle}
            scrollYProgress={scrollYProgress}
            start={start}
            midpoint={midpoint}
            end={end}
          />
        )
      })}
    </div>
  )
}

function ScrollText({
  title,
  subtitle,
  scrollYProgress,
  start,
  midpoint,
  end,
}: {
  title: string
  subtitle: string
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  start: number
  midpoint: number
  end: number
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, midpoint, end - 0.05, end],
    [0, 1, 1, 1, 0]
  )
  
  const y = useTransform(
    scrollYProgress,
    [start, midpoint, end],
    [50, 0, -50]
  )

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.05, midpoint, end - 0.05, end],
    [0.9, 1, 1, 1, 0.9]
  )

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute text-center px-6"
    >
      <motion.h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4">
        {title}
      </motion.h2>
      <motion.p className="text-editorial text-[11px] tracking-[0.3em] text-gold">
        {subtitle.toUpperCase()}
      </motion.p>
    </motion.div>
  )
}
