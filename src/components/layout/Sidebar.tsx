import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav is designed to be the full sidebar content.
  // Its width will be constrained by the parent grid cell in MainAppLayout (which is 256px).
  // SidebarNav's internal styling includes h-screen, which matches the grid row-span requirement.
  return (
    <SidebarNav className={cn(className)} />
  );
};

export default Sidebar;
