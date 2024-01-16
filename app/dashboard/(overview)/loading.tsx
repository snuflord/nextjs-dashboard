// loading is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.

// Notice that the loading file only applies to the /dashboard url, and not the nested customer/invoices pages. See https://nextjs.org/docs/app/building-your-application/routing/route-groups

import DashboardSkeleton from "../../ui/skeletons";

export default function Loading() {
    return (
      <DashboardSkeleton/>
    );
  }