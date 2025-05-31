import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  FileSpreadsheet,
  ShoppingBag,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Box, // For BO logo placeholder
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#', isActive: false },
  { id: 'customers', label: 'Customers', icon: UserCircle2, href: '#', isActive: false },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#', isActive: false },
  { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet, href: '#', isActive: false },
  { id: 'items', label: 'Items', icon: ShoppingBag, href: '#', isActive: false },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#', isActive: false },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#', isActive: false },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#', isActive: false },
];

const utilityNavItems: NavItem[] = [
  { id: 'help_main', label: 'Help', icon: HelpCircle, href: '#', isActive: false }, // Assuming first Help is distinct or a placeholder
  { id: 'settings', label: 'Settings', icon: Settings, href: '#', isActive: false },
  { id: 'help_footer', label: 'Help', icon: HelpCircle, href: '#', isActive: false }, // Assuming second Help
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  const handleNavClick = React.useCallback((id: string) => {
    setActiveItem(id);
    // Add navigation logic here if using react-router or similar
  }, []);

  const renderNavItem = (item: NavItem) => {
    const IconComponent = item.icon;
    const isActive = activeItem === item.id;
    return (
      <a
        key={item.id}
        href={item.href}
        onClick={() => handleNavClick(item.id)}
        className={cn(
          'flex items-center px-3 py-2.5 rounded-md text-sm font-medium',
          'transition-colors duration-150 ease-in-out',
          isActive
            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'group'
        )}
      >
        <IconComponent className={cn('mr-3 h-5 w-5', isActive ? 'text-primary' : 'text-gray-500 group-hover:text-sidebar-accent-foreground dark:text-gray-400')} />
        {item.label}
      </a>
    );
  };

  return (
    <aside className={cn('flex flex-col h-screen bg-sidebar p-4 text-sidebar-foreground border-r border-sidebar-border', className)}>
      <div className="flex items-center mb-8 px-2">
        <Box className="h-8 w-8 text-primary mr-2" />
        <span className="text-2xl font-bold text-foreground">BO</span>
      </div>

      <nav className="flex-grow space-y-1.5">
        {mainNavItems.map(renderNavItem)}
      </nav>

      <div className="mt-auto pt-4 border-t border-sidebar-border">
        <nav className="space-y-1.5">
          {utilityNavItems.map(renderNavItem)}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarNav;
