import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string; // To be passed to the Header component
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle, className }) => {
  // Overall layout structure is a CSS Grid as per Layout Requirements:
  // - Sidebar: 256px width (w-64), full height.
  // - Header: 70px height, occupying the top part of the main content column.
  // - Main Content: Remaining space, scrollable.
  // The grid-cols-[256px_1fr] sets the sidebar width and lets the main area take the rest.
  // The grid-rows-[70px_1fr] sets the header height and lets the content area take the rest.
  return (
    <div
      className={cn(
        'grid grid-cols-[256px_1fr] grid-rows-[70px_1fr] h-screen',
        'bg-background text-foreground', // Base styling for the entire app shell
        className
      )}
    >
      {/* Sidebar Area: Occupies the first column and spans both rows (full height) */}
      <div className="row-span-2">
        <Sidebar />
      </div>

      {/* Header Area: Occupies the first row of the second column */}
      {/* The Header component itself handles its fixed positioning and styling. */}
      {/* This grid cell effectively reserves space for the fixed header. */}
      <div className="col-start-2 row-start-1">
        <Header pageTitle={pageTitle} />
      </div>

      {/* Main Content Area: Occupies the second row of the second column */}
      <main className="col-start-2 row-start-2 overflow-y-auto bg-background">
        {/* Inner div for consistent padding and flex layout of page content */}
        {/* as specified in Layout Requirements (mainContent.layout) */}
        <div className="flex flex-col gap-8 p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
