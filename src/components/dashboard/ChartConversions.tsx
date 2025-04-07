
import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface ConversionDataPoint {
  date: string;
  visits: number;
  conversions: number;
  rate: number;
}

interface ChartConversionsProps {
  data: ConversionDataPoint[];
  title?: string;
  className?: string;
}

const ChartConversions: React.FC<ChartConversionsProps> = ({ 
  data, 
  title = "Conversiones y tasa de conversión", 
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
              <div className="w-3 h-3 rounded-full bg-metric-green"></div>
              <span>Conversiones: {payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-metric-purple"></div>
              <span>Tasa de conversión: {payload[1].value.toFixed(2)}%</span>
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
          <ComposedChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 50,
            }}
          >
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
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ bottom: 0 }} 
              formatter={(value) => <span className="text-sm font-medium capitalize">{value === "conversions" ? "Conversiones" : "Tasa de conversión"}</span>}
            />
            <Bar 
              yAxisId="left"
              dataKey="conversions" 
              fill="hsl(var(--metric-green))"
              radius={[4, 4, 0, 0]} 
              name="conversions"
              barSize={30}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="rate" 
              stroke="hsl(var(--metric-purple))" 
              name="rate"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartConversions;
