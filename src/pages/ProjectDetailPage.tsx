import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { FolderKanban, ArrowLeft, Check, RotateCcw, Trash2, Plus, Zap, CalendarPlus, Pencil } from 'lucide-react';
import { openGoogleCalendar } from '@/lib/calendar';
import EmptyState from '@/components/EmptyState';

const contexts = ['@home', '@computer', '@errands', '@calls', '@anywhere'];

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, nextActions, updateProjectOutcome, completeProject, restoreProject, removeProject, addNextAction, removeNextAction } = useGTDStore();

  const project = projects.find((p) => p.id === id);
  const linkedActions = nextActions.filter((a) => a.projectId === id);

  const [editingOutcome, setEditingOutcome] = useState(false);
  const [outcomeValue, setOutcomeValue] = useState(project?.outcome || '');
  const [newAction, setNewAction] = useState('');
  const [newCtx, setNewCtx] = useState('@anywhere');

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft size={16} /> Back to Projects
        </button>
        <EmptyState icon={FolderKanban} title="Project not found" description="This project may have been deleted." />
      </div>
    );
  }

  const handleSaveOutcome = () => {
    if (outcomeValue.trim()) {
      updateProjectOutcome(project.id, outcomeValue.trim());
    }
    setEditingOutcome(false);
  };

  const handleAddAction = () => {
    if (!newAction.trim()) return;
    addNextAction(newAction.trim(), newCtx, project.id);
    setNewAction('');
  };

  const handleDelete = () => {
    if (confirm('Delete this project and all its linked actions?')) {
      removeProject(project.id);
      navigate('/projects');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={16} /> Back to Projects
      </button>

      {/* Project header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FolderKanban size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Desired Outcome</p>
              {editingOutcome ? (
                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={outcomeValue}
                    onChange={(e) => setOutcomeValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveOutcome()}
                    className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button onClick={handleSaveOutcome} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90">Save</button>
                  <button onClick={() => setEditingOutcome(false)} className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground">Cancel</button>
                </div>
              ) : (
                <button onClick={() => { setOutcomeValue(project.outcome); setEditingOutcome(true); }} className="text-lg font-semibold text-foreground text-left group flex items-center gap-2">
                  {project.outcome}
                  <Pencil size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>
          </div>
          {project.completed && (
            <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full">Completed</span>
          )}
        </div>

        <div className="flex gap-2 pt-2 border-t border-border/30">
          {project.completed ? (
            <button onClick={() => restoreProject(project.id)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw size={13} /> Restore
            </button>
          ) : (
            <button onClick={() => completeProject(project.id)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors">
              <Check size={13} /> Complete Project
            </button>
          )}
          <button onClick={handleDelete} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors">
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </motion.div>

      {/* Linked Next Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Next Actions for this Project</h3>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{linkedActions.length}</span>
        </div>

        {!project.completed && (
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddAction()}
              placeholder="What's the very next action?"
              className="flex-1 min-w-[200px] bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <select
              value={newCtx}
              onChange={(e) => setNewCtx(e.target.value)}
              className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              {contexts.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={handleAddAction} className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus size={18} />
            </button>
          </div>
        )}

        {linkedActions.length === 0 ? (
          <EmptyState icon={Zap} title="No next actions yet" description="What's the very next physical action to move this project forward?" />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatePresence>
              {linkedActions.map((action) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="glass-card-hover p-4 space-y-3"
                >
                  <p className="text-sm text-foreground">{action.text}</p>
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
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
