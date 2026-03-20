import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { FolderKanban, Plus, Trash2, Check, RotateCcw, Pencil, ChevronRight, Archive } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function ProjectsPage() {
  const { projects, addProject, removeProject, completeProject, restoreProject, updateProjectOutcome } = useGTDStore();
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const activeProjects = projects.filter((p) => !p.completed);
  const archivedProjects = projects.filter((p) => p.completed);

  const handleAdd = () => {
    if (!newProject.trim()) return;
    addProject(newProject.trim());
    setNewProject('');
  };

  const startEdit = (id: string, outcome: string) => {
    setEditingId(id);
    setEditValue(outcome);
  };

  const saveEdit = (id: string) => {
    if (editValue.trim()) updateProjectOutcome(id, editValue.trim());
    setEditingId(null);
  };

  const renderProject = (project: typeof projects[0]) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={`glass-card-hover p-5 space-y-3 ${project.completed ? 'opacity-60' : ''}`}
    >
      {editingId === project.id ? (
        <div className="flex gap-2">
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveEdit(project.id)}
            className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <button onClick={() => saveEdit(project.id)} className="text-xs text-primary">Save</button>
        </div>
      ) : (
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="w-full text-left group"
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium text-foreground ${project.completed ? 'line-through' : ''}`}>
              {project.outcome}
            </span>
            <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      )}

      <div className="flex items-center justify-between pt-1">
        <div className="flex gap-1">
          {!project.completed && (
            <button
              onClick={(e) => { e.stopPropagation(); startEdit(project.id, project.outcome); }}
              className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Edit outcome"
            >
              <Pencil size={13} />
            </button>
          )}
          {project.completed ? (
            <button
              onClick={() => restoreProject(project.id)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Restore"
            >
              <RotateCcw size={13} />
            </button>
          ) : (
            <button
              onClick={() => completeProject(project.id)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-green-400 hover:bg-green-500/10 transition-colors"
              title="Complete project"
            >
              <Check size={13} />
            </button>
          )}
        </div>
        <button
          onClick={() => { if (confirm('Delete this project?')) removeProject(project.id); }}
          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <FolderKanban size={22} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Projects</h2>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{activeProjects.length} active</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Define a clear outcome…"
          className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
        <button onClick={handleAdd} className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus size={18} />
        </button>
      </div>

      {activeProjects.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No active projects" description="Projects are outcomes that require more than one action step. Define a clear finish line." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {activeProjects.map(renderProject)}
          </AnimatePresence>
        </div>
      )}

      {archivedProjects.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border/30">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Archive size={16} />
            Completed Projects ({archivedProjects.length})
            <ChevronRight size={14} className={`transition-transform ${showArchived ? 'rotate-90' : ''}`} />
          </button>
          {showArchived && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {archivedProjects.map(renderProject)}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
