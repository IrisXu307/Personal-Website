const skills = [
  'Python', 'Java', 'C/C++', 'TypeScript', 'JavaScript',
  'React', 'Next.js', 'Node.js', 'Git', 'SQL',
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm font-semibold text-violet-500 mb-2 tracking-widest uppercase">
        About Me
      </p>
      <h2 className="text-4xl font-bold text-slate-900 mb-10">
        The person behind the code
      </h2>

      <div className="space-y-5 text-slate-600 leading-relaxed text-lg mb-14">
        <p>
          I&apos;m Iris, a first-year Computer Science student at the{' '}
          <span className="text-slate-900 font-medium">University of Waterloo</span> (1B).
          I love solving hard problems, shipping side projects, and learning something
          new every day — sometimes all three at once.
        </p>
        <p>
          My interests span software engineering, systems, and building products that
          people actually use. Outside of coding, you&apos;ll find me exploring new tools,
          reading about tech, or working on the next idea I can&apos;t stop thinking about.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-5">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg text-sm font-medium border border-violet-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
