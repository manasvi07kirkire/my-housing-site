"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Bed, Bath, Square, MapPin } from "lucide-react"

const properties = [
  {
    id: 1,
    name: "Oasis Mirage",
    location: "Palm Desert, California",
    description: "A sculptural desert sanctuary where concrete and glass merge with the ancient landscape. Fire features, infinity pools, and panoramic mountain views define this architectural masterpiece.",
    image: "/images/villa-desert.png",
    price: "From $28M",
    specs: { beds: 6, baths: 8, sqft: "12,500" },
    features: ["Infinity Pool", "Fire Features", "Smart Home", "Wine Cellar"],
  },
  {
    id: 2,
    name: "Aegean Cliffs",
    location: "Santorini, Greece",
    description: "Cantilevered over the Mediterranean, this gravity-defying residence offers multiple terraces, olive groves, and a pool suspended over the Aegean Sea.",
    image: "/images/villa-cliffside.png",
    price: "From $45M",
    specs: { beds: 8, baths: 10, sqft: "18,000" },
    features: ["Cliffside Pool", "Private Helipad", "Solar Powered", "Guest Villas"],
  },
  {
    id: 3,
    name: "Nordic Haven",
    location: "Norwegian Fjords",
    description: "Nestled in an ancient pine forest, this atmospheric retreat blends raw concrete with warm timber. A steaming infinity pool overlooks the misty landscape.",
    image: "/images/villa-forest.png",
    price: "From $32M",
    specs: { beds: 5, baths: 7, sqft: "9,800" },
    features: ["Forest Spa", "Heated Walkways", "Aurora Viewing", "Private Lake"],
  },
]

function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:direction-rtl"}`}
    >
      {/* Image */}
      <div className={`relative group ${isEven ? "" : "lg:order-2"}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          
          {/* Price Tag */}
          <div className="absolute top-6 left-6 glass px-4 py-2">
            <span className="text-editorial text-[10px] tracking-[0.2em] text-foreground/90">
              {property.price}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent origin-left"
        />
      </div>

      {/* Content */}
      <div className={`space-y-6 ${isEven ? "" : "lg:order-1 lg:text-right"}`}>
        {/* Location */}
        <div className={`flex items-center gap-2 ${isEven ? "" : "lg:justify-end"}`}>
          <MapPin className="w-3 h-3 text-gold" />
          <span className="text-editorial text-[10px] tracking-[0.2em] text-muted-foreground">
            {property.location}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground">
          {property.name}
        </h3>

        {/* Description */}
        <p className="text-foreground/60 leading-relaxed max-w-lg">
          {property.description}
        </p>

        {/* Specs */}
        <div className={`flex items-center gap-8 ${isEven ? "" : "lg:justify-end"}`}>
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-gold/70" />
            <span className="text-sm text-foreground/70">{property.specs.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-gold/70" />
            <span className="text-sm text-foreground/70">{property.specs.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-gold/70" />
            <span className="text-sm text-foreground/70">{property.specs.sqft} sqft</span>
          </div>
        </div>

        {/* Features */}
        <div className={`flex flex-wrap gap-2 ${isEven ? "" : "lg:justify-end"}`}>
          {property.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase border border-border/50 text-foreground/60"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#"
          whileHover={{ x: isEven ? 10 : -10 }}
          className={`inline-flex items-center gap-3 group ${isEven ? "" : "lg:flex-row-reverse"}`}
        >
          <span className="btn-luxury py-3 px-8">
            View Estate
          </span>
          <span className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
            <ArrowUpRight className="w-4 h-4 text-gold" />
          </span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export function PropertyShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section 
      ref={sectionRef}
      id="estates" 
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Background Pattern */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24 lg:mb-32"
        >
          <span className="text-editorial text-[10px] tracking-[0.4em] text-gold">
            THE COLLECTION
          </span>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 text-foreground max-w-4xl mx-auto text-balance">
            Architectural Masterpieces
            <br />
            <span className="text-muted-foreground">Beyond Imagination</span>
          </h2>
          <p className="mt-8 text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Each residence in our exclusive collection represents the pinnacle of architectural 
            innovation, crafted for those who seek the extraordinary.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="space-y-32 lg:space-y-48">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
