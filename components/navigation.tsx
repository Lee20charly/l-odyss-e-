"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, LayoutDashboard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cart } from "@/components/cart"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/components/auth-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full justify-center flex  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          L&apos;Odyssée du Gabon
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop menu */}
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground">
              Accueil
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
            <Link href="#plats" className="text-foreground/60 transition-colors hover:text-foreground">
              Nos Plats
            </Link>
            <Link href="#about" className="text-foreground/60 transition-colors hover:text-foreground">
              À Propos
            </Link>
            <Link href="#contact" className="text-foreground/60 transition-colors hover:text-foreground">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Cart />
            {isAuthenticated ? (
              <UserNav />
            ) : (
              <Link href="/auth/login">
                <Button variant="default">Connexion</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute left-0 top-16 w-full bg-background p-4 md:hidden"
            >
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-foreground/60 transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Accueil
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                )}
                <Link
                  href="#plats"
                  className="text-foreground/60 transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Nos Plats
                </Link>
                <Link
                  href="#about"
                  className="text-foreground/60 transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  À Propos
                </Link>
                <Link
                  href="#contact"
                  className="text-foreground/60 transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

