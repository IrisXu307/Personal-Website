import Link from 'next/link'
import { ArrowRight, Zap, Box, Telescope } from 'lucide-react'

const traits = [
  {
    icon: Zap,
    title: 'I learn fast.',
    desc: 'New language, new framework, new domain — give me a weekend.',
  },
  {
    icon: Box,
    title: 'I ship things.',
    desc: "Ideas don't count until they're real. I bias heavily toward building.",
  },
  {
    icon: Telescope,
    title: 'I think big.',
    desc: 'One million is just the starting point.',
  },
]

const stack = [
  'Python', 'Java', 'C/C++', 'TypeScript',
  'React', 'Next.js', 'Node.js', 'Git', 'SQL',
]

const currently = [
  { label: 'Studying', value: 'CS @ University of Waterloo, 1B' },
  { label: 'Building', value: 'this website (meta, I know)' },
  { label: 'Learning', value: 'systems design & distributed systems' },
  { label: 'Reading', value: 'placeholder — add your current book' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="text-sm font-semibold text-violet-500 mb-4 tracking-widest uppercase">
            hey, i&apos;m
          </p>
          <h1 className="text-7xl font-bold tracking-tight mb-5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
            Iris Xu
          </h1>
          <p className="text-xl font-medium text-slate-700 mb-3">
            CS Student @ University of Waterloo &middot; 1B
          </p>
          <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
            I build things that are fast, clean, and actually useful.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/projects"
              className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-all hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-violet-300 hover:text-violet-600 transition-all hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Traits */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {traits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-200 transition-colors">
                <Icon size={18} className="text-violet-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Project */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <p className="text-xs font-semibold text-violet-500 mb-2 tracking-widest uppercase">
          Latest
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Project</h2>
        <Link href="/projects" className="group block">
          <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-sky-50 p-8 hover:shadow-xl hover:shadow-violet-100 transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-200/30 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
            <span className="inline-block text-xs font-semibold text-violet-600 bg-violet-100 px-3 py-1 rounded-full mb-4">
              shipped yesterday
            </span>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">One Million</h3>
            <p className="text-slate-500 max-w-xl leading-relaxed mb-6">
              [Add your project description here — what is it, what problem does it solve, what did you build it with?]
            </p>
            <span className="flex items-center gap-2 text-violet-600 font-medium text-sm group-hover:gap-3 transition-all">
              See all projects <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      </section>

      {/* Stack + Currently */}
      <section className="max-w-5xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Stack */}
        <div>
          <p className="text-xs font-semibold text-violet-500 mb-2 tracking-widest uppercase">
            Toolkit
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Tech I use</h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:border-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Currently */}
        <div>
          <p className="text-xs font-semibold text-violet-500 mb-2 tracking-widest uppercase">
            Right Now
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Currently</h2>
          <ul className="space-y-3">
            {currently.map(({ label, value }) => (
              <li key={label} className="flex gap-3 text-sm">
                <span className="font-semibold text-slate-400 w-16 shrink-0">{label}</span>
                <span className="text-slate-600">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Want to work together?</h2>
            <p className="text-slate-500 mt-1">I&apos;m open to internships, projects, and good conversations.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-all hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 flex items-center gap-2"
          >
            Let&apos;s talk <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
