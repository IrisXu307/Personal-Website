import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
// @ts-ignore
import worldData from 'world-atlas/countries-110m.json'

const WIDTH = 960
const HEIGHT = 500

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([WIDTH / 2, HEIGHT / 2])

const pathGen = geoPath(projection)

// @ts-ignore
const countries = feature(worldData, worldData.objects.countries)

const stops = [
  { index: 1, name: 'Shanghai',    sublabel: 'Born & raised', coords: [121.47,  31.23] as [number, number], current: false },
  { index: 2, name: 'Japan',       sublabel: 'Grade 3',       coords: [138.0,   36.5 ] as [number, number], current: false },
  { index: 3, name: 'London',      sublabel: 'Grade 7',       coords: [-0.12,   51.51] as [number, number], current: false },
  { index: 4, name: 'Regina, SK',  sublabel: 'Grade 11–12',   coords: [-104.62, 50.45] as [number, number], current: false },
  { index: 5, name: 'Waterloo, ON',sublabel: 'Now',           coords: [-80.52,  43.47] as [number, number], current: true  },
]

function project(coords: [number, number]) {
  return projection(coords) ?? [0, 0]
}

// Build a smooth cubic-bezier path between two projected points
function curvePath(from: [number, number], to: [number, number]) {
  const [x1, y1] = project(from)
  const [x2, y2] = project(to)
  const mx = (x1 + x2) / 2
  const my = Math.min(y1, y2) - 60
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
}

// Label offsets per stop to avoid overlaps
type Anchor = 'start' | 'middle' | 'end'
const labelOffset: Record<string, [number, number, Anchor]> = {
  'Shanghai':     [ 8,   4,  'start'],
  'Japan':        [ 8,   4,  'start'],
  'London':       [ 0,  -13, 'middle'],
  'Regina, SK':   [-8,  -13, 'end'],
  'Waterloo, ON': [ 0,  -13, 'middle'],
}

export default function JourneyMap() {
  // @ts-ignore
  const countryPaths = countries.features.map((f: any) => pathGen(f)).filter(Boolean)

  return (
    <div className="space-y-5">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 bg-[#f0f4ff]">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          style={{ display: 'block' }}
        >
          {/* Ocean tint */}
          <rect width={WIDTH} height={HEIGHT} fill="#dde8f7" />

          {/* Countries */}
          {countryPaths.map((d: string, i: number) => (
            <path key={i} d={d} fill="#c8d8ee" stroke="#b0c4de" strokeWidth={0.5} />
          ))}

          {/* Journey arcs */}
          {stops.slice(0, -1).map((stop, i) => (
            <path
              key={i}
              d={curvePath(stop.coords, stops[i + 1].coords)}
              fill="none"
              stroke="#7C3AED"
              strokeWidth={2}
              strokeDasharray="7 5"
              strokeLinecap="round"
              opacity={0.6}
            />
          ))}

          {/* Markers + labels */}
          {stops.map((stop) => {
            const [px, py] = project(stop.coords)
            const [dx, dy, anchor] = labelOffset[stop.name] ?? [0, -13, 'middle' as Anchor]
            return (
              <g key={stop.name}>
                {/* Glow ring for current stop */}
                {stop.current && (
                  <circle cx={px} cy={py} r={12} fill="#7C3AED" fillOpacity={0.15} />
                )}
                <circle
                  cx={px} cy={py}
                  r={stop.current ? 6 : 4.5}
                  fill="#7C3AED"
                  stroke="white"
                  strokeWidth={2}
                />
                {/* City name */}
                <text
                  x={px + dx} y={py + dy}
                  textAnchor={anchor}
                  fontSize={stop.current ? 12 : 10}
                  fontWeight={700}
                  fill={stop.current ? '#5B21B6' : '#1E293B'}
                  fontFamily="var(--font-geist-sans), sans-serif"
                >
                  {stop.name}
                </text>
                {/* Sub-label */}
                <text
                  x={px + dx} y={py + dy + 12}
                  textAnchor={anchor}
                  fontSize={9}
                  fill="#7C3AED"
                  fontFamily="var(--font-geist-sans), sans-serif"
                >
                  {stop.sublabel}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Timeline chips */}
      <div className="flex flex-wrap gap-2">
        {stops.map((stop) => (
          <div
            key={stop.name}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors ${
              stop.current
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'bg-white border-slate-100 text-slate-700'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                stop.current ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-600'
              }`}
            >
              {stop.index}
            </span>
            <span className="font-semibold">{stop.name}</span>
            <span className={`text-xs ${stop.current ? 'text-violet-200' : 'text-slate-400'}`}>
              {stop.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
