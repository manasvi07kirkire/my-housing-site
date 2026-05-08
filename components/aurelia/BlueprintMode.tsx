"use client"

import { useState, createContext, useContext, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BlueprintContextType {
  isBlueprint: boolean
  toggleBlueprint: () => void
}

const BlueprintContext = createContext<BlueprintContextType>({
  isBlueprint: false,
  toggleBlueprint: () => {},
})

export function useBlueprintMode() {
  return useContext(BlueprintContext)
}

export function BlueprintProvider({ children }: { children: ReactNode }) {
  const [isBlueprint, setIsBlueprint] = useState(false)

  const toggleBlueprint = () => setIsBlueprint(!isBlueprint)

  return (
    <BlueprintContext.Provider value={{ isBlueprint, toggleBlueprint }}>
      {/* Blueprint Overlay */}
      <AnimatePresence>
        {isBlueprint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 pointer-events-none z-[100]"
          >
            {/* Blueprint Grid */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(100, 149, 237, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(100, 149, 237, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            
            {/* Blueprint Color Wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-cyan-900/20" />
            
            {/* Scan Line */}
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                boxShadow: "0 0 20px 5px rgba(34, 211, 238, 0.3)",
              }}
            />

            {/* Corner Technical Markers */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/50" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500/50" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50" />

            {/* Technical Data Display */}
            <div className="absolute top-8 left-28 text-cyan-400/70 text-[10px] font-mono tracking-wider">
              <div>ARCHITECTURAL BLUEPRINT MODE</div>
              <div className="mt-1 text-cyan-400/50">AURELIA ESTATES // REV 2.4</div>
            </div>

            <div className="absolute bottom-8 right-28 text-cyan-400/70 text-[10px] font-mono tracking-wider text-right">
              <div>SCALE: 1:100</div>
              <div className="mt-1 text-cyan-400/50">STRUCTURAL ANALYSIS ACTIVE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </BlueprintContext.Provider>
  )
}

export function BlueprintToggle() {
  const { isBlueprint, toggleBlueprint } = useBlueprintMode()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={toggleBlueprint}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-500 ${
        isBlueprint
          ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
          : "bg-secondary/30 border-border/30 text-foreground/70 hover:border-gold/30 hover:text-foreground"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <svg
        className={`w-4 h-4 transition-colors duration-300 ${
          isBlueprint ? "text-cyan-400" : "text-current"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>

      <span className="text-[10px] tracking-[0.15em] uppercase font-medium">
        {isBlueprint ? "View Mode" : "Blueprint"}
      </span>

      {/* Glow Effect */}
      <AnimatePresence>
        {(isBlueprint || isHovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-full ${
              isBlueprint ? "bg-cyan-400/10" : "bg-gold/5"
            } blur-xl -z-10`}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
