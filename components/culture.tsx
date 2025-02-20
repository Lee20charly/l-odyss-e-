"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { History } from "lucide-react"

const images = [
  {
    src: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    alt: "Préparation traditionnelle",
  },
  {
    src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    alt: "Ingrédients locaux",
  },
  {
    src: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=800&q=80",
    alt: "Culture culinaire",
  },
]

export function Culture() {
  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-2 inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          <History className="h-8 w-8" />
          Notre Histoire et Culture
        </h2>
        <p className="text-muted-foreground">Découvrez l'héritage culinaire du Gabon à travers nos traditions</p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-lg leading-relaxed">
            La cuisine gabonaise est le reflet d'une riche histoire culturelle, transmise de génération en génération.
            Chaque plat raconte une histoire, chaque saveur évoque une tradition.
          </p>
          <p className="text-lg leading-relaxed">
            Nos chefs perpétuent ces traditions tout en y apportant une touche de modernité. Ils sélectionnent avec soin
            les meilleurs ingrédients locaux pour vous offrir une expérience culinaire authentique.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 rounded-lg bg-secondary/10 p-4">
              <h3 className="font-semibold text-primary">Ingrédients Locaux</h3>
              <p className="text-sm text-muted-foreground">
                Nous travaillons avec les producteurs locaux pour garantir la fraîcheur et l'authenticité de nos plats.
              </p>
            </div>
            <div className="space-y-2 rounded-lg bg-secondary/10 p-4">
              <h3 className="font-semibold text-primary">Savoir-faire</h3>
              <p className="text-sm text-muted-foreground">
                Nos recettes sont le fruit d'un savoir-faire ancestral, transmis avec passion.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 2).map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={images[2].src || "/placeholder.svg"}
              alt={images[2].alt}
              width={800}
              height={400}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

