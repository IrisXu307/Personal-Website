'use client'

import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const stops = [
  {
    index: 1,
    name: 'Shanghai',
    sublabel: 'Born & raised',
    coordinates: [121.47, 31.23] as [number, number],
    anchor: 'start' as const,
    dx: 6,
    dy: 4,
    current: false,
  },
  {
    index: 2,
    name: 'Japan',
    sublabel: 'Grade 3',
    coordinates: [138.0, 36.5] as [number, number],
    anchor: 'start' as const,
    dx: 7,
    dy: 4,
    current: false,
  },
  {
    index: 3,
    name: 'London',
    sublabel: 'Grade 7',
    coordinates: [-0.12, 51.51] as [number, number],
    anchor: 'middle' as const,
    dx: 0,
    dy: -10,
    current: false,
  },
  {
    index: 4,
    name: 'Regina, SK',
    sublabel: 'Grade 11–12',
    coordinates: [-104.62, 50.45] as [number, number],
    anchor: 'middle' as const,
    dx: 0,
    dy: -10,
    current: false,
  },
  {
    index: 5,
    name: 'Waterloo, ON',
    sublabel: 'Now',
    coordinates: [-80.52, 43.47] as [number, number],
    anchor: 'middle' as const,
    dx: 0,
    dy: -10,
    current: true,
  },
]

const lines = stops.slice(0, -1).map((stop, i) => ({
  from: stop.coordinates,
  to: stops[i + 1].coordinates,
}))

export default function JourneyMap() {
  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
        <ComposableMap
          projectionConfig={{ rotate: [-20, 0, 0], scale: 140 }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E2E8F0"
                  stroke="#CBD5E1"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Journey lines */}
          {lines.map((line, i) => (
            <Line
              key={i}
              from={line.from}
              to={line.to}
              stroke="#7C3AED"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="5 4"
              strokeOpacity={0.55}
            />
          ))}

          {/* Markers */}
          {stops.map((stop) => (
            <Marker key={stop.name} coordinates={stop.coordinates}>
              {stop.current ? (
                <>
                  <circle r={7} fill="#7C3AED" fillOpacity={0.15} />
                  <circle r={4.5} fill="#7C3AED" stroke="white" strokeWidth={2} />
                </>
              ) : (
                <circle r={3.5} fill="#7C3AED" stroke="white" strokeWidth={1.5} />
              )}
              <text
                textAnchor={stop.anchor}
                x={stop.dx}
                y={stop.dy}
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '7.5px',
                  fontWeight: 700,
                  fill: stop.current ? '#6D28D9' : '#1E293B',
                  pointerEvents: 'none',
                }}
              >
                {stop.name}
              </text>
              <text
                textAnchor={stop.anchor}
                x={stop.dx}
                y={stop.dy + 9}
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '6px',
                  fill: '#7C3AED',
                  pointerEvents: 'none',
                }}
              >
                {stop.sublabel}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Timeline legend */}
      <div className="flex flex-wrap gap-3">
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
            <div>
              <span className="font-semibold">{stop.name}</span>
              <span className={`ml-1.5 text-xs ${stop.current ? 'text-violet-200' : 'text-slate-400'}`}>
                {stop.sublabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
