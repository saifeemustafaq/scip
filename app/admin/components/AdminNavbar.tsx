'use client';

import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <nav className="bg-red-800 border-b border-red-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white">
                Admin Portal
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-red-200 hover:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7H4l5-5v5z" />
              </svg>
            </button>
            
            <div className="relative">
              <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <span className="sr-only">Open admin menu</span>
                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">A</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
