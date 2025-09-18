import fs from 'fs';
import path from 'path';

export interface AdminSidebarItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface AdminSidebarConfig {
  items: AdminSidebarItem[];
}

const CONFIG_PATH = path.join(process.cwd(), 'lib', 'admin-sidebar-config.json');
const PAGES_DIR = path.join(process.cwd(), 'app');

export class AdminSidebarManager {
  static async getConfig(): Promise<AdminSidebarConfig> {
    try {
      const data = await fs.promises.readFile(CONFIG_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.info('No admin sidebar config found, using default:', error);
      // Return default config if file doesn't exist
      return { items: [] };
    }
  }

  static async saveConfig(config: AdminSidebarConfig): Promise<void> {
    await fs.promises.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
  }

  static async addItem(item: Omit<AdminSidebarItem, 'id' | 'order'>): Promise<AdminSidebarItem> {
    const config = await this.getConfig();
    const newItem: AdminSidebarItem = {
      ...item,
      id: item.label.toLowerCase().replace(/\s+/g, '-'),
      order: config.items.length + 1
    };

    config.items.push(newItem);
    await this.saveConfig(config);
    
    // Create the route file
    await this.createRouteFile(newItem);
    
    return newItem;
  }

  static async updateItem(id: string, updates: Partial<AdminSidebarItem>): Promise<AdminSidebarItem | null> {
    const config = await this.getConfig();
    const itemIndex = config.items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return null;
    
    const oldItem = { ...config.items[itemIndex] };
    config.items[itemIndex] = { ...config.items[itemIndex], ...updates };
    
    await this.saveConfig(config);
    
    // If path or label changed, update route file
    const pathChanged = updates.path && updates.path !== oldItem.path;
    const labelChanged = updates.label && updates.label !== oldItem.label;
    const iconChanged = updates.icon && updates.icon !== oldItem.icon;
    
    if (pathChanged || labelChanged || iconChanged) {
      // Delete old route file if path changed
      if (pathChanged) {
        await this.deleteRouteFile(oldItem.path);
      }
      // Create/update route file with new data
      await this.createRouteFile(config.items[itemIndex]);
    }
    
    return config.items[itemIndex];
  }

  static async deleteItem(id: string): Promise<boolean> {
    const config = await this.getConfig();
    const itemIndex = config.items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return false;
    
    const item = config.items[itemIndex];
    config.items.splice(itemIndex, 1);
    
    await this.saveConfig(config);
    await this.deleteRouteFile(item.path);
    
    return true;
  }

  static async reorderItems(itemIds: string[]): Promise<void> {
    const config = await this.getConfig();
    const reorderedItems: AdminSidebarItem[] = [];
    
    itemIds.forEach((id, index) => {
      const item = config.items.find(item => item.id === id);
      if (item) {
        reorderedItems.push({ ...item, order: index + 1 });
      }
    });
    
    config.items = reorderedItems;
    await this.saveConfig(config);
  }

  static async createRouteFile(item: AdminSidebarItem): Promise<void> {
    const routePath = item.path.startsWith('/') ? item.path.slice(1) : item.path;
    const dirPath = path.join(PAGES_DIR, routePath);
    const filePath = path.join(dirPath, 'page.tsx');

    // Create directory if it doesn't exist
    await fs.promises.mkdir(dirPath, { recursive: true });

    // Create a valid component name by removing special characters and capitalizing
    const componentName = item.label
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, ' ') // Normalize spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('') + 'Page';

    // Get the icon component mapping
    const getIconSvg = (iconName: string) => {
      const iconSvgMap: { [key: string]: string } = {
        home: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
        users: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" /></svg>',
        settings: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
        dashboard: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
        menu: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>',
        book: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
        mail: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
        calendar: '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
        // Add more as needed, fallback to a generic icon
      };
      
      return iconSvgMap[iconName] || '<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>';
    };

    // Create page component
    const pageContent = `export default function ${componentName}() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            ${getIconSvg(item.icon)}
            ${item.label}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome to the ${item.label} admin page. This page was automatically generated.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            ${item.label} Content
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is the ${item.label} admin page content. You can customize this page by editing the file at:
          </p>
          <code className="block mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            app${item.path}/page.tsx
          </code>
        </div>
      </div>
    </div>
  );
}
`;

    await fs.promises.writeFile(filePath, pageContent);
  }

  static async deleteRouteFile(routePath: string): Promise<void> {
    try {
      const cleanPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
      const dirPath = path.join(PAGES_DIR, cleanPath);
      
      // Remove the entire directory
      await fs.promises.rm(dirPath, { recursive: true, force: true });
    } catch (error) {
      console.info('Error deleting route file (may not exist):', error);
      // Ignore errors if file doesn't exist
    }
  }
}
