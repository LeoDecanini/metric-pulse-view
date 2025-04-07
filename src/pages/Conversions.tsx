
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import MetricCard from '@/components/dashboard/MetricCard';
import ChartConversions from '@/components/dashboard/ChartConversions';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  Users, 
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { conversionData } from '@/data/mockData';

// Conversion by goal data
const conversionGoalsData = [
  { goal: 'Compra completada', value: 547, percentage: 41 },
  { goal: 'Formulario de contacto', value: 321, percentage: 24 },
  { goal: 'Suscripción al newsletter', value: 286, percentage: 21 },
  { goal: 'Demo solicitada', value: 175, percentage: 13 },
];

// Colors for pie chart
const COLORS = ['hsl(var(--metric-blue))', 'hsl(var(--metric-green))', 'hsl(var(--metric-purple))', 'hsl(var(--metric-orange))'];

// Funnel data
const funnelData = [
  { name: 'Visitas', value: 24680 },
  { name: 'Vistas de productos', value: 12540 },
  { name: 'Añadidos al carrito', value: 4320 },
  { name: 'Inicio de compra', value: 2780 },
  { name: 'Compras', value: 1329 },
];

const Conversions = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // Calculate conversion rates for funnel visualization
  const calculateRate = (current: number, previous: number) => {
    return ((current / previous) * 100).toFixed(1);
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
            <h1 className="text-2xl font-bold">Conversiones</h1>
            <DateRangePicker />
          </div>
        </header>
        
        <main className="p-6">
          {/* KPI Cards - Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <MetricCard 
              title="Conversiones Totales" 
              value={conversionData.summary.total}
              change={conversionData.summary.change}
              description="vs. mes anterior"
              icon={<ShoppingCart size={18} />}
              variant="green"
            />
            <MetricCard 
              title="Tasa de Conversión" 
              value={conversionData.summary.rate}
              valueSuffix="%"
              change={conversionData.summary.change}
              description="vs. mes anterior"
              icon={<Users size={18} />}
              variant="blue"
            />
            <MetricCard 
              title="Valor Promedio" 
              value={78.5}
              valuePrefix="$"
              change={4.2}
              description="vs. mes anterior"
              icon={<CreditCard size={18} />}
              variant="purple"
            />
            <MetricCard 
              title="Ingresos" 
              value={167580}
              valuePrefix="$"
              change={15.7}
              description="vs. mes anterior"
              icon={<DollarSign size={18} />}
              variant="orange"
            />
            <MetricCard 
              title="Tasa de Abandono" 
              value={62.4}
              valueSuffix="%"
              change={-2.8}
              description="vs. mes anterior"
              icon={<FileText size={18} />}
              variant="teal"
            />
          </div>
          
          {/* Conversion Trend Chart */}
          <div className="mb-6">
            <ChartConversions data={conversionData.daily} title="Conversiones y tasa de conversión" />
          </div>
          
          {/* Conversion Goals and Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Conversion Goals */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Conversiones por Objetivo</CardTitle>
                <CardDescription>Distribución de tipos de conversión</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={conversionGoalsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="goal"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {conversionGoalsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} conversiones`, 'Conversiones']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Conversion Funnel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Embudo de Conversión</CardTitle>
                <CardDescription>Flujo de usuarios hasta la conversión</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={funnelData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" tickLine={false} axisLine={false} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tickLine={false} 
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--foreground))' }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value.toLocaleString()} usuarios`, undefined]}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]} 
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Conversion Rates Between Steps */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Vistas de producto → Carrito</span>
                    <span className="font-medium">{calculateRate(funnelData[2].value, funnelData[1].value)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Carrito → Checkout</span>
                    <span className="font-medium">{calculateRate(funnelData[3].value, funnelData[2].value)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Checkout → Compra</span>
                    <span className="font-medium">{calculateRate(funnelData[4].value, funnelData[3].value)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Conversions;
