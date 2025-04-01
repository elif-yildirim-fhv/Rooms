"use client"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
  currentSort: string
}

export default function Pagination({ currentPage, totalPages, setPage, currentSort }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    setPage(page)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    params.set("sort", currentSort)
    router.push(`/rooms?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex justify-center mt-8 gap-2">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
        data-testid={currentPage === 1 ? "previous-disabled" : "previous-link"}
      >
        Previous
      </button>

      {/* Page buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
        data-testid={currentPage === totalPages ? "next-disabled" : "next-link"}
      >
        Next
      </button>
    </div>
  )
}