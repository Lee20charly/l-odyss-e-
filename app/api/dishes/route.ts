import { NextResponse } from "next/server"
import { apiService } from "@/lib/api-service"

export async function GET() {
  try {
    const result = await apiService.getDishes()

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

