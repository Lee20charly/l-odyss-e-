"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

const specialsOfTheDay = [
  {
    id: "special1",
    name: "Combo Traditionnel",
    description: "Assortiment de plats traditionnels gabonais",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    price: 29.99,
    originalPrice: 39.99,
    availableUntil: "20:00",
    isSpicy: true,
  },
  {
    id: "special2",
    name: "Plateau Découverte",
    description: "Sélection de nos meilleurs plats pour 2 personnes",
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=800&q=80",
    price: 44.99,
    originalPrice: 54.99,
    availableUntil: "22:00",
    isSpicy: false,
  },
]

export function DailySpecials() {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (dish: (typeof specialsOfTheDay)[0]) => {
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
        <h2 className="text-2xl font-bold text-primary">Spécialités du Jour</h2>
        <p className="text-muted-foreground">Offres spéciales disponibles aujourd&apos;hui uniquement</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {specialsOfTheDay.map((special, index) => (
          <motion.div
            key={special.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-[2/1]">
                  <Image src={special.image || "/placeholder.svg"} alt={special.name} fill className="object-cover" />
                  <div className="absolute right-2 top-2 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90">
                      <Clock className="mr-1 h-3 w-3" />
                      Jusqu&apos;à {special.availableUntil}
                    </Badge>
                    {special.isSpicy && (
                      <Badge variant="destructive" className="bg-red-500">
                        Épicé
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-semibold">{special.name}</h3>
                  <p className="text-sm text-muted-foreground">{special.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{special.price.toFixed(2)} €</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {special.originalPrice.toFixed(2)} €
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Économisez {(special.originalPrice - special.price).toFixed(2)} €
                    </p>
                  </div>
                  <Button onClick={() => handleAddToCart(special)} variant="secondary">
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

