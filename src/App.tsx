
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Audience from "./pages/Audience";
import Campaigns from "./pages/Campaigns";
import Acquisition from "./pages/Acquisition";
import Conversions from "./pages/Conversions";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Get the saved theme preference or use 'dark' as default
const savedTheme = localStorage.getItem("metric-pulse-theme") || "dark";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme={savedTheme as "dark" | "light" | "system"} storageKey="metric-pulse-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/audience" element={<Audience />} />
            <Route path="/dashboard/campaigns" element={<Campaigns />} />
            <Route path="/dashboard/acquisition" element={<Acquisition />} />
            <Route path="/dashboard/conversions" element={<Conversions />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
