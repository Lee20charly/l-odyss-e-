import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">L&apos;Odyssée</h3>
            <p className="text-sm text-muted-foreground">Découvrez l&apos;authenticité de la cuisine gabonaise</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              123 Rue de la Cuisine
              <br />
              Libreville, Gabon
              <br />
              Tel: +241 12 34 56 78
              <br />
              Email: contact@odyssee.com
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="#plats">Nos Plats</Link>
              </li>
              <li>
                <Link href="#about">À Propos</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Suivez-nous</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

