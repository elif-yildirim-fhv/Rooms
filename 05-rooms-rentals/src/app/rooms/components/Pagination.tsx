// Pagination.tsx
"use client"
import { useRouter, useSearchParams } from "next/navigation"

export default function Pagination({
  currentPage,
  totalPages,
  setPage,
  currentSort, // Hier die currentSort-Eigenschaft hinzufügen
}: {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
  currentSort: string // Hier den Typ für currentSort definieren
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    setPage(page)
    
    // URL aktualisieren
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    params.set('sort', currentSort) // Hier currentSort verwenden
    router.push(`/rooms?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex justify-center mt-8 gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}