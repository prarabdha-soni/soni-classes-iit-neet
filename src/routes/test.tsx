import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Crown,
  Radio,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Test Series — Soni Classes" },
      {
        name: "description",
        content:
          "Join JEE & NEET test contests from ₹11 and ₹21 — practice like a fantasy league, win ranks and bragging rights.",
      },
    ],
  }),
  component: TestPage,
});

type TestStatus = "live" | "upcoming" | "past";

/** Dream11-style entry slab — low stake pools (demo UI, no real money). */
type ContestSlab = {
  entryFee: 11 | 21;
  prizePool: string;
  maxSpots: number;
  filled: number;
  winners: number;
  tag: string;
};

type TestItem = {
  id: string;
  title: string;
  exam: "JEE" | "NEET";
  subject: string;
  durationMin: number;
  questions: number;
  startsAt: string;
  participants: number;
  status: TestStatus;
  contests: [ContestSlab, ContestSlab];
};

const TESTS: TestItem[] = [
  {
    id: "t1",
    title: "Mechanics Sprint",
    exam: "JEE",
    subject: "Physics",
    durationMin: 45,
    questions: 30,
    startsAt: "Live now",
    participants: 2438,
    status: "live",
    contests: [
      { entryFee: 11, prizePool: "₹1,100", maxSpots: 200, filled: 176, winners: 40, tag: "Mega" },
      { entryFee: 21, prizePool: "₹4,200", maxSpots: 100, filled: 94, winners: 20, tag: "Grand" },
    ],
  },
  {
    id: "t2",
    title: "NEET Biology Daily",
    exam: "NEET",
    subject: "Biology",
    durationMin: 30,
    questions: 45,
    startsAt: "Live now",
    participants: 1762,
    status: "live",
    contests: [
      { entryFee: 11, prizePool: "₹880", maxSpots: 150, filled: 142, winners: 30, tag: "Classic" },
      { entryFee: 21, prizePool: "₹3,150", maxSpots: 80, filled: 61, winners: 16, tag: "Pro" },
    ],
  },
  {
    id: "t3",
    title: "Full Syllabus Mock #12",
    exam: "JEE",
    subject: "PCM",
    durationMin: 180,
    questions: 75,
    startsAt: "Tomorrow · 6:00 PM",
    participants: 5120,
    status: "upcoming",
    contests: [
      { entryFee: 11, prizePool: "₹5,500", maxSpots: 1000, filled: 312, winners: 200, tag: "Mega" },
      { entryFee: 21, prizePool: "₹12,600", maxSpots: 400, filled: 89, winners: 80, tag: "Grand" },
    ],
  },
  {
    id: "t4",
    title: "Inorganic Chemistry Power Hour",
    exam: "JEE",
    subject: "Chemistry",
    durationMin: 60,
    questions: 40,
    startsAt: "Sat · 10:00 AM",
    participants: 980,
    status: "upcoming",
    contests: [
      { entryFee: 11, prizePool: "₹990", maxSpots: 120, filled: 45, winners: 24, tag: "Classic" },
      { entryFee: 21, prizePool: "₹2,520", maxSpots: 60, filled: 12, winners: 12, tag: "Head-to-head" },
    ],
  },
  {
    id: "t5",
    title: "NEET Grand Test #08",
    exam: "NEET",
    subject: "PCB",
    durationMin: 200,
    questions: 180,
    startsAt: "Sun · 11:00 AM",
    participants: 7340,
    status: "upcoming",
    contests: [
      { entryFee: 11, prizePool: "₹8,800", maxSpots: 2000, filled: 1204, winners: 400, tag: "Mega" },
      { entryFee: 21, prizePool: "₹21,000", maxSpots: 500, filled: 203, winners: 100, tag: "Grand" },
    ],
  },
  {
    id: "t6",
    title: "Calculus Speed Test",
    exam: "JEE",
    subject: "Mathematics",
    durationMin: 40,
    questions: 25,
    startsAt: "Yesterday",
    participants: 1840,
    status: "past",
    contests: [
      { entryFee: 11, prizePool: "₹1,320", maxSpots: 200, filled: 200, winners: 40, tag: "Mega" },
      { entryFee: 21, prizePool: "₹4,410", maxSpots: 100, filled: 100, winners: 20, tag: "Grand" },
    ],
  },
  {
    id: "t7",
    title: "Human Physiology Mini Mock",
    exam: "NEET",
    subject: "Biology",
    durationMin: 30,
    questions: 30,
    startsAt: "Mon",
    participants: 2210,
    status: "past",
    contests: [
      { entryFee: 11, prizePool: "₹990", maxSpots: 150, filled: 150, winners: 30, tag: "Classic" },
      { entryFee: 21, prizePool: "₹3,360", maxSpots: 80, filled: 80, winners: 16, tag: "Pro" },
    ],
  },
];

const TABS: { key: TestStatus; label: string }[] = [
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

function fillPct(filled: number, max: number) {
  return Math.min(100, Math.round((filled / Math.max(1, max)) * 100));
}

function ContestSlabCard({
  slab,
  disabled,
  accent,
}: {
  slab: ContestSlab;
  disabled: boolean;
  accent: "emerald" | "amber";
}) {
  const pct = fillPct(slab.filled, slab.maxSpots);
  const left = slab.maxSpots - slab.filled;
  const ring =
    accent === "emerald"
      ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 to-card hover:border-emerald-400/60"
      : "border-amber-500/45 bg-gradient-to-b from-amber-500/18 to-card hover:border-amber-400/65";
  const feeChip =
    accent === "emerald"
      ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30"
      : "bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/35";

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-3 transition-colors ${ring} ${
        disabled ? "pointer-events-none opacity-55" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-md bg-background/50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
          {slab.tag}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 font-display text-lg font-black tabular-nums ${feeChip}`}
        >
          ₹{slab.entryFee}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <Trophy className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="text-sm font-bold text-foreground">{slab.prizePool}</span>
        <span className="text-[10px] text-muted-foreground">pool</span>
      </div>
      <p className="mt-0.5 text-[10px] text-muted-foreground">
        Top {slab.winners} win ranks · {slab.filled.toLocaleString("en-IN")}/
        {slab.maxSpots.toLocaleString("en-IN")} joined
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background/80">
        <div
          className={`h-full rounded-full transition-all ${
            accent === "emerald" ? "bg-emerald-400/90" : "bg-amber-400/90"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] font-medium text-muted-foreground">
        {left <= 0 ? "Full" : `${left.toLocaleString("en-IN")} spots left`}
      </p>
      <button
        type="button"
        disabled={disabled}
        className={`mt-2 w-full rounded-xl py-2 text-xs font-black uppercase tracking-wider transition-transform active:scale-[0.98] ${
          disabled
            ? "bg-secondary text-muted-foreground"
            : accent === "emerald"
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "bg-amber-600 text-amber-950 hover:bg-amber-500"
        }`}
      >
        {disabled ? "Closed" : `Join · ₹${slab.entryFee}`}
      </button>
    </div>
  );
}

function TestPage() {
  const [tab, setTab] = useState<TestStatus>("live");
  const visible = TESTS.filter((t) => t.status === tab);

  return (
    <div className="mx-auto max-w-2xl px-3 pb-24 pt-3 sm:px-4 sm:pt-4">
      {/* Dream11-style hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-card to-accent/10 p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] sm:p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5">
              <Zap className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Test arena
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">
              Play from{" "}
              <span className="text-primary">₹11</span>
              {" & "}
              <span className="text-amber-200">₹21</span>
            </h1>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Pick a contest like fantasy sports — same test, two stakes. Higher pool on ₹21 slabs.
              Practice mode; no real payments yet.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1 rounded-2xl border border-white/10 bg-background/40 px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <Wallet className="h-3 w-3" /> Entry
            </div>
            <div className="font-display text-xl font-black tabular-nums text-foreground">₹11</div>
            <div className="text-[10px] text-muted-foreground">or ₹21 · UPI later</div>
          </div>
        </div>
        <div className="relative mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-1 text-[10px] font-semibold text-foreground/90 ring-1 ring-white/10">
            <Sparkles className="h-3 w-3 text-accent" />
            Rankings & leaderboards
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-1 text-[10px] font-semibold text-foreground/90 ring-1 ring-white/10">
            <Crown className="h-3 w-3 text-amber-400" />
            Top ranks win glory
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-1 text-[10px] font-semibold text-muted-foreground ring-1 ring-white/10">
            <ShieldCheck className="h-3 w-3 text-primary" />
            Demo — not a paid contest
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Test series filter"
        className="mt-5 inline-flex w-full items-center rounded-2xl border border-white/8 bg-card/60 p-1"
      >
        {TABS.map((t) => {
          const active = tab === t.key;
          const count = TESTS.filter((x) => x.status === t.key).length;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={`relative flex-1 rounded-xl px-2 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors sm:px-3 ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                {t.key === "live" ? (
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        active ? "bg-primary-foreground/50" : "bg-destructive animate-ping"
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        active ? "bg-primary-foreground" : "bg-destructive"
                      }`}
                    />
                  </span>
                ) : null}
                {t.label}
                <span
                  className={`rounded-full px-1.5 py-0 text-[9px] font-bold ${
                    active ? "bg-primary-foreground/20" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="mt-4 grid gap-4">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nothing here yet — check back soon.
          </div>
        ) : (
          visible.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/80 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.65)]"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 ${
                  t.status === "live" ? "bg-destructive" : t.status === "upcoming" ? "bg-primary" : "bg-muted"
                }`}
              />

              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                        {t.exam}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {t.subject}
                      </span>
                    </div>
                    <h2 className="mt-1.5 font-display text-lg font-bold leading-tight sm:text-xl">{t.title}</h2>
                  </div>
                  {t.status === "live" ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
                      <Radio className="h-3 w-3 animate-pulse" /> Live
                    </span>
                  ) : t.status === "upcoming" ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      <Calendar className="h-3 w-3" /> Soon
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Ended
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {t.durationMin} min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 shrink-0" />
                    {t.questions} questions
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    {t.participants.toLocaleString("en-IN")} arena
                  </span>
                  <span className="w-full text-[11px] text-muted-foreground/90 sm:w-auto">{t.startsAt}</span>
                </div>

                <div className="mt-4 border-t border-white/8 pt-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Choose contest · same paper
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ContestSlabCard
                      slab={t.contests[0]!}
                      disabled={t.status === "past"}
                      accent="emerald"
                    />
                    <ContestSlabCard
                      slab={t.contests[1]!}
                      disabled={t.status === "past"}
                      accent="amber"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
}
