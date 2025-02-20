import { NextResponse } from "next/server"
import { apiService } from "@/lib/api-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await apiService.createOrder(body)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 })
    }

    const result = await apiService.getOrders(userId)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

