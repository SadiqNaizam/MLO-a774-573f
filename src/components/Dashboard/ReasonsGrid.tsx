import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonItem {
  id: string;
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonItem[] = [
  { id: 'reason1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'reason2', percentage: 20, description: 'However venture pursuit' },
  { id: 'reason3', percentage: 10, description: 'Other' },
  { id: 'reason4', percentage: 30, description: 'The proposal is unclear' }, // Duplicated text from image for visual consistency
];

interface OtherDataItem {
  id: string;
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataItems: OtherDataItem[] = [
  { id: 'data1', value: '900', label: 'total leads count' },
  { id: 'data2', value: '12', label: 'days in average to convert lead' },
  { id: 'data3', value: '30', label: 'inactive leads', hasInfo: true, infoText: 'Leads with no activity for 30+ days.' },
];

interface ReasonsGridProps {
  className?: string;
}

const ReasonsLostCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        {reasonsLostData.map((reason) => (
          <div key={reason.id}>
            <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
            <p className="text-sm text-muted-foreground">{reason.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const OtherDataCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {otherDataItems.map((item) => (
          <div key={item.id}>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-foreground">{item.value}</p>
              {item.hasInfo && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-1 h-5 w-5">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.infoText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const ReasonsGrid: React.FC<ReasonsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <ReasonsLostCard />
      <OtherDataCard />
    </div>
  );
};

export default ReasonsGrid;
