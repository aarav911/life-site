import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar, { SidebarTrigger } from './AppSidebar';
import QuickCapture from './QuickCapture';
import { openGoogleCalendar } from '@/lib/calendar';
import { useGTDStore } from '@/store/useGTDStore';
import { CalendarPlus, RotateCcw } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const resetAll = useGTDStore((s) => s.resetAll);
  const [showReset, setShowReset] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/30 px-4 sm:px-6 py-3 flex items-center gap-4">
          <SidebarTrigger onClick={() => setSidebarOpen(true)} />
          <QuickCapture />
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => openGoogleCalendar('Focus Time')}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
            >
              <CalendarPlus size={14} />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setShowReset(true)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </header>

        {/* Reset confirmation */}
        {showReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="glass-card p-6 max-w-sm mx-4 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Reset all data?</h3>
              <p className="text-sm text-muted-foreground">This will permanently delete all your tasks, projects, and notes.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowReset(false)} className="px-4 py-2 text-sm rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
                <button
                  onClick={() => { resetAll(); setShowReset(false); }}
                  className="px-4 py-2 text-sm rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
