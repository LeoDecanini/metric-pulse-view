
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import MetricCard from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserPlus, 
  Repeat, 
  Clock,
  GlobeIcon,
  Smartphone,
  Laptop
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Mock data para esta vista
const audienceData = {
  summary: {
    total: 24689,
    change: 12.3,
    period: "Últimos 30 días"
  },
  newUsers: {
    total: 15327,
    change: 8.7,
    period: "Últimos 30 días"
  },
  returningUsers: {
    total: 9362,
    change: 5.2,
    period: "Últimos 30 días"
  },
  avgSessionDuration: {
    value: "3:24",
    change: -1.5,
    period: "Últimos 30 días"
  },
  demographics: [
    { age: "18-24", male: 1245, female: 1587 },
    { age: "25-34", male: 3587, female: 4125 },
    { age: "35-44", male: 2854, female: 3102 },
    { age: "45-54", male: 1758, female: 1923 },
    { age: "55-64", male: 1132, female: 1253 },
    { age: "65+", male: 987, female: 1136 },
  ],
  devices: [
    { name: "Móvil", value: 62 },
    { name: "Desktop", value: 31 },
    { name: "Tablet", value: 7 },
  ],
  geolocation: [
    { country: "España", users: 12547 },
    { country: "México", users: 4568 },
    { country: "Argentina", users: 3254 },
    { country: "Colombia", users: 2154 },
    { country: "Chile", users: 1268 },
    { country: "Otros", users: 898 }
  ],
  engagement: [
    { day: "Lun", pageviews: 12453, sessions: 8741 },
    { day: "Mar", pageviews: 13587, sessions: 9254 },
    { day: "Mié", pageviews: 14256, sessions: 9871 },
    { day: "Jue", pageviews: 13985, sessions: 9654 },
    { day: "Vie", pageviews: 15478, sessions: 10254 },
    { day: "Sáb", pageviews: 11256, sessions: 7845 },
    { day: "Dom", pageviews: 9854, sessions: 6254 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Audience = () => {
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
            <h1 className="text-2xl font-bold">Audiencia</h1>
            <DateRangePicker />
          </div>
        </header>
        
        <main className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Total Usuarios" 
              value={audienceData.summary.total}
              change={audienceData.summary.change}
              description={audienceData.summary.period}
              icon={<Users size={18} />}
              variant="blue"
            />
            <MetricCard 
              title="Nuevos Usuarios" 
              value={audienceData.newUsers.total}
              change={audienceData.newUsers.change}
              description={audienceData.newUsers.period}
              icon={<UserPlus size={18} />}
              variant="green"
            />
            <MetricCard 
              title="Usuarios Recurrentes" 
              value={audienceData.returningUsers.total}
              change={audienceData.returningUsers.change}
              description={audienceData.returningUsers.period}
              icon={<Repeat size={18} />}
              variant="purple"
            />
            <MetricCard 
              title="Duración Media Sesión" 
              value={audienceData.avgSessionDuration.value}
              change={audienceData.avgSessionDuration.change}
              description={audienceData.avgSessionDuration.period}
              icon={<Clock size={18} />}
              variant="indigo"
            />
          </div>
          
          {/* Demographics & Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Demografía (Edad y Género)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={audienceData.demographics}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" name="Hombres" fill="#3b82f6" />
                      <Bar dataKey="female" name="Mujeres" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Dispositivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex flex-col justify-center">
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={audienceData.devices}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {audienceData.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} className="text-[#0088FE]" />
                      <span className="text-sm">Móvil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Laptop size={16} className="text-[#00C49F]" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FFBB28] rounded-sm"></div>
                      <span className="text-sm">Tablet</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Geolocation & Engagement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Ubicación Geográfica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={audienceData.geolocation}
                      margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="country" />
                      <Tooltip />
                      <Bar dataKey="users" name="Usuarios" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Engagement por Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={audienceData.engagement}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="pageviews" stroke="#2563eb" name="Páginas vistas" />
                      <Line yAxisId="right" type="monotone" dataKey="sessions" stroke="#8b5cf6" name="Sesiones" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Audience;
