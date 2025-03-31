import Link from 'next/link';

export default function SortControls({ sortKey }: { sortKey: string }) {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <span>Sort by:</span>
      <Link
        href="/rooms?sort=newest&page=1"
        className={`px-3 py-1 rounded ${sortKey === 'newest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Newest
      </Link>
      <Link
        href="/rooms?sort=price&page=1"
        className={`px-3 py-1 rounded ${sortKey === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Price
      </Link>
      <Link
        href="/rooms?sort=name&page=1"
        className={`px-3 py-1 rounded ${sortKey === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Name
      </Link>
    </div>
  );
}