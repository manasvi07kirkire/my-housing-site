"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "Aurelia Estates didn't just find us a home—they found us a masterpiece. The attention to detail, the discretion, and the understanding of our vision was unparalleled.",
    author: "Victoria Chen",
    title: "Art Collector & Philanthropist",
    location: "Aegean Cliffs Residence",
  },
  {
    id: 2,
    quote: "In my forty years of acquiring properties, I've never experienced service of this caliber. Every touchpoint felt curated specifically for us. This is what true luxury looks like.",
    author: "Jonathan Blackwell",
    title: "Private Equity Chairman",
    location: "Oasis Mirage Estate",
  },
  {
    id: 3,
    quote: "The architects and designers at Aurelia understood that we weren't just building a home—we were creating a sanctuary for our family for generations to come.",
    author: "Sophia & Alexander Reinholt",
    title: "Tech Entrepreneurs",
    location: "Nordic Haven Retreat",
  },
]

export function TestimonialSection() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-gold/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent to-gold/30" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-editorial text-[10px] tracking-[0.4em] text-gold">
            CLIENT STORIES
          </span>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mt-6 text-foreground">
            Voices of Distinction
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-background"
          >
            <Quote className="w-6 h-6 text-gold" />
          </motion.div>

          {/* Testimonial Content */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center px-4 lg:px-16"
              >
                <p className="text-display text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed italic">
                  &quot;{testimonials[current].quote}&quot;
                </p>

                <div className="mt-12 space-y-2">
                  <p className="text-lg text-gold font-medium">
                    {testimonials[current].author}
                  </p>
                  <p className="text-editorial text-[11px] tracking-[0.15em] text-foreground/60">
                    {testimonials[current].title}
                  </p>
                  <p className="text-[11px] tracking-[0.1em] text-muted-foreground mt-4">
                    {testimonials[current].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-14 h-14 rounded-full border border-border/50 hover:border-gold/50 flex items-center justify-center transition-colors group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground/50 group-hover:text-gold transition-colors" />
            </motion.button>

            {/* Indicators */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-300 ${
                    index === current 
                      ? "w-8 h-1 bg-gold" 
                      : "w-2 h-1 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-14 h-14 rounded-full border border-border/50 hover:border-gold/50 flex items-center justify-center transition-colors group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground/50 group-hover:text-gold transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
