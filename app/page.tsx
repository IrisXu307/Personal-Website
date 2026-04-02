import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import DialogueGame from './components/DialogueGame'

const stats = [
  { label: 'LVL', value: '1B', sub: 'CS @ UWaterloo' },
  { label: 'AGI', value: '99', sub: 'Fast Learner' },
  { label: 'STR', value: '87', sub: 'Ships Things' },
  { label: 'VIS', value: '92', sub: 'Thinks Big' },
]

const stack = [
  { name: 'Python', color: 'border-amber-700/50 text-amber-400 hover:bg-amber-950/50 hover:border-amber-500' },
  { name: 'Java', color: 'border-orange-700/50 text-orange-400 hover:bg-orange-950/50 hover:border-orange-500' },
  { name: 'C/C++', color: 'border-sky-700/50 text-sky-400 hover:bg-sky-950/50 hover:border-sky-500' },
  { name: 'TypeScript', color: 'border-blue-700/50 text-blue-400 hover:bg-blue-950/50 hover:border-blue-500' },
  { name: 'React', color: 'border-cyan-700/50 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500' },
  { name: 'Next.js', color: 'border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-400' },
  { name: 'Node.js', color: 'border-green-700/50 text-green-400 hover:bg-green-950/50 hover:border-green-500' },
  { name: 'Git', color: 'border-red-700/50 text-red-400 hover:bg-red-950/50 hover:border-red-500' },
  { name: 'SQL', color: 'border-violet-700/50 text-violet-400 hover:bg-violet-950/50 hover:border-violet-500' },
]

const currently = [
  { icon: '📚', label: 'Studying', value: 'CS @ University of Waterloo, 1B' },
  { icon: '⚒️', label: 'Building', value: 'this website (meta, I know)' },
  { icon: '🧠', label: 'Learning', value: 'systems design & distributed systems' },
  { icon: '📖', label: 'Reading', value: 'placeholder — add your current book' },
]

export default function Home() {
  return (
    <div className="game-grid min-h-screen">
      {/* Hero / Title Screen */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-600/6 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 text-center">
          <p className="font-mono text-xs text-violet-500 tracking-[0.5em] mb-6 uppercase">
            ── player one ──
          </p>
          <h1 className="text-8xl font-bold tracking-tight mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent glow-violet">
            Iris Xu
          </h1>
          <p className="font-mono text-slate-400 text-base mb-10 tracking-widest">
            CS STUDENT  ·  BUILDER  ·  UWaterloo 1B
          </p>

          {/* Stat bar */}
          <div className="flex items-center justify-center gap-6 mb-12">
            {stats.map(({ label, value, sub }) => (
              <div key={label} className="text-center">
                <div className="font-mono text-xs text-slate-600 mb-0.5 tracking-widest">{label}</div>
                <div className="font-mono text-xl font-bold text-violet-300">{value}</div>
                <div className="font-mono text-[10px] text-slate-600">{sub}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/projects"
              className="group px-6 py-3 bg-violet-700/80 border border-violet-500/50 text-violet-100 rounded-lg font-mono text-sm font-bold tracking-wider hover:bg-violet-600/80 hover:border-violet-400 transition-all box-glow-violet hover:-translate-y-0.5 flex items-center gap-2"
            >
              VIEW QUESTS
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-slate-700 text-slate-400 rounded-lg font-mono text-sm font-bold tracking-wider hover:border-violet-600 hover:text-violet-400 transition-all hover:-translate-y-0.5"
            >
              SEND MESSAGE
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-700 tracking-widest animate-bounce">
          ▼ SCROLL
        </div>
      </section>

      {/* Talk to Iris — dialogue mini-game */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <p className="font-mono text-xs text-cyan-600 tracking-[0.4em] mb-2 uppercase">── interactive ──</p>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">Talk to Iris</h2>
          <p className="text-slate-500 font-mono text-sm">Navigate the dialogue tree to learn more about me</p>
        </div>
        <DialogueGame />
      </section>

      {/* Loadout + Status */}
      <section className="max-w-5xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Stack */}
        <div>
          <p className="font-mono text-xs text-violet-500 tracking-[0.4em] mb-3 uppercase">── loadout ──</p>
          <h2 className="text-xl font-bold text-slate-100 mb-5">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {stack.map(({ name, color }) => (
              <span
                key={name}
                className={`px-3 py-1.5 bg-transparent border rounded-lg font-mono text-xs font-bold tracking-wide transition-all cursor-default ${color}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Currently */}
        <div>
          <p className="font-mono text-xs text-cyan-600 tracking-[0.4em] mb-3 uppercase">── quest log ──</p>
          <h2 className="text-xl font-bold text-slate-100 mb-5">Currently</h2>
          <ul className="space-y-3">
            {currently.map(({ icon, label, value }) => (
              <li key={label} className="flex gap-3 items-start">
                <span className="text-base leading-5">{icon}</span>
                <div>
                  <span className="font-mono text-xs text-violet-500 tracking-widest block mb-0.5">{label.toUpperCase()}</span>
                  <span className="text-sm text-slate-400 font-mono">{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-violet-900/30 bg-[#0a0818]/80">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-violet-500 tracking-[0.4em] mb-1">── new game + ──</p>
            <h2 className="text-2xl font-bold text-slate-100">Want to work together?</h2>
            <p className="text-slate-500 mt-1 font-mono text-sm">Open to internships, projects, and good conversations.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 bg-violet-700/80 border border-violet-500/50 text-violet-100 rounded-lg font-mono text-sm font-bold tracking-wider hover:bg-violet-600/80 hover:border-violet-400 transition-all box-glow-violet hover:-translate-y-0.5 flex items-center gap-2"
          >
            LET&apos;S TALK <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
