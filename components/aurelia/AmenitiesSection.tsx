"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Waves, Film, Cpu, Sparkles, TreePine, 
  Wine, Heart, ArrowUpRight, Sunset
} from "lucide-react"

const amenities = [
  {
    icon: Waves,
    title: "Infinity Pools",
    description: "Edge-to-horizon pools that merge seamlessly with sky and sea, featuring heated lounging areas and underwater audio systems.",
  },
  {
    icon: Film,
    title: "Private Cinema",
    description: "State-of-the-art screening rooms with Dolby Atmos sound, reclining leather seating, and curated film libraries.",
  },
  {
    icon: Cpu,
    title: "Smart Automation",
    description: "Whole-home AI integration controlling climate, lighting, security, and entertainment with voice and gesture commands.",
  },
  {
    icon: Sparkles,
    title: "Wellness Spa",
    description: "Private spa sanctuaries featuring steam rooms, cryotherapy chambers, and massage suites with resident therapists.",
  },
  {
    icon: TreePine,
    title: "Rooftop Gardens",
    description: "Curated botanical gardens with native plantings, meditation spaces, and chef&apos;s herb collections.",
  },
  {
    icon: Wine,
    title: "Wine Cellars",
    description: "Climate-controlled cellars with capacity for 2,000+ bottles, tasting rooms, and sommelier consultations.",
  },
  {
    icon: Heart,
    title: "Wellness Lounges",
    description: "Dedicated spaces for yoga, meditation, and personal training with floor-to-ceiling nature views.",
  },
  {
    icon: Sunset,
    title: "Panoramic Terraces",
    description: "Expansive outdoor living spaces with fire features, outdoor kitchens, and retractable glass walls.",
  },
]

function AmenityCard({ amenity, index }: { amenity: typeof amenities[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative p-8 lg:p-10 bg-card/50 border border-border/50 hover:border-gold/30 transition-all duration-500 hover:bg-card"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-500">
        <amenity.icon className="w-6 h-6 text-gold" />
      </div>

      {/* Content */}
      <h3 className="text-display text-xl md:text-2xl text-foreground mb-3">
        {amenity.title}
      </h3>
      <p className="text-foreground/60 text-sm leading-relaxed">
        {amenity.description}
      </p>

      {/* Hover Arrow */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ArrowUpRight className="w-5 h-5 text-gold" />
      </motion.div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-gold/30 to-transparent transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
        <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-gold/30 to-transparent transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  )
}

export function AmenitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      ref={sectionRef}
      id="amenities" 
      className="relative py-32 lg:py-48 overflow-hidden bg-secondary/30"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="text-editorial text-[10px] tracking-[0.4em] text-gold">
            WORLD-CLASS AMENITIES
          </span>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 text-foreground max-w-4xl mx-auto text-balance">
            Every Detail
            <br />
            <span className="text-muted-foreground">Meticulously Crafted</span>
          </h2>
          <p className="mt-8 text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Our residences come complete with an unprecedented array of amenities, 
            designed to anticipate every desire and exceed every expectation.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-foreground/50 text-sm mb-6">
            Discover the complete amenity portfolio during your private viewing.
          </p>
          <a href="#contact" className="btn-luxury">
            Request Brochure
          </a>
        </motion.div>
      </div>
    </section>
  )
}
