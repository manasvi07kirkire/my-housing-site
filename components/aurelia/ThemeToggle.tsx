"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-20 h-10 rounded-full bg-gradient-to-r from-secondary/50 to-secondary/30 border border-border/30 backdrop-blur-sm overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Toggle theme"
    >
      {/* Ambient Glow Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute inset-0 rounded-full ${
              isDark ? "bg-gold/20" : "bg-amber-300/30"
            } blur-xl`}
          />
        )}
      </AnimatePresence>

      {/* Track */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-r from-muted/50 to-muted/30" />

      {/* Sliding Orb */}
      <motion.div
        layout
        className="absolute top-1 w-8 h-8 rounded-full overflow-hidden"
        animate={{
          left: isDark ? "calc(100% - 36px)" : "4px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Orb Inner Gradient */}
        <div
          className={`w-full h-full rounded-full ${
            isDark
              ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-600/50"
              : "bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 border border-amber-200"
          } flex items-center justify-center`}
        >
          {/* Icon */}
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.svg
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-amber-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Liquid Motion Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isDark ? "bg-gold/30" : "bg-amber-200/50"
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          key={isDark ? "dark-pulse" : "light-pulse"}
        />
      </motion.div>

      {/* Stars (night mode) */}
      <AnimatePresence>
        {isDark && (
          <>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute left-2 top-2 w-1 h-1 bg-gold/60 rounded-full"
            />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute left-4 bottom-2.5 w-0.5 h-0.5 bg-gold/40 rounded-full"
            />
          </>
        )}
      </AnimatePresence>

      {/* Sun Rays (day mode) */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {[0, 45, 90, 135].map((rotation) => (
              <motion.span
                key={rotation}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: rotation * 0.001 }}
                className="absolute w-0.5 h-1.5 bg-amber-400/40 rounded-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "50% 8px",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
