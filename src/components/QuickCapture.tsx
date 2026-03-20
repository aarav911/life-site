import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useGTDStore } from '@/store/useGTDStore';

export default function QuickCapture() {
  const [value, setValue] = useState('');
  const addToInbox = useGTDStore((s) => s.addToInbox);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addToInbox(trimmed);
    setValue('');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('quick-capture')?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex items-center gap-2 flex-1 max-w-2xl">
      <div className="relative flex-1">
        <input
          id="quick-capture"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Quick capture anything…"
          className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition-all"
        />
        <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/50 bg-secondary px-1.5 py-0.5 rounded border border-border/30">
          ⌘K
        </kbd>
      </div>
      <button
        onClick={handleSubmit}
        className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
