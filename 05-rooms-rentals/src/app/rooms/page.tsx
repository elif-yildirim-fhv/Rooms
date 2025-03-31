"use client"
import { API_URL } from "@/config"
import RoomGrid from "./components/RoomGrid"
import Pagination from "./components/Pagination"
import SortControls from "./components/SortControls"
import type { Room, PageInfo } from "@/types"
import { useState, useEffect } from "react"

export default function RoomsPage({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string }
}) {
  const [currentPage, setCurrentPage] = useState(Number(searchParams.page) || 1);
  const [sortKey, setSortKey] = useState(searchParams.sort || "newest");
  const [data, setData] = useState<{ page: PageInfo; nodes: Room[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const pageIndex = currentPage - 1
        const sortParam = getSortParam(sortKey)
        
        const response = await fetch(
          `${API_URL}/rooms?size=9&page=${pageIndex}&sort=${sortParam}`,
          { next: { revalidate: 60 } }
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage, sortKey])

  const getSortParam = (sortKey: string) => {
    switch (sortKey) {
      case "price": return "price,asc"
      case "name": return "name,asc"
      case "newest":
      default: return "createdAt,desc"
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>

      <div className="mb-4">
        <p>
          Showing {data.nodes.length} of {data.page.totalElements} rooms
        </p>
      </div>

      <SortControls 
        initialSort={sortKey}
        setSort={setSortKey}
        setPage={setCurrentPage}
      />

      {data.nodes.length > 0 ? (
        <>
          <RoomGrid rooms={data.nodes} />
          <Pagination
            currentPage={currentPage}
            totalPages={data.page.totalPages}
            setPage={setCurrentPage}
            sortKey={sortKey}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">
            No rooms found. Try a different filter or create a new room.
          </p>
        </div>
      )}
    </div>
  )
}