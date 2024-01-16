import SideNav from '@/app/ui/dashboard/sidenav';

// this is a layout local to dashboard/

// One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering:
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* SideNav is static, so we can see it while the loading.tsx file shows while the page.tsx renders. */}
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-slate-800 h-full">{children}</div>
      {/* the children prop above refers to page.tsx for both customers and invoices and to loading.tsx */}
    </div>
  );
}