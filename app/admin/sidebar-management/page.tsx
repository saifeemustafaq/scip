'use client';

import { useState, useEffect } from 'react';
import { SidebarItem } from '@/lib/sidebar-manager';
import { AdminSidebarItem } from '@/lib/admin-sidebar-manager';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  FiPlus, FiTrash2, FiSave, FiX, FiHome, FiUsers, FiSettings, FiBarChart, FiFolder, FiStar, FiMenu,
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

interface NewItemForm {
  label: string;
  path: string;
  icon: string;
  enabled: boolean;
}

interface EditItemForm extends NewItemForm {
  id: string;
}

const iconOptions = [
  // Navigation & Layout
  { value: 'home', label: 'Home', icon: <FiHome />, category: 'Navigation' },
  { value: 'menu', label: 'Menu', icon: <FiMenu />, category: 'Navigation' },
  { value: 'navigation', label: 'Navigation', icon: <FiNavigation />, category: 'Navigation' },
  { value: 'layout', label: 'Layout', icon: <FiLayout />, category: 'Navigation' },
  { value: 'grid', label: 'Grid', icon: <FiGrid />, category: 'Navigation' },
  { value: 'layers', label: 'Layers', icon: <FiLayers />, category: 'Navigation' },
  
  // Users & People
  { value: 'users', label: 'Users', icon: <FiUsers />, category: 'Users' },
  { value: 'user', label: 'User', icon: <FiUser />, category: 'Users' },
  
  // Analytics & Data
  { value: 'dashboard', label: 'Dashboard', icon: <FiBarChart />, category: 'Analytics' },
  { value: 'activity', label: 'Activity', icon: <FiActivity />, category: 'Analytics' },
  { value: 'pie-chart', label: 'Pie Chart', icon: <FiPieChart />, category: 'Analytics' },
  { value: 'trending-up', label: 'Trending Up', icon: <FiTrendingUp />, category: 'Analytics' },
  { value: 'target', label: 'Target', icon: <FiTarget />, category: 'Analytics' },
  
  // Settings & Tools
  { value: 'settings', label: 'Settings', icon: <FiSettings />, category: 'Settings' },
  { value: 'tool', label: 'Tool', icon: <FiTool />, category: 'Settings' },
  { value: 'command', label: 'Command', icon: <FiCommand />, category: 'Settings' },
  { value: 'cpu', label: 'CPU', icon: <FiCpu />, category: 'Settings' },
  
  // Files & Storage
  { value: 'folder', label: 'Folder', icon: <FiFolder />, category: 'Files' },
  { value: 'file', label: 'File', icon: <FiFile />, category: 'Files' },
  { value: 'archive', label: 'Archive', icon: <FiArchive />, category: 'Files' },
  { value: 'database', label: 'Database', icon: <FiDatabase />, category: 'Files' },
  { value: 'server', label: 'Server', icon: <FiServer />, category: 'Files' },
  { value: 'cloud', label: 'Cloud', icon: <FiCloud />, category: 'Files' },
  
  // Communication
  { value: 'mail', label: 'Mail', icon: <FiMail />, category: 'Communication' },
  { value: 'message-circle', label: 'Messages', icon: <FiMessageCircle />, category: 'Communication' },
  { value: 'phone', label: 'Phone', icon: <FiPhone />, category: 'Communication' },
  { value: 'bell', label: 'Notifications', icon: <FiBell />, category: 'Communication' },
  
  // Business & Commerce
  { value: 'briefcase', label: 'Briefcase', icon: <FiBriefcase />, category: 'Business' },
  { value: 'shopping-bag', label: 'Shopping Bag', icon: <FiShoppingBag />, category: 'Business' },
  { value: 'shopping-cart', label: 'Shopping Cart', icon: <FiShoppingCart />, category: 'Business' },
  { value: 'credit-card', label: 'Credit Card', icon: <FiCreditCard />, category: 'Business' },
  { value: 'truck', label: 'Delivery', icon: <FiTruck />, category: 'Business' },
  
  // Media & Content
  { value: 'image', label: 'Image', icon: <FiImage />, category: 'Media' },
  { value: 'video', label: 'Video', icon: <FiVideo />, category: 'Media' },
  { value: 'music', label: 'Music', icon: <FiMusic />, category: 'Media' },
  { value: 'camera', label: 'Camera', icon: <FiCamera />, category: 'Media' },
  { value: 'play', label: 'Play', icon: <FiPlay />, category: 'Media' },
  
  // Learning & Knowledge
  { value: 'book', label: 'Book', icon: <FiBook />, category: 'Learning' },
  { value: 'bookmark', label: 'Bookmark', icon: <FiBookmark />, category: 'Learning' },
  { value: 'help-circle', label: 'Help', icon: <FiHelpCircle />, category: 'Learning' },
  { value: 'info', label: 'Info', icon: <FiInfo />, category: 'Learning' },
  { value: 'life-buoy', label: 'Support', icon: <FiLifeBuoy />, category: 'Learning' },
  
  // Actions & Status
  { value: 'star', label: 'Star', icon: <FiStar />, category: 'Actions' },
  { value: 'heart', label: 'Heart', icon: <FiHeart />, category: 'Actions' },
  { value: 'award', label: 'Award', icon: <FiAward />, category: 'Actions' },
  { value: 'flag', label: 'Flag', icon: <FiFlag />, category: 'Actions' },
  { value: 'gift', label: 'Gift', icon: <FiGift />, category: 'Actions' },
  { value: 'check', label: 'Check', icon: <FiCheck />, category: 'Actions' },
  { value: 'alert-circle', label: 'Alert', icon: <FiAlertCircle />, category: 'Actions' },
  
  // Time & Calendar
  { value: 'calendar', label: 'Calendar', icon: <FiCalendar />, category: 'Time' },
  { value: 'clock', label: 'Clock', icon: <FiClock />, category: 'Time' },
  
  // Technology
  { value: 'monitor', label: 'Monitor', icon: <FiMonitor />, category: 'Technology' },
  { value: 'smartphone', label: 'Smartphone', icon: <FiSmartphone />, category: 'Technology' },
  { value: 'wifi', label: 'WiFi', icon: <FiWifi />, category: 'Technology' },
  { value: 'airplay', label: 'Airplay', icon: <FiAirplay />, category: 'Technology' },
  { value: 'code', label: 'Code', icon: <FiCode />, category: 'Technology' },
  { value: 'zap', label: 'Zap', icon: <FiZap />, category: 'Technology' },
  
  // Security
  { value: 'lock', label: 'Lock', icon: <FiLock />, category: 'Security' },
  { value: 'shield', label: 'Shield', icon: <FiShield />, category: 'Security' },
  { value: 'key', label: 'Key', icon: <FiKey />, category: 'Security' },
  
  // Miscellaneous
  { value: 'box', label: 'Box', icon: <FiBox />, category: 'Miscellaneous' },
  { value: 'coffee', label: 'Coffee', icon: <FiCoffee />, category: 'Miscellaneous' },
  { value: 'globe', label: 'Globe', icon: <FiGlobe />, category: 'Miscellaneous' },
  { value: 'map', label: 'Map', icon: <FiMap />, category: 'Miscellaneous' },
  { value: 'tag', label: 'Tag', icon: <FiTag />, category: 'Miscellaneous' },
  { value: 'inbox', label: 'Inbox', icon: <FiInbox />, category: 'Miscellaneous' },
  { value: 'eye', label: 'Eye', icon: <FiEye />, category: 'Miscellaneous' },
  { value: 'search', label: 'Search', icon: <FiSearch />, category: 'Miscellaneous' },
  { value: 'filter', label: 'Filter', icon: <FiFilter />, category: 'Miscellaneous' },
  { value: 'link', label: 'Link', icon: <FiLink />, category: 'Miscellaneous' },
  { value: 'share', label: 'Share', icon: <FiShare />, category: 'Miscellaneous' },
  { value: 'download', label: 'Download', icon: <FiDownload />, category: 'Miscellaneous' },
  { value: 'upload', label: 'Upload', icon: <FiUpload />, category: 'Miscellaneous' },
  { value: 'refresh-cw', label: 'Refresh', icon: <FiRefreshCw />, category: 'Miscellaneous' },
  { value: 'power', label: 'Power', icon: <FiPower />, category: 'Miscellaneous' },
  { value: 'printer', label: 'Printer', icon: <FiPrinter />, category: 'Miscellaneous' },
  { value: 'paperclip', label: 'Paperclip', icon: <FiPaperclip />, category: 'Miscellaneous' },
  { value: 'edit', label: 'Edit', icon: <FiEdit />, category: 'Miscellaneous' },
];

export default function SidebarManagement() {
  const [mainSidebarItems, setMainSidebarItems] = useState<SidebarItem[]>([]);
  const [adminSidebarItems, setAdminSidebarItems] = useState<AdminSidebarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showMainForm, setShowMainForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showMainEditForm, setShowMainEditForm] = useState(false);
  const [showAdminEditForm, setShowAdminEditForm] = useState(false);
  const [newMainItem, setNewMainItem] = useState<NewItemForm>({ label: '', path: '', icon: 'home', enabled: true });
  const [newAdminItem, setNewAdminItem] = useState<NewItemForm>({ label: '', path: '/admin/', icon: 'settings', enabled: true });
  const [editMainItem, setEditMainItem] = useState<EditItemForm>({ id: '', label: '', path: '', icon: 'home', enabled: true });
  const [editAdminItem, setEditAdminItem] = useState<EditItemForm>({ id: '', label: '', path: '/admin/', icon: 'settings', enabled: true });

  useEffect(() => {
    fetchSidebarItems();
  }, []);

  const fetchSidebarItems = async () => {
    try {
      const [mainResponse, adminResponse] = await Promise.all([
        fetch('/api/sidebar'),
        fetch('/api/admin-sidebar')
      ]);
      
      const mainConfig = await mainResponse.json();
      const adminConfig = await adminResponse.json();
      
      setMainSidebarItems(mainConfig.items.sort((a: SidebarItem, b: SidebarItem) => a.order - b.order));
      setAdminSidebarItems(adminConfig.items.sort((a: AdminSidebarItem, b: AdminSidebarItem) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch sidebar items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMainSidebarItem = async (id: string, enabled: boolean) => {
    try {
      await fetch('/api/sidebar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, enabled: !enabled })
      });
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to toggle main sidebar item:', error);
    }
  };

  const toggleAdminSidebarItem = async (id: string, enabled: boolean) => {
    try {
      await fetch('/api/admin-sidebar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, enabled: !enabled })
      });
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to toggle admin sidebar item:', error);
    }
  };

  const addMainSidebarItem = async () => {
    if (!newMainItem.label || !newMainItem.path) return;
    
    try {
      await fetch('/api/sidebar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMainItem)
      });
      
      setNewMainItem({ label: '', path: '', icon: 'home', enabled: true });
      setShowMainForm(false);
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to add main sidebar item:', error);
    }
  };

  const addAdminSidebarItem = async () => {
    if (!newAdminItem.label || !newAdminItem.path) return;
    
    try {
      await fetch('/api/admin-sidebar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdminItem)
      });
      
      setNewAdminItem({ label: '', path: '/admin/', icon: 'settings', enabled: true });
      setShowAdminForm(false);
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to add admin sidebar item:', error);
    }
  };

  const deleteMainSidebarItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? This will also delete the associated page.')) return;
    
    try {
      await fetch(`/api/sidebar?id=${id}`, { method: 'DELETE' });
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to delete main sidebar item:', error);
    }
  };

  const deleteAdminSidebarItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? This will also delete the associated page.')) return;
    
    try {
      await fetch(`/api/admin-sidebar?id=${id}`, { method: 'DELETE' });
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to delete admin sidebar item:', error);
    }
  };

  const startEditMainItem = (item: SidebarItem) => {
    setEditMainItem({
      id: item.id,
      label: item.label,
      path: item.path,
      icon: item.icon,
      enabled: item.enabled
    });
    setShowMainEditForm(true);
  };

  const startEditAdminItem = (item: AdminSidebarItem) => {
    setEditAdminItem({
      id: item.id,
      label: item.label,
      path: item.path,
      icon: item.icon,
      enabled: item.enabled
    });
    setShowAdminEditForm(true);
  };

  const updateMainSidebarItem = async () => {
    if (!editMainItem.label || !editMainItem.path) return;
    
    try {
      await fetch('/api/sidebar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editMainItem.id,
          label: editMainItem.label,
          path: editMainItem.path,
          icon: editMainItem.icon,
          enabled: editMainItem.enabled
        })
      });
      
      setShowMainEditForm(false);
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to update main sidebar item:', error);
    }
  };

  const updateAdminSidebarItem = async () => {
    if (!editAdminItem.label || !editAdminItem.path) return;
    
    try {
      await fetch('/api/admin-sidebar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editAdminItem.id,
          label: editAdminItem.label,
          path: editAdminItem.path,
          icon: editAdminItem.icon,
          enabled: editAdminItem.enabled
        })
      });
      
      setShowAdminEditForm(false);
      await fetchSidebarItems();
    } catch (error) {
      console.error('Failed to update admin sidebar item:', error);
    }
  };

  const handleMainDragEnd = async (result: DropResult) => {
    setIsDragging(false);
    
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;
    
    const items = Array.from(mainSidebarItems);
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, removed);
    
    setMainSidebarItems(items);
    
    try {
      await fetch('/api/sidebar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          itemIds: items.map(item => item.id)
        })
      });
    } catch (error) {
      console.error('Failed to reorder main sidebar items:', error);
      // Revert the state on error
      await fetchSidebarItems();
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    setIsDragging(false);
    
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;
    
    const items = Array.from(adminSidebarItems);
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, removed);
    
    setAdminSidebarItems(items);
    
    try {
      await fetch('/api/admin-sidebar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          itemIds: items.map(item => item.id)
        })
      });
    } catch (error) {
      console.error('Failed to reorder admin sidebar items:', error);
      // Revert the state on error
      await fetchSidebarItems();
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    return option ? option.icon : <FiHome />;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sidebar Management</h1>
          <p className="mt-2 text-gray-600">
            Configure and manage the navigation sidebars for both main portal and admin panel.
          </p>
        </div>

        {/* Main Portal Sidebar */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Main Portal Sidebar</h2>
                <p className="text-sm text-gray-600">Manage navigation items for the main application</p>
              </div>
              <button
                onClick={() => setShowMainForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add New Item
              </button>
            </div>
          </div>
          <div className="p-6">
            <DragDropContext onDragEnd={handleMainDragEnd} onDragStart={() => setIsDragging(true)}>
              <Droppable droppableId="main-sidebar-items">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {mainSidebarItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg ${
                              snapshot.isDragging ? 'bg-gray-50 shadow-lg' : 'bg-white'
                            } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600">
                                <FiMenu className="w-5 h-5" />
                              </div>
                              <div className={`w-3 h-3 rounded-full ${item.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{getIconComponent(item.icon)}</span>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                                  <p className="text-sm text-gray-500">{item.path}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.enabled 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {item.enabled ? 'Enabled' : 'Disabled'}
                              </span>
                              <button
                                onClick={() => toggleMainSidebarItem(item.id, item.enabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  item.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                              <button
                                onClick={() => startEditMainItem(item)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit item"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteMainSidebarItem(item.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete item"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Admin Panel Sidebar */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Admin Panel Sidebar</h2>
                <p className="text-sm text-gray-600">Manage navigation items for the admin panel</p>
              </div>
              <button
                onClick={() => setShowAdminForm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add New Item
              </button>
            </div>
          </div>
          <div className="p-6">
            <DragDropContext onDragEnd={handleDragEnd} onDragStart={() => setIsDragging(true)}>
              <Droppable droppableId="admin-sidebar-items">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {adminSidebarItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg ${
                              snapshot.isDragging ? 'bg-gray-50 shadow-lg' : 'bg-white'
                            } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600">
                                <FiMenu className="w-5 h-5" />
                              </div>
                              <div className={`w-3 h-3 rounded-full ${item.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{getIconComponent(item.icon)}</span>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                                  <p className="text-sm text-gray-500">{item.path}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.enabled 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {item.enabled ? 'Enabled' : 'Disabled'}
                              </span>
                              <button
                                onClick={() => toggleAdminSidebarItem(item.id, item.enabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  item.enabled ? 'bg-red-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                              <button
                                onClick={() => startEditAdminItem(item)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit item"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteAdminSidebarItem(item.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete item"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Main Sidebar Add Form Modal */}
        {showMainForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Main Sidebar Item</h3>
                <button onClick={() => setShowMainForm(false)}>
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={newMainItem.label}
                    onChange={(e) => setNewMainItem({ ...newMainItem, label: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Analytics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
                  <input
                    type="text"
                    value={newMainItem.path}
                    onChange={(e) => setNewMainItem({ ...newMainItem, path: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., /analytics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <div className="relative">
                    <select
                      value={newMainItem.icon}
                      onChange={(e) => setNewMainItem({ ...newMainItem, icon: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.category})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getIconComponent(newMainItem.icon)}
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center gap-2">
                    <span className="text-lg">{getIconComponent(newMainItem.icon)}</span>
                    <span className="text-sm text-gray-600">Preview: {newMainItem.icon}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowMainForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addMainSidebarItem}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Sidebar Add Form Modal */}
        {showAdminForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Admin Sidebar Item</h3>
                <button onClick={() => setShowAdminForm(false)}>
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={newAdminItem.label}
                    onChange={(e) => setNewAdminItem({ ...newAdminItem, label: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., User Management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
                  <input
                    type="text"
                    value={newAdminItem.path}
                    onChange={(e) => setNewAdminItem({ ...newAdminItem, path: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., /admin/user-management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <div className="relative">
                    <select
                      value={newAdminItem.icon}
                      onChange={(e) => setNewAdminItem({ ...newAdminItem, icon: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.category})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getIconComponent(newAdminItem.icon)}
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center gap-2">
                    <span className="text-lg">{getIconComponent(newAdminItem.icon)}</span>
                    <span className="text-sm text-gray-600">Preview: {newAdminItem.icon}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAdminForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addAdminSidebarItem}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Sidebar Edit Form Modal */}
        {showMainEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Main Sidebar Item</h3>
                <button onClick={() => setShowMainEditForm(false)}>
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={editMainItem.label}
                    onChange={(e) => setEditMainItem({ ...editMainItem, label: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Analytics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
                  <input
                    type="text"
                    value={editMainItem.path}
                    onChange={(e) => setEditMainItem({ ...editMainItem, path: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., /analytics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <div className="relative">
                    <select
                      value={editMainItem.icon}
                      onChange={(e) => setEditMainItem({ ...editMainItem, icon: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.category})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getIconComponent(editMainItem.icon)}
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center gap-2">
                    <span className="text-lg">{getIconComponent(editMainItem.icon)}</span>
                    <span className="text-sm text-gray-600">Preview: {editMainItem.icon}</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editMainItem.enabled}
                      onChange={(e) => setEditMainItem({ ...editMainItem, enabled: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Enabled</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowMainEditForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateMainSidebarItem}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Update Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Sidebar Edit Form Modal */}
        {showAdminEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Admin Sidebar Item</h3>
                <button onClick={() => setShowAdminEditForm(false)}>
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={editAdminItem.label}
                    onChange={(e) => setEditAdminItem({ ...editAdminItem, label: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., User Management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
                  <input
                    type="text"
                    value={editAdminItem.path}
                    onChange={(e) => setEditAdminItem({ ...editAdminItem, path: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., /admin/user-management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <div className="relative">
                    <select
                      value={editAdminItem.icon}
                      onChange={(e) => setEditAdminItem({ ...editAdminItem, icon: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.category})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getIconComponent(editAdminItem.icon)}
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center gap-2">
                    <span className="text-lg">{getIconComponent(editAdminItem.icon)}</span>
                    <span className="text-sm text-gray-600">Preview: {editAdminItem.icon}</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editAdminItem.enabled}
                      onChange={(e) => setEditAdminItem({ ...editAdminItem, enabled: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Enabled</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAdminEditForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateAdminSidebarItem}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Update Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}