
// In the app directory, nested folder hierarchy defines route structure. However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route folder.

// while folders define routes (this is /dashboard), only the contents returned by page.js or route.js are publicly addressable.

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '../../lib/data';


// NOTES ON STATIC VS DYNAMIC RENDERING: Static rendering is good for speed, SEO, and server load, as the information is cached and prerendered - useful for websites with no data or data that is shared between multiple users, like a blog post. Dynamic rendering renders the page and updates fresh data when the user visits the page. Benefits: real time data, user specific content (dashboards), request time information (access info that can only be known at request time, such as cookies or URL search params.) 
 
export default async function Page() {

    console.log('Hello')

    // async function
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();

    // destructured 'data' from Promise in data.ts
    // the data requests are currently unintentionally blocking each other, creating a 'request waterfall': requests are in sequence (waiting for one to complete before another begins). This means that fetchRevenue and FetchLatestInvoices need to complete before fetchCardData can work. 
    // By default, Next.js prerenders routes to improve performance (static rendering). So if our data changes, it won't be reflected in the dashboard!
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();


// only this returned segment is visible on the client, any functions above wont be. 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-white`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" /> 
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}