import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { Sprout, Plus, Trash2 } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function SomedayPage() {
  const { someday, addSomeday, removeSomeday } = useGTDStore();
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addSomeday(newItem.trim());
    setNewItem('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Sprout size={22} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Someday / Maybe</h2>
      </div>

      <div className="flex gap-2">
        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Future idea…" className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
        <button onClick={handleAdd} className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"><Plus size={18} /></button>
      </div>

      {someday.length === 0 ? (
        <EmptyState icon={Sprout} title="Dream freely" description="Capture ideas for the future without pressure." />
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {someday.map((item, i) => (
              <motion.div key={`${item}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="glass-card p-4 flex items-center justify-between">
                <span className="text-sm text-foreground">{item}</span>
                <button onClick={() => removeSomeday(i)} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"><Trash2 size={14} /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
