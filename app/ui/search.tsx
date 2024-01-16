'use client'; // This is a Client Component, which means you can use event listeners and hooks.

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// - this component is used in dashboard/invoices/. 
export default function Search({ placeholder }: { placeholder: string }) {

  // URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a. This is a CLIENT component, which is why we use the getSearchParams hook, accessing params from the client. 

  // As a general rule, if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.

  const searchParams = useSearchParams();
  const {replace} = useRouter();
  // pathname is current path (/dashboard/invoices)
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    // Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing, as right now, our component is updating on every character entered in the search.
    console.log(`Searching...${term}`)

    // passing searchParams into contructor URLSearchParams, which is instantiated as 'params' object, so that the query can be replaced/set as the input.   
    const params = new URLSearchParams(searchParams)

    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    if(term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // replace(${pathname}?${params.toString()}) updates the URL with the user's search data. For example, /dashboard/invoices?query=tobe if the user searches for "Tobe".
    replace(`${pathname}?${params.toString()}`);
  }

  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" 
        placeholder={placeholder} onChange={(e) => {handleSearch(e.target.value)}}
        defaultValue={searchParams.get('query')?.toString()}/>

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500 peer-focus:text-red-500" />
    </div>
  );
}
