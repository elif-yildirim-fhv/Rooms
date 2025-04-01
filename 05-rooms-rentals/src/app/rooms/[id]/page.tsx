import { API_URL } from "@/config";
import type { Room } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate } from "@/utils/dateUtils";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const { id } = await params;

  if (!id) {
    return { title: "Room Details - Not Found" };
  }

  try {
    const response = await fetch(`${API_URL}/rooms/${id}`);

    if (!response.ok) {
      return { title: "Room Details - Not Found" };
    }

    const room: Room = await response.json();
    return {
      title: `${room.title} - Room Details`,
      description: room.description,
    };
  } catch {
    return { title: "Room Details - Not Found" };
  }
}

export default async function RoomDetail({ params }: { params: { id: string } }) {
  // Ensure `params` is awaited
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let room: Room | null = null;

  try {
    const response = await fetch(`${API_URL}/rooms/${id}`);

    if (!response.ok) {
      notFound();
    }

    room = await response.json();
  } catch {
    notFound();
  }

  if (!room) {
    notFound();
  }

  const formattedDate = formatDate(room.createdAt);

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
  );
}