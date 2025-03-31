import RegisterForm from "./components/RegisterForm"
import ApiService from "./services/ApiService"
import type { Room, RoomInput } from "@/types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { API_URL } from "@/config"
import type { ApiResponse } from "./services/ApiService" 

export const metadata: Metadata = {
  title: "Create New Cabin - Arrrbnb",
}

async function onSubmit(prevState: ApiResponse<Room> | undefined, formData: FormData): Promise<ApiResponse<Room>> {
  "use server"

  try {
    const title = formData.get("title")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const heroUrl = formData.get("heroUrl")?.toString() || ""
    const price = formData.get("price")?.toString() || ""

    if (!title || !description || !heroUrl || !price) {
      return { status: 400, statusText: "All fields are required", data: undefined }
    }

    try {
      const url = new URL(heroUrl)
      if (!url.hostname.includes("pxhere.com")) {
        return { status: 400, statusText: "Image URL must be from pxhere.com", data: undefined }
      }
    } catch (e) {
      return { status: 400, statusText: "Invalid URL format", data: undefined }
    }

    const roomInput: RoomInput = {
      title,
      description,
      heroUrl,
      pricePerNight: {
        amount: Number(price),
        currency: "USD",
      },
    }

    const response = await ApiService.post<Room>(`${API_URL}/rooms`, roomInput)

    if (response.status === 201) {
      revalidatePath("/rooms");
      return response;
    }

    return response;
  } catch (error) {
    console.error("Error creating room:", error);
    return { status: 500, statusText: "An error occurred", data: undefined };
  }
}