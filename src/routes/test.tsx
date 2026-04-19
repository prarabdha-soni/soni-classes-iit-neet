import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, Radio, Trophy, Users } from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Test Series — Soni Classes" },
      { name: "description", content: "Live, upcoming and past test series for JEE & NEET aspirants." },
    ],
  }),
  component: TestPage,
});

type TestStatus = "live" | "upcoming" | "past";
type TestItem = {
  id: string;
  title: string;
  exam: "JEE" | "NEET";
  subject: string;
  durationMin: number;
  questions: number;
  startsAt: string; // human label
  participants: number;
  status: TestStatus;
};

const TESTS: TestItem[] = [
  { id: "t1", title: "Mechanics Sprint", exam: "JEE", subject: "Physics", durationMin: 45, questions: 30, startsAt: "Live now", participants: 2438, status: "live" },
  { id: "t2", title: "NEET Biology Daily", exam: "NEET", subject: "Biology", durationMin: 30, questions: 45, startsAt: "Live now", participants: 1762, status: "live" },
  { id: "t3", title: "Full Syllabus Mock #12", exam: "JEE", subject: "PCM", durationMin: 180, questions: 75, startsAt: "Tomorrow · 6:00 PM", participants: 5120, status: "upcoming" },
  { id: "t4", title: "Inorganic Chemistry Power Hour", exam: "JEE", subject: "Chemistry", durationMin: 60, questions: 40, startsAt: "Sat · 10:00 AM", participants: 980, status: "upcoming" },
  { id: "t5", title: "NEET Grand Test #08", exam: "NEET", subject: "PCB", durationMin: 200, questions: 180, startsAt: "Sun · 11:00 AM", participants: 7340, status: "upcoming" },
  { id: "t6", title: "Calculus Speed Test", exam: "JEE", subject: "Mathematics", durationMin: 40, questions: 25, startsAt: "Yesterday", participants: 1840, status: "past" },
  { id: "t7", title: "Human Physiology Mini Mock", exam: "NEET", subject: "Biology", durationMin: 30, questions: 30, startsAt: "Mon", participants: 2210, status: "past" },
];

const TABS: { key: TestStatus; label: string }[] = [
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

function TestPage() {
  const [tab, setTab] = useState<TestStatus>("live");
  const visible = TESTS.filter((t) => t.status === tab);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-5">
      <div className="flex items-center gap-2">
        <Trophy className="h-4 w-4 text-accent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
          Test Series
        </span>
      </div>
      <h1 className="mt-1 font-display text-2xl font-bold tracking-tight">
        Compete & track your rank
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Daily live tests, weekly grand mocks. Pick yours.
      </p>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Test series filter"
        className="mt-4 inline-flex w-full items-center rounded-2xl border border-white/8 bg-card/60 p-1"
      >
        {TABS.map((t) => {
          const active = tab === t.key;
          const liveCount = TESTS.filter((x) => x.status === t.key).length;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={`relative flex-1 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {t.key === "live" && <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full ${active ? "bg-primary-foreground/70" : "bg-destructive"} opacity-75 ${active ? "" : "animate-ping"}`} />
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${active ? "bg-primary-foreground" : "bg-destructive"}`} />
                </span>}
                {t.label}
                <span className={`rounded-full px-1.5 py-0 text-[9px] font-bold ${active ? "bg-primary-foreground/20" : "bg-secondary text-muted-foreground"}`}>
                  {liveCount}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="mt-5 grid gap-3">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nothing here yet — check back soon.
          </div>
        ) : (
          visible.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="relative overflow-hidden rounded-2xl border border-white/8 bg-card/70 p-4"
            >
              {/* status accent */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 ${
                  t.status === "live" ? "bg-destructive" : t.status === "upcoming" ? "bg-accent" : "bg-muted"
                }`}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.exam}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.subject}
                    </span>
                  </div>
                  <h3 className="mt-1.5 truncate font-display text-base font-bold leading-tight">
                    {t.title}
                  </h3>
                </div>

                {t.status === "live" ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
                    <Radio className="h-3 w-3 animate-pulse" /> Live
                  </span>
                ) : t.status === "upcoming" ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    <Calendar className="h-3 w-3" /> Soon
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Past
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {t.durationMin}m
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5" />
                  {t.questions} Qs
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {t.participants.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[11px] text-muted-foreground">{t.startsAt}</span>
                <button
                  type="button"
                  disabled={t.status === "past"}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    t.status === "live"
                      ? "bg-destructive text-destructive-foreground hover:scale-[1.03]"
                      : t.status === "upcoming"
                        ? "bg-primary text-primary-foreground hover:scale-[1.03]"
                        : "cursor-not-allowed bg-secondary text-muted-foreground"
                  }`}
                >
                  {t.status === "live" ? "Join" : t.status === "upcoming" ? "Remind me" : "View result"}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
