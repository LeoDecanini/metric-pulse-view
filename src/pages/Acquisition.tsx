
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import MetricCard from '@/components/dashboard/MetricCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, 
  MousePointer, 
  Activity, 
  Users, 
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO, subDays } from 'date-fns';

// Generate mock data
const generateDates = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - i - 1);
    return format(date, 'yyyy-MM-dd');
  });
};

const last30Days = generateDates(30);

// Traffic source data
const trafficSourceData = [
  { source: 'Búsqueda orgánica', sessions: 3205, percentage: 42 },
  { source: 'Búsqueda de pago', sessions: 1876, percentage: 24 },
  { source: 'Social Media', sessions: 1145, percentage: 15 },
  { source: 'Referral', sessions: 762, percentage: 10 },
  { source: 'Directo', sessions: 683, percentage: 9 },
];

// Search keywords data
const searchKeywordsData = [
  { keyword: 'nombre de la marca', sessions: 875, conversion: 3.4 },
  { keyword: 'producto principal', sessions: 543, conversion: 2.1 },
  { keyword: 'categoría del producto', sessions: 421, conversion: 1.8 },
  { keyword: 'solución al problema', sessions: 386, conversion: 2.5 },
  { keyword: 'comparativa producto', sessions: 329, conversion: 1.9 },
];

// Daily acquisition data
const acquisitionData = last30Days.map(date => {
  return {
    date,
    organic: Math.floor(Math.random() * 300) + 100,
    paid: Math.floor(Math.random() * 250) + 50,
    social: Math.floor(Math.random() * 150) + 30,
    direct: Math.floor(Math.random() * 120) + 20,
    referral: Math.floor(Math.random() * 100) + 15,
  };
});

const Acquisition = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'd MMM');
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
            <h1 className="text-2xl font-bold">Adquisición</h1>
            <DateRangePicker />
          </div>
        </header>
        
        <main className="p-6">
          {/* KPI Cards - Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <MetricCard 
              title="Sesiones Totales" 
              value={7671}
              change={12.4}
              description="vs. mes anterior"
              icon={<Activity size={18} />}
              variant="blue"
            />
            <MetricCard 
              title="Nuevos Usuarios" 
              value={5428}
              change={8.7}
              description="vs. mes anterior"
              icon={<Users size={18} />}
              variant="green"
            />
            <MetricCard 
              title="Tasa de Rebote" 
              value={42.3}
              valueSuffix="%"
              change={-3.8}
              description="vs. mes anterior"
              icon={<TrendingUp size={18} />}
              variant="purple"
            />
            <MetricCard 
              title="Páginas/Sesión" 
              value={2.7}
              change={5.2}
              description="vs. mes anterior"
              icon={<MousePointer size={18} />}
              variant="orange"
            />
            <MetricCard 
              title="Duración Media" 
              value="2:34"
              change={6.8}
              description="vs. mes anterior"
              icon={<Clock size={18} />}
              variant="teal"
            />
          </div>
          
          {/* Acquisition Trend Chart */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Tendencia de Adquisición</CardTitle>
              <CardDescription>Sesiones por canal durante los últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={acquisitionData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem',
                      }}
                      labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      formatter={(value) => [`${value} sesiones`, undefined]}
                      labelFormatter={(label) => format(parseISO(label), 'dd MMM yyyy')}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="organic" stroke="hsl(var(--metric-green))" strokeWidth={2} dot={false} name="Orgánico" />
                    <Line type="monotone" dataKey="paid" stroke="hsl(var(--metric-blue))" strokeWidth={2} dot={false} name="Pago" />
                    <Line type="monotone" dataKey="social" stroke="hsl(var(--metric-purple))" strokeWidth={2} dot={false} name="Social" />
                    <Line type="monotone" dataKey="direct" stroke="hsl(var(--metric-orange))" strokeWidth={2} dot={false} name="Directo" />
                    <Line type="monotone" dataKey="referral" stroke="hsl(var(--metric-teal))" strokeWidth={2} dot={false} name="Referral" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Traffic Source and Keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Traffic Source */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Fuentes de Tráfico</CardTitle>
                <CardDescription>Principales orígenes de las sesiones</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficSourceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" tickLine={false} axisLine={false} />
                      <YAxis 
                        dataKey="source" 
                        type="category" 
                        tickLine={false} 
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--foreground))' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <Bar 
                        dataKey="sessions" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]} 
                        barSize={30}
                        name="Sesiones" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Search Keywords */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Palabras Clave de Búsqueda</CardTitle>
                <CardDescription>Términos que generan más tráfico</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full mt-4">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Palabra Clave</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sesiones</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Conversión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchKeywordsData.map((item, index) => (
                        <tr 
                          key={index} 
                          className={index < searchKeywordsData.length - 1 ? "border-b border-border" : ""}
                        >
                          <td className="py-3 px-4">{item.keyword}</td>
                          <td className="text-right py-3 px-4">{item.sessions.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">{item.conversion}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Acquisition;
