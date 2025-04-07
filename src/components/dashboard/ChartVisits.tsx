
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface VisitDataPoint {
  date: string;
  visits: number;
  uniqueVisitors: number;
}

interface ChartVisitsProps {
  data: VisitDataPoint[];
  title?: string;
  className?: string;
}

const ChartVisits: React.FC<ChartVisitsProps> = ({ 
  data, 
  title = "Visitas al sitio web", 
  className 
}) => {
  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'd MMM', { locale: es });
  };
  
  const formatTooltipDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'EEEE, d MMMM yyyy', { locale: es });
  };

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
          <p className="font-medium mb-2">{formatTooltipDate(label)}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Visitas: {payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-metric-purple"></div>
              <span>Visitantes únicos: {payload[1].value.toLocaleString()}</span>
            </div>
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
              right: 20,
              left: 10,
              bottom: 50,
            }}
          >
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              minTickGap={15}
              tickMargin={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ bottom: 0 }} 
              formatter={(value) => <span className="text-sm font-medium capitalize">{value}</span>}
            />
            <Area 
              type="monotone"
              name="Visitas"
              dataKey="visits" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#colorVisits)"
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone"
              name="Visitantes únicos"
              dataKey="uniqueVisitors" 
              stroke="hsl(var(--metric-purple))" 
              strokeWidth={2}
              fill="url(#colorUniqueVisitors)"
              dot={false}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartVisits;
