
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/dashboard/Sidebar';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import MetricCard from '@/components/dashboard/MetricCard';
import ChartVisits from '@/components/dashboard/ChartVisits';
import ChartCampaigns from '@/components/dashboard/ChartCampaigns';
import ChartChannels from '@/components/dashboard/ChartChannels';
import ChartConversions from '@/components/dashboard/ChartConversions';
import ChartROI from '@/components/dashboard/ChartROI';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Search,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import mock data
import { 
  visitsData, 
  conversionData, 
  roiData, 
  costData, 
  channelsData, 
  campaignData,
  realtimeData
} from '@/data/mockData';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // ROI data transformation for the chart
  const roiChartData = roiData.campaigns.map(campaign => ({
    name: campaign.name,
    return: campaign.roi,
    target: campaign.name === 'Social Media' ? 250 : undefined // Just a sample target for one campaign
  }));

  return (
    <>
      <Helmet>
        <title>Dashboard | MetricPulse</title>
      </Helmet>
      
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
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <DateRangePicker />
            </div>
          </header>
          
          <main className="p-6">
            {/* KPI Cards - Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard 
                title="Visitas al sitio" 
                value={visitsData.summary.total}
                change={visitsData.summary.change}
                description={visitsData.summary.period}
                icon={<Users size={18} />}
                variant="blue"
              />
              <MetricCard 
                title="Conversiones" 
                value={conversionData.summary.total}
                change={conversionData.summary.change}
                description={conversionData.summary.period}
                icon={<BarChart3 size={18} />}
                variant="green"
              />
              <MetricCard 
                title="ROI Promedio" 
                value={roiData.summary.avgRoi}
                valueSuffix="%"
                change={roiData.summary.change}
                description={roiData.summary.period}
                icon={<TrendingUp size={18} />}
                variant="purple"
              />
              <MetricCard 
                title="Usuarios Activos" 
                value={realtimeData.activeUsers}
                description="Ahora mismo"
                icon={<Users size={18} />}
                variant="orange"
                className="relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 m-2 w-2 h-2 rounded-full bg-success animate-pulse-light"></div>
              </MetricCard>
            </div>
            
            {/* Second row - Cost Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard 
                title="CPC promedio" 
                value={costData.cpc.value}
                valuePrefix="$"
                change={costData.cpc.change}
                description={costData.cpc.period}
                icon={<Search size={18} />}
                variant="teal"
              />
              <MetricCard 
                title="CPA promedio" 
                value={costData.cpa.value}
                valuePrefix="$"
                change={costData.cpa.change}
                description={costData.cpa.period}
                icon={<DollarSign size={18} />}
                variant="indigo"
              />
              <MetricCard 
                title="Tasa de conversión" 
                value={conversionData.summary.rate}
                valueSuffix="%"
                change={conversionData.summary.change}
                description={conversionData.summary.period}
                icon={<BarChart size={18} />}
                variant="green"
              />
              <MetricCard 
                title="Inversión total" 
                value={roiData.summary.totalSpend}
                valuePrefix="$"
                description={roiData.summary.period}
                icon={<DollarSign size={18} />}
                variant="blue"
              />
            </div>
            
            {/* Charts - First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartVisits data={visitsData.daily} />
              <ChartConversions data={conversionData.daily} />
            </div>
            
            {/* Charts - Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <ChartChannels 
                data={channelsData.channels} 
                title="Distribución de tráfico por canal"
                description={`Total: ${channelsData.summary.total.toLocaleString()} visitas`}
              />
              <div className="lg:col-span-2">
                <ChartCampaigns data={roiData.campaigns} />
              </div>
            </div>
            
            {/* Charts - Third Row */}
            <div className="grid grid-cols-1 gap-6">
              <ChartROI data={roiChartData} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
