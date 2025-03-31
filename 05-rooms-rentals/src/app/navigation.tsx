"use client";

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Navigation() {
  const segment = useSelectedLayoutSegment();
  
  return (
    <nav className="bg-gray-100 p-4 mb-6">
      <div className="container mx-auto flex gap-6">
        <Link 
          href="/rooms" 
          className={`px-4 py-2 rounded ${segment === 'rooms' ? 'bg-blue-500 text-white' : ''}`}
        >
          Rooms
        </Link>
        <Link 
          href="/create" 
          className={`px-4 py-2 rounded ${segment === 'create' ? 'bg-blue-500 text-white' : ''}`}
        >
          Create
        </Link>
      </div>
    </nav>
  );
}