// Schematic 2D layout for a unit, drawn from its bedroom count and carpet area.
// Plan units: 100 wide × 66 deep; feet per unit is derived from the carpet area.
const W = 100, H = 66

const feet = value => {
  const inches = Math.round(value * 2) * 6
  return `${Math.floor(inches / 12)}'${inches % 12}"`
}

function rooms(bedrooms) {
  if (!bedrooms) return [{ x: 0, y: 0, w: W, h: H, label: 'Open Floor Plate', kind: 'open' }]
  const list = []
  const bedW = W / bedrooms
  for (let i = 0; i < bedrooms; i += 1) list.push({ x: i * bedW, y: 0, w: bedW, h: 26, kind: 'bed', label: bedrooms === 1 ? 'Bedroom' : i ? `Bedroom ${i + 1}` : 'Master Bedroom' })
  list.push({ x: 0, y: 26, w: 56, h: 28, kind: 'living', label: 'Living & Dining' })
  list.push({ x: 56, y: 26, w: 24, h: 28, kind: 'kitchen', label: 'Kitchen' })
  const toilets = Math.min(bedrooms, 3)
  for (let i = 0; i < toilets; i += 1) list.push({ x: 80, y: 26 + i * 28 / toilets, w: 20, h: 28 / toilets, kind: 'toilet', label: toilets === 1 ? 'Toilet' : `Toilet ${i + 1}` })
  list.push({ x: 0, y: 54, w: 56, h: 12, kind: 'balcony', label: 'Balcony' })
  list.push({ x: 56, y: 54, w: 44, h: 12, kind: 'utility', label: 'Utility' })
  return list
}

export default function FloorPlanDiagram({ config }) {
  const unitFeet = Math.sqrt((config.carpet || config.superArea) / (W * H))
  const plan = rooms(config.bedrooms)
  if (!config.bedrooms) plan[0].label = config.label
  return <svg className="ar-pd-plan-svg" viewBox="-3 -3 106 72" role="img" aria-label={`${config.label} schematic floor plan`}>
    {plan.map(room => {
      const small = room.h < 12
      return <g key={room.label} className={`room-${room.kind}`}>
        <rect x={room.x} y={room.y} width={room.w} height={room.h}/>
        <text x={room.x + room.w / 2} y={room.y + room.h / 2 + (room.w >= 18 && !small ? -0.6 : 1)} className={small || room.w < 18 ? 'tight' : ''}>{room.label}</text>
        {room.w >= 18 && !small && <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 3.6} className="dims">{feet(room.w * unitFeet)} × {feet(room.h * unitFeet)}</text>}
      </g>
    })}
    <rect className="outline" x="0" y="0" width={W} height={H}/>
  </svg>
}
