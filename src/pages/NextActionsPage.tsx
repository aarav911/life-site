import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { Zap, CalendarPlus, Trash2, Plus, FolderKanban } from 'lucide-react';
import { openGoogleCalendar } from '@/lib/calendar';
import EmptyState from '@/components/EmptyState';

const contexts = ['All', '@home', '@computer', '@errands', '@calls', '@anywhere'];

export default function NextActionsPage() {
  const { nextActions, projects, addNextAction, removeNextAction } = useGTDStore();
  const [filter, setFilter] = useState('All');
  const [newText, setNewText] = useState('');
  const [newCtx, setNewCtx] = useState('@anywhere');
  const [newProjectId, setNewProjectId] = useState('');

  const activeProjects = projects.filter((p) => !p.completed);
  const filtered = filter === 'All' ? nextActions : nextActions.filter((a) => a.context === filter);

  const handleAdd = () => {
    if (!newText.trim()) return;
    addNextAction(newText.trim(), newCtx, newProjectId || undefined);
    setNewText('');
  };

  const getProjectName = (projectId?: string) => {
    if (!projectId) return null;
    const p = projects.find((p) => p.id === projectId);
    return p?.outcome;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Zap size={22} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Next Actions</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {contexts.map((ctx) => (
          <button
            key={ctx}
            onClick={() => setFilter(ctx)}
            className={`context-pill ${filter === ctx ? 'context-pill-active' : ''}`}
          >
            {ctx}
          </button>
        ))}
      </div>

      {/* Add new */}
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="New action…"
          className="flex-1 min-w-[200px] bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
        <select
          value={newCtx}
          onChange={(e) => setNewCtx(e.target.value)}
          className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        >
          {contexts.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={newProjectId}
          onChange={(e) => setNewProjectId(e.target.value)}
          className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        >
          <option value="">No project</option>
          {activeProjects.map((p) => <option key={p.id} value={p.id}>{p.outcome}</option>)}
        </select>
        <button onClick={handleAdd} className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus size={18} />
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Zap} title="No actions here" description="Add your next physical actions to get moving." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <AnimatePresence>
            {filtered.map((action) => {
              const projectName = getProjectName(action.projectId);
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="glass-card-hover p-4 space-y-3"
                >
                  <p className="text-sm text-foreground">{action.text}</p>
                  {projectName && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FolderKanban size={12} className="text-primary/60" />
                      <span>{projectName}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="context-pill context-pill-active">{action.context}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openGoogleCalendar(action.text)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Add to Google Calendar"
                      >
                        <CalendarPlus size={14} />
                      </button>
                      <button
                        onClick={() => removeNextAction(action.id)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
