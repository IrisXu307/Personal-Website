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
    description:
      'A project that hit a milestone of one million — [add your description here]. Built end-to-end in a single day.',
    tags: ['placeholder', 'coming soon'],
    github: '#',
    live: '#',
    highlight: true,
  },
  {
    title: 'Project Two',
    description:
      'Placeholder — describe what this project does, why you built it, and what you learned.',
    tags: ['placeholder'],
    github: '#',
    live: null,
  },
  {
    title: 'Project Three',
    description:
      'Placeholder — describe what this project does, why you built it, and what you learned.',
    tags: ['placeholder'],
    github: '#',
    live: null,
  },
]

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm font-semibold text-violet-500 mb-2 tracking-widest uppercase">
        My Work
      </p>
      <h2 className="text-4xl font-bold text-slate-900 mb-10">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${
              project.highlight
                ? 'border-violet-200 bg-violet-50 hover:shadow-violet-100'
                : 'border-slate-100 bg-white hover:shadow-slate-100'
            }`}
          >
            {project.highlight && (
              <span className="absolute top-4 right-4 text-xs font-semibold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                Latest
              </span>
            )}
            <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={project.github}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
              >
                <GithubIcon size={15} />
                Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  className="flex items-center gap-1.5 text-sm text-violet-500 hover:text-violet-700 transition-colors font-medium"
                >
                  <ExternalLink size={15} />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
