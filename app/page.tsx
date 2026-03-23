import Link from 'next/link'

export default function Home() {
  return (
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
  )
}
