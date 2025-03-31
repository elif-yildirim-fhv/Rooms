import { API_URL } from '@/config';
import RoomGrid from './components/RoomGrid';
import Pagination from './components/Pagination';
import SortControls from './components/SortControls';
import { Collection, Room, PageInfo } from '@/types'; 
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Our Rooms",
};

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const pageIndex = currentPage - 1;
  const sortKey = searchParams.sort || 'newest';

  const response = await fetch(
    API_URL + '/rooms?size=9&page=' + pageIndex + '&sort=' + sortKey
);

  const data = (await response.json()) as { 
    page: PageInfo; 
    nodes: Room[];  
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
      
      <SortControls sortKey={sortKey} />
      
      <RoomGrid rooms={data.nodes} />
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={data.page.totalPages} 
        sortKey={sortKey} 
      />
    </div>
  );
}