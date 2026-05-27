"use client";

import { useState } from "react";
import {
  ArrowRight, Zap, Layers, TrendingUp, Shield, ChevronRight,
  Mail, MapPin, Cpu, FlaskConical, Radar, Drill,
  AlertTriangle, CheckCircle2, Activity
} from "lucide-react";

// ─── i18n stub ──────────────────────────────────────────────────────────────
// In production, replace with next-intl or next-i18next.
// Keys map 1-to-1 to es.json / en.json dictionaries.
import es from "../locales/es.json";
import en from "../locales/en.json";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Zap size={14} className="text-cyan-400" />
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">
            {t("nav.logo")}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
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
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
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

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
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
            href="#metrics"
            className="flex items-center gap-2 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium px-6 py-3 rounded text-sm transition-colors"
          >
            {t("hero.cta_secondary")} <ChevronRight size={15} />
          </a>
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

// ─── HaaS ────────────────────────────────────────────────────────────────────

interface HaaSCard { tag: string; title: string; desc: string; highlight: string }

function HaaS({ t, tArr }: {
  t: (k: string) => string;
  tArr: <T>(k: string) => T[];
}) {
  const cards = tArr<HaaSCard>("haas.cards");
  const icons = [Shield, Layers, TrendingUp];

  return (
    <SectionWrapper className="bg-slate-950">
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
              {/* Avatar placeholder */}
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

        {/* Bento grid */}
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

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ t }: { t: (k: string) => string }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 md:px-12 lg:px-24 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Zap size={12} className="text-cyan-400" />
              </div>
              <span className="text-white font-semibold text-sm">{t("nav.logo")}</span>
            </div>
            <p className="text-slate-500 text-xs italic">{t("footer.tagline")}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={11} className="text-slate-600" />
              <span className="text-slate-600 text-xs">{t("footer.location")}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="text-right">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              {t("footer.contact_label")}
            </p>
            <a
              href={`mailto:${t("footer.contact_email")}`}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
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
      <Metrics t={t} tArr={tArr} />
      <HaaS t={t} tArr={tArr} />
      <Team t={t} tArr={tArr} />
      <Ecosystem t={t} tArr={tArr} />
      <Footer t={t} />
    </main>
  );
}