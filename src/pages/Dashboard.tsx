import { motion } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { Inbox, FolderKanban, Zap, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const inbox = useGTDStore((s) => s.inbox);
  const projects = useGTDStore((s) => s.projects);
  const nextActions = useGTDStore((s) => s.nextActions);

  const stats = [
    { label: 'Inbox', value: inbox.length, icon: Inbox, color: 'text-primary' },
    { label: 'Active Projects', value: projects.filter((p) => !p.completed).length, icon: FolderKanban, color: 'text-primary' },
    { label: "Today's Focus", value: nextActions.length, icon: Zap, color: 'text-primary' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Good to see you</h2>
        </div>
        <p className="text-muted-foreground text-sm italic">
          "Your mind is like water. When it is turbulent, it is difficult to see. When it is calm, everything becomes clear."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Mind Like Water</h3>
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          When you throw a pebble into still water, the water responds perfectly — no more, no less.
          GTD helps you achieve this state of readiness with your commitments. Capture everything, clarify what it means,
          organize outcomes and actions, reflect on it all, and engage with confidence.
        </p>
      </motion.div>
    </div>
  );
}
