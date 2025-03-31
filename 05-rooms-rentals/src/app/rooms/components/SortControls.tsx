"use client"
import { useRouter, useSearchParams } from "next/navigation"

interface SortControlsProps {
  currentSort: string
}

export default function SortControls({ currentSort }: SortControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    
    params.set('sort', newSort)
    params.set('page', '1') // Reset to first page on sort change
    router.push(`/rooms?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-gray-600">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt">Newest first</option>
        <option value="pricePerNight">Price (low to high)</option>
      </select>
    </div>
  )
}