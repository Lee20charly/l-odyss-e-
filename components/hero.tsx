"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const images = [
  "/WhatsApp Image 2025-02-20 à 05.24.27_4ec08a59.svg",
  "/WhatsApp Image 2025-02-20 à 05.24.27_5c310805.svg",
  "/WhatsApp Image 2025-02-20 à 05.24.27_6a559de6.svg",
  // Ajoutez d'autres images ici
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000) // Change d'image toutes les 5 secondes

    return () => clearInterval(timer)
  }, [])

  const scrollToPlats = () => {
    const platsSection = document.getElementById('nos-plats')
    if (platsSection) {
      platsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {images.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={src}
            alt={`Hero background ${index + 1}`}
            fill
            priority
            className="object-cover brightness-[0.4]"
          />
        </motion.div>
      ))}
      <div className="relative container flex h-full flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          L'âme du Gabon dans votre assiette
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-[600px] text-lg text-white/90 md:text-xl"
        >
          Un voyage culinaire au cœur des saveurs traditionnelles du Gabon
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size="lg" className="text-lg" onClick={scrollToPlats}>
            Découvrir nos plats
          </Button>
        </motion.div>
      </div>
    </section>
  )
}