"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ChevronDown, Play } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.2])
  const videoOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0])
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.4, 0.8])
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -100])
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Sticky Video Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover"
            poster="/images/villa-desert.png"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          
          {/* Fallback Image */}
          {!isVideoLoaded && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/villa-desert.png')" }}
            />
          )}
        </motion.div>

        {/* Cinematic Overlay */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"
        />

        {/* Warm Ambient Light */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-editorial text-[10px] sm:text-xs tracking-[0.4em] text-gold mb-6"
          >
            EXTRAORDINARY ARCHITECTURAL RESIDENCES
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground max-w-5xl leading-[0.9] text-balance"
          >
            Where Vision
            <br />
            <span className="text-gold">Becomes Legacy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed font-light"
          >
            Discover a curated collection of the world&apos;s most exceptional 
            architectural masterpieces, designed for those who demand the extraordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-12"
          >
            <a href="#estates" className="btn-luxury">
              Explore Collection
            </a>
            <button className="group flex items-center gap-3 text-foreground/70 hover:text-gold transition-colors">
              <span className="w-12 h-12 rounded-full border border-foreground/30 group-hover:border-gold flex items-center justify-center transition-all group-hover:scale-110">
                <Play className="w-4 h-4 ml-0.5" />
              </span>
              <span className="text-editorial text-[11px] tracking-[0.15em]">Watch Film</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: textOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-editorial text-[9px] tracking-[0.3em] text-foreground/50">
            SCROLL TO DISCOVER
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-gold/70" />
          </motion.div>
        </motion.div>

        {/* Side Decorations */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <span className="text-[9px] tracking-[0.2em] text-foreground/40 rotate-[-90deg] whitespace-nowrap">
            EST. 2024
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <span className="text-[9px] tracking-[0.2em] text-foreground/40 rotate-90 whitespace-nowrap">
            AURELIA
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
