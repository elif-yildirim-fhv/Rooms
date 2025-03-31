import Link from 'next/link';

export default function Pagination({
  currentPage,
  totalPages,
  sortKey,
}: {
  currentPage: number;
  totalPages: number;
  sortKey: string;
}) {
  return (
    <div className="flex justify-between items-center mt-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={`/rooms?page=${currentPage - 1}&sort=${sortKey}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </Link>
      ) : (
        <button 
          disabled 
          className="px-4 py-2 bg-gray-300 rounded cursor-not-allowed"
        >
          Previous
        </button>
      )}

      <span>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`/rooms?page=${currentPage + 1}&sort=${sortKey}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </Link>
      ) : (
        <button 
          disabled 
          className="px-4 py-2 bg-gray-300 rounded cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  );
}