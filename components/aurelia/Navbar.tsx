"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"
import { BlueprintToggle, useBlueprintMode } from "./BlueprintMode"

const navLinks = [
  { label: "Estates", href: "#estates" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isBlueprint } = useBlueprintMode()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50" 
            : "bg-transparent"
        } ${isBlueprint ? "border-cyan-500/20" : ""}`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/images/logo.png"
                  alt="Aurelia Estates"
                  fill
                  className={`object-contain opacity-90 group-hover:opacity-100 transition-opacity ${
                    isBlueprint ? "brightness-150 hue-rotate-180" : ""
                  }`}
                />
              </div>
              <div className="hidden sm:block">
                <span className={`text-editorial text-xs tracking-[0.3em] ${
                  isBlueprint ? "text-cyan-400" : "text-foreground/90"
                }`}>
                  AURELIA
                </span>
                <span className={`block text-[10px] tracking-[0.25em] mt-0.5 ${
                  isBlueprint ? "text-cyan-400/60" : "text-muted-foreground"
                }`}>
                  ESTATES
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className={`text-editorial text-[11px] tracking-[0.2em] transition-colors duration-300 relative group ${
                    isBlueprint 
                      ? "text-cyan-400/70 hover:text-cyan-300" 
                      : "text-foreground/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isBlueprint ? "bg-cyan-400" : "bg-gold"
                  }`} />
                </motion.a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Blueprint Toggle - Desktop */}
              <div className="hidden lg:block">
                <BlueprintToggle />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`hidden md:block text-[10px] py-3 px-6 transition-all duration-300 ${
                  isBlueprint
                    ? "border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                    : "btn-luxury"
                }`}
              >
                Private Viewing
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isBlueprint ? "text-cyan-400" : "text-foreground"}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isBlueprint ? "text-cyan-400" : "text-foreground"}`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute right-0 top-0 bottom-0 w-full max-w-sm border-l p-8 pt-28 ${
                isBlueprint 
                  ? "bg-slate-900/95 border-cyan-500/30" 
                  : "bg-card border-border/50"
              }`}
            >
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-display text-3xl transition-colors ${
                      isBlueprint 
                        ? "text-cyan-400/80 hover:text-cyan-300" 
                        : "text-foreground/80 hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                {/* Mobile Blueprint Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <BlueprintToggle />
                </motion.div>
                
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-center mt-4 py-4 ${
                    isBlueprint
                      ? "border border-cyan-500/50 text-cyan-400"
                      : "btn-luxury"
                  }`}
                >
                  Private Viewing
                </motion.a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
