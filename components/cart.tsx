"use client"

import { useRouter } from "next/navigation"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export function Cart() {
  const { state, dispatch } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
      return
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const handleOrder = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour commander",
      })
      router.push("/auth/login")
      return
    }

    const message = encodeURIComponent(
      `🍽️ Nouvelle commande de L'Odyssée du Gabon:\n\n` +
        state.items.map((item) => `- ${item.quantity}x ${item.name} (${item.price.toFixed(0)} FCFA)`).join("\n") +
        `\n\nTotal: ${state.total.toFixed(0)} FCFA`
    )

    const phoneNumber = "24162569927"

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
            >
              {state.items.reduce((acc, item) => acc + item.quantity, 0)}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Votre Panier</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] py-4">
          <AnimatePresence>
            {state.items.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground">
                Votre panier est vide
              </motion.p>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price.toFixed(0)} FCFA</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-4">
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{state.total.toFixed(0)} FCFA</span>
                  </div>
                  <Button
                    className="mt-4 w-full bg-primary text-white hover:bg-primary/90"
                    onClick={handleOrder}
                    disabled={state.items.length === 0}
                  >
                    Commander sur WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
