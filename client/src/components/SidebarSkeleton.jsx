import React from 'react';

export default function SidebarSkeleton() {
  return (
    <aside className='h-full w-full md:w-20 lg:w-72 border-r border-[#003049] flex flex-col p-4'>
      {/* Avatar Skeleton */}
      <div className='flex items-center space-x-3 mb-6'>
        <div className='w-12 h-12 bg-gray-400 rounded-full animate-pulse'></div>
        <div className='flex-1'>
          <div className='w-24 h-4 bg-gray-400 rounded animate-pulse'></div>
          <div className='w-16 h-3 bg-gray-400 rounded mt-1 animate-pulse'></div>
        </div>
      </div>

      {/* Menu Items Skeleton */}
      <div className='space-y-6'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='flex items-center space-x-3'>
            <div className='size-10 bg-gray-400 rounded-full animate-pulse'></div>
            <div className='w-full h-8 bg-gray-400 rounded animate-pulse'></div>
          </div>
        ))}
      </div>
    </aside>
  );
}
