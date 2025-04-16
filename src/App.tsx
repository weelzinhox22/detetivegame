import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./components/dashboard/DashboardPage";
import CasesPage from "./components/cases/CasesPage";
import UltimoBrinde from "./components/cases/UltimoBrinde";
import MansaoAberdeen from "./components/cases/MansaoAberdeen";
import MisterioHospital from "./components/cases/MisterioHospital";
import StatsPage from "./components/stats/StatsPage";
import ProfilePage from "./components/profile/ProfilePage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="cases/o-ultimo-brinde" element={<UltimoBrinde />} />
            <Route path="cases/a-mansao-aberdeen" element={<MansaoAberdeen />} />
            <Route path="cases/o-misterio-do-hospital" element={<MisterioHospital />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
