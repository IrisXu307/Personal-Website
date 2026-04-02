'use client'

import { useState, useEffect, useRef } from 'react'

type Choice = { label: string; next: string }
type Node = { speaker: string; text: string; choices: Choice[] }

const tree: Record<string, Node> = {
  start: {
    speaker: 'IRIS',
    text: "Oh — a visitor! Welcome. I don't get many of these around here. What do you want to know?",
    choices: [
      { label: '❓  Who are you?', next: 'who' },
      { label: '🛠️  What have you built?', next: 'built' },
      { label: '⚔️  What are your skills?', next: 'skills' },
      { label: '🔥  What drives you?', next: 'drives' },
    ],
  },
  who: {
    speaker: 'IRIS',
    text: "Born in Shanghai, grew up in Canada. Now studying CS at the University of Waterloo — 1B. I've been fascinated by how things work since I could hold a pencil. Now I get to build them.",
    choices: [
      { label: '🎓  Why Waterloo?', next: 'waterloo' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  waterloo: {
    speaker: 'IRIS',
    text: "Co-op. I'd rather spend my degree building real things at real companies than just writing exams. Theory matters, but shipping matters more. Waterloo gets that.",
    choices: [
      { label: '🛠️  What have you built so far?', next: 'built' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  built: {
    speaker: 'IRIS',
    text: "Latest: 'One Million' — a multi-agent AI pipeline I built in ONE DAY at the FCI Hackathon. Before that: a flag identification game in high school, pure vanilla JS, no frameworks. Small start, big ambitions.",
    choices: [
      { label: '⚡  One day?! Tell me more', next: 'hackathon' },
      { label: '🎌  The flag game sounds fun', next: 'flaggame' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  hackathon: {
    speaker: 'IRIS',
    text: "24 hours. Zero sleep. Way too much caffeine. We architected a full multi-agent LangChain pipeline — parallel data collection across government sources, auto-generated reports. It actually worked. That's all I needed to know.",
    choices: [
      { label: '⚔️  What skills made that possible?', next: 'skills' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  flaggame: {
    speaker: 'IRIS',
    text: "30 flags, 15 Asian ones to identify, 10-minute timer, 4-mistake limit. No libraries. It was the first thing I ever shipped that someone else could play. That feeling — I've been chasing it ever since.",
    choices: [
      { label: '🔥  What drives that feeling?', next: 'drives' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  skills: {
    speaker: 'IRIS',
    text: "Python is my main weapon. Java for systems. TypeScript + React for the web. I also just got AWS Solutions Architect certified — cloud architecture is like designing cities, except the cities can auto-scale.",
    choices: [
      { label: '☁️  AWS certified as a student?', next: 'aws' },
      { label: '🧮  You do math too?', next: 'math' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  aws: {
    speaker: 'IRIS',
    text: "SAA-C03, March 2026. Designing systems that handle millions of requests without crashing is genuinely exciting to me. It's like — if one server dies, the world keeps spinning. I want to build that.",
    choices: [
      { label: '🔥  What drives this obsession?', next: 'drives' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  math: {
    speaker: 'IRIS',
    text: "AMC 12 top 5%, AIME qualifier, Euclid and Fermat Distinction at Waterloo, CCC Senior Distinction. Math taught me to stare at a hard problem without flinching. That skill transfers to everything.",
    choices: [
      { label: '🔥  What drives you?', next: 'drives' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  drives: {
    speaker: 'IRIS',
    text: "Curiosity, mostly. I see something I don't understand and I can't let it go until I do. But also — I want to build things that matter at scale. One million people. One million users. That's the goal.",
    choices: [
      { label: '💬  Can we work together?', next: 'collab' },
      { label: '↩  Back', next: 'start' },
    ],
  },
  collab: {
    speaker: 'IRIS',
    text: "Always. I'm open to internships, interesting projects, and conversations that make me think differently. If you have something worth building, let's talk. [ Head to /contact ]",
    choices: [
      { label: '↩  Start over', next: 'start' },
    ],
  },
}

const TYPING_SPEED = 22

export default function DialogueGame() {
  const [nodeId, setNodeId] = useState('start')
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [visited, setVisited] = useState<Set<string>>(new Set(['start']))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const node = tree[nodeId]

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    if (intervalRef.current) clearInterval(intervalRef.current)

    const full = node.text
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(intervalRef.current!)
        setDone(true)
      }
    }, TYPING_SPEED)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [nodeId, node.text])

  function skip() {
    if (!done) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setDisplayed(node.text)
      setDone(true)
    }
  }

  function pick(next: string) {
    setVisited(v => new Set([...v, next]))
    setNodeId(next)
  }

  const progress = Math.round((visited.size / Object.keys(tree).length) * 100)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-mono text-slate-500 tracking-widest">EXPLORED</span>
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-violet-400">{progress}%</span>
      </div>

      {/* Dialogue box */}
      <div className="rounded-xl border border-violet-800/50 bg-[#0d0b1e] box-glow-violet overflow-hidden">
        {/* Speaker bar */}
        <div className="px-5 py-2.5 border-b border-violet-900/50 bg-violet-950/60 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-violet-400 pulse-glow" />
          <span className="font-mono font-bold text-sm text-violet-300 tracking-widest">{node.speaker}</span>
        </div>

        {/* Text area */}
        <div
          className="px-6 py-5 min-h-[100px] cursor-pointer"
          onClick={skip}
        >
          <p className="font-mono text-sm text-slate-200 leading-relaxed">
            {displayed}
            {!done && <span className="text-violet-400 blink">█</span>}
          </p>
        </div>

        {/* Choices */}
        {done && (
          <div className="px-5 pb-5 flex flex-col gap-2 slide-up">
            {node.choices.map((c) => (
              <button
                key={c.next}
                onClick={() => pick(c.next)}
                className={`text-left px-4 py-2.5 rounded-lg border font-mono text-sm transition-all hover:-translate-x-0 ${
                  visited.has(c.next) && c.next !== 'start'
                    ? 'border-slate-700/50 text-slate-600 hover:border-slate-600 hover:text-slate-500'
                    : 'border-violet-800/60 text-slate-300 hover:border-violet-500 hover:text-violet-300 hover:bg-violet-950/50'
                }`}
              >
                <span className="text-violet-600 mr-2">▶</span>
                {c.label}
                {visited.has(c.next) && c.next !== 'start' && (
                  <span className="ml-2 text-xs text-slate-700">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-center text-xs font-mono text-slate-700 mt-3">click text to skip typing</p>
    </div>
  )
}
