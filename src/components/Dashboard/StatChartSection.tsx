import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ChevronDown } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface MonthlyStat {
  month: string;
  closedWon: number;
  closedLost: number;
  leadsCame?: number;
  totalDealsSize?: number;
}

const leadsTrackingData: MonthlyStat[] = [
  { month: 'March', closedWon: 65, closedLost: 60, leadsCame: 150, totalDealsSize: 75000 },
  { month: 'April', closedWon: 50, closedLost: 38, leadsCame: 120, totalDealsSize: 60000 },
  { month: 'May', closedWon: 85, closedLost: 42, leadsCame: 180, totalDealsSize: 95000 },
  { month: 'June', closedWon: 60, closedLost: 10, leadsCame: 140, totalDealsSize: 70000 },
  { month: 'July', closedWon: 75, closedLost: 40, leadsCame: 160, totalDealsSize: 85000 },
  { month: 'August', closedWon: 95, closedLost: 68, leadsCame: 200, totalDealsSize: 110000 },
];

interface StatChartSectionProps {
  className?: string;
}

const StatChartSection: React.FC<StatChartSectionProps> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('Last 6 months');
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  const totalClosed = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0);

  const chartDataKey1 = activeTab === 'leadsCame' ? 'leadsCame' : 'closedWon';
  const chartDataKey2 = activeTab === 'leadsCame' ? undefined : (activeTab === 'totalDealsSize' ? undefined : 'closedLost');
  const chartLegend1 = activeTab === 'leadsCame' ? 'Leads Came' : (activeTab === 'totalDealsSize' ? 'Total Deals Size' : 'Closed Won');
  const chartLegend2 = activeTab === 'leadsCame' ? undefined : (activeTab === 'totalDealsSize' ? undefined : 'Closed Lost');
  const yAxisLabel = activeTab === 'totalDealsSize' ? '$' : '';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border border-border rounded shadow-lg">
          <p className="label text-sm text-foreground">{`${label}`}</p>
          {payload.map((pld: any, index: number) => (
             <p key={index} style={{ color: pld.color }} className="text-xs">
                {`${pld.name}: ${yAxisLabel}${pld.value.toLocaleString()}`}
             </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
          <div className="mt-1 space-x-4">
            <span className="text-2xl font-bold text-foreground">{totalClosed.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">total closed</span>
            <span className="text-2xl font-bold text-foreground ml-4">{totalLost.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-foreground">{timeRange}</span>
              <ChevronDown className="ml-1.5 h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {['Last 7 days', 'Last 30 days', 'Last 6 months', 'Last 12 months'].map((range) => (
              <DropdownMenuItem key={range} onClick={() => setTimeRange(range)}>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="leadsCame">Leads came</TabsTrigger>
                <TabsTrigger value="leadsConverted">Leads Converted</TabsTrigger>
                <TabsTrigger value="totalDealsSize">Total deals size</TabsTrigger>
            </TabsList>
        </Tabs>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(value) => `${yAxisLabel}${value}`}/>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="square" 
                iconSize={10}
                formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
              />
              <Area type="monotone" dataKey={chartDataKey1} name={chartLegend1} stroke="hsl(var(--accent-blue-val))" fillOpacity={0.3} fill="url(#colorClosedWon)" strokeWidth={2} />
              {chartDataKey2 && (
                <Area type="monotone" dataKey={chartDataKey2} name={chartLegend2} stroke="hsl(var(--destructive))" fillOpacity={0.2} fill="url(#colorClosedLost)" strokeWidth={2} />
              )}
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent-blue-val))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--accent-blue-val))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatChartSection;
