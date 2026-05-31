"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight, Layers, TrendingUp, Shield, ChevronRight,
  Mail, MapPin, FlaskConical, Radar, Drill, Cpu, Zap,
  AlertTriangle, CheckCircle2, Activity, DollarSign,
  Clock, Target, Gauge, GitBranch, Truck, Database,
  LineChart
} from "lucide-react";

// ─── Brand Logo ──────────────────────────────────────────────────────────────
// Place the logo files in /public/brand/ :
//   /public/brand/logo-andeanflow.svg       (full lockup: emblem + wordmark)
//   /public/brand/logo-andeanflow-icon.svg  (emblem only, for compact/navbar use)
// Both are transparent and work on the dark slate background.

function LogoFull({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-andeanflow.svg"
      alt="Andean Flow Technologies"
      width={1408}
      height={768}
      priority
      className={className}
    />
  );
}

function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-andeanflow-icon.svg"
      alt="Andean Flow Technologies"
      width={365}
      height={264}
      className={className}
    />
  );
}

// ─── i18n stub ──────────────────────────────────────────────────────────────

import es from "@/locales/es.json";
import en from "@/locales/en.json";

type Locale = "es" | "en";
const dicts: Record<Locale, typeof es> = { es, en };

function useTranslation(locale: Locale = "es") {
  const dict = dicts[locale];
  function t(path: string): string {
    const keys = path.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = dict;
    for (const k of keys) node = node?.[k];
    return typeof node === "string" ? node : path;
  }
  function tArr<T>(path: string): T[] {
    const keys = path.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = dict;
    for (const k of keys) node = node?.[k];
    return Array.isArray(node) ? node : [];
  }
  return { t, tArr };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-3">
      {children}
    </span>
  );
}

function SectionWrapper({
  children, className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-6 md:px-12 lg:px-24 py-24 ${className}`}>
      {children}
    </section>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ t, locale, setLocale }: {
  t: (k: string) => string;
  locale: string;
  setLocale: (l: "es" | "en") => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo — much larger now (h-14 = 56px) */}
        <a href="#" className="flex items-center" aria-label={t("nav.logo")}>
          <LogoFull className="h-14 w-auto" />
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Aster / BHP review badge */}
          <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-amber-500/90 border border-amber-600/40 bg-amber-500/10 px-2.5 py-1 rounded">
            ⬡ {t("nav.review_badge")}
          </span>
          {/* Locale toggle */}
          <button
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="text-xs text-slate-400 hover:text-white transition-colors font-mono border border-slate-700 hover:border-slate-500 px-2.5 py-1 rounded"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          {/* CTA */}
          <a
            href={`mailto:${t("footer.contact_email")}`}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-4 py-2 rounded transition-colors"
          >
            {t("nav.cta")} <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ t }: { t: (k: string) => string }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Big hero logo - replaces emblem placeholder */}
        <div className="mb-2 opacity-90">
          <LogoIcon className="h-24 md:h-32 w-auto" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-xs font-mono px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          {t("hero.badge")}
        </div>

        <Eyebrow>{t("hero.eyebrow")}</Eyebrow>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
          {t("hero.headline")}
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {t("hero.subheadline")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="mailto:contact@andeanflow.ai"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded text-sm transition-colors"
          >
            {t("hero.cta_primary")} <ArrowRight size={15} />
          </a>
          <a
            href="#financials"
            className="flex items-center gap-2 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium px-6 py-3 rounded text-sm transition-colors"
          >
            {t("hero.cta_secondary")} <ChevronRight size={15} />
          </a>
        </div>

        {/* Hero quick-stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-10 border border-slate-800 rounded-lg overflow-hidden max-w-3xl w-full">
          {[
            { v: "$5.3M", l: t("hero.stats.value_at_risk") },
            { v: "<2%", l: t("hero.stats.f2_target") },
            { v: "100K+", l: t("hero.stats.tpd_capacity") },
            { v: "1.7m", l: t("hero.stats.payback") },
          ].map((s, i) => (
            <div
              key={i}
              className="px-4 py-4 border-r border-b md:border-b-0 last:border-r-0 border-slate-800 bg-slate-900/40"
            >
              <div className="text-2xl md:text-3xl font-black text-cyan-400 leading-none mb-1">{s.v}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

// ─── Pain vs Solution ────────────────────────────────────────────────────────

interface PainItem { title: string; desc: string }

function PainSection({ t, tArr }: {
  t: (k: string) => string;
  tArr: <T>(k: string) => T[];
}) {
  const problems = tArr<PainItem>("pain.problems");
  const solutions = tArr<PainItem>("pain.solutions");

  return (
    <SectionWrapper className="bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("pain.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("pain.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("pain.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Problems */}
          <div className="bg-slate-900/50 border border-red-900/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle size={18} className="text-red-400" />
              <span className="text-red-400 font-semibold text-sm tracking-widest uppercase">
                {t("pain.problem_title")}
              </span>
            </div>
            <div className="space-y-5">
              {problems.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <span className="mt-1 w-5 h-5 rounded-full border border-red-800 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{p.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 size={18} className="text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm tracking-widest uppercase">
                {t("pain.solution_title")}
              </span>
            </div>
            <div className="space-y-5">
              {solutions.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <span className="mt-1 w-5 h-5 rounded-full border border-cyan-700 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{s.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── How It Works — 4-step flow ────────────────────────────────────────────

function HowItWorks({ t }: { t: (k: string) => string }) {
  const steps = [
    { icon: Zap,      label: t("how.steps.s1.tag"), title: t("how.steps.s1.title"), desc: t("how.steps.s1.desc") },
    { icon: Activity, label: t("how.steps.s2.tag"), title: t("how.steps.s2.title"), desc: t("how.steps.s2.desc") },
    { icon: Cpu,      label: t("how.steps.s3.tag"), title: t("how.steps.s3.title"), desc: t("how.steps.s3.desc") },
    { icon: GitBranch,label: t("how.steps.s4.tag"), title: t("how.steps.s4.title"), desc: t("how.steps.s4.desc") },
  ];

  return (
    <section id="how" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("how.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("how.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {t("how.subheadline")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-800 rounded-2xl overflow-hidden">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="relative p-6 md:p-7 border-b md:border-b-0 lg:border-r last:border-r-0 md:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-5xl md:text-6xl font-black text-cyan-500/10 leading-none absolute top-4 right-5 select-none font-mono">
                  0{i + 1}
                </span>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-cyan-400" />
                </div>
                <p className="text-xs font-mono text-cyan-500/70 tracking-widest mb-2">{s.label}</p>
                <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="text-slate-600 text-xs italic mt-6 text-center max-w-2xl mx-auto">
          {t("how.footnote")}
        </p>
      </div>
    </section>
  );
}

// ─── Tech Specs ──────────────────────────────────────────────────────────────

function TechSpecs({ t }: { t: (k: string) => string }) {
  const specGroups = [
    {
      icon: Zap,
      label: t("tech.g1.label"),
      title: t("tech.g1.title"),
      rows: [
        ["Tipo", "Nd:YAG Q-switched DPSS"],
        ["Energía por pulso", ">100 mJ"],
        ["Duración de pulso", "<8 ns"],
        ["Distancia stand-off", "5–8 m"],
        ["Frecuencia", "≥10 Hz"],
      ],
    },
    {
      icon: Activity,
      label: t("tech.g2.label"),
      title: t("tech.g2.title"),
      rows: [
        ["Detector", "ICCD (Andor / Princeton)"],
        ["Gate mínimo", "≤100 ns"],
        ["Rango espectral", "200–900 nm"],
        ["Resolución óptica", "≤0,1 nm"],
        ["Refrigeración", "Peltier ≤–20°C"],
      ],
    },
    {
      icon: Cpu,
      label: t("tech.g3.label"),
      title: t("tech.g3.title"),
      rows: [
        ["Plataforma", "Jetson AGX Orin 64GB"],
        ["IA Performance", "275 TOPS"],
        ["Latencia clasificación", "<500 ms"],
        ["Conectividad", "4G/5G + REST/MQTT"],
        ["Protección", "IP66 · 20G vibración"],
      ],
    },
  ];

  return (
    <section id="tech" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("tech.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("tech.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("tech.subheadline")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {specGroups.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Icon size={15} className="text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-500/70 tracking-widest uppercase">{g.label}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-5">{g.title}</h3>
                <dl className="space-y-2.5">
                  {g.rows.map(([k, v], j) => (
                    <div key={j} className="flex justify-between items-baseline gap-3 text-xs border-b border-slate-800/80 pb-2 last:border-b-0">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className="text-slate-200 font-medium text-right font-mono">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Financials — VAN, TIR, Payback ──────────────────────────────────────────

function Financials({ t }: { t: (k: string) => string }) {
  const kpis = [
    { val: "$9.5M",  label: t("financials.k1.label"), sub: t("financials.k1.sub"), color: "text-cyan-400" },
    { val: ">200%", label: t("financials.k2.label"), sub: t("financials.k2.sub"), color: "text-emerald-400" },
    { val: "22:1",  label: t("financials.k3.label"), sub: t("financials.k3.sub"), color: "text-amber-400" },
    { val: "1.7m",  label: t("financials.k4.label"), sub: t("financials.k4.sub"), color: "text-cyan-400" },
  ];

  const scenarios = [
    { name: t("financials.scenarios.conservative.name"), reduction: "30%", annual: "$1.8M", payback: "2.9m", van: "$6.5M", barW: "43%", color: "bg-slate-500", textColor: "text-slate-300" },
    { name: t("financials.scenarios.base.name"),         reduction: "50%", annual: "$3.0M", payback: "1.7m", van: "$9.5M", barW: "71%", color: "bg-cyan-500", textColor: "text-cyan-400", featured: true },
    { name: t("financials.scenarios.optimistic.name"),   reduction: "70%", annual: "$4.2M", payback: "1.2m", van: "$13.1M", barW: "100%", color: "bg-emerald-500", textColor: "text-emerald-400" },
  ];

  return (
    <section id="financials" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("financials.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("financials.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("financials.subheadline")}
          </p>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {kpis.map((k, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 hover:border-cyan-500/30 transition-colors">
              <div className={`text-4xl md:text-5xl font-black leading-none mb-2 ${k.color}`}>{k.val}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">{k.label}</div>
              <div className="text-xs text-slate-600 leading-snug">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* SCENARIOS */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <LineChart size={16} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              {t("financials.scenarios.title")}
            </span>
          </div>
          <div className="space-y-4">
            {scenarios.map((s, i) => (
              <div key={i} className={`p-4 md:p-5 rounded-xl border ${s.featured ? "border-cyan-500/40 bg-cyan-500/[0.03]" : "border-slate-800 bg-slate-900/40"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm ${s.featured ? "text-cyan-300" : "text-white"}`}>
                      {s.name}
                    </span>
                    {s.featured && (
                      <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 uppercase">
                        ★ {t("financials.scenarios.base.tag")}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-mono ${s.textColor}`}>
                    {t("financials.scenarios.fp_reduction")}: {s.reduction}
                  </span>
                </div>
                {/* progress bar */}
                <div className="h-1.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
                  <div className={`h-1.5 ${s.color} rounded-full transition-all`} style={{ width: s.barW }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">{t("financials.scenarios.annual")}</div>
                    <div className={`font-mono font-semibold ${s.textColor}`}>{s.annual}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">{t("financials.scenarios.payback")}</div>
                    <div className="font-mono font-semibold text-slate-200">{s.payback}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">{t("financials.scenarios.van")}</div>
                    <div className="font-mono font-semibold text-slate-200">{s.van}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-[11px] italic mt-5">{t("financials.footnote")}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Fleet Economics ─────────────────────────────────────────────────────────

function FleetEconomics({ t }: { t: (k: string) => string }) {
  const rows = [
    { name: t("fleet.rows.r1"), addition: "$430K", capex: "$430K", per: "$430K", annual: "$3.0M", payback: "1.7m" },
    { name: t("fleet.rows.r2"), addition: "+$190K", capex: "$810K", per: "$270K", annual: "$9.0M", payback: "<1.1m" },
    { name: t("fleet.rows.r3"), addition: "+$185K", capex: "$1.19M", per: "$238K", annual: "$15.0M", payback: "<1m", featured: true },
    { name: t("fleet.rows.r4"), addition: "+$175K", capex: "$1.79M", per: "$224K", annual: "$24.0M", payback: "<1m" },
  ];

  return (
    <section id="fleet" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("fleet.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("fleet.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("fleet.subheadline")}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800">
                  <th className="px-5 py-4 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t("fleet.cols.config")}</th>
                  <th className="px-5 py-4 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t("fleet.cols.module")}</th>
                  <th className="px-5 py-4 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t("fleet.cols.capex")}</th>
                  <th className="px-5 py-4 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t("fleet.cols.per_shovel")}</th>
                  <th className="px-5 py-4 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t("fleet.cols.annual")}</th>
                  <th className="px-5 py-4 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{t("fleet.cols.payback")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={`border-b border-slate-800 last:border-b-0 ${r.featured ? "bg-cyan-500/[0.04]" : ""} hover:bg-slate-900/60 transition-colors`}>
                    <td className={`px-5 py-4 text-sm font-semibold ${r.featured ? "text-cyan-300" : "text-white"}`}>
                      {r.name}
                      {r.featured && <span className="ml-2 text-[9px] font-mono text-cyan-400">★</span>}
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-amber-400">{r.addition}</td>
                    <td className="px-5 py-4 text-center font-mono text-slate-300">{r.capex}</td>
                    <td className="px-5 py-4 text-center font-mono text-slate-300">{r.per}</td>
                    <td className="px-5 py-4 text-center font-mono text-emerald-400 font-semibold">{r.annual}</td>
                    <td className="px-5 py-4 text-center font-mono text-slate-300">{r.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-slate-600 text-[11px] italic mt-5 max-w-3xl">{t("fleet.footnote")}</p>
      </div>
    </section>
  );
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

interface MetricItem { value: string; label: string; desc: string }

function Metrics({ t, tArr }: {
  t: (k: string) => string;
  tArr: <T>(k: string) => T[];
}) {
  const items = tArr<MetricItem>("metrics.items");

  return (
    <section id="metrics" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("metrics.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("metrics.headline")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((m, i) => (
            <div
              key={i}
              className="relative group bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-8 text-center transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/[0.03] transition-colors" />
              <Activity size={16} className="text-cyan-400 mx-auto mb-4" />
              <p className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
                {m.value}
              </p>
              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mt-2">
                {m.label}
              </p>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Roadmap — Phase 0, Gate 1, Phase 1, Gate 2 ─────────────────────────────

function Roadmap({ t }: { t: (k: string) => string }) {
  const phases = [
    { id: "P0", tag: t("roadmap.p0.tag"), title: t("roadmap.p0.title"), desc: t("roadmap.p0.desc"), budget: "$150K", color: "amber" },
    { id: "G1", tag: t("roadmap.g1.tag"), title: t("roadmap.g1.title"), desc: t("roadmap.g1.desc"), budget: "", color: "slate" },
    { id: "P1", tag: t("roadmap.p1.tag"), title: t("roadmap.p1.title"), desc: t("roadmap.p1.desc"), budget: "$280K", color: "cyan" },
    { id: "G2", tag: t("roadmap.g2.tag"), title: t("roadmap.g2.title"), desc: t("roadmap.g2.desc"), budget: "", color: "emerald" },
  ];

  const colorMap: Record<string, { border: string; bg: string; text: string; tag: string }> = {
    amber:   { border: "border-amber-600/40",   bg: "bg-amber-500/[0.04]",   text: "text-amber-400",   tag: "text-amber-500" },
    cyan:    { border: "border-cyan-500/40",    bg: "bg-cyan-500/[0.04]",    text: "text-cyan-400",    tag: "text-cyan-500" },
    emerald: { border: "border-emerald-500/40", bg: "bg-emerald-500/[0.04]", text: "text-emerald-400", tag: "text-emerald-500" },
    slate:   { border: "border-slate-700",      bg: "bg-slate-900/40",       text: "text-slate-300",   tag: "text-slate-500" },
  };

  return (
    <section id="roadmap" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("roadmap.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("roadmap.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("roadmap.subheadline")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((p, i) => {
            const c = colorMap[p.color];
            return (
              <div key={i} className={`relative rounded-2xl border ${c.border} ${c.bg} p-6 hover:translate-y-[-2px] transition-transform`}>
                <div className="flex items-baseline justify-between mb-4">
                  <span className={`text-[10px] font-mono ${c.tag} tracking-widest font-semibold`}>{p.tag}</span>
                  <span className={`font-black text-2xl ${c.text}`}>{p.id}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.desc}</p>
                {p.budget && (
                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{t("roadmap.budget")}</span>
                    <div className={`font-mono font-bold text-sm ${c.text}`}>{p.budget}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-5 bg-cyan-500/[0.04] border border-cyan-500/20 rounded-xl">
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-semibold">{t("roadmap.totals.label")}:</span> {t("roadmap.totals.value")}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── HaaS ────────────────────────────────────────────────────────────────────

interface HaaSCard { tag: string; title: string; desc: string; highlight: string }

function HaaS({ t, tArr }: {
  t: (k: string) => string;
  tArr: <T>(k: string) => T[];
}) {
  const cards = tArr<HaaSCard>("haas.cards");
  const icons = [Shield, Layers, TrendingUp];

  return (
    <SectionWrapper className="bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("haas.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("haas.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {t("haas.subheadline")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-7 transition-all duration-300 group"
              >
                <span className="text-xs font-mono text-cyan-500/70 tracking-widest mb-5">
                  {c.tag}
                </span>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 group-hover:bg-cyan-500/15 transition-colors">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <span className="text-xs text-cyan-400 font-semibold">{c.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── Traffic — Second product ────────────────────────────────────────────────

function Traffic({ t }: { t: (k: string) => string }) {
  const features = [
    { icon: Radar,  title: t("traffic.f1.title"), desc: t("traffic.f1.desc") },
    { icon: LineChart, title: t("traffic.f2.title"), desc: t("traffic.f2.desc") },
    { icon: Truck,  title: t("traffic.f3.title"), desc: t("traffic.f3.desc") },
    { icon: GitBranch, title: t("traffic.f4.title"), desc: t("traffic.f4.desc") },
  ];

  const kpis = [
    { val: "−20%", l: t("traffic.k1") },
    { val: "0",    l: t("traffic.k2") },
    { val: "100%", l: t("traffic.k3") },
    { val: "<30ms", l: t("traffic.k4") },
  ];

  return (
    <section id="traffic" className="px-6 md:px-12 lg:px-24 py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("traffic.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("traffic.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("traffic.subheadline")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Features list */}
          <div className="space-y-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex gap-4 pb-5 border-b border-slate-800 last:border-b-0 last:pb-0">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{f.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((k, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 border-t-2 border-t-emerald-500 rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-black text-emerald-400 leading-none mb-2">{k.val}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team ────────────────────────────────────────────────────────────────────

interface TeamMember { name: string; role: string; bio: string }

function Team({ t, tArr }: {
  t: (k: string) => string;
  tArr: <T>(k: string) => T[];
}) {
  const members = tArr<TeamMember>("team.members");

  return (
    <SectionWrapper className="bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("team.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("team.headline")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-slate-800 border border-slate-700 flex items-center justify-center mb-5">
                <span className="text-white font-bold text-sm">
                  {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <p className="text-white font-bold text-base">{m.name}</p>
              <p className="text-cyan-400 text-xs font-semibold mt-1 mb-4">{m.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── Ecosystem ───────────────────────────────────────────────────────────────

interface EcoUnit { tag: string; title: string; desc: string }

function Ecosystem({ t, tArr }: {
  t: (k: string) => string;
  tArr: <T>(k: string) => T[];
}) {
  const units = tArr<EcoUnit>("ecosystem.units");
  const icons = [Radar, Drill, FlaskConical];

  return (
    <SectionWrapper className="bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>{t("ecosystem.eyebrow")}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-black text-white">{t("ecosystem.headline")}</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t("ecosystem.subheadline")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {units.map((u, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group relative bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-slate-600 tracking-widest">{u.tag}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border group-hover:border-cyan-500/20 transition-all">
                    <Icon size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{u.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{u.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTA({ t }: { t: (k: string) => string }) {
  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-24 py-24 bg-slate-900/60 border-y border-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" style={{
        backgroundImage: "radial-gradient(ellipse at center, rgba(6,182,212,0.06), transparent 70%)"
      }}/>
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-amber-500/10 border border-amber-600/40 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase">
          ⬡ {t("cta.aster_badge")}
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-[1.1]">
          {t("cta.headline")}
        </h2>
        <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          {t("cta.subheadline")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:contact@andeanflow.ai" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-7 py-3 rounded text-sm transition-colors justify-center">
            {t("cta.primary")} <ArrowRight size={15} />
          </a>
          <a href="mailto:contact@andeanflow.ai?subject=Business Case SpectraFlow AI" className="flex items-center gap-2 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium px-7 py-3 rounded text-sm transition-colors justify-center">
            {t("cta.secondary")} <ChevronRight size={15} />
          </a>
        </div>
        <p className="text-slate-600 text-xs mt-8 font-mono">contact@andeanflow.ai · Santiago, Chile</p>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ t }: { t: (k: string) => string }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 md:px-12 lg:px-24 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand — logo larger here too */}
          <div>
            <div className="mb-3">
              <LogoFull className="h-12 w-auto" />
            </div>
            <p className="text-slate-500 text-xs italic mt-3">{t("footer.tagline")}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={11} className="text-slate-600" />
              <span className="text-slate-600 text-xs">{t("footer.location")}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="text-left md:text-right">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              {t("footer.contact_label")}
            </p>
            <a
              href={`mailto:${t("footer.contact_email")}`}
              className="flex items-center md:justify-end gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              <Mail size={14} />
              {t("footer.contact_email")}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900">
          <p className="text-slate-700 text-xs text-center">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page (Root) ─────────────────────────────────────────────────────────────

export default function Page() {
  const [locale, setLocale] = useState<Locale>("es");
  const { t, tArr } = useTranslation(locale);

  return (
    <main className="bg-slate-950 min-h-screen font-sans antialiased text-white">
      <Navbar t={t} locale={locale} setLocale={setLocale} />
      <Hero t={t} />
      <PainSection t={t} tArr={tArr} />
      <HowItWorks t={t} />
      <TechSpecs t={t} />
      <Metrics t={t} tArr={tArr} />
      <Financials t={t} />
      <FleetEconomics t={t} />
      <Roadmap t={t} />
      <HaaS t={t} tArr={tArr} />
      <Traffic t={t} />
      <Team t={t} tArr={tArr} />
      <Ecosystem t={t} tArr={tArr} />
      <CTA t={t} />
      <Footer t={t} />
    </main>
  );
}
