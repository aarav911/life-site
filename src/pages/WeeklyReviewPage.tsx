import { motion } from 'framer-motion';
import { useGTDStore } from '@/store/useGTDStore';
import { CalendarCheck, RotateCcw } from 'lucide-react';

const questions = [
  'Process all inboxes to zero?',
  'Review all Projects?',
  'Update Next Actions?',
  'Review Waiting For?',
  'Review Someday/Maybe?',
  'Review Horizons of Focus?',
  'Block rest time this week?',
];

export default function WeeklyReviewPage() {
  const { weeklyReview, toggleWeeklyReview, resetWeeklyReview } = useGTDStore();
  const completed = weeklyReview.filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarCheck size={22} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Weekly Review</h2>
          <span className="text-xs text-muted-foreground">{completed}/{questions.length}</span>
        </div>
        <button
          onClick={resetWeeklyReview}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completed / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-2">
        {questions.map((q, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleWeeklyReview(i)}
            className={`w-full glass-card p-4 flex items-center gap-4 text-left transition-all ${weeklyReview[i] ? 'border-primary/30' : ''}`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${weeklyReview[i] ? 'bg-primary border-primary' : 'border-border'}`}>
              {weeklyReview[i] && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={`text-sm ${weeklyReview[i] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{q}</span>
          </motion.button>
        ))}
      </div>

      {completed === questions.length && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 text-center border-primary/30">
          <p className="text-primary text-lg font-semibold">✨ Weekly review complete!</p>
          <p className="text-sm text-muted-foreground mt-1">You're in full control. Enjoy the clarity.</p>
        </motion.div>
      )}
    </div>
  );
}
