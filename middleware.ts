import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est sur la page dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = request.cookies.has("user")

    // Si non authentifié, rediriger vers la page de connexion
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}

