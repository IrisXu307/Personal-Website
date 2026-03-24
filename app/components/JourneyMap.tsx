import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
// @ts-ignore
import worldData from 'world-atlas/countries-110m.json'
import JourneyMapClient, { type StopData, type SegmentData } from './JourneyMapClient'

const WIDTH = 960
const HEIGHT = 500

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([WIDTH / 2, HEIGHT / 2])

const pathGen = geoPath(projection)

// @ts-ignore
const { features } = feature(worldData, worldData.objects.countries)

type Anchor = 'start' | 'middle' | 'end'

// Stops — name includes city + country/province
const stopDefs: Array<{
  index: number
  name: string       // displayed label e.g. "Shanghai, China"
  coords: [number, number]
  period: string
  description: string
  dx: number; dy: number; anchor: Anchor
}> = [
  {
    index: 1, name: 'Shanghai, China',
    coords: [121.47, 31.23],
    period: 'Born & raised',
    description: 'Grew up in one of the most electric cities in the world. Shanghai shaped how I think about scale, speed, and ambition.',
    dx: 10, dy: 6, anchor: 'start',
  },
  {
    index: 2, name: 'Japan',
    coords: [137.5, 36.0],
    period: 'Grade 3 · Travel',
    description: 'First real travel abroad. The vending machines, the trains, the meticulous neatness of everything — it all stuck with me.',
    dx: 10, dy: -24, anchor: 'start',
  },
  {
    index: 3, name: 'London, UK',
    coords: [-0.12, 51.51],
    period: 'Grade 7 · Travel',
    description: 'Visited the UK in grade 7. History everywhere you look — museums, double-deckers, and realising how big the world really is.',
    dx: -10, dy: -24, anchor: 'end',
  },
  {
    index: 4, name: 'Regina, SK',
    coords: [-104.62, 50.45],
    period: 'Age 16 · Moved',
    description: 'Moved to Canada alone at 16. Regina, Saskatchewan — a small city, a huge leap. Finished high school and built real independence.',
    dx: -10, dy: -24, anchor: 'end',
  },
  {
    index: 5, name: 'Waterloo, ON',
    coords: [-80.52, 43.47],
    period: 'Now · CS 1B @ UW',
    description: 'Currently studying Computer Science at the University of Waterloo. Building things, meeting brilliant people, and figuring out what comes next.',
    dx: 10, dy: 6, anchor: 'start',
  },
]

// Connections: all fly FROM Shanghai; then Regina → Waterloo
const segmentDefs: Array<{ from: number; to: number; lift: number }> = [
  { from: 0, to: 1, lift: 50  }, // Shanghai → Japan
  { from: 0, to: 2, lift: 100 }, // Shanghai → London
  { from: 0, to: 3, lift: 145 }, // Shanghai → Regina
  { from: 3, to: 4, lift: 28  }, // Regina → Waterloo
]

function curvePath(from: [number, number], to: [number, number], lift: number) {
  const [x1, y1] = (projection(from) ?? [0, 0]) as [number, number]
  const [x2, y2] = (projection(to) ?? [0, 0]) as [number, number]
  const cx = (x1 + x2) / 2
  const cy = Math.min(y1, y2) - lift
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

export default function JourneyMap() {
  const countryPaths = features
    .map((f: any) => pathGen(f))
    .filter(Boolean) as string[]

  const stops: StopData[] = stopDefs.map((s) => {
    const [px, py] = (projection(s.coords) ?? [0, 0]) as [number, number]
    return { index: s.index, name: s.name, period: s.period, description: s.description, px, py, dx: s.dx, dy: s.dy, anchor: s.anchor }
  })

  const segments: SegmentData[] = segmentDefs.map((seg) => ({
    fromIdx: seg.from,
    toIdx: seg.to,
    path: curvePath(stopDefs[seg.from].coords, stopDefs[seg.to].coords, seg.lift),
  }))

  // Compute tight viewBox: include stop positions + label offsets + arc apexes
  const PAD_X = 80
  const PAD_Y = 50
  const LABEL_W = 120

  const xs: number[] = []
  const ys: number[] = []

  stops.forEach(s => {
    xs.push(s.px + s.dx - LABEL_W, s.px + s.dx + LABEL_W)
    ys.push(s.py + s.dy - 24, s.py + Math.max(0, s.dy) + 16)
  })

  // Include arc apexes
  segmentDefs.forEach((seg) => {
    const [x1, y1] = (projection(stopDefs[seg.from].coords) ?? [0, 0]) as [number, number]
    const [x2, y2] = (projection(stopDefs[seg.to].coords) ?? [0, 0]) as [number, number]
    xs.push(x1, x2)
    ys.push(Math.min(y1, y2) - seg.lift)
  })

  const vbX = Math.min(...xs) - PAD_X
  const vbY = Math.min(...ys) - PAD_Y
  const vbW = Math.max(...xs) - Math.min(...xs) + PAD_X * 2
  const vbH = Math.max(...ys) - Math.min(...ys) + PAD_Y * 2

  return (
    <JourneyMapClient
      countryPaths={countryPaths}
      stops={stops}
      segments={segments}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
    />
  )
}
