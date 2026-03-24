'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Anchor = 'start' | 'middle' | 'end'

export type StopData = {
  index: number
  name: string
  period: string
  description: string
  px: number; py: number
  dx: number; dy: number
  anchor: Anchor
}

export type SegmentData = {
  fromIdx: number
  toIdx: number
  path: string
}

type Props = {
  countryPaths: string[]
  stops: StopData[]
  segments: SegmentData[]
  viewBox: string
}

function LabelPill({
  text, sub, x, y, anchor, active,
}: {
  text: string; sub: string; x: number; y: number; anchor: Anchor; active: boolean
}) {
  const fs = active ? 15 : 13
  const subFs = 11
  const lineH = fs + 6
  const subLineH = subFs + 6
  const totalH = lineH + subLineH + 1
  const w = Math.max(text.length * fs * 0.6, sub.length * subFs * 0.6) + 16

  let rx = x
  if (anchor === 'middle') rx = x - w / 2
  if (anchor === 'end') rx = x - w

  return (
    <>
      <rect
        x={rx - 3} y={y - lineH + 1}
        width={w + 6} height={totalH}
        fill="white" fillOpacity={0.93} rx={6}
        pointerEvents="none"
      />
      <text x={x} y={y} textAnchor={anchor} fontSize={fs} fontWeight={700}
        fill={active ? '#5B21B6' : '#1E293B'}
        fontFamily="var(--font-geist-sans), sans-serif"
        pointerEvents="none"
      >{text}</text>
      <text x={x} y={y + subLineH} textAnchor={anchor} fontSize={subFs}
        fill={active ? '#7C3AED' : '#64748B'}
        fontFamily="var(--font-geist-sans), sans-serif"
        pointerEvents="none"
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

export default function JourneyMapClient({ countryPaths, stops, segments, viewBox }: Props) {
  const [activeSeg, setActiveSeg] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const cur = segments[activeSeg]

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 bg-[#dde8f7]">
        <svg viewBox={viewBox} width="100%" style={{ display: 'block' }}>
          {/* Countries — decorative only */}
          <g pointerEvents="none">
            {countryPaths.map((d, i) => (
              <path key={i} d={d} fill="#c8d8ee" stroke="#b0c4de" strokeWidth={0.5} />
            ))}
          </g>

          {/* Arcs — decorative only */}
          <g pointerEvents="none">
            {segments.map((seg, i) => {
              const isActive = i === activeSeg
              return (
                <path
                  key={i} d={seg.path} fill="none"
                  stroke="#7C3AED"
                  strokeWidth={isActive ? 2.5 : 1.2}
                  strokeDasharray={isActive ? '10 6' : '4 5'}
                  strokeLinecap="round"
                  opacity={isActive ? 0.9 : 0.2}
                />
              )
            })}
          </g>

          {/* Markers — interactive */}
          {stops.map((stop, i) => {
            const { px, py, dx, dy, anchor } = stop
            const isActive = i === cur.fromIdx || i === cur.toIdx
            const isLast = i === stops.length - 1

            return (
              <g
                key={stop.name}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Hit area */}
                <circle cx={px} cy={py} r={20} fill="transparent" />
                {/* Glow */}
                {isActive && (
                  <circle cx={px} cy={py} r={16} fill="#7C3AED" fillOpacity={0.13} pointerEvents="none" />
                )}
                {isLast && !isActive && (
                  <circle cx={px} cy={py} r={11} fill="#7C3AED" fillOpacity={0.1} pointerEvents="none" />
                )}
                {/* Dot */}
                <circle
                  cx={px} cy={py}
                  r={isActive ? 8 : 5.5}
                  fill={selected === i ? '#4C1D95' : '#7C3AED'}
                  stroke="white" strokeWidth={2.5}
                  pointerEvents="none"
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

      {/* Segment navigator */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setActiveSeg(s => Math.max(0, s - 1)); setSelected(null) }}
          disabled={activeSeg === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 hover:border-violet-300 hover:text-violet-600 transition-all"
        >
          <ChevronLeft size={15} /> Prev
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-slate-800">
            {stops[cur.fromIdx].name}
            <span className="text-slate-400 mx-2">→</span>
            <span className="text-violet-600">{stops[cur.toIdx].name}</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{activeSeg + 1} of {segments.length}</p>
        </div>
        <button
          onClick={() => { setActiveSeg(s => Math.min(segments.length - 1, s + 1)); setSelected(null) }}
          disabled={activeSeg === segments.length - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 hover:border-violet-300 hover:text-violet-600 transition-all"
        >
          Next <ChevronRight size={15} />
        </button>
      </div>

      {/* Info card */}
      {selected !== null && (
        <InfoCard stop={stops[selected]} onClose={() => setSelected(null)} />
      )}

      {/* Stop chips */}
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
