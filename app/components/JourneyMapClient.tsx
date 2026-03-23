'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Anchor = 'start' | 'middle' | 'end'

export type StopData = {
  index: number
  name: string
  period: string
  description: string
  px: number
  py: number
  dx: number
  dy: number
  anchor: Anchor
}

type Props = {
  countryPaths: string[]
  arcPaths: string[]
  stops: StopData[]
  width: number
  height: number
}

function LabelPill({
  text, sub, x, y, anchor, active,
}: {
  text: string; sub: string; x: number; y: number; anchor: Anchor; active: boolean
}) {
  const fs = active ? 13 : 11
  const subFs = 9.5
  const lineH = fs + 6
  const subLineH = subFs + 5
  const totalH = lineH + subLineH + 2
  const w = Math.max(text.length * fs * 0.62, sub.length * subFs * 0.62) + 14

  let rx = x
  if (anchor === 'middle') rx = x - w / 2
  if (anchor === 'end') rx = x - w

  return (
    <>
      <rect
        x={rx - 2} y={y - lineH + 1}
        width={w + 4} height={totalH}
        fill="white" fillOpacity={0.9} rx={5}
      />
      <text x={x} y={y} textAnchor={anchor} fontSize={fs} fontWeight={700}
        fill={active ? '#5B21B6' : '#1E293B'}
        fontFamily="var(--font-geist-sans), sans-serif"
      >{text}</text>
      <text x={x} y={y + subLineH} textAnchor={anchor} fontSize={subFs}
        fill="#7C3AED"
        fontFamily="var(--font-geist-sans), sans-serif"
      >{sub}</text>
    </>
  )
}

function InfoCard({ stop, onClose }: { stop: StopData; onClose: () => void }) {
  return (
    <div className="relative rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
      >
        <X size={16} />
      </button>
      <div className="flex items-start gap-4">
        <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {stop.index}
        </span>
        <div>
          <p className="font-bold text-slate-900 text-base">{stop.name}</p>
          <p className="text-xs font-semibold text-violet-500 mb-2">{stop.period}</p>
          <p className="text-slate-600 text-sm leading-relaxed">{stop.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function JourneyMapClient({ countryPaths, arcPaths, stops, width, height }: Props) {
  const [seg, setSeg] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const total = stops.length - 1

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 bg-[#dde8f7]">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
          {/* Countries */}
          {countryPaths.map((d, i) => (
            <path key={i} d={d} fill="#c8d8ee" stroke="#b0c4de" strokeWidth={0.5} />
          ))}

          {/* Arcs */}
          {arcPaths.map((d, i) => {
            const isActive = i === seg
            return (
              <path
                key={i} d={d} fill="none"
                stroke="#7C3AED"
                strokeWidth={isActive ? 2.5 : 1.2}
                strokeDasharray={isActive ? '9 6' : '4 5'}
                strokeLinecap="round"
                opacity={isActive ? 0.9 : 0.22}
              />
            )
          })}

          {/* Markers + labels */}
          {stops.map((stop, i) => {
            const { px, py, dx, dy, anchor } = stop
            const isActive = i === seg || i === seg + 1
            const isLast = i === stops.length - 1

            return (
              <g
                key={stop.name}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                {isActive && (
                  <circle cx={px} cy={py} r={16} fill="#7C3AED" fillOpacity={0.12} />
                )}
                {isLast && !isActive && (
                  <circle cx={px} cy={py} r={11} fill="#7C3AED" fillOpacity={0.1} />
                )}
                <circle
                  cx={px} cy={py}
                  r={isActive ? 7 : 5}
                  fill={selected === i ? '#4C1D95' : '#7C3AED'}
                  stroke="white" strokeWidth={2}
                />
                <LabelPill
                  text={stop.name}
                  sub={stop.period}
                  x={px + dx} y={py + dy}
                  anchor={anchor}
                  active={isActive}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Navigator */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setSeg(s => Math.max(0, s - 1)); setSelected(null) }}
          disabled={seg === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 hover:border-violet-300 hover:text-violet-600 transition-all"
        >
          <ChevronLeft size={15} /> Prev
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-slate-800">
            {stops[seg].name}
            <span className="text-slate-400 mx-2">→</span>
            <span className="text-violet-600">{stops[seg + 1].name}</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{seg + 1} of {total}</p>
        </div>
        <button
          onClick={() => { setSeg(s => Math.min(total - 1, s + 1)); setSelected(null) }}
          disabled={seg === total - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 hover:border-violet-300 hover:text-violet-600 transition-all"
        >
          Next <ChevronRight size={15} />
        </button>
      </div>

      {/* Info card */}
      {selected !== null && (
        <InfoCard stop={stops[selected]} onClose={() => setSelected(null)} />
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-2 pt-1">
        {stops.map((stop, i) => (
          <button
            key={stop.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${
              i === stops.length - 1
                ? 'bg-violet-600 border-violet-600 text-white'
                : selected === i
                ? 'bg-violet-100 border-violet-300 text-violet-700'
                : 'bg-white border-slate-100 text-slate-700 hover:border-violet-200'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              i === stops.length - 1 ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-600'
            }`}>{stop.index}</span>
            <span className="font-semibold">{stop.name}</span>
            <span className={`text-xs ${i === stops.length - 1 ? 'text-violet-200' : 'text-slate-400'}`}>
              {stop.period}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
