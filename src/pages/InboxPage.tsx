import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { Inbox as InboxIcon, ArrowRight, Plus, Zap, FolderKanban, Clock, Sprout } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

const destinations = [
  { key: 'nextActions' as const, label: 'Next Action', icon: Zap },
  { key: 'projects' as const, label: 'Project', icon: FolderKanban },
  { key: 'waitingFor' as const, label: 'Waiting For', icon: Clock },
  { key: 'someday' as const, label: 'Someday', icon: Sprout },
];

const contexts = ['@home', '@computer', '@errands', '@calls', '@anywhere'];

export default function InboxPage() {
  const { inbox, addToInbox, processInboxItem } = useGTDStore();
  const [newItem, setNewItem] = useState('');
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [selectedContext, setSelectedContext] = useState('@anywhere');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addToInbox(newItem.trim());
    setNewItem('');
  };

  const handleProcess = (dest: typeof destinations[number]['key']) => {
    if (processingIndex === null) return;
    processInboxItem(processingIndex, dest, dest === 'nextActions' ? selectedContext : undefined);
    setProcessingIndex(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <InboxIcon size={22} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Inbox</h2>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{inbox.length}</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add to inbox…"
          className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
        <button onClick={handleAdd} className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus size={18} />
        </button>
      </div>

      {inbox.length === 0 ? (
        <EmptyState icon={InboxIcon} title="Inbox Zero!" description="Your mind is clear. Capture new thoughts above." />
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {inbox.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="glass-card p-4 flex items-center justify-between gap-3"
              >
                <span className="text-sm text-foreground flex-1">{item}</span>
                <button
                  onClick={() => setProcessingIndex(i)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/15"
                >
                  PROCESS <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Process modal */}
      <AnimatePresence>
        {processingIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setProcessingIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 max-w-md mx-4 w-full space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-foreground">Process Item</h3>
              <p className="text-sm text-muted-foreground">"{inbox[processingIndex]}"</p>
              <p className="text-xs text-muted-foreground">Where does this belong?</p>

              <div className="space-y-2">
                {destinations.map((d) => (
                  <div key={d.key}>
                    {d.key === 'nextActions' && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {contexts.map((ctx) => (
                          <button
                            key={ctx}
                            onClick={() => setSelectedContext(ctx)}
                            className={`context-pill ${selectedContext === ctx ? 'context-pill-active' : ''}`}
                          >
                            {ctx}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => handleProcess(d.key)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-sm text-foreground transition-colors"
                    >
                      <d.icon size={16} className="text-primary" />
                      <span>{d.label}</span>
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={() => setProcessingIndex(null)} className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-2">
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
