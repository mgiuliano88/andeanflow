"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight, ChevronRight, Mail, MapPin, Zap, Activity, Cpu,
  GitBranch, FlaskConical, ShieldCheck, Microscope, Layers,
  TrendingUp, CircleDot, CheckCircle2, AlertTriangle, Crosshair,
  Beaker, Target, Compass, Boxes
} from "lucide-react";

// ─── Brand Logo ──────────────────────────────────────────────────────────────
// Files live in /public/brand/ :
//   logo-andeanflow.svg       (full lockup: emblem + wordmark)
//   logo-andeanflow-icon.svg  (emblem only)
function LogoFull({ className = "" }: { className?: string }) {
  return (
    <Image src="/brand/logo-andeanflow.svg" alt="Andean Flow Technologies"
      width={1408} height={768} priority className={className} />
  );
}
function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <Image src="/brand/logo-andeanflow-icon.svg" alt="Andean Flow Technologies"
      width={365} height={264} className={className} />
  );
}

// ─── i18n ─────────────────────────────────────────────────────────────────────
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

// ─── Primitives ────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-teal-400 mb-4">
      <span className="w-6 h-px bg-teal-400/60" />{children}
    </span>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ t, locale, setLocale }: {
  t: (k: string) => string; locale: string; setLocale: (l: "es" | "en") => void;
}) {
  const links = ["problem", "approach", "science", "roadmap", "team"];
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#070b10]/85 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center" aria-label={t("nav.logo")}>
          <LogoFull className="h-14 w-auto" />
        </a>
        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a key={l} href={`#${l}`}
              className="text-[13px] text-slate-400 hover:text-white transition-colors tracking-wide">
              {t(`nav.links.${l}`)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-amber-400/90 border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 rounded">
            <CircleDot size={9} /> {t("nav.review_badge")}
          </span>
          <button onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="text-xs text-slate-400 hover:text-white transition-colors font-mono border border-white/15 hover:border-white/40 px-2.5 py-1 rounded">
            {locale === "es" ? "EN" : "ES"}
          </button>
          <a href="mailto:miguel@andeanflow.ai"
            className="flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-[#070b10] text-xs font-bold px-4 py-2 rounded transition-colors">
            {t("nav.cta")} <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ t }: { t: (k: string) => string }) {
  const stats = [
    { v: t("hero.stats_values.value"), l: t("hero.stats_labels.value") },
    { v: t("hero.stats_values.accuracy"), l: t("hero.stats_labels.accuracy") },
    { v: t("hero.stats_values.decision"), l: t("hero.stats_labels.decision") },
    { v: t("hero.stats_values.edge"), l: t("hero.stats_labels.edge") },
  ];
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#14b8a6 1px,transparent 1px),linear-gradient(90deg,#14b8a6 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div className="absolute -top-1/4 -right-[10%] w-[55%] h-[80%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(20,184,166,0.10),transparent 65%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          <div>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-[64px] leading-[1.05] tracking-tight text-white mb-6">
              {t("hero.headline")}
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
              {t("hero.subheadline")}
            </p>
            <div className="inline-flex items-center gap-2 mb-8 text-[12px] font-mono text-teal-300/90 border border-teal-400/25 bg-teal-400/5 px-3 py-1.5 rounded">
              <Microscope size={13} /> {t("hero.trl")}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:miguel@andeanflow.ai"
                className="flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-[#070b10] font-bold px-6 py-3 rounded text-sm transition-colors">
                {t("hero.cta_primary")} <ArrowRight size={15} />
              </a>
              <a href="#approach"
                className="flex items-center justify-center gap-2 border border-white/15 hover:border-teal-400/50 text-slate-200 font-medium px-6 py-3 rounded text-sm transition-colors">
                {t("hero.cta_secondary")} <ChevronRight size={15} />
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <LogoIcon className="h-40 md:h-52 w-auto opacity-95" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-16 border border-white/10 rounded-xl overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="px-5 py-5 border-r border-b lg:border-b-0 border-white/10 last:border-r-0 bg-white/[0.02]">
              <div className="font-serif text-2xl md:text-[28px] text-teal-300 leading-none mb-2">{s.v}</div>
              <div className="text-[10.5px] text-slate-500 uppercase tracking-wider leading-snug">{s.l}</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-600 italic mt-4 max-w-4xl leading-relaxed">{t("hero.disclaimer")}</p>
      </div>
    </section>
  );
}

// ─── Problem ───────────────────────────────────────────────────────────────────
interface PCard { stat: string; title: string; desc: string }
function Problem({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const cards = tArr<PCard>("problem.cards");
  return (
    <section id="problem" className="px-6 md:px-10 py-24 bg-[#070b10]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("problem.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("problem.intro")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {cards.map((c, i) => (
            <div key={i} className="relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-7 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-red-500/40 to-transparent" />
              <div className="font-serif text-5xl text-red-400/80 mb-4 leading-none">{c.stat}</div>
              <h3 className="text-white font-semibold text-base mb-2">{c.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 bg-amber-500/[0.06] border border-amber-500/20 rounded-xl px-5 py-4">
          <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed">{t("problem.honest_note")}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Approach (steps + comparison table) ────────────────────────────────────────
interface CompRow { tech: string; measures: string; limit: string; highlight: boolean }
function Approach({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const steps = [
    { icon: Zap, k: "s1" }, { icon: Activity, k: "s2" },
    { icon: Cpu, k: "s3" }, { icon: GitBranch, k: "s4" },
  ];
  const rows = tArr<CompRow>("approach.comparison.rows");
  return (
    <section id="approach" className="px-6 md:px-10 py-24 bg-[#0a1016] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("approach.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("approach.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("approach.intro")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-2xl overflow-hidden mb-16">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative p-7 border-r border-b lg:border-b-0 border-white/10 last:border-r-0 md:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r bg-white/[0.015] hover:bg-white/[0.04] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-teal-400/10 border border-teal-400/25 flex items-center justify-center mb-5">
                  <Icon size={17} className="text-teal-300" />
                </div>
                <p className="text-[11px] font-mono text-teal-400/70 tracking-wider mb-2">{t(`approach.steps.${s.k}.tag`)}</p>
                <h3 className="text-white font-semibold text-[15px] mb-2 leading-snug">{t(`approach.steps.${s.k}.title`)}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{t(`approach.steps.${s.k}.desc`)}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mb-7">
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">{t("approach.diff_title")}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{t("approach.diff_intro")}</p>
        </div>
        <div className="overflow-x-auto border border-white/10 rounded-2xl">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="text-left px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-teal-300/80">{t("approach.comparison.header_tech")}</th>
                <th className="text-left px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-teal-300/80">{t("approach.comparison.header_measures")}</th>
                <th className="text-left px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-teal-300/80">{t("approach.comparison.header_limit")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={`border-t border-white/[0.07] ${r.highlight ? "bg-teal-400/[0.06]" : ""}`}>
                  <td className={`px-6 py-4 text-sm font-semibold ${r.highlight ? "text-teal-300" : "text-white"}`}>
                    {r.highlight && <CheckCircle2 size={13} className="inline mr-1.5 -mt-0.5 text-teal-400" />}
                    {r.tech}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-slate-400 font-mono">{r.measures}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500 leading-relaxed">{r.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Science (TRL honesty 3-column) ──────────────────────────────────────────────
interface SciCol { status: string; tag: string; title: string; items: string[] }
function Science({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const cols = tArr<SciCol>("science.columns");
  const styles = [
    { icon: CheckCircle2, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/[0.04]", dot: "bg-emerald-400" },
    { icon: Beaker, color: "text-teal-400", border: "border-teal-500/30", bg: "bg-teal-500/[0.04]", dot: "bg-teal-400" },
    { icon: Crosshair, color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/[0.04]", dot: "bg-amber-400" },
  ];
  return (
    <section id="science" className="px-6 md:px-10 py-24 bg-[#070b10]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("science.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("science.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("science.intro")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {cols.map((c, i) => {
            const st = styles[i]; const Icon = st.icon;
            return (
              <div key={i} className={`rounded-2xl border ${st.border} ${st.bg} p-7`}>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-10 h-10 rounded-xl border ${st.border} flex items-center justify-center`}>
                    <Icon size={16} className={st.color} />
                  </div>
                  <span className={`text-[10px] font-mono ${st.color} tracking-wider uppercase`}>{c.tag}</span>
                </div>
                <div className={`text-[11px] font-bold uppercase tracking-[0.15em] ${st.color} mb-1`}>{c.status}</div>
                <h3 className="text-white font-semibold text-[17px] mb-4 leading-snug">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.items.map((it, j) => (
                    <li key={j} className="flex gap-2.5 text-[13px] text-slate-400 leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${st.dot} shrink-0`} />{it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Metrics ───────────────────────────────────────────────────────────────────
interface Metric { value: string; label: string; desc: string }
function Metrics({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const items = tArr<Metric>("metrics.items");
  return (
    <section className="px-6 md:px-10 py-24 bg-[#0a1016] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("metrics.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("metrics.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("metrics.intro")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((m, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-teal-400/30 transition-colors">
              <Target size={16} className="text-teal-400 mb-4" />
              <div className="font-serif text-4xl md:text-5xl text-white mb-3 leading-none">{m.value}</div>
              <div className="text-teal-300 font-semibold text-[13px] uppercase tracking-wider mb-2">{m.label}</div>
              <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Roadmap (re-sequenced MVP) ──────────────────────────────────────────────────
interface Phase { id: string; tag: string; title: string; desc: string; gate: string }
function Roadmap({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const phases = tArr<Phase>("roadmap.phases");
  return (
    <section id="roadmap" className="px-6 md:px-10 py-24 bg-[#070b10]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("roadmap.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("roadmap.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("roadmap.subheadline")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {phases.map((p, i) => (
            <div key={i} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:-translate-y-0.5 transition-transform">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[10.5px] font-mono text-teal-400/80 tracking-wider">{p.tag}</span>
                <span className="font-serif text-2xl text-teal-300">{p.id}</span>
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2.5 leading-snug">{p.title}</h3>
              <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4">{p.desc}</p>
              <div className="pt-3 border-t border-white/[0.07]">
                <span className="text-[10.5px] font-mono text-emerald-400/90 leading-snug">{p.gate}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 bg-teal-400/[0.05] border border-teal-400/20 rounded-xl px-6 py-5">
          <ShieldCheck size={18} className="text-teal-400 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="text-teal-300 font-semibold">{t("roadmap.totals.label")}:</span> {t("roadmap.totals.value")}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Commercial model (Land & Expand) ────────────────────────────────────────────
interface MCard { tag: string; title: string; desc: string; highlight: string }
function Model({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const cards = tArr<MCard>("model.cards");
  const icons = [Compass, FlaskConical, TrendingUp];
  return (
    <section className="px-6 md:px-10 py-24 bg-[#0a1016] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("model.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("model.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("model.subheadline")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl p-7 hover:border-teal-400/30 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-teal-400/10 border border-teal-400/25 flex items-center justify-center">
                    <Icon size={17} className="text-teal-300" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">{c.tag}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-6 pt-5 border-t border-white/[0.07]">
                  <span className="text-xs text-teal-300 font-semibold">{c.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Team ───────────────────────────────────────────────────────────────────────
interface Member { name: string; role: string; bio: string }
function Team({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const members = tArr<Member>("team.members");
  return (
    <section id="team" className="px-6 md:px-10 py-24 bg-[#070b10]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("team.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("team.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("team.intro")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {members.map((m, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-7 hover:border-white/20 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400/30 to-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                <span className="text-white font-bold text-sm">{m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
              </div>
              <p className="text-white font-semibold text-base">{m.name}</p>
              <p className="text-teal-300 text-[12px] font-semibold mt-1 mb-4">{m.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4">
          <Boxes size={16} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-400 leading-relaxed">{t("team.advisors_note")}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Vision ───────────────────────────────────────────────────────────────────
interface Unit { tag: string; title: string; desc: string }
function Vision({ t, tArr }: { t: (k: string) => string; tArr: <T>(k: string) => T[] }) {
  const units = tArr<Unit>("vision.units");
  return (
    <section className="px-6 md:px-10 py-24 bg-[#0a1016] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t("vision.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">{t("vision.headline")}</h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("vision.subheadline")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {units.map((u, i) => (
            <div key={i} className="group bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-teal-400/25 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${i === 0 ? "bg-teal-400" : i === 1 ? "bg-amber-400" : "bg-slate-500"}`} />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{u.tag}</span>
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2">{u.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────
function CTA({ t }: { t: (k: string) => string }) {
  return (
    <section id="contact" className="relative px-6 md:px-10 py-28 bg-[#070b10] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center,rgba(20,184,166,0.08),transparent 70%)"
      }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 bg-amber-500/10 border border-amber-500/40 rounded text-amber-400 text-[10px] font-mono tracking-widest uppercase">
          <CircleDot size={9} /> {t("cta.aster_badge")}
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-5 leading-tight">{t("cta.headline")}</h2>
        <p className="text-slate-400 text-base md:text-lg mb-9 leading-relaxed max-w-2xl mx-auto">{t("cta.subheadline")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:miguel@andeanflow.ai"
            className="flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-[#070b10] font-bold px-7 py-3 rounded text-sm transition-colors">
            {t("cta.primary")} <ArrowRight size={15} />
          </a>
          <a href="mailto:miguel@andeanflow.ai?subject=Dossier SpectraFlow AI"
            className="flex items-center justify-center gap-2 border border-white/15 hover:border-teal-400/50 text-slate-200 font-medium px-7 py-3 rounded text-sm transition-colors">
            {t("cta.secondary")} <ChevronRight size={15} />
          </a>
        </div>
        <p className="text-slate-600 text-xs mt-9 font-mono">miguel@andeanflow.ai · Santiago, Chile</p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ t }: { t: (k: string) => string }) {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a1016] px-6 md:px-10 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <LogoFull className="h-12 w-auto mb-3" />
            <p className="text-slate-500 text-xs italic">{t("footer.tagline")}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={11} className="text-slate-600" />
              <span className="text-slate-600 text-xs">{t("footer.location")}</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">{t("footer.contact_label")}</p>
            <a href={`mailto:${t("footer.contact_email")}`}
              className="flex items-center md:justify-end gap-2 text-teal-300 hover:text-teal-200 text-sm font-medium transition-colors">
              <Mail size={14} /> {t("footer.contact_email")}
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.05]">
          <p className="text-slate-600 text-[11px] leading-relaxed max-w-4xl mb-3 italic">{t("footer.disclaimer")}</p>
          <p className="text-slate-700 text-xs">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────
export default function Page() {
  const [locale, setLocale] = useState<Locale>("es");
  const { t, tArr } = useTranslation(locale);
  return (
    <main className="bg-[#070b10] min-h-screen antialiased text-white selection:bg-teal-400/30">
      <Navbar t={t} locale={locale} setLocale={setLocale} />
      <Hero t={t} />
      <Problem t={t} tArr={tArr} />
      <Approach t={t} tArr={tArr} />
      <Science t={t} tArr={tArr} />
      <Metrics t={t} tArr={tArr} />
      <Roadmap t={t} tArr={tArr} />
      <Model t={t} tArr={tArr} />
      <Team t={t} tArr={tArr} />
      <Vision t={t} tArr={tArr} />
      <CTA t={t} />
      <Footer t={t} />
    </main>
  );
}
