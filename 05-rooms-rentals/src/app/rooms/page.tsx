"use client"
import { API_URL } from "@/config"
import RoomGrid from "./components/RoomGrid"
import Pagination from "./components/Pagination"
import SortControls from "./components/SortControls"
import type { Room, PageInfo } from "@/types"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function RoomsPage() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<{ page: PageInfo; nodes: Room[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get params safely
  const pageParam = searchParams.get('page')
  const sortParam = searchParams.get('sort')

  // Initialize state from URL params
  useEffect(() => {
    if (pageParam) {
      const page = Number(pageParam)
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page)
      }
    }
  }, [pageParam])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const pageIndex = currentPage - 1; // 0-based für Backend
        const sortValue = sortParam || 'createdAt';
        
        const apiUrl = new URL(`${API_URL}/rooms`);
        apiUrl.searchParams.set('size', '9');
        apiUrl.searchParams.set('page', pageIndex.toString());
        apiUrl.searchParams.set('sort', sortValue);
  
        const response = await fetch(apiUrl.toString(), { next: { revalidate: 60 } });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
  
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [currentPage, sortParam]);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading rooms...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
        Error: {error}
      </div>
    </div>
  )

  if (!data) return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-gray-500">No room data available</p>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">
          Showing {data.nodes.length} of {data.page.totalElements} rooms
        </p>
        
        <SortControls currentSort={sortParam || 'createdAt'} />
      </div>

      {data.nodes.length > 0 ? (
        <>
          <RoomGrid rooms={data.nodes} />
          <Pagination
            currentPage={currentPage}
            totalPages={data.page.totalPages}
            setPage={setCurrentPage}
            currentSort={sortParam || 'createdAt'}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No rooms found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  )
}