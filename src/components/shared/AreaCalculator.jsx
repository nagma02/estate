import { useState } from 'react'

// Square feet in one of each unit.
const units = [
  { id: 'sqft', label: 'Sq. Feet', sqft: 1 },
  { id: 'sqm', label: 'Sq. Metre', sqft: 10.7639 },
  { id: 'sqyd', label: 'Sq. Yard', sqft: 9 },
  { id: 'acre', label: 'Acre', sqft: 43560 },
  { id: 'hectare', label: 'Hectare', sqft: 107639.104 },
]
const format = value => value.toLocaleString('en-IN', { maximumFractionDigits: value < 1 ? 4 : 2 })

export default function AreaCalculator() {
  const [value, setValue] = useState('1000')
  const [unit, setUnit] = useState('sqft')
  const from = units.find(item => item.id === unit)
  const amount = Number(value)
  return <div className="area-calculator">
    <div className="area-inputs">
      <input type="number" min="0" inputMode="decimal" value={value} aria-label="Area" onChange={event => setValue(event.target.value)}/>
      <select value={unit} aria-label="Unit" onChange={event => setUnit(event.target.value)}>{units.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
    </div>
    <ul>{units.filter(item => item.id !== unit).map(item => <li key={item.id}><span>{item.label}</span><b>{value === '' || Number.isNaN(amount) ? '—' : format(amount * from.sqft / item.sqft)}</b></li>)}</ul>
  </div>
}
