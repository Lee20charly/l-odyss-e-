import { Hero } from "@/components/hero"
import { FeaturedDishes } from "@/components/featured-dishes"
import { Specialties } from "@/components/specialties"
import { Culture } from "@/components/culture"
import { About } from "@/components/about"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-24 px-4 py-8 mx-auto max-w-7xl">
      <Hero />
      <section className="w-full">
        <h2 className="mb-8 text-4xl font-bold text-center text-primary">Nos Plats Vedettes</h2>
        <FeaturedDishes />
      </section>
      <section className="w-full">
        <h2 className="mb-8 text-4xl font-bold text-center text-primary">Spécialités Gabonaises</h2>
        <Specialties />
      </section>
      <section className="w-full">
        <h2 className="mb-8 text-4xl font-bold text-center text-primary">Notre Culture Culinaire</h2>
        <Culture />
      </section>
      <section className="w-full">
        <h2 className="mb-8 text-4xl font-bold text-center text-primary">À Propos de Nous</h2>
        <About />
      </section>
    </div>
  )
}

