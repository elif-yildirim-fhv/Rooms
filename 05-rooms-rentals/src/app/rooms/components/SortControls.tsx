"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function SortControls({ 
  initialSort,
  setSort,
  setPage
}: { 
  initialSort: string
  setSort: (sort: string) => void
  setPage: (page: number) => void
}) {
  const [currentSort, setCurrentSort] = useState(initialSort)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Synchronisiere den lokalen Zustand mit den URL-Parametern
  useEffect(() => {
    setCurrentSort(initialSort)
  }, [initialSort])

  const handleSortChange = (newSort: string) => {
    setCurrentSort(newSort)
    setSort(newSort)
    setPage(1) // Zurück zur ersten Seite beim Sortierwechsel
    
  
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', newSort)
    params.set('page', '1')
    router.push(`/rooms?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mb-6 flex gap-4 items-center">
      <span>Sort by:</span>
      <button
        onClick={() => handleSortChange("newest")}
        className={`px-3 py-1 rounded ${currentSort === "newest" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Newest
      </button>
      <button
        onClick={() => handleSortChange("price")}
        className={`px-3 py-1 rounded ${currentSort === "price" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Price
      </button>
      <button
        onClick={() => handleSortChange("name")}
        className={`px-3 py-1 rounded ${currentSort === "name" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Name
      </button>
    </div>
  )
}