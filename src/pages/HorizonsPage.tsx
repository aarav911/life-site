import { motion } from 'framer-motion';
import { useGTDStore, Horizons } from '@/store/useGTDStore';
import { Mountain } from 'lucide-react';

const levels: { key: keyof Horizons; label: string; altitude: string }[] = [
  { key: 'purpose', label: 'Purpose & Principles', altitude: '50,000 ft' },
  { key: 'vision', label: 'Vision', altitude: '40,000 ft' },
  { key: 'goals', label: '3-5 Year Goals', altitude: '30,000 ft' },
  { key: 'areasOfFocus', label: 'Areas of Focus', altitude: '20,000 ft' },
  { key: 'projects', label: 'Current Projects', altitude: '10,000 ft' },
  { key: 'runway', label: 'Runway (Current Actions)', altitude: 'Ground' },
];

export default function HorizonsPage() {
  const { horizons, updateHorizon } = useGTDStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Mountain size={22} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Horizons of Focus</h2>
      </div>

      <div className="space-y-4">
        {levels.map((level, i) => (
          <motion.div
            key={level.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{level.label}</h3>
              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{level.altitude}</span>
            </div>
            <textarea
              value={horizons[level.key]}
              onChange={(e) => updateHorizon(level.key, e.target.value)}
              placeholder={`Reflect on your ${level.label.toLowerCase()}…`}
              rows={3}
              className="w-full bg-secondary/30 border border-border/30 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-y transition-all"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
