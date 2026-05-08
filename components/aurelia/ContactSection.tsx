"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Phone, Mail, Send } from "lucide-react"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/villa-cliffside.png"
          alt="Contact Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-editorial text-[10px] tracking-[0.4em] text-gold">
              PRIVATE INQUIRIES
            </span>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mt-6 text-foreground">
              Begin Your
              <br />
              <span className="text-muted-foreground">Journey</span>
            </h2>

            <p className="mt-8 text-foreground/60 leading-relaxed max-w-lg">
              Every extraordinary residence begins with a conversation. Our dedicated 
              advisors are available to arrange private viewings and discuss your 
              unique requirements with complete discretion.
            </p>

            {/* Contact Info */}
            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50 mb-1">
                    FLAGSHIP GALLERY
                  </p>
                  <p className="text-foreground/80">
                    888 Rodeo Drive, Suite 1200<br />
                    Beverly Hills, CA 90210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50 mb-1">
                    PRIVATE LINE
                  </p>
                  <p className="text-foreground/80">
                    +1 (310) 555-ELITE
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50 mb-1">
                    CORRESPONDENCE
                  </p>
                  <p className="text-foreground/80">
                    inquiries@aureliaestates.com
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-12 p-6 border border-border/50 bg-card/50">
              <p className="text-editorial text-[10px] tracking-[0.15em] text-gold mb-4">
                VIEWING APPOINTMENTS
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-foreground/60">
                <div>
                  <p className="text-foreground/80">Monday – Friday</p>
                  <p>9:00 AM – 7:00 PM</p>
                </div>
                <div>
                  <p className="text-foreground/80">Saturday</p>
                  <p>By Appointment</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 lg:p-12 bg-card/80 backdrop-blur-sm border border-border/50">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-display text-2xl text-foreground mb-4">
                    Inquiry Received
                  </h3>
                  <p className="text-foreground/60">
                    A dedicated advisor will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full p-4 bg-background/50 border border-border/50 text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full p-4 bg-background/50 border border-border/50 text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full p-4 bg-background/50 border border-border/50 text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50">
                      AREA OF INTEREST *
                    </label>
                    <select
                      required
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      className="w-full p-4 bg-background/50 border border-border/50 text-foreground focus:border-gold/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a property type</option>
                      <option value="villa">Luxury Villa</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="estate">Private Estate</option>
                      <option value="bungalow">Modern Bungalow</option>
                      <option value="custom">Custom Commission</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-editorial text-[10px] tracking-[0.15em] text-foreground/50">
                      MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full p-4 bg-background/50 border border-border/50 text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your vision..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-luxury py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Request Private Viewing
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-foreground/40 text-center">
                    All inquiries are handled with absolute discretion and confidentiality.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
