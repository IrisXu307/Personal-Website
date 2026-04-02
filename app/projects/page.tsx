import { ExternalLink } from 'lucide-react'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

const projects = [
  {
    title: 'One Million',
    date: 'Mar 2026',
    emoji: '🤖',
    genre: 'AI · Hackathon',
    difficulty: 'HARD',
    difficultyColor: 'text-red-400 border-red-800/50 bg-red-950/30',
    description:
      'Multi-agent AI pipeline tracking housing, healthcare, employment, and urban metrics across federal, provincial, and municipal sources. Parallel LangChain agents — built in one day at FCI Hackathon.',
    tags: ['Python', 'LangChain', 'Multi-Agent', 'Data Pipeline'],
    github: 'https://github.com/IrisXu307/FCI-Hackathon-One-Million-Scoreboard',
    live: null,
    status: 'COMPLETED',
    statusColor: 'text-green-400',
    banner: 'from-violet-900/80 to-indigo-900/60',
    border: 'border-violet-800/50 hover:border-violet-500/70',
    glow: 'hover:box-glow-violet',
    tagStyle: 'bg-violet-900/40 text-violet-300 border border-violet-800/50',
  },
  {
    title: 'Flags of Asia',
    date: 'Nov 2023',
    emoji: '🎌',
    genre: 'Browser Game',
    difficulty: 'MEDIUM',
    difficultyColor: 'text-amber-400 border-amber-800/50 bg-amber-950/30',
    description:
      'Quiz game: identify 15 Asian flags among 30 within 10 minutes, with only 4 mistakes allowed. Built as a Grade 11 CS capstone — pure vanilla HTML, CSS, JS. No frameworks. No dependencies.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/IrisXu307/Asian-Flag-Game',
    live: null,
    status: 'SHIPPED',
    statusColor: 'text-cyan-400',
    banner: 'from-amber-900/70 to-orange-900/50',
    border: 'border-amber-800/40 hover:border-amber-500/60',
    glow: 'hover:box-glow-amber',
    tagStyle: 'bg-amber-900/40 text-amber-300 border border-amber-800/50',
  },
  {
    title: 'Project Three',
    date: null,
    emoji: '📦',
    genre: 'Coming Soon',
    difficulty: '???',
    difficultyColor: 'text-slate-500 border-slate-700/50 bg-slate-900/30',
    description:
      'This quest is still being written. Check back later.',
    tags: ['TBD'],
    github: '#',
    live: null,
    status: 'IN PROGRESS',
    statusColor: 'text-slate-500',
    banner: 'from-slate-800/60 to-slate-900/60',
    border: 'border-slate-700/40 hover:border-slate-600/60',
    glow: '',
    tagStyle: 'bg-slate-800/40 text-slate-500 border border-slate-700/50',
  },
]

export default function Projects() {
  return (
    <div className="game-grid min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-violet-500 tracking-[0.4em] mb-2 uppercase">── my work ──</p>
        <h2 className="text-4xl font-bold text-slate-100 mb-2">Quest Log</h2>
        <p className="font-mono text-sm text-slate-600 mb-10">{projects.filter(p => p.status !== 'IN PROGRESS').length} / {projects.length} completed</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`group flex flex-col rounded-xl border bg-[#0d0b1e] overflow-hidden transition-all hover:-translate-y-1 ${p.border} ${p.glow}`}
            >
              {/* Banner */}
              <div className={`bg-gradient-to-r ${p.banner} px-5 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl leading-none">{p.emoji}</span>
                  <span className="font-mono text-xs text-white/50 tracking-widest uppercase">{p.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  {p.date && <span className="font-mono text-xs text-white/40">{p.date}</span>}
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${p.difficultyColor}`}>
                    {p.difficulty}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-100">{p.title}</h3>
                  <span className={`font-mono text-[10px] font-bold tracking-wider shrink-0 mt-0.5 ${p.statusColor}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 rounded font-mono text-xs ${p.tagStyle}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={p.github}
                    className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    <GithubIcon size={13} />
                    CODE
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      className="flex items-center gap-1.5 font-mono text-xs text-violet-500 hover:text-violet-300 transition-colors"
                    >
                      <ExternalLink size={13} />
                      LIVE
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
