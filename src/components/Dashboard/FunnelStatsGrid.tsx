import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip
} from 'recharts';

// Funnel Data
interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
  textColor?: string; // Tailwind text color class for progress bar labels
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-rose-500', textColor: 'text-rose-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-amber-500', textColor: 'text-amber-500' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 5, color: 'bg-indigo-500', textColor: 'text-indigo-500' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-emerald-500', textColor: 'text-emerald-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-500', textColor: 'text-purple-500' },
];
const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

// Sources Data for Pie Chart
interface SourceData {
  name: string;
  value: number;
  percentage: number;
  fill: string; // Hex color for Recharts
}
const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, fill: '#F43F5E' }, // rose-500
  { name: 'Behance', value: 1000, percentage: 40, fill: '#F59E0B' }, // amber-500
  { name: 'Instagram', value: 1000, percentage: 10, fill: '#10B981' }, // emerald-500
  { name: 'Dribbble', value: 1000, percentage: 10, fill: '#8B5CF6' }, // purple-500
];

interface FunnelStatsGridProps {
  className?: string;
}

const FunnelStatsCard: React.FC = () => {
  const totalActiveLeads = funnelData.reduce((acc, stage) => acc + stage.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>
        <div className="w-full h-3 mb-6 flex rounded-full overflow-hidden">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(stage.color, 'h-full')}
                    style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count} leads</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <ul className="space-y-3">
          {funnelData.map((stage) => (
            <li key={stage.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={cn('w-3 h-3 rounded-sm mr-2', stage.color)}></span>
                <span className="text-foreground">{stage.name}</span>
              </div>
              <div className="flex items-center space-x-6 text-muted-foreground">
                <span>{stage.count}</span>
                <span>${stage.value}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-default">{stage.days} days</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const SourcesChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div style={{ width: '100%', height: 200 }} className="mb-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={sourcesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {sourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number, name: string, props) => [`$${value}`, props.payload.name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="w-full space-y-2">
          {sourcesData.map((source) => (
            <li key={source.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: source.fill }}></span>
                <span className="text-foreground">{source.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>${source.value.toLocaleString()}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-default">{source.percentage}%</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>From leads total</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const FunnelStatsGrid: React.FC<FunnelStatsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <FunnelStatsCard />
      <SourcesChartCard />
    </div>
  );
};

export default FunnelStatsGrid;
