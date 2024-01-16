
// In the app directory, nested folder hierarchy defines route structure. However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route folder.

// while folders define routes (this is /dashboard), only the contents returned by page.js or route.js are publicly addressable.


import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import CardWrapper from '@/app/ui/dashboard/cards';

import { lusitana } from '@/app/ui/fonts';

// https://react.dev/reference/react/Suspense
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';


// NOTES ON STATIC VS DYNAMIC RENDERING: https://nextjs.org/docs/app/building-your-application/rendering/server-components. Static rendering is good for speed, SEO, and server load, as the information is cached and prerendered - useful for websites with no data or data that is shared between multiple users, like a blog post. Dynamic rendering renders the page and updates fresh data when the user visits the page. Benefits: real time data, user specific content (dashboards), request time information (access info that can only be known at request time, such as cookies or URL search params.) 
 
export default async function Page() {

    console.log('Hello')


    // destructured 'data' from Promise in data.ts
    // the data requests are currently unintentionally blocking each other, creating a 'request waterfall': requests are in sequence (waiting for one to complete before another begins). This means that fetchRevenue and FetchLatestInvoices need to complete before fetchCardData can work. 
    // By default, Next.js prerenders routes to improve performance (static rendering). So if our data changes, it won't be reflected in the dashboard!
    


// only this returned segment is visible on the client, any functions above wont be. 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-white`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

         {/* Here we are wrapping the placeholder component in the suspense tags, which will display a temporary component while the revenue chart, cards, and invoices, which are data dependent, load in. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.*/}

        <Suspense fallback={<CardsSkeleton/>}>
          <CardWrapper />
        </Suspense>

      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
       
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
          <LatestInvoices />
        </Suspense>
        
      </div>
    </main>
  );
}