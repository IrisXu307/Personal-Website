'use client'

import { useState } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
// @ts-ignore
import worldData from 'world-atlas/countries-110m.json'

const WIDTH = 960
const HEIGHT = 500

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([WIDTH / 2, HEIGHT / 2])

const pathGen = geoPath(projection)
// @ts-ignore
const countryFeatures = feature(worldData, worldData.objects.countries).features

type Anchor = 'start' | 'middle' | 'end'

const stops = [
  {
    index: 1,
    name: 'Shanghai',
    country: 'China',
    coords: [121.47, 31.23] as [number, number],
    period: 'Born & raised',
    description:
      'Grew up in one of the most electric cities in the world. Shanghai shaped how I think about scale, speed, and ambition.',
    dx: 10, dy: 5, anchor: 'start' as Anchor,
  },
  {
    index: 2,
    name: 'Japan',
    country: 'Japan',
    coords: [137.5, 36.0] as [number, number],
    period: 'Grade 3 · Travel',
    description:
      'First real travel abroad. The vending machines, the trains, the meticulous neatness of everything — it all stuck with me.',
    dx: 10, dy: -20, anchor: 'start' as Anchor,
  },
  {
    index: 3,
    name: 'London',
    country: 'United Kingdom',
    coords: [-0.12, 51.51] as [number, number],
    period: 'Grade 7 · Travel',
    description:
      'Visited the UK in grade 7. History everywhere you look — museums, double-deckers, and realising how big the world really is.',
    dx: -10, dy: -20, anchor: 'end' as Anchor,
  },
  {
    index: 4,
    name: 'Regina, SK',
    country: 'Canada',
    coords: [-104.62, 50.45] as [number, number],
    period: 'Age 16 · Grade 11–12',
    description:
      'Moved to Canada alone at 16. Regina, Saskatchewan — a small city, a huge leap. Finished high school and built real independence.',
    dx: -10, dy: -20, anchor: 'end' as Anchor,
  },
  {
    index: 5,
    name: 'Waterloo',
    country: 'Canada',
    coords: [-80.52, 43.47] as [number, number],
    period: 'Now · CS 1B @ UW',
    description:
      'Currently studying Computer Science at the University of Waterloo. Building things, meeting brilliant people, and figuring out what comes next.',
    dx: 10, dy: 5, anchor: 'start' as Anchor,
  },
]

function project(coords: [number, number]): [number, number] {
  return (projection(coords) as [number, number]) ?? [0, 0]
}

function curvePath(from: [number, number], to: [number, number]) {
  const [x1, y1] = project(from)
  const [x2, y2] = project(to)
  const cx = (x1 + x2) / 2
  const cy = Math.min(y1, y2) - 65
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

// White pill behind label for readability
function LabelPill({
  text, sub, x, y, anchor, active,
}: {
  text: string; sub: string; x: number; y: number; anchor: Anchor; active: boolean
}) {
  const fontSize = active ? 12 : 10
  const subSize = 9
  const lineH = fontSize + 5
  const subLineH = subSize + 4
  const totalH = lineH + subLineH + 4
  const charW = fontSize * 0.64
  const subCharW = subSize * 0.64
  const w = Math.max(text.length * charW, sub.length * subCharW) + 12

  let rx = x
  if (anchor === 'middle') rx = x - w / 2
  if (anchor === 'end') rx = x - w

  return (
    <>
      <rect
        x={rx - 2}
        y={y - lineH + 1}
        width={w + 4}
        height={totalH}
        fill="white"
        fillOpacity={0.88}
        rx={5}
      />
      <text
        x={x} y={y}
        textAnchor={anchor}
        fontSize={fontSize}
        fontWeight={700}
        fill={active ? '#5B21B6' : '#1E293B'}
        fontFamily="var(--font-geist-sans), sans-serif"
      >
        {text}
      </text>
      <text
        x={x} y={y + subLineH}
        textAnchor={anchor}
        fontSize={subSize}
        fill="#7C3AED"
        fontFamily="var(--font-geist-sans), sans-serif"
      >
        {sub}
      </text>
    </>
  )
}

function InfoCard({ stop, onClose }: { stop: typeof stops[0]; onClose: () => void }) {
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

export default function JourneyMap() {
  const [seg, setSeg] = useState(0) // 0–3: which pair of stops is active
  const [selected, setSelected] = useState<number | null>(null)

  const total = stops.length - 1 // 4 segments

  const activeFrom = stops[seg]
  const activeTo = stops[seg + 1]

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 bg-[#dde8f7]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" style={{ display: 'block' }}>
          {/* Countries */}
          {countryFeatures.map((f: any, i: number) => {
            const d = pathGen(f)
            if (!d) return null
            return <path key={i} d={d} fill="#c8d8ee" stroke="#b0c4de" strokeWidth={0.5} />
          })}

          {/* All arcs */}
          {stops.slice(0, -1).map((stop, i) => {
            const isActive = i === seg
            return (
              <path
                key={i}
                d={curvePath(stop.coords, stops[i + 1].coords)}
                fill="none"
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
            const [px, py] = project(stop.coords)
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
                {isLast && (
                  <circle cx={px} cy={py} r={12} fill="#7C3AED" fillOpacity={0.1} />
                )}
                <circle
                  cx={px} cy={py}
                  r={isActive ? 7 : 4.5}
                  fill={selected === i ? '#4C1D95' : '#7C3AED'}
                  stroke="white"
                  strokeWidth={2}
                />
                <LabelPill
                  text={stop.name}
                  sub={stop.period}
                  x={px + stop.dx}
                  y={py + stop.dy}
                  anchor={stop.anchor}
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
          onClick={() => { setSeg(s => Math.max(0, s - 1)); setSelected(null) }}
          disabled={seg === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 hover:border-violet-300 hover:text-violet-600 transition-all"
        >
          <ChevronLeft size={15} /> Prev
        </button>

        <div className="flex-1 text-center">
          <span className="text-sm font-semibold text-slate-800">
            {activeFrom.name}
          </span>
          <span className="text-slate-400 mx-2 text-sm">→</span>
          <span className="text-sm font-semibold text-violet-600">
            {activeTo.name}
          </span>
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

      {/* Info card on click */}
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
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                i === stops.length - 1
                  ? 'bg-white/20 text-white'
                  : 'bg-violet-100 text-violet-600'
              }`}
            >
              {stop.index}
            </span>
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
