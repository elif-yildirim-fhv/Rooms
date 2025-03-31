import { API_URL } from "@/config"
import type { Room } from "@/types"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let room: Room

  try {
    const response = await fetch(`${API_URL}/rooms/${params.id}`)
    if (!response.ok) {
      return {
        title: "Room Details - Not Found",
      }
    }
    room = await response.json()
    return {
      title: `${room.title} - Room Details`,
      description: room.description,
    }
  } catch (error) {
    return {
      title: "Room Details - Error",
    }
  }
}

export default async function RoomDetail({ params }: { params: { id: string } }) {
  let room: Room

  try {
    const response = await fetch(`${API_URL}/rooms/${params.id}`)
    if (!response.ok) {
      notFound()
    }
    room = await response.json()
  } catch (e) {
    notFound()
  }

  const formattedDate = new Date(room.createdAt).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={room.heroUrl || "/placeholder.svg"}
          className="w-full md:w-1/2 rounded-lg object-cover"
          alt={room.title}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{room.title}</h1>
          <p className="text-gray-700 mb-4">{room.description}</p>
          <p className="text-gray-500 mb-4">Added on {formattedDate}</p>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={room.owner.portraitUrl || "/placeholder.svg"}
              className="rounded-full w-12 h-12"
              alt={`${room.owner.firstName} ${room.owner.lastName}`}
            />
            <p>
              Hosted by {room.owner.firstName} {room.owner.lastName}
            </p>
          </div>
          <p className="text-xl font-bold">
            {room.pricePerNight.amount} {room.pricePerNight.currency} per night
          </p>
        </div>
      </div>
    </div>
  )
}

