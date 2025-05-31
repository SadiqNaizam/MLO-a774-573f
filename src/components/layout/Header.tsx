import React from 'react';
import HeaderBar from '../Dashboard/HeaderBar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  pageTitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, className }) => {
  // The HeaderBar component (from context) provides the base styling 
  // (height, padding, background, border).
  // This Header component wrapper ensures the fixed positioning as per layout requirements.
  // 'left-64' (16rem = 256px) corresponds to the sidebar's width.
  // 'z-20' is set to ensure the header stays above most other page content.
  return (
    <HeaderBar
      pageTitle={pageTitle} // Pass down the pageTitle prop
      className={cn(
        'fixed top-0 left-64 right-0 z-20',
        className
      )}
    />
  );
};

export default Header;
