"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { TopDishes } from "@/components/dashboard/top-dishes"
import { DailySpecials } from "@/components/dashboard/daily-specials"
import { AllDishes } from "@/components/dashboard/all-dishes"

export default function DashboardPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 py-8">
      <DashboardHero />
      <div className="container space-y-8">
        <TopDishes />
        <DailySpecials />
        <AllDishes />
      </div>
    </div>
  )
}

