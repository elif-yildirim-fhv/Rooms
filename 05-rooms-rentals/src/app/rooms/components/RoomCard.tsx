import Link from 'next/link';
import { Room } from '@/types';

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/rooms/${room.id}`}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow block"
    >
      <div className="h-48 bg-gray-100 mb-4 overflow-hidden rounded">
        {room.heroUrl && (
          <img
            src={room.heroUrl}
            alt={room.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <h2 className="text-xl font-bold">{room.title}</h2>
      <p className="text-gray-600 line-clamp-2 my-2">{room.description}</p>
      
      <div className="flex justify-between mt-4">
        <span className="text-sm">
          {new Date(room.createdAt).toLocaleDateString()}
        </span>
        <span className="font-bold">
          ${room.pricePerNight.amount}/night
        </span>
      </div>
      
      {room.owner && (
        <div className="mt-2 text-sm text-gray-500">
          Hosted by {room.owner.firstName}
          <img src={room.owner.portraitUrl} className="rounded-full w-12 h-12 mt-2" alt="Owner" />
        </div>
        
      )}
    </Link>
  );
}