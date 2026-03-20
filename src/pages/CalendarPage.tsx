import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Link2, Link2Off, ChevronRight, Clock, MapPin, Video } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  isVirtual?: boolean;
  calendar?: string;
  color?: string;
}

// Mock data — replace with real API call
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    start: new Date(Date.now() + 1 * 60 * 60 * 1000),
    end: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
    isVirtual: true,
    calendar: 'Work',
    color: 'hsl(187 92% 69%)',
  },
  {
    id: '2',
    title: 'Deep Work Block',
    start: new Date(Date.now() + 3 * 60 * 60 * 1000),
    end: new Date(Date.now() + 5 * 60 * 60 * 1000),
    calendar: 'Personal',
    color: 'hsl(142 71% 45%)',
  },
  {
    id: '3',
    title: 'Dentist Appointment',
    start: new Date(Date.now() + 24 * 60 * 60 * 1000),
    end: new Date(Date.now() + 25 * 60 * 60 * 1000),
    location: '123 Health St',
    calendar: 'Personal',
    color: 'hsl(142 71% 45%)',
  },
  {
    id: '4',
    title: 'Product Review',
    start: new Date(Date.now() + 26 * 60 * 60 * 1000),
    end: new Date(Date.now() + 27 * 60 * 60 * 1000),
    isVirtual: true,
    calendar: 'Work',
    color: 'hsl(187 92% 69%)',
  },
  {
    id: '5',
    title: 'Grocery Run',
    start: new Date(Date.now() + 48 * 60 * 60 * 1000),
    end: new Date(Date.now() + 49 * 60 * 60 * 1000),
    location: 'Whole Foods',
    calendar: 'Personal',
    color: 'hsl(142 71% 45%)',
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDay(date: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
}

function groupByDay(events: CalendarEvent[]) {
  const groups: Record<string, CalendarEvent[]> = {};
  for (const ev of events) {
    const key = formatDay(ev.start);
    if (!groups[key]) groups[key] = [];
    groups[key].push(ev);
  }
  return Object.entries(groups);
}

export default function CalendarPage() {
  const [connected, setConnected] = useState(false);
  const events = connected ? MOCK_EVENTS : [];
  const grouped = groupByDay(events);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays size={22} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Calendar</h2>
        </div>

        <button
          onClick={() => setConnected(!connected)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            connected
              ? 'bg-secondary text-muted-foreground hover:bg-destructive/20 hover:text-destructive'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {connected ? (
            <>
              <Link2Off size={15} />
              <span>Disconnect</span>
            </>
          ) : (
            <>
              <Link2 size={15} />
              <span>Connect Calendar</span>
            </>
          )}
        </button>
      </div>

      {!connected ? (
        <div className="glass-card p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <CalendarDays size={28} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Connect your calendar</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            See your upcoming events right here alongside your GTD workflow. Know what's ahead so you can plan your next actions accordingly.
          </p>
          <button
            onClick={() => setConnected(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Link2 size={15} />
            Connect Google Calendar
          </button>
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No upcoming events"
          description="Your calendar is clear — perfect time for deep work."
        />
      ) : (
        <div className="space-y-6">
          {grouped.map(([day, dayEvents]) => (
            <div key={day} className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                {day}
              </h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {dayEvents.map((ev, i) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="glass-card-hover p-4 flex items-start gap-4 group"
                    >
                      {/* Color bar */}
                      <div
                        className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
                        style={{ backgroundColor: ev.color || 'hsl(var(--primary))' }}
                      />

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="text-sm font-medium text-foreground truncate">{ev.title}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {formatTime(ev.start)} – {formatTime(ev.end)}
                          </span>
                          {ev.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {ev.location}
                            </span>
                          )}
                          {ev.isVirtual && (
                            <span className="flex items-center gap-1 text-primary/70">
                              <Video size={12} />
                              Virtual
                            </span>
                          )}
                        </div>
                        {ev.calendar && (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                            {ev.calendar}
                          </span>
                        )}
                      </div>

                      <ChevronRight
                        size={16}
                        className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0 mt-1"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
