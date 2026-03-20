import { BookOpen, Brain, ListChecks, FolderKanban, Clock, Sparkles, Target, Layers, RotateCcw, Zap, ArrowDown, CheckCircle2, XCircle, HelpCircle, Calendar, Archive, Leaf } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <BookOpen size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Getting Things Done</h1>
            <p className="text-sm text-muted-foreground">The Art of Stress-Free Productivity — David Allen</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          This guide contains everything you need to practice GTD effectively. You don't need to read the book — this section covers the core framework, the workflow, and the key principles to remember.
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-6 pr-4">
          {/* Core Philosophy */}
          <Section
            icon={<Brain size={18} className="text-primary" />}
            title="The Core Idea"
          >
            <p>Your mind is for <strong>having ideas, not holding them.</strong></p>
            <p>
              GTD is based on a simple truth: the more you try to remember, track, and manage in your head, the more stressed and unfocused you become. Your brain is terrible at remembering things at the right time — it reminds you about dead batteries when you see them, not when you're at the store.
            </p>
            <p>
              The solution: capture <em>everything</em> out of your head into a trusted external system, clarify what each thing means, and organize the results. When your mind is clear, you enter a state David Allen calls <strong>"Mind Like Water"</strong> — responding appropriately to whatever comes, never overreacting or underreacting.
            </p>
            <Quote text="Your mind is for having ideas, not holding them." />
          </Section>

          {/* The 5 Steps */}
          <Section
            icon={<ListChecks size={18} className="text-primary" />}
            title="The 5 Steps of GTD"
          >
            <p className="mb-4">The entire methodology boils down to five steps, done continuously:</p>
            
            <Step number={1} title="Capture" icon={<ArrowDown size={16} />}>
              Write down <em>everything</em> that has your attention. Thoughts, ideas, tasks, feelings, commitments — anything that's on your mind. Get it out of your head and into your Inbox. Don't judge or organize yet — just capture.
            </Step>

            <Step number={2} title="Clarify" icon={<HelpCircle size={16} />}>
              Process each item in your Inbox one by one. Ask: <strong>"What is this? Is it actionable?"</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>If not actionable:</strong> Trash it, file it as reference, or put it in Someday/Maybe.</li>
                <li><strong>If actionable:</strong> What's the desired outcome? What's the very next physical action?</li>
                <li><strong>If it takes &lt;2 minutes:</strong> Do it right now.</li>
                <li><strong>If it's for someone else:</strong> Delegate it → Waiting For list.</li>
                <li><strong>If it has multiple steps:</strong> It's a Project. Define the outcome.</li>
              </ul>
            </Step>

            <Step number={3} title="Organize" icon={<FolderKanban size={16} />}>
              Put clarified items into the right buckets:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Next Actions:</strong> The very next physical thing to do (tagged by @context).</li>
                <li><strong>Projects:</strong> Any outcome requiring more than one action step.</li>
                <li><strong>Waiting For:</strong> Things you've delegated or are waiting on.</li>
                <li><strong>Calendar:</strong> Only date/time-specific actions or events.</li>
                <li><strong>Someday/Maybe:</strong> Ideas you might want to do later, but not now.</li>
                <li><strong>Reference:</strong> Information you may need later (no action required).</li>
              </ul>
            </Step>

            <Step number={4} title="Reflect" icon={<RotateCcw size={16} />}>
              Review your lists regularly. The <strong>Weekly Review</strong> is the critical habit that keeps the system alive:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Get clear: Process all inboxes to zero.</li>
                <li>Get current: Review all action lists, projects, and waiting-for items.</li>
                <li>Get creative: Think about new ideas, goals, and upcoming events.</li>
              </ul>
              <Quote text="The Weekly Review is the master key to maintaining your system." />
            </Step>

            <Step number={5} title="Engage" icon={<Zap size={16} />}>
              Do your work with confidence. When choosing what to do, consider:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Context:</strong> Where are you? What tools do you have? (@computer, @phone, @errands)</li>
                <li><strong>Time available:</strong> How much time before your next commitment?</li>
                <li><strong>Energy available:</strong> Are you fresh or tired?</li>
                <li><strong>Priority:</strong> Given the above, what's the best use of your time?</li>
              </ul>
            </Step>
          </Section>

          {/* Projects */}
          <Section
            icon={<Target size={18} className="text-primary" />}
            title="What Is a Project?"
          >
            <p>
              A Project is <strong>any outcome that requires more than one action step</strong> to complete. It's not a big thing — "Replace kitchen faucet" is a project. "Plan vacation" is a project.
            </p>
            <p>
              The key insight: <strong>define the outcome first.</strong> What does "done" look like? Write it as a specific, achievable finish line. Then continuously ask: "What's the very next action I can take to move this forward?"
            </p>
            <p>
              You don't manage projects by doing them — you manage them by identifying the next action and doing <em>that</em>. A project without a next action is stuck.
            </p>
            <Quote text="You can't do a project. You can only do an action related to it." />
          </Section>

          {/* The Two-Minute Rule */}
          <Section
            icon={<Clock size={18} className="text-primary" />}
            title="The Two-Minute Rule"
          >
            <p>
              <strong>If an action takes less than two minutes, do it immediately.</strong> Right when you identify it. It takes longer to organize and track it than to just do it.
            </p>
            <p>
              This single rule, applied consistently, eliminates a huge volume of small tasks that otherwise pile up and create mental drag.
            </p>
          </Section>

          {/* Horizons of Focus */}
          <Section
            icon={<Layers size={18} className="text-primary" />}
            title="Horizons of Focus"
          >
            <p>GTD organizes your commitments across six levels — from ground-level actions up to your life purpose:</p>
            <div className="space-y-2 mt-3">
              <Horizon level="Ground" label="Current Actions" desc="The immediate next actions on your lists." />
              <Horizon level="1" label="Current Projects" desc="Outcomes you've committed to achieve (10–100 active)." />
              <Horizon level="2" label="Areas of Focus" desc="Key areas of responsibility: health, finances, career, family." />
              <Horizon level="3" label="Goals (1–2 years)" desc="What you want to achieve in the near future." />
              <Horizon level="4" label="Vision (3–5 years)" desc="Long-term vision of your ideal life and career." />
              <Horizon level="5" label="Purpose & Principles" desc="Why you exist. Your core values. The big 'why'." />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              GTD recommends working <strong>bottom-up</strong>. Get the ground level under control first — then you'll have the mental clarity to think about higher horizons.
            </p>
          </Section>

          {/* Key Principles */}
          <Section
            icon={<Sparkles size={18} className="text-primary" />}
            title="Key Principles to Remember"
          >
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="capture">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><ArrowDown size={14} className="text-primary" /> Capture everything — 100%</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  If it's on your mind, it's not in your system. The system only works if you trust it, and you can only trust it if <em>everything</em> is in it. One uncaptured item breaks the trust.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="next-action">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><Zap size={14} className="text-primary" /> Always define the Next Action</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  "Call the dentist" is a next action. "Handle dentist stuff" is not. The next action must be a visible, physical activity. If you can't picture yourself doing it, it's not specific enough.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="outcome">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><Target size={14} className="text-primary" /> Define what "done" looks like</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  For every project, write a clear finish line. "Garage reorganized with labeled bins and car fitting inside" — not just "Clean garage." Clarity of outcome drives motivation and action.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="review">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><RotateCcw size={14} className="text-primary" /> The Weekly Review is non-negotiable</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  Without the Weekly Review, your system decays. Block 1–2 hours weekly to process inboxes, review all lists, update projects, and recalibrate. This is where you regain perspective and control.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="context">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><ListChecks size={14} className="text-primary" /> Use @contexts, not priorities</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  Instead of ABC priorities (which constantly shift), organize next actions by context — @computer, @phone, @errands, @home. When you're at the store, you want to see all errands, not filter by priority.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stuff">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><Brain size={14} className="text-primary" /> "Stuff" must be transformed</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  "Stuff" is anything you've allowed into your world that doesn't have a defined meaning, outcome, or action. Most to-do lists are just lists of stuff — "Mom," "Bank," "Doctor." Transform stuff into clear outcomes and actions, or it will drain your energy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="open-loops">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><XCircle size={14} className="text-primary" /> Close open loops</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  An "open loop" is any uncommitted commitment — anything pulling at your attention that isn't where it should be. Your subconscious tracks every open loop, draining cognitive resources. Close them by capturing, clarifying, and organizing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="calendar">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> Calendar is sacred ground</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  Only put things on your calendar that <em>must</em> happen on that specific date or time. Don't use it as a to-do list. If you dilute it with "hoped-for" tasks, you'll stop trusting it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          {/* Clarifying Flowchart */}
          <Section
            icon={<HelpCircle size={18} className="text-primary" />}
            title="The Clarifying Flowchart"
          >
            <p className="mb-4 text-sm">When processing your Inbox, run each item through this decision tree:</p>
            <div className="glass-card p-5 space-y-3 text-sm">
              <FlowStep q="What is it?" />
              <FlowStep q="Is it actionable?" />
              <div className="pl-4 border-l-2 border-border space-y-2">
                <div className="flex items-start gap-2">
                  <XCircle size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                  <span><strong>No →</strong> Trash it / File as reference / Someday-Maybe</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                  <span><strong>Yes →</strong> What's the desired outcome? What's the next action?</span>
                </div>
                <div className="pl-6 border-l-2 border-primary/20 space-y-2">
                  <div className="flex items-start gap-2">
                    <Clock size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <span><strong>&lt;2 min?</strong> → Do it now</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowDown size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <span><strong>Delegate?</strong> → Waiting For list</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <span><strong>Specific date?</strong> → Calendar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <span><strong>Otherwise</strong> → Next Actions list (with @context)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FolderKanban size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <span><strong>Multi-step?</strong> → Create a Project + define next action</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* How to use this app */}
          <Section
            icon={<CheckCircle2 size={18} className="text-primary" />}
            title="How to Use ClearMind"
          >
            <div className="space-y-3 text-sm">
              <AppStep icon={<ArrowDown size={14} />} title="1. Capture to Inbox">
                Use the quick capture bar (Cmd/Ctrl+K) or go to Inbox. Dump everything on your mind — don't filter, just capture.
              </AppStep>
              <AppStep icon={<HelpCircle size={14} />} title="2. Process Your Inbox">
                Go through each item. Decide: Is it actionable? Turn it into a Project (with a clear outcome) or add it directly as a Next Action.
              </AppStep>
              <AppStep icon={<Target size={14} />} title="3. Define Project Outcomes">
                For each project, write a specific finish line. Click into any project to edit its outcome and see linked actions.
              </AppStep>
              <AppStep icon={<Zap size={14} />} title="4. Manage Next Actions">
                Keep your Next Actions list current. Tag with @contexts. Link actions to projects when relevant.
              </AppStep>
              <AppStep icon={<Clock size={14} />} title="5. Track Delegated Items">
                Anything you're waiting on goes in Waiting For — with who and when.
              </AppStep>
              <AppStep icon={<Leaf size={14} />} title="6. Someday/Maybe">
                Ideas you're not committed to yet. Review during Weekly Review to see if any should become active.
              </AppStep>
              <AppStep icon={<RotateCcw size={14} />} title="7. Weekly Review">
                The most important habit. Go through the guided review every week to keep your system clean and trustworthy.
              </AppStep>
              <AppStep icon={<Archive size={14} />} title="8. Complete & Archive Projects">
                When a project's outcome is achieved, mark it complete. It moves to the archive for future reference.
              </AppStep>
            </div>
          </Section>

          {/* Final quote */}
          <div className="glass-card p-6 text-center space-y-2">
            <p className="text-foreground font-medium italic">"Getting things done requires two basic components: defining what 'done' means (outcome) and what 'doing' looks like (action)."</p>
            <p className="text-xs text-muted-foreground">— David Allen</p>
          </div>

          <div className="h-8" />
        </div>
      </ScrollArea>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

function Step({ number, title, icon, children }: { number: number; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
        {number}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">{icon} {title}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <blockquote className="border-l-2 border-primary/40 pl-3 mt-2 italic text-foreground/80 text-sm">
      "{text}"
    </blockquote>
  );
}

function Horizon({ level, label, desc }: { level: string; label: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-secondary/50">
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">H{level}</span>
      <div>
        <span className="text-sm font-medium text-foreground">{label}</span>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function FlowStep({ q }: { q: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground font-medium">
      <HelpCircle size={14} className="text-primary shrink-0" />
      {q}
    </div>
  );
}

function AppStep({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
