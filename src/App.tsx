import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import InboxPage from "./pages/InboxPage";
import NextActionsPage from "./pages/NextActionsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import WaitingForPage from "./pages/WaitingForPage";
import SomedayPage from "./pages/SomedayPage";
import HorizonsPage from "./pages/HorizonsPage";
import WeeklyReviewPage from "./pages/WeeklyReviewPage";
import RestPage from "./pages/RestPage";
import CalendarPage from "./pages/CalendarPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

import { StatusBar } from "@capacitor/status-bar";

const queryClient = new QueryClient();

const App = () => {
  // 🔥 Fix iPhone notch / status bar overlap
  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: false });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />

        {/* ✅ Safe area wrapper */}
        <div className="min-h-screen pt-safe pb-safe">
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/next-actions" element={<NextActionsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/waiting-for" element={<WaitingForPage />} />
                <Route path="/someday" element={<SomedayPage />} />
                <Route path="/horizons" element={<HorizonsPage />} />
                <Route path="/weekly-review" element={<WeeklyReviewPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/rest" element={<RestPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;