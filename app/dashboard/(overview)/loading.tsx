// loading is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.

import DashboardSkeleton from "../../ui/skeletons";

export default function Loading() {
    return (
      <DashboardSkeleton/>
    );
  }