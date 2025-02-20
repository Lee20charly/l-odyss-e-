import { NextResponse } from "next/server"
import { apiService } from "@/lib/api-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    const result = await apiService.register({ email, password, name })

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

