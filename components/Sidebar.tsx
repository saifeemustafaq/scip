'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '@/lib/sidebar-manager';
import { FiHome, FiUsers, FiSettings, FiBarChart, FiFolder, FiStar } from 'react-icons/fi';

interface SidebarProps {
  className?: string;
}

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.JSX.Element } = {
    'home': <FiHome />,
    'users': <FiUsers />,
    'settings': <FiSettings />,
    'dashboard': <FiBarChart />,
    'folder': <FiFolder />,
    'star': <FiStar />,
    // Fallback to emoji if not found in icon map
  };
  
  return iconMap[iconName.toLowerCase()] || <span>{iconName}</span>;
};

export default function Sidebar({ className = '' }: SidebarProps) {
  const [items, setItems] = useState<SidebarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchSidebarItems();
  }, []);

  const fetchSidebarItems = async () => {
    try {
      const response = await fetch('/api/sidebar');
      const config = await response.json();
      setItems(config.items.filter((item: SidebarItem) => item.enabled).sort((a: SidebarItem, b: SidebarItem) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch sidebar items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Navigation
              </h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0">
                  {getIconComponent(item.icon)}
                </span>
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Link */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              pathname.startsWith('/admin')
                ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={isCollapsed ? 'Admin' : undefined}
          >
            <span className="text-xl flex-shrink-0">⚡</span>
            {!isCollapsed && (
              <span className="font-medium">Admin</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
