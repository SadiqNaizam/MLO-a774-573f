import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, CalendarDays, PlusCircle } from 'lucide-react';

interface HeaderBarProps {
  className?: string;
  pageTitle?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  className,
  pageTitle = 'Dashboard'
}) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<string>('Last 6 months');

  const dateRanges = [
    'Today',
    'Last 7 days',
    'Last 30 days',
    'Last 6 months',
    'Last 12 months',
  ];

  return (
    <header 
      className={cn(
        'flex items-center justify-between px-6 bg-card h-[70px]', 
        'border-b border-border', // Added border to match typical header styles
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{selectedDateRange}</span>
              <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Date Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dateRanges.map((range) => (
              <DropdownMenuItem key={range} onClick={() => setSelectedDateRange(range)}>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Lead
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Proposal
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HeaderBar;
