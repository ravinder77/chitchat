import React from 'react'

export default function SidebarSkeleton() {
  return (
    <aside className="h-full w-20 lg:w-72 bg-amber-100 p-4">
      {/* Avatar Skeleton */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="flex-1">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-16 h-3 bg-gray-200 rounded mt-1 animate-pulse"></div>
        </div>
      </div>

      {/* Menu Items Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </aside>
  );
}
