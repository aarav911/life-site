import { motion } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { Leaf, CalendarPlus } from 'lucide-react';
import { openGoogleCalendar } from '@/lib/calendar';

export default function RestPage() {
  const restActions = useGTDStore((s) => s.restActions);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Leaf size={22} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Rest & Recharge</h2>
      </div>
      <p className="text-sm text-muted-foreground">Productivity without rest is burnout. Schedule something restorative today.</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {restActions.map((action, i) => (
          <motion.button
            key={`${action}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => openGoogleCalendar(action)}
            className="glass-card-hover p-5 flex items-center justify-between group text-left"
          >
            <span className="text-sm text-foreground">{action}</span>
            <CalendarPlus size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
