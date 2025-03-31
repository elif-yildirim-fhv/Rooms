import RegisterForm from "./components/RegisterForm"
import ApiService, { type ApiResponse } from "./services/ApiService"
import type { Room } from "@/types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create New Cabin - Arrrbnb",
}

async function onSubmit(state: ApiResponse | undefined, data: FormData) {
  "use server"
  const title = data.get("title") as string
  const description = data.get("description") as string
  const heroUrl = data.get("heroUrl") as string
  const price = data.get("price") as string

  // Server-side validation
  if (!title || !description || !heroUrl || !price) {
    return {
      status: 400,
      statusText: "All fields are required",
      data: undefined,
    } as ApiResponse
  }

  // Validate URL is from pxhere.com
  try {
    const url = new URL(heroUrl)
    if (url.hostname !== "pxhere.com" && !url.hostname.endsWith(".pxhere.com")) {
      return {
        status: 400,
        statusText: "Image URL must be from pxhere.com",
        data: undefined,
      } as ApiResponse
    }
  } catch (e) {
    return {
      status: 400,
      statusText: "Invalid URL format",
      data: undefined,
    } as ApiResponse
  }

  const pricePerNight = {
    amount: Number.parseInt(price),
    currency: "USD",
  }

  try {
    const response = await ApiService.post("http://localhost:3001/rooms", {
      title,
      description,
      heroUrl,
      pricePerNight,
    })

    if (response.status === 201) {
      revalidatePath("/rooms")
      redirect("/rooms")
    }

    return response as ApiResponse<Room>
  } catch (error) {
    console.error("Error creating room:", error)
    return {
      status: 500,
      statusText: "An error occurred while creating the room",
      data: undefined,
    } as ApiResponse
  }
}

export default function CreateCabinPage() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Create New Cabin</h2>
      <RegisterForm action={onSubmit} />
    </div>
  )
}

