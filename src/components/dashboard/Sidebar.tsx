
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  DollarSign,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Resumen', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Adquisición', path: '/dashboard/acquisition', icon: TrendingUp },
    { name: 'Campañas', path: '/dashboard/campaigns', icon: BarChart3 },
    { name: 'Conversiones', path: '/dashboard/conversions', icon: DollarSign },
    { name: 'Audiencia', path: '/dashboard/audience', icon: Users },
  ];

  return (
    <div className={cn(
      "h-screen fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 bg-sidebar text-sidebar-foreground flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-sidebar-foreground">MetricPulse</h1>
        )}
        <button 
          onClick={onToggle}
          className="p-1.5 rounded-md bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground transition ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto scrollbar-hidden">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings size={20} />
          {!collapsed && <span>Configuración</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
