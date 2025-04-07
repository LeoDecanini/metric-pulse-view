
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DateRangePickerProps {
  onDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const [selectedPreset, setSelectedPreset] = useState<string>('last30Days');

  const presets = [
    { label: 'Últimos 7 días', value: 'last7Days', days: 7 },
    { label: 'Últimos 30 días', value: 'last30Days', days: 30 },
    { label: 'Este mes', value: 'thisMonth', days: 0 },
    { label: 'Mes pasado', value: 'lastMonth', days: 0 },
    { label: 'Este año', value: 'thisYear', days: 0 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    const today = new Date();
    let from: Date;
    let to = today;

    if (preset.value === 'last7Days' || preset.value === 'last30Days') {
      from = new Date(today);
      from.setDate(today.getDate() - preset.days);
    } else if (preset.value === 'thisMonth') {
      from = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (preset.value === 'lastMonth') {
      from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      to = new Date(today.getFullYear(), today.getMonth(), 0);
    } else if (preset.value === 'thisYear') {
      from = new Date(today.getFullYear(), 0, 1);
    } else {
      from = new Date(today);
      from.setDate(today.getDate() - 30);
    }

    setDateRange({ from, to });
    setSelectedPreset(preset.value);

    if (onDateRangeChange) {
      onDateRangeChange({ from, to });
    }
  };

  const onRangeChange = (range: DateRange) => {
    setDateRange(range);
    // Only call callback when both dates are selected
    if (range.from && range.to && onDateRangeChange) {
      onDateRangeChange(range);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-between gap-2 w-full sm:w-auto text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "d MMM", { locale: es })} - {format(dateRange.to, "d MMM, yyyy", { locale: es })}
                  </>
                ) : (
                  format(dateRange.from, "d MMM, yyyy", { locale: es })
                )
              ) : (
                "Seleccionar fechas"
              )}
            </span>
          </div>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="border-r border-border">
            <div className="p-3 space-y-3">
              {presets.map((preset) => (
                <Button
                  key={preset.value}
                  size="sm"
                  variant={selectedPreset === preset.value ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    applyPreset(preset);
                    setIsOpen(false);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange}
            onSelect={onRangeChange}
            numberOfMonths={1}
            locale={es}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
