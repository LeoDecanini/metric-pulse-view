
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import MetricCard from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Flag,
  Megaphone,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area
} from 'recharts';

// Mock data para esta vista
const campaignsData = {
  summary: {
    active: 12,
    change: 2,
    period: "vs mes anterior"
  },
  totalSpend: {
    value: 45678.90,
    change: 15.4,
    period: "Últimos 30 días"
  },
  totalImpressions: {
    value: 2458921,
    change: 22.7,
    period: "Últimos 30 días"
  },
  totalClicks: {
    value: 87459,
    change: 18.3,
    period: "Últimos 30 días"
  },
  campaigns: [
    { name: "Brand Awareness Q2", spend: 12450, impressions: 845000, clicks: 32500, conversions: 2145, ctr: 3.85, cpc: 0.38, status: "active" },
    { name: "Summer Collection", spend: 9870, impressions: 658000, clicks: 18900, conversions: 1250, ctr: 2.87, cpc: 0.52, status: "active" },
    { name: "Retargeting - Website", spend: 6540, impressions: 325000, clicks: 12450, conversions: 980, ctr: 3.83, cpc: 0.53, status: "active" },
    { name: "New Client Acquisition", spend: 8920, impressions: 420000, clicks: 15600, conversions: 1050, ctr: 3.71, cpc: 0.57, status: "active" },
    { name: "Spring Promotion", spend: 7890, impressions: 210921, clicks: 8009, conversions: 546, ctr: 3.80, cpc: 0.99, status: "inactive" },
  ],
  performanceByPlatform: [
    { platform: "Google Ads", spend: 18750, impressions: 980000, clicks: 45000, conversions: 2300, ctr: 4.59, cpc: 0.42 },
    { platform: "Meta Ads", spend: 15400, impressions: 850000, clicks: 28000, conversions: 1800, ctr: 3.29, cpc: 0.55 },
    { platform: "LinkedIn", spend: 8700, impressions: 320000, clicks: 9500, conversions: 520, ctr: 2.97, cpc: 0.92 },
    { platform: "TikTok", spend: 2828.90, impressions: 308921, clicks: 4959, conversions: 290, ctr: 1.60, cpc: 0.57 },
  ],
  performanceByDay: [
    { day: "01/04", clicks: 2400, impressions: 45000, ctr: 5.33 },
    { day: "02/04", clicks: 2100, impressions: 42000, ctr: 5.00 },
    { day: "03/04", clicks: 2800, impressions: 50000, ctr: 5.60 },
    { day: "04/04", clicks: 2700, impressions: 51000, ctr: 5.29 },
    { day: "05/04", clicks: 2900, impressions: 54000, ctr: 5.37 },
    { day: "06/04", clicks: 2300, impressions: 48000, ctr: 4.79 },
    { day: "07/04", clicks: 1800, impressions: 40000, ctr: 4.50 },
    { day: "08/04", clicks: 2500, impressions: 46000, ctr: 5.43 },
    { day: "09/04", clicks: 2600, impressions: 48000, ctr: 5.42 },
    { day: "10/04", clicks: 2350, impressions: 44000, ctr: 5.34 },
    { day: "11/04", clicks: 2800, impressions: 52000, ctr: 5.38 },
    { day: "12/04", clicks: 3000, impressions: 58000, ctr: 5.17 },
    { day: "13/04", clicks: 2950, impressions: 56000, ctr: 5.27 },
    { day: "14/04", clicks: 2700, impressions: 53000, ctr: 5.09 },
  ],
  budgetDistribution: [
    { name: "Google Ads", value: 41 },
    { name: "Meta Ads", value: 34 },
    { name: "LinkedIn", value: 19 },
    { name: "TikTok", value: 6 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const Campaigns = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto pb-10",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Campañas</h1>
            <DateRangePicker />
          </div>
        </header>
        
        <main className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Campañas Activas" 
              value={campaignsData.summary.active}
              change={campaignsData.summary.change}
              description={campaignsData.summary.period}
              icon={<Flag size={18} />}
              variant="blue"
            />
            <MetricCard 
              title="Gasto Total" 
              value={campaignsData.totalSpend.value}
              valuePrefix="$"
              change={campaignsData.totalSpend.change}
              description={campaignsData.totalSpend.period}
              icon={<DollarSign size={18} />}
              variant="green"
            />
            <MetricCard 
              title="Impresiones" 
              value={campaignsData.totalImpressions.value}
              change={campaignsData.totalImpressions.change}
              description={campaignsData.totalImpressions.period}
              icon={<Megaphone size={18} />}
              variant="purple"
            />
            <MetricCard 
              title="Clics" 
              value={campaignsData.totalClicks.value}
              change={campaignsData.totalClicks.change}
              description={campaignsData.totalClicks.period}
              icon={<ArrowUpRight size={18} />}
              variant="indigo"
            />
          </div>
          
          {/* Top performing campaigns */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Rendimiento por Campaña</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignsData.campaigns}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip formatter={(value, name) => {
                      if (name === "spend") return formatCurrency(Number(value));
                      return value;
                    }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="clicks" name="Clics" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="spend" name="Gasto ($)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance by Platform & Day */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Rendimiento por Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={campaignsData.performanceByPlatform}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="platform" />
                      <Tooltip formatter={(value, name) => {
                        if (name === "spend") return formatCurrency(Number(value));
                        if (name === "ctr") return `${value}%`;
                        if (name === "cpc") return formatCurrency(Number(value));
                        return value;
                      }} />
                      <Legend />
                      <Bar dataKey="conversions" name="Conversiones" fill="#8884d8" />
                      <Bar dataKey="ctr" name="CTR (%)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Tendencia de Clicks e Impresiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={campaignsData.performanceByDay}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="ctr" name="CTR (%)" stroke="#ff7300" />
                      <Area yAxisId="left" type="monotone" dataKey="impressions" name="Impresiones" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.3} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Campaign details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Detalles de Campañas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Nombre</th>
                      <th className="text-right p-3 font-medium">Gasto</th>
                      <th className="text-right p-3 font-medium">Impresiones</th>
                      <th className="text-right p-3 font-medium">Clics</th>
                      <th className="text-right p-3 font-medium">Conversiones</th>
                      <th className="text-right p-3 font-medium">CTR</th>
                      <th className="text-right p-3 font-medium">CPC</th>
                      <th className="text-center p-3 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignsData.campaigns.map((campaign, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">{campaign.name}</td>
                        <td className="p-3 text-right">${campaign.spend.toLocaleString()}</td>
                        <td className="p-3 text-right">{campaign.impressions.toLocaleString()}</td>
                        <td className="p-3 text-right">{campaign.clicks.toLocaleString()}</td>
                        <td className="p-3 text-right">{campaign.conversions.toLocaleString()}</td>
                        <td className="p-3 text-right">{campaign.ctr}%</td>
                        <td className="p-3 text-right">${campaign.cpc}</td>
                        <td className="p-3 text-center">
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            campaign.status === "active" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-gray-500/10 text-gray-500"
                          )}>
                            {campaign.status === "active" ? "Activa" : "Inactiva"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Campaigns;
