"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  collection: [
    { label: "Luxury Villas", href: "#" },
    { label: "Penthouses", href: "#" },
    { label: "Estates", href: "#" },
    { label: "New Developments", href: "#" },
  ],
  services: [
    { label: "Private Viewings", href: "#" },
    { label: "Interior Design", href: "#" },
    { label: "Property Management", href: "#" },
    { label: "Investment Advisory", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Press", href: "#" },
    { label: "Careers", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Aurelia Estates"
                  fill
                  className="object-contain opacity-90"
                />
              </div>
              <div>
                <span className="text-editorial text-xs tracking-[0.3em] text-foreground/90">
                  AURELIA
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-muted-foreground mt-0.5">
                  ESTATES
                </span>
              </div>
            </motion.a>

            <p className="text-foreground/50 text-sm leading-relaxed max-w-sm mb-8">
              Curating the world&apos;s most extraordinary architectural residences 
              for discerning clients who demand nothing less than exceptional.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-border/50 hover:border-gold/50 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-foreground/50 group-hover:text-gold transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {/* Collection */}
            <div>
              <h4 className="text-editorial text-[10px] tracking-[0.2em] text-gold mb-6">
                COLLECTION
              </h4>
              <ul className="space-y-3">
                {footerLinks.collection.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-editorial text-[10px] tracking-[0.2em] text-gold mb-6">
                SERVICES
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-editorial text-[10px] tracking-[0.2em] text-gold mb-6">
                COMPANY
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-foreground/40 tracking-wide">
              © 2024 Aurelia Estates. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[11px] text-foreground/40 hover:text-gold transition-colors tracking-wide">
                Privacy Policy
              </a>
              <a href="#" className="text-[11px] text-foreground/40 hover:text-gold transition-colors tracking-wide">
                Terms of Service
              </a>
              <a href="#" className="text-[11px] text-foreground/40 hover:text-gold transition-colors tracking-wide">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
