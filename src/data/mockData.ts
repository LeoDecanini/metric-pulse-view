
// Date formatting utility
import { format, subDays } from 'date-fns';

// Generate dates for the last 30 days
const generateDates = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - i - 1);
    return format(date, 'yyyy-MM-dd');
  });
};

const last30Days = generateDates(30);
const last7Days = last30Days.slice(-7);

// Website Visits data
export const visitsData = {
  daily: last30Days.map((date) => ({
    date,
    visits: Math.floor(Math.random() * 3000) + 1000,
    uniqueVisitors: Math.floor(Math.random() * 2000) + 500,
  })),
  summary: {
    total: 72516,
    change: 12.4,
    period: 'Últimos 30 días'
  }
};

// Conversion data
export const conversionData = {
  daily: last30Days.map((date) => {
    const visits = Math.floor(Math.random() * 3000) + 1000;
    const conversions = Math.floor(visits * (Math.random() * 0.05 + 0.02));
    return {
      date,
      visits,
      conversions,
      rate: parseFloat(((conversions / visits) * 100).toFixed(2))
    };
  }),
  summary: {
    total: 2134,
    rate: 2.94,
    change: 5.7,
    period: 'Últimos 30 días'
  }
};

// Campaign ROI data
export const roiData = {
  campaigns: [
    { name: 'Búsqueda de marca', spend: 3250, revenue: 9750, roi: 300 },
    { name: 'Búsqueda genérica', spend: 5150, revenue: 12875, roi: 250 },
    { name: 'Display', spend: 4200, revenue: 8400, roi: 200 },
    { name: 'Social Media', spend: 3750, revenue: 8625, roi: 230 },
    { name: 'Video', spend: 2800, revenue: 5600, roi: 200 }
  ],
  summary: {
    totalSpend: 19150,
    totalRevenue: 45250,
    avgRoi: 236,
    change: 8.3,
    period: 'Últimos 30 días'
  }
};

// Cost data
export const costData = {
  cpc: {
    value: 1.24,
    change: -3.8,
    period: 'vs. mes anterior'
  },
  cpa: {
    value: 18.75,
    change: -5.2,
    period: 'vs. mes anterior'
  }
};

// Traffic channels data
export const channelsData = {
  channels: [
    { name: 'Orgánico', value: 42, color: '#10B981' },
    { name: 'Directo', value: 18, color: '#3B82F6' },
    { name: 'Social', value: 15, color: '#8B5CF6' },
    { name: 'Referral', value: 10, color: '#F59E0B' },
    { name: 'Paid Search', value: 12, color: '#EC4899' },
    { name: 'Display', value: 3, color: '#6366F1' }
  ],
  summary: {
    total: 72516,
    topChannel: 'Orgánico',
    topValue: 42,
    period: 'Últimos 30 días'
  }
};

// Campaign performance data
export const campaignData = {
  campaigns: [
    { name: 'Google Search - Marca', impressions: 82340, clicks: 8234, conversions: 412, ctr: 10, cvr: 5 },
    { name: 'Google Search - Genérico', impressions: 156780, clicks: 9407, conversions: 329, ctr: 6, cvr: 3.5 },
    { name: 'Facebook - Intereses', impressions: 203450, clicks: 7121, conversions: 285, ctr: 3.5, cvr: 4 },
    { name: 'Instagram - Lookalike', impressions: 187620, clicks: 6567, conversions: 263, ctr: 3.5, cvr: 4 },
    { name: 'YouTube - In-stream', impressions: 98760, clicks: 3951, conversions: 119, ctr: 4, cvr: 3 },
    { name: 'Display - Remarketing', impressions: 132540, clicks: 3976, conversions: 159, ctr: 3, cvr: 4 }
  ],
  summary: {
    totalImpressions: 861490,
    totalClicks: 39256,
    totalConversions: 1567,
    avgCtr: 4.56,
    avgCvr: 3.99,
    period: 'Últimos 30 días'
  }
};

// Realtime data
export const realtimeData = {
  activeUsers: 237,
  pageViews: {
    'last30min': [65, 78, 62, 83, 80, 72, 74, 85, 76, 68]
  },
  topPages: [
    { path: '/productos', users: 42 },
    { path: '/inicio', users: 38 },
    { path: '/ofertas', users: 27 },
    { path: '/contacto', users: 15 }
  ]
};
