
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'indigo';
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description, 
  change, 
  icon, 
  variant = 'default',
  valuePrefix,
  valueSuffix,
  className,
  loading = false,
  children
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-to-br from-success/10 to-success/5 border-success/20';
      case 'warning':
        return 'bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20';
      case 'danger':
        return 'bg-gradient-to-br from-danger/10 to-danger/5 border-danger/20';
      case 'blue':
        return 'bg-gradient-to-br from-metric-blue/10 to-metric-blue/5 border-metric-blue/20';
      case 'green':
        return 'bg-gradient-to-br from-metric-green/10 to-metric-green/5 border-metric-green/20';
      case 'purple':
        return 'bg-gradient-to-br from-metric-purple/10 to-metric-purple/5 border-metric-purple/20';
      case 'orange':
        return 'bg-gradient-to-br from-metric-orange/10 to-metric-orange/5 border-metric-orange/20';
      case 'teal':
        return 'bg-gradient-to-br from-metric-teal/10 to-metric-teal/5 border-metric-teal/20';
      case 'indigo':
        return 'bg-gradient-to-br from-metric-indigo/10 to-metric-indigo/5 border-metric-indigo/20';
      default:
        return 'bg-gradient-to-br from-card to-card/80 border-border';
    }
  };

  const getIconVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-danger';
      case 'blue':
        return 'text-metric-blue';
      case 'green':
        return 'text-metric-green';
      case 'purple':
        return 'text-metric-purple';
      case 'orange':
        return 'text-metric-orange';
      case 'teal':
        return 'text-metric-teal';
      case 'indigo':
        return 'text-metric-indigo';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={cn("border backdrop-blur-sm overflow-hidden", getVariantClasses(), className)}>
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className={cn("rounded-lg", getIconVariantClasses())}>{icon}</div>}
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <div className="h-7 w-24 bg-muted animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold">
            {valuePrefix}{typeof value === 'number' ? value.toLocaleString() : value}{valueSuffix}
          </div>
        )}
        
        {(description || change !== undefined) && (
          <div className="flex items-center mt-1 gap-1.5">
            {change !== undefined && !loading && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                change > 0 ? "text-success" : change < 0 ? "text-danger" : "text-muted-foreground"
              )}>
                {change > 0 ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : change < 0 ? (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                ) : null}
                {Math.abs(change)}%
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
