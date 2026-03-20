import { NavLink, useLocation } from 'react-router-dom';
import { Home, Inbox, Zap, FolderKanban, Clock, Sprout, Mountain, CalendarCheck, Leaf, CalendarDays, BookOpen, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/inbox', label: 'Inbox', icon: Inbox },
  { to: '/next-actions', label: 'Next Actions', icon: Zap },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/waiting-for', label: 'Waiting For', icon: Clock },
  { to: '/someday', label: 'Someday / Maybe', icon: Sprout },
  { to: '/horizons', label: 'Horizons of Focus', icon: Mountain },
  { to: '/weekly-review', label: 'Weekly Review', icon: CalendarCheck },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/rest', label: 'Rest & Recharge', icon: Leaf },
  { to: '/about', label: 'About GTD', icon: BookOpen },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AppSidebar({ open, onClose }: Props) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">ClearMind</h1>
            <p className="text-xs text-muted-foreground">GTD Flow</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={`sidebar-link ${location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to)) ? 'sidebar-link-active' : ''}`}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground/50">"Your mind is for having ideas, not holding them."</p>
        </div>
      </aside>
    </>
  );
}

export function SidebarTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
      <Menu size={20} />
    </button>
  );
}
