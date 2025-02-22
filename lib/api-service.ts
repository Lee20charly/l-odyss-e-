type ApiResponse<T> = {
  data: T | null
  error: string | null
}

const API_DELAY = 1000 // Simule un délai réseau

const mockUsers = [{ id: "1", email: "test@test.com", password: "password123", name: "Test User" }]

const mockDishes = [
  {
    id: "1",
    name: "Nyembwe viande fume",
    description: "viande mijoté dans une sauce à base de noix de palme",
    image: "/nwebwe-viande-fume.svg",
    price: 15.99,
    category: "Plats Principaux",
  },
  {
    id: "2",
    name: "obergine choux",
    description: "",
    image: "/obergine choux poisson sale.svg",
    price: 2000,
    category: "Plats Principaux",
  },
  {
    id: "3",
    name: "boulette de banane",
    description: "banane pilée",
    image: "/boulette de banane.svg",
    price: 8.99,
    category: "Accompagnements",
  },
  {
    id: "4",
    name: "bouillons de poissons",
    description: "Poisson frais avec des épices locales",
    image: "/bouillons de poissons aux legumes.svg",
    price: 18.99,
    category: "Plats Principaux",
  },
  // {
  //   id: "4",
  //   name: "bouillons de poissons",
  //   description: "Poisson frais avec des épices locales",
  //   image: "/bouillons de poissons.svg",
  //   price: 18.99,
  //   category: "Plats Principaux",
  // },
]

const mockOrders: any[] = []

export const apiService = {
  // Auth
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { data: null, error: "Email ou mot de passe incorrect" }
    }

    const { password: _, ...userWithoutPassword } = user
    return { data: userWithoutPassword, error: null }
  },

  async register(userData: { email: string; password: string; name: string }): Promise<ApiResponse<any>> {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    if (mockUsers.some((u) => u.email === userData.email)) {
      return { data: null, error: "Cet email est déjà utilisé" }
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      ...userData,
    }

    mockUsers.push(newUser)
    const { password: _, ...userWithoutPassword } = newUser
    return { data: userWithoutPassword, error: null }
  },

  // Dishes
  async getDishes(): Promise<ApiResponse<typeof mockDishes>> {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))
    return { data: mockDishes, error: null }
  },

  async getDishById(id: string): Promise<ApiResponse<(typeof mockDishes)[0]>> {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))
    const dish = mockDishes.find((d) => d.id === id)
    return dish ? { data: dish, error: null } : { data: null, error: "Plat non trouvé" }
  },

  // Orders
  async createOrder(orderData: {
    items: Array<{ id: string; quantity: number }>
    totalAmount: number
    userId: string
  }): Promise<ApiResponse<any>> {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    const newOrder = {
      id: String(mockOrders.length + 1),
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    mockOrders.push(newOrder)
    return { data: newOrder, error: null }
  },

  async getOrders(userId: string): Promise<ApiResponse<any>> {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))
    const userOrders = mockOrders.filter((o) => o.userId === userId)
    return { data: userOrders, error: null }
  },
}

