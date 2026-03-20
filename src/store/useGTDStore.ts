import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NextAction {
  id: string;
  text: string;
  context: string;
  projectId?: string;
}

export interface Project {
  id: string;
  outcome: string;
  completed: boolean;
  completedAt?: string;
}

export interface Horizons {
  purpose: string;
  vision: string;
  goals: string;
  areasOfFocus: string;
  projects: string;
  runway: string;
}

interface GTDState {
  inbox: string[];
  nextActions: NextAction[];
  projects: Project[];
  waitingFor: string[];
  someday: string[];
  horizons: Horizons;
  restActions: string[];
  weeklyReview: boolean[];

  addToInbox: (item: string) => void;
  removeFromInbox: (index: number) => void;
  processInboxItem: (index: number, destination: 'nextActions' | 'projects' | 'waitingFor' | 'someday', context?: string) => void;
  addNextAction: (text: string, context: string, projectId?: string) => void;
  removeNextAction: (id: string) => void;
  addProject: (outcome: string) => string;
  removeProject: (id: string) => void;
  updateProjectOutcome: (id: string, outcome: string) => void;
  completeProject: (id: string) => void;
  restoreProject: (id: string) => void;
  addWaitingFor: (item: string) => void;
  removeWaitingFor: (index: number) => void;
  addSomeday: (item: string) => void;
  removeSomeday: (index: number) => void;
  updateHorizon: (key: keyof Horizons, value: string) => void;
  setRestActions: (actions: string[]) => void;
  toggleWeeklyReview: (index: number) => void;
  resetWeeklyReview: () => void;
  resetAll: () => void;
}

const defaultRestActions = [
  '30-min nature walk',
  'Read fiction for 30 min',
  '15-min meditation',
  'Take a warm bath',
  'Listen to music (no screens)',
  'Journaling session',
  'Gentle yoga / stretching',
  'Call a friend or loved one',
];

const defaultHorizons: Horizons = {
  purpose: '',
  vision: '',
  goals: '',
  areasOfFocus: '',
  projects: '',
  runway: '',
};

export const useGTDStore = create<GTDState>()(
  persist(
    (set) => ({
      inbox: [],
      nextActions: [],
      projects: [],
      waitingFor: [],
      someday: [],
      horizons: { ...defaultHorizons },
      restActions: [...defaultRestActions],
      weeklyReview: Array(7).fill(false),

      addToInbox: (item) => set((s) => ({ inbox: [...s.inbox, item] })),
      removeFromInbox: (index) => set((s) => ({ inbox: s.inbox.filter((_, i) => i !== index) })),

      processInboxItem: (index, destination, context) =>
        set((s) => {
          const item = s.inbox[index];
          if (!item) return s;
          const newInbox = s.inbox.filter((_, i) => i !== index);
          switch (destination) {
            case 'nextActions':
              return {
                inbox: newInbox,
                nextActions: [...s.nextActions, { id: crypto.randomUUID(), text: item, context: context || '@anywhere' }],
              };
            case 'projects':
              return {
                inbox: newInbox,
                projects: [...s.projects, { id: crypto.randomUUID(), outcome: item, completed: false }],
              };
            case 'waitingFor':
              return { inbox: newInbox, waitingFor: [...s.waitingFor, item] };
            case 'someday':
              return { inbox: newInbox, someday: [...s.someday, item] };
            default:
              return s;
          }
        }),

      addNextAction: (text, context, projectId) =>
        set((s) => ({
          nextActions: [...s.nextActions, { id: crypto.randomUUID(), text, context, projectId }],
        })),
      removeNextAction: (id) => set((s) => ({ nextActions: s.nextActions.filter((a) => a.id !== id) })),

      addProject: (outcome) => {
        const id = crypto.randomUUID();
        set((s) => ({
          projects: [...s.projects, { id, outcome, completed: false }],
        }));
        return id;
      },
      removeProject: (id) => set((s) => ({
        projects: s.projects.filter((p) => p.id !== id),
        nextActions: s.nextActions.filter((a) => a.projectId !== id),
      })),
      updateProjectOutcome: (id, outcome) => set((s) => ({
        projects: s.projects.map((p) => p.id === id ? { ...p, outcome } : p),
      })),
      completeProject: (id) => set((s) => ({
        projects: s.projects.map((p) => p.id === id ? { ...p, completed: true, completedAt: new Date().toISOString() } : p),
      })),
      restoreProject: (id) => set((s) => ({
        projects: s.projects.map((p) => p.id === id ? { ...p, completed: false, completedAt: undefined } : p),
      })),

      addWaitingFor: (item) => set((s) => ({ waitingFor: [...s.waitingFor, item] })),
      removeWaitingFor: (index) => set((s) => ({ waitingFor: s.waitingFor.filter((_, i) => i !== index) })),

      addSomeday: (item) => set((s) => ({ someday: [...s.someday, item] })),
      removeSomeday: (index) => set((s) => ({ someday: s.someday.filter((_, i) => i !== index) })),

      updateHorizon: (key, value) => set((s) => ({ horizons: { ...s.horizons, [key]: value } })),

      setRestActions: (actions) => set({ restActions: actions }),

      toggleWeeklyReview: (index) =>
        set((s) => {
          const newReview = [...s.weeklyReview];
          newReview[index] = !newReview[index];
          return { weeklyReview: newReview };
        }),
      resetWeeklyReview: () => set({ weeklyReview: Array(7).fill(false) }),

      resetAll: () =>
        set({
          inbox: [],
          nextActions: [],
          projects: [],
          waitingFor: [],
          someday: [],
          horizons: { ...defaultHorizons },
          restActions: [...defaultRestActions],
          weeklyReview: Array(7).fill(false),
        }),
    }),
    { name: 'clearmind-gtd' }
  )
);
