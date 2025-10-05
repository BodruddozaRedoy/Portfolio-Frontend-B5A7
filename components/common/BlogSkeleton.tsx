'use client';

import { Skeleton } from "@/components/ui/skeleton";


export default function BlogCardSkeleton() {
  return (
    <div className="bg-gray-800 text-white rounded-lg border border-gray-700 overflow-hidden hover:shadow-md transition-shadow w-full">
      {/* Cover image skeleton */}
      <Skeleton className="w-full h-48" />

      <div className="p-6">
        {/* Title and status */}
        <div className="flex items-start justify-between mb-3">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>

        {/* Content lines */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-12 rounded" />
          ))}
        </div>

        {/* Footer section */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-6 rounded" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
