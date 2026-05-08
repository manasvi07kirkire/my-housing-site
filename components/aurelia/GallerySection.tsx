"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  { src: "/images/villa-desert.png", alt: "Desert Villa Exterior", span: "col-span-2 row-span-2" },
  { src: "/images/villa-cliffside.png", alt: "Cliffside Terrace", span: "col-span-1 row-span-1" },
  { src: "/images/villa-forest.png", alt: "Forest Retreat", span: "col-span-1 row-span-2" },
  { src: "/images/villa-desert.png", alt: "Pool at Sunset", span: "col-span-1 row-span-1" },
  { src: "/images/villa-cliffside.png", alt: "Ocean View", span: "col-span-2 row-span-1" },
]

export function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-editorial text-[10px] tracking-[0.4em] text-gold">
            VISUAL JOURNEY
          </span>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mt-6 text-foreground">
            A Glimpse Into
            <br />
            <span className="text-muted-foreground">Extraordinary Living</span>
          </h2>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${image.span}`}
            >
              <div className="relative w-full h-full min-h-[200px] lg:min-h-[300px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-editorial text-[10px] tracking-[0.2em] text-gold">
                    {image.alt}
                  </span>
                </div>

                {/* Gold Border Effect */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-3 text-editorial text-[11px] tracking-[0.2em] text-foreground/60 hover:text-gold transition-colors group"
          >
            <span className="w-12 h-px bg-foreground/20 group-hover:bg-gold/50 group-hover:w-20 transition-all duration-300" />
            VIEW COMPLETE GALLERY
            <span className="w-12 h-px bg-foreground/20 group-hover:bg-gold/50 group-hover:w-20 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
