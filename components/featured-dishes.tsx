"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturedDishes() {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [dishes, setDishes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes")
        if (!response.ok) throw new Error("Erreur lors du chargement des plats")
        const data = await response.json()
        setDishes(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDishes()
  }, [])

  const handleAddToCart = (dish: any) => {
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
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="flex min-h-[400px] items-center justify-center text-destructive">{error}</div>
  }

  return (
    <section id="plats" className="container py-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
      >
        Nos Plats Signature
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {dishes.map((dish: any) => (
          <motion.div key={dish.id} variants={itemVariants}>
            <Card className="overflow-hidden border-2 border-secondary/20 bg-white">
              <CardHeader className="p-0">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-primary">{dish.name}</CardTitle>
                <CardDescription className="mb-4">{dish.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-secondary">{dish.price.toFixed(0)} FCFA</span>
                  <Button
                    onClick={() => handleAddToCart(dish)}
                    size="sm"
                    className="gap-2 bg-primary text-white hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
