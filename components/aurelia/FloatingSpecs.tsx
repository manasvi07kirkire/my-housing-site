"use client"

import { motion, useScroll, useTransform } from "framer-motion"

const specs = [
  { label: "Sq Ft", value: "45,000+", position: "top-1/4 left-8" },
  { label: "Bedrooms", value: "8-12", position: "top-1/3 right-12" },
  { label: "Price Range", value: "$15M - $95M", position: "bottom-1/3 left-16" },
  { label: "Locations", value: "Global", position: "bottom-1/4 right-8" },
]

export function FloatingSpecs() {
  const { scrollYProgress } = useScroll()
  
  const opacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.95],
    [0, 1, 1, 0]
  )

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-20 hidden lg:block"
    >
      {specs.map((spec, index) => (
        <motion.div
          key={spec.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className={`absolute ${spec.position}`}
        >
          <div className="glass p-4 lg:p-6">
            <p className="text-display text-2xl lg:text-3xl text-gold">
              {spec.value}
            </p>
            <p className="text-editorial text-[9px] tracking-[0.2em] text-foreground/50 mt-1">
              {spec.label.toUpperCase()}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
