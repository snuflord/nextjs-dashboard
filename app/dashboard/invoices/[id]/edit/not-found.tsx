import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

// will display if no invoices are found in edit invoice route. this file/display will take precedence ober error.tsx
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold text-white">404 Not Found</h2>
      <p className='text-white'>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}