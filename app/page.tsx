"use client"

import { Navbar } from "@/components/aurelia/Navbar"
import { HeroSection } from "@/components/aurelia/HeroSection"
import { PropertyShowcase } from "@/components/aurelia/PropertyShowcase"
import { PhilosophySection } from "@/components/aurelia/PhilosophySection"
import { AmenitiesSection } from "@/components/aurelia/AmenitiesSection"
import { GallerySection } from "@/components/aurelia/GallerySection"
import { TestimonialSection } from "@/components/aurelia/TestimonialSection"
import { ContactSection } from "@/components/aurelia/ContactSection"
import { Footer } from "@/components/aurelia/Footer"
import { FilmGrain } from "@/components/aurelia/FilmGrain"
import { CinematicCursor } from "@/components/aurelia/CinematicCursor"
import { LoadingScreen } from "@/components/aurelia/LoadingScreen"
import { AmbientLights } from "@/components/aurelia/AmbientLights"
import { BlueprintProvider } from "@/components/aurelia/BlueprintMode"
import { AtmosphericParticles } from "@/components/aurelia/AtmosphericParticles"

export default function AureliaEstates() {
  return (
    <BlueprintProvider>
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Atmospheric Effects */}
      <CinematicCursor />
      <FilmGrain />
      <AmbientLights />
      <AtmosphericParticles />
      
      {/* Cinematic Vignette */}
      <div className="vignette" />
      
      {/* Main Content */}
      <main className="relative min-h-screen">
        <Navbar />
        
        {/* Hero Section - Cinematic Video Experience */}
        <HeroSection />
        
        {/* Property Showcase - Featured Estates */}
        <PropertyShowcase />
        
        {/* Philosophy Section - Brand Story */}
        <PhilosophySection />
        
        {/* Amenities Section - World-Class Features */}
        <AmenitiesSection />
        
        {/* Gallery Section - Visual Journey */}
        <GallerySection />
        
        {/* Testimonials - Client Stories */}
        <TestimonialSection />
        
        {/* Contact Section - Private Inquiries */}
        <ContactSection />
        
        {/* Footer */}
        <Footer />
      </main>
    </BlueprintProvider>
  )
}
