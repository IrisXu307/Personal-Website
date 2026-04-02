'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/awards', label: 'Awards' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full bg-[#07070f]/80 backdrop-blur-md border-b border-violet-900/40 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-violet-400 text-lg tracking-widest hover:text-violet-300 transition-colors glow-violet"
        >
          IRIS.XU
        </Link>
        <div className="flex gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-mono font-medium tracking-wider transition-all ${
                pathname === href
                  ? 'text-violet-300 glow-violet'
                  : 'text-slate-500 hover:text-violet-400'
              }`}
            >
              {pathname === href && <span className="text-violet-500 mr-1">▶</span>}
              {label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
