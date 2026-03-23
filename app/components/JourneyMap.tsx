import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
// @ts-ignore
import worldData from 'world-atlas/countries-110m.json'
import JourneyMapClient, { type StopData } from './JourneyMapClient'

const WIDTH = 960
const HEIGHT = 500

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([WIDTH / 2, HEIGHT / 2])

const pathGen = geoPath(projection)

// @ts-ignore
const { features } = feature(worldData, worldData.objects.countries)

type Anchor = 'start' | 'middle' | 'end'

const stopDefs: Array<{
  index: number; name: string
  coords: [number, number]; period: string; description: string
  dx: number; dy: number; anchor: Anchor
}> = [
  {
    index: 1, name: 'Shanghai',
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
    dx: 10, dy: -22, anchor: 'start',
  },
  {
    index: 3, name: 'London',
    coords: [-0.12, 51.51],
    period: 'Grade 7 · Travel',
    description: 'Visited the UK in grade 7. History everywhere you look — museums, double-deckers, and realising how big the world really is.',
    dx: -10, dy: -22, anchor: 'end',
  },
  {
    index: 4, name: 'Regina, SK',
    coords: [-104.62, 50.45],
    period: 'Age 16 · Grade 11–12',
    description: 'Moved to Canada alone at 16. Regina, Saskatchewan — a small city, a huge leap. Finished high school and built real independence.',
    dx: -10, dy: -22, anchor: 'end',
  },
  {
    index: 5, name: 'Waterloo',
    coords: [-80.52, 43.47],
    period: 'Now · CS 1B @ UW',
    description: 'Currently studying Computer Science at the University of Waterloo. Building things, meeting brilliant people, and figuring out what comes next.',
    dx: 10, dy: 6, anchor: 'start',
  },
]

function curvePath(from: [number, number], to: [number, number]) {
  const [x1, y1] = (projection(from) ?? [0, 0]) as [number, number]
  const [x2, y2] = (projection(to) ?? [0, 0]) as [number, number]
  const cx = (x1 + x2) / 2
  const cy = Math.min(y1, y2) - 65
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

export default function JourneyMap() {
  const countryPaths = features
    .map((f: any) => pathGen(f))
    .filter(Boolean) as string[]

  const arcPaths = stopDefs.slice(0, -1).map((s, i) =>
    curvePath(s.coords, stopDefs[i + 1].coords)
  )

  const stops: StopData[] = stopDefs.map((s) => {
    const [px, py] = (projection(s.coords) ?? [0, 0]) as [number, number]
    return { index: s.index, name: s.name, period: s.period, description: s.description, px, py, dx: s.dx, dy: s.dy, anchor: s.anchor }
  })

  // Compute a tight viewBox around all stops + label offsets + padding
  const PAD_X = 90
  const PAD_Y = 55
  const LABEL_W = 100 // rough max label half-width in SVG units

  const xs = stops.map(s => [s.px + s.dx - LABEL_W, s.px + s.dx + LABEL_W]).flat()
  const ys = stops.map(s => [s.py + Math.min(s.dy - 20, 0), s.py + Math.max(s.dy + 20, 0)]).flat()

  // Also include arc control points so curved arcs aren't clipped
  stopDefs.slice(0, -1).forEach((s, i) => {
    const [x1, y1] = (projection(s.coords) ?? [0, 0]) as [number, number]
    const [x2, y2] = (projection(stopDefs[i + 1].coords) ?? [0, 0]) as [number, number]
    ys.push(Math.min(y1, y2) - 65) // curve apex
    xs.push(x1, x2)
  })

  const vbX = Math.min(...xs) - PAD_X
  const vbY = Math.min(...ys) - PAD_Y
  const vbW = Math.max(...xs) - Math.min(...xs) + PAD_X * 2
  const vbH = Math.max(...ys) - Math.min(...ys) + PAD_Y * 2
  const viewBox = `${vbX} ${vbY} ${vbW} ${vbH}`

  return (
    <JourneyMapClient
      countryPaths={countryPaths}
      arcPaths={arcPaths}
      stops={stops}
      viewBox={viewBox}
    />
  )
}
