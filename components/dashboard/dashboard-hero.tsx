"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

export function DashboardHero() {
  const { user } = useAuth()

  return (
    <section className=" items-start flex ">
      <div className="flex text-left justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-left text-3xl font-bold text-primary">Bienvenue, {user?.name}</h1>
          <p className="text-left text-muted-foreground">Découvrez nos meilleures sélections de plats gabonais authentiques</p>
        </motion.div>
      </div>
    </section>
  )
}

