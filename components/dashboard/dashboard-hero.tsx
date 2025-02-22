"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

export function DashboardHero() {
  const { user } = useAuth()

  return (
    <motion.section
      initial={{ y: 10 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="items-start flex"
    >
      <div className="flex text-left justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-2"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "backOut" }}
            className="text-left text-3xl font-bold text-primary"
          >
            Bienvenue, {user?.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "backOut", delay: 0.2 }}
            className="text-left text-muted-foreground"
          >
            Découvrez nos meilleures sélections de plats gabonais authentiques
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}
