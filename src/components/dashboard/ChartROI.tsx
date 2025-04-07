
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ROIData {
  name: string;
  return: number;
  target?: number;
}

interface ChartROIProps {
  data: ROIData[];
  title?: string;
  className?: string;
}

const ChartROI: React.FC<ChartROIProps> = ({ 
  data, 
  title = "ROI por canal", 
  className 
}) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (active && payload && payload.length && label) {
      return (
        <div className="bg-popover border border-border shadow-md rounded-md p-3 text-sm">
          <p className="font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-metric-green"></div>
              <span>ROI: {payload[0].value}%</span>
            </div>
            {payload.length > 1 && payload[1].value && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span>Objetivo: {payload[1].value}%</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-1">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 50,
            }}
          >
            <defs>
              <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--metric-green))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--metric-green))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickMargin={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${value}%`}
            />
            <ReferenceLine
              y={100}
              label={{ 
                value: 'Break-even', 
                position: 'right',
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 12 
              }}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ bottom: 0 }} 
              formatter={(value) => <span className="text-sm font-medium capitalize">{value === "return" ? "ROI" : "Objetivo"}</span>}
            />
            <Area 
              type="monotone" 
              dataKey="return" 
              stroke="hsl(var(--metric-green))" 
              fill="url(#colorROI)" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            {data.some(item => item.target) && (
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                activeDot={{ r: 6 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartROI;
