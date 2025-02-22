"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

const allDishes = [
  {
    id: "1",
    name: "Poulet Nyembwe",
    description: "Poulet mijoté dans une sauce à base de noix de palme",
    image: "/epinard poissons fume.svg",
    price: 15.99,
    category: "Plats Principaux",
  },
  {
    id: "2",
    name: "Manioc à la Sauce",
    description: "Manioc frais accompagné d'une sauce aux légumes",
    image: "/folong poisson frais crevettes.svg",
    price: 12.99,
    category: "Accompagnements",
  },
  {
    id: "3",
    name: "Baton de Manioc",
    description: "Manioc fermenté et cuit à la vapeur",
    image: "/maquereaux fume aux epenards.svg",
    price: 8.99,
    category: "Accompagnements",
  },
  // Ajoutez plus de plats ici
]

const categories = ["Tous", "Plats Principaux", "Accompagnements", "Desserts"]

export function AllDishes() {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (dish: (typeof allDishes)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...dish, quantity: 1 },
    })
    toast({
      title: "Ajouté au panier!",
      description: `${dish.name} a été ajouté à votre panier.`,
    })
  }

  const filteredDishes = allDishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || dish.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        <h2 className="text-2xl font-bold text-primary">Tous nos Plats</h2>
        <p className="text-muted-foreground">Explorez notre menu complet de spécialités gabonaises</p>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un plat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDishes.map((dish, index) => (
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

