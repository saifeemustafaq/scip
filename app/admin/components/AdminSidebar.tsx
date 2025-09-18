'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminSidebarItem } from '@/lib/admin-sidebar-manager';
import { FiHome, FiUsers, FiSettings, FiBarChart, FiFolder, FiStar, FiMenu } from 'react-icons/fi';

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.JSX.Element } = {
    'home': <FiHome />,
    'users': <FiUsers />,
    'settings': <FiSettings />,
    'dashboard': <FiBarChart />,
    'folder': <FiFolder />,
    'star': <FiStar />,
    'menu': <FiMenu />,
  };
  
  return iconMap[iconName.toLowerCase()] || <FiSettings />;
};

export default function AdminSidebar() {
  const [items, setItems] = useState<AdminSidebarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetchAdminSidebarItems();
  }, []);

  const fetchAdminSidebarItems = async () => {
    try {
      const response = await fetch('/api/admin-sidebar');
      const config = await response.json();
      setItems(config.items.filter((item: AdminSidebarItem) => item.enabled).sort((a: AdminSidebarItem, b: AdminSidebarItem) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch admin sidebar items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-red-900 text-white w-64 min-h-screen flex flex-col">
        <div className="p-4 border-b border-red-800">
          <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
          <p className="text-sm text-red-200">Portal Management</p>
        </div>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-red-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-red-800">
        <Link href="/admin" className="block">
          <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
          <p className="text-sm text-red-200">Portal Management</p>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-red-200 hover:bg-red-800 hover:text-white'
                }
              `}
            >
              <span className="mr-3 text-lg">
                {getIconComponent(item.icon)}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-red-800">
        <Link 
          href="/"
          className="flex items-center text-sm text-red-200 hover:text-white transition-colors"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Main Site
        </Link>
        <div className="text-xs text-red-300 mt-2">
          © 2024 Admin Panel
        </div>
      </div>
    </div>
  );
}
