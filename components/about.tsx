"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
  return (
    <section id="about" className="bg-muted/50">
      <div className="container grid gap-8 py-16 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-2xl"
        >
          <Image
            src="/a propos de nous.svg"
            alt="Notre restaurant"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">Notre Histoire</h2>
          <p className="leading-relaxed text-muted-foreground">
            L&apos;Odyssée est née d&apos;une passion pour la cuisine gabonaise et d&apos;un désir de partager notre
            riche héritage culinaire avec le monde. Chaque plat raconte une histoire, transmet une tradition et célèbre
            la diversité de notre culture.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Notre mission est de préserver et de promouvoir l&apos;authenticité de la cuisine gabonaise tout en la
            rendant accessible à tous. Nous sélectionnons soigneusement nos ingrédients et respectons les méthodes de
            préparation traditionnelles pour vous offrir une expérience culinaire unique.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/chef 1.svg"
                alt="Notre cuisine"
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/chef 2.svg"
                alt="Nos ingrédients"
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/bouillis 1234.svg"
                alt="Notre équipe"
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

