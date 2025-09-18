'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  FiHome, FiUsers, FiSettings, FiBarChart, FiFolder, FiStar, FiMenu,
  FiActivity, FiAirplay, FiAlertCircle, FiArchive, FiAward, FiBell, FiBook,
  FiBookmark, FiBox, FiBriefcase, FiCalendar, FiCamera, FiCheck, FiClock,
  FiCloud, FiCode, FiCoffee, FiCommand, FiCpu, FiCreditCard, FiDatabase, FiDownload,
  FiEdit, FiEye, FiFile, FiFilter, FiFlag, FiGift, FiGlobe, FiGrid, FiHeart, FiHelpCircle,
  FiImage, FiInbox, FiInfo, FiKey, FiLayers, FiLayout, FiLifeBuoy, FiLink, FiLock,
  FiMail, FiMap, FiMessageCircle, FiMonitor, FiMusic, FiNavigation, FiPaperclip, FiPhone,
  FiPieChart, FiPlay, FiPower, FiPrinter, FiRefreshCw, FiSearch, FiServer, FiShare,
  FiShield, FiShoppingBag, FiShoppingCart, FiSmartphone, FiTag, FiTarget, FiTool,
  FiTrendingUp, FiTruck, FiUpload, FiUser, FiVideo, FiWifi, FiZap
} from 'react-icons/fi';

interface SidebarItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  enabled: boolean;
  order: number;
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    // Navigation & Layout
    home: <FiHome className="h-6 w-6" />,
    menu: <FiMenu className="h-6 w-6" />,
    navigation: <FiNavigation className="h-6 w-6" />,
    layout: <FiLayout className="h-6 w-6" />,
    grid: <FiGrid className="h-6 w-6" />,
    layers: <FiLayers className="h-6 w-6" />,
    
    // Users & People
    users: <FiUsers className="h-6 w-6" />,
    user: <FiUser className="h-6 w-6" />,
    
    // Analytics & Data
    dashboard: <FiBarChart className="h-6 w-6" />,
    activity: <FiActivity className="h-6 w-6" />,
    'pie-chart': <FiPieChart className="h-6 w-6" />,
    'trending-up': <FiTrendingUp className="h-6 w-6" />,
    target: <FiTarget className="h-6 w-6" />,
    
    // Settings & Tools
    settings: <FiSettings className="h-6 w-6" />,
    tool: <FiTool className="h-6 w-6" />,
    command: <FiCommand className="h-6 w-6" />,
    cpu: <FiCpu className="h-6 w-6" />,
    
    // Files & Storage
    folder: <FiFolder className="h-6 w-6" />,
    file: <FiFile className="h-6 w-6" />,
    archive: <FiArchive className="h-6 w-6" />,
    database: <FiDatabase className="h-6 w-6" />,
    server: <FiServer className="h-6 w-6" />,
    cloud: <FiCloud className="h-6 w-6" />,
    
    // Communication
    mail: <FiMail className="h-6 w-6" />,
    'message-circle': <FiMessageCircle className="h-6 w-6" />,
    phone: <FiPhone className="h-6 w-6" />,
    bell: <FiBell className="h-6 w-6" />,
    
    // Business & Commerce
    briefcase: <FiBriefcase className="h-6 w-6" />,
    'shopping-bag': <FiShoppingBag className="h-6 w-6" />,
    'shopping-cart': <FiShoppingCart className="h-6 w-6" />,
    'credit-card': <FiCreditCard className="h-6 w-6" />,
    truck: <FiTruck className="h-6 w-6" />,
    
    // Media & Content
    image: <FiImage className="h-6 w-6" />,
    video: <FiVideo className="h-6 w-6" />,
    music: <FiMusic className="h-6 w-6" />,
    camera: <FiCamera className="h-6 w-6" />,
    play: <FiPlay className="h-6 w-6" />,
    
    // Learning & Knowledge
    book: <FiBook className="h-6 w-6" />,
    bookmark: <FiBookmark className="h-6 w-6" />,
    'help-circle': <FiHelpCircle className="h-6 w-6" />,
    info: <FiInfo className="h-6 w-6" />,
    'life-buoy': <FiLifeBuoy className="h-6 w-6" />,
    
    // Actions & Status
    star: <FiStar className="h-6 w-6" />,
    heart: <FiHeart className="h-6 w-6" />,
    award: <FiAward className="h-6 w-6" />,
    flag: <FiFlag className="h-6 w-6" />,
    gift: <FiGift className="h-6 w-6" />,
    check: <FiCheck className="h-6 w-6" />,
    'alert-circle': <FiAlertCircle className="h-6 w-6" />,
    
    // Time & Calendar
    calendar: <FiCalendar className="h-6 w-6" />,
    clock: <FiClock className="h-6 w-6" />,
    
    // Technology
    monitor: <FiMonitor className="h-6 w-6" />,
    smartphone: <FiSmartphone className="h-6 w-6" />,
    wifi: <FiWifi className="h-6 w-6" />,
    airplay: <FiAirplay className="h-6 w-6" />,
    code: <FiCode className="h-6 w-6" />,
    zap: <FiZap className="h-6 w-6" />,
    
    // Security
    lock: <FiLock className="h-6 w-6" />,
    shield: <FiShield className="h-6 w-6" />,
    key: <FiKey className="h-6 w-6" />,
    
    // Miscellaneous
    box: <FiBox className="h-6 w-6" />,
    coffee: <FiCoffee className="h-6 w-6" />,
    globe: <FiGlobe className="h-6 w-6" />,
    map: <FiMap className="h-6 w-6" />,
    tag: <FiTag className="h-6 w-6" />,
    inbox: <FiInbox className="h-6 w-6" />,
    eye: <FiEye className="h-6 w-6" />,
    search: <FiSearch className="h-6 w-6" />,
    filter: <FiFilter className="h-6 w-6" />,
    link: <FiLink className="h-6 w-6" />,
    share: <FiShare className="h-6 w-6" />,
    download: <FiDownload className="h-6 w-6" />,
    upload: <FiUpload className="h-6 w-6" />,
    'refresh-cw': <FiRefreshCw className="h-6 w-6" />,
    power: <FiPower className="h-6 w-6" />,
    printer: <FiPrinter className="h-6 w-6" />,
    paperclip: <FiPaperclip className="h-6 w-6" />,
    edit: <FiEdit className="h-6 w-6" />,
  };
  
  return iconMap[iconName] || <FiHome className="h-6 w-6" />;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarItems = async () => {
      try {
        const response = await fetch('/api/sidebar');
        const config = await response.json();
        
        // Filter enabled items and sort by order
        const enabledItems = config.items
          .filter((item: SidebarItem) => item.enabled)
          .sort((a: SidebarItem, b: SidebarItem) => a.order - b.order);
        
        setSidebarItems(enabledItems);
      } catch (error) {
        console.error('Failed to fetch sidebar items:', error);
        // Fallback to empty array if fetch fails
        setSidebarItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSidebarItems();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-2">
          {/* Loading skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center px-4 py-2 rounded-md">
                <div className="w-6 h-6 bg-gray-700 rounded mr-3"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            © 2024 My App
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">Navigation</h2>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-2">
        {sidebarItems.length === 0 ? (
          <div className="text-gray-400 text-sm px-4 py-2">
            No navigation items configured
          </div>
        ) : (
          sidebarItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <span className="mr-3">
                  {getIconComponent(item.icon)}
                </span>
                {item.label}
              </Link>
            );
          })
        )}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          © 2024 My App
        </div>
      </div>
    </div>
  );
}
