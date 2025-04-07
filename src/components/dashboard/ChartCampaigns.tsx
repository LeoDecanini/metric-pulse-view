
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LabelList,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CampaignData {
  name: string;
  spend: number;
  revenue: number;
  roi: number;
}

interface ChartCampaignsProps {
  data: CampaignData[];
  title?: string;
  className?: string;
}

const ChartCampaigns: React.FC<ChartCampaignsProps> = ({ 
  data, 
  title = "ROI por campaña", 
  className 
}) => {
  const colors = {
    revenue: 'hsl(var(--metric-green))',
    spend: 'hsl(var(--metric-blue))'
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
          <p className="font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.spend }}></div>
              <span>Inversión: ${payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.revenue }}></div>
              <span>Ingresos: ${payload[1].value.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--metric-purple))' }}></div>
              <span>ROI: {payload[0].payload.roi}%</span>
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
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 50,
            }}
            barGap={0}
            barCategoryGap={15}
          >
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
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ bottom: 0 }} 
              formatter={(value) => <span className="text-sm font-medium capitalize">{value === "spend" ? "Inversión" : "Ingresos"}</span>}
            />
            <Bar dataKey="spend" fill={colors.spend} radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" fill={colors.revenue} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCampaigns;
