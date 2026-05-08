"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef}
      id="philosophy" 
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div 
            style={{ y: imageY }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src="/images/villa-forest.png"
                alt="Architectural Philosophy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -right-8 lg:-right-16 top-1/4 glass p-6 lg:p-8"
            >
              <span className="text-display text-4xl lg:text-5xl text-gold">47</span>
              <p className="text-editorial text-[9px] tracking-[0.2em] text-foreground/60 mt-2">
                EXCLUSIVE<br />RESIDENCES
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -left-4 lg:-left-12 bottom-1/4 glass p-6 lg:p-8"
            >
              <span className="text-display text-4xl lg:text-5xl text-gold">12</span>
              <p className="text-editorial text-[9px] tracking-[0.2em] text-foreground/60 mt-2">
                WORLD-CLASS<br />ARCHITECTS
              </p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            style={{ y: textY, opacity }}
            className="lg:pl-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-editorial text-[10px] tracking-[0.4em] text-gold"
            >
              OUR PHILOSOPHY
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-display text-4xl md:text-5xl lg:text-6xl mt-6 text-foreground"
            >
              Architecture That
              <br />
              <span className="text-muted-foreground">Transcends Time</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 mt-10"
            >
              <p className="text-foreground/70 leading-relaxed text-lg">
                At Aurelia Estates, we believe that extraordinary architecture should not merely 
                shelter life—it should elevate it. Each residence in our collection represents 
                a dialogue between visionary design and timeless elegance.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                Our curated portfolio brings together the world&apos;s most innovative architects 
                with discerning clients who understand that a home is more than an address—
                it&apos;s a legacy. From desert sanctuaries to cliffside retreats, every property 
                tells a story of ambition realized.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 pl-6 border-l-2 border-gold/50"
            >
              <p className="text-display text-xl md:text-2xl text-foreground/80 italic">
                &quot;We don&apos;t build houses. We craft environments where dreams take form.&quot;
              </p>
              <footer className="mt-4">
                <span className="text-editorial text-[10px] tracking-[0.2em] text-gold">
                  — MARCUS AURELIA, FOUNDER
                </span>
              </footer>
            </motion.blockquote>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 mt-16"
            >
              {[
                { value: "∞", label: "Attention to Detail" },
                { value: "24/7", label: "Concierge Service" },
                { value: "100%", label: "Confidentiality" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <span className="text-display text-2xl md:text-3xl text-gold">
                    {item.value}
                  </span>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/50 mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
