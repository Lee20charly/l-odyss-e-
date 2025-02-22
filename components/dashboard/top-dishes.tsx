"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

const topDishes = [
  {
    id: "top1",
    name: "Poulet Nyembwe Royal",
    description: "Notre plat signature avec sauce aux noix de palme",
    image: "/viande de brouse au nwebwe.svg",
    price: 24.99,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "top2",
    name: "Poisson Fumé au Manioc",
    description: "Poisson fumé traditionnel et son accompagnement",
    image: "/paquet de poisson.svg",
    price: 19.99,
    rating: 4.8,
    reviews: 96,
  },
  {
    id: "top3",
    name: "Bouillon d'Écrevisses",
    description: "Bouillon savoureux aux épices locales",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&q=80",
    price: 22.99,
    rating: 4.7,
    reviews: 84,
  },
]

export function TopDishes() {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (dish: (typeof topDishes)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...dish, quantity: 1 },
    })
    toast({
      title: "Ajouté au panier!",
      description: `${dish.name} a été ajouté à votre panier.`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-primary">Meilleurs Plats</h2>
        <p className="text-muted-foreground">Les plats les mieux notés par nos clients</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topDishes.map((dish, index) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-semibold">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground">{dish.description}</p>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{dish.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({dish.reviews} avis)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{dish.price.toFixed(2)} €</span>
                  <Button onClick={() => handleAddToCart(dish)} variant="secondary">
                    Ajouter au panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

