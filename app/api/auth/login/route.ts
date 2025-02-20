import { NextResponse } from "next/server"
import { apiService } from "@/lib/api-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const result = await apiService.login(email, password)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    // Ajouter des informations supplémentaires pour l'utilisateur
    const userData = {
      ...result.data,
      name: result.data.name || "Utilisateur",
      avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${result.data.email}`,
    }

    return NextResponse.json(userData)
  } catch (error) {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

