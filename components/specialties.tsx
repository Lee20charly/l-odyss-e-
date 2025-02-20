"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const specialties = [
  {
    id: 1,
    name: "Poulet Nyembwe Royal",
    description: "Notre version luxueuse du poulet Nyembwe, préparée avec des noix de palme sélectionnées",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    price: 24.99,
    isSpicy: true,
  },
  {
    id: 2,
    name: "Poisson Fumé au Manioc",
    description: "Poisson fumé traditionnel accompagné de manioc frais et de sauce aux légumes locaux",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800&q=80",
    price: 19.99,
    isSpicy: false,
  },
  {
    id: 3,
    name: "Bouillon d'Écrevisses",
    description: "Bouillon savoureux préparé avec des écrevisses fraîches et des épices locales",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&q=80",
    price: 22.99,
    isSpicy: true,
  },
]

export function Specialties() {
  return (
    <section className="relative overflow-hidden bg-secondary/10 py-16">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&q=80"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            <Calendar className="h-8 w-8" />
            Spécialités du Jour
          </h2>
          <p className="text-muted-foreground">Découvrez nos plats spéciaux, préparés avec passion par nos chefs</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={specialty.image || "/placeholder.svg"}
                  alt={specialty.name}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-primary">{specialty.name}</h3>
                  {specialty.isSpicy && <Badge variant="secondary">Épicé</Badge>}
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{specialty.description}</p>
                <p className="text-lg font-bold text-secondary">{specialty.price.toFixed(2)} €</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

