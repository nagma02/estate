import { useId, useState } from 'react'

const rupees = value => `₹ ${Math.round(value).toLocaleString('en-IN')}`
const digits = value => value.replace(/[^\d]/g, '')

// One pie slice from angle a0 to a1 (radians, 0 = 12 o'clock), nudged outward so the slices sit apart.
function slice(a0, a1, r = 80, gap = 5) {
  const mid = (a0 + a1) / 2
  const cx = 100 + gap * Math.sin(mid), cy = 100 - gap * Math.cos(mid)
  const point = a => `${cx + r * Math.sin(a)} ${cy - r * Math.cos(a)}`
  if (a1 - a0 >= Math.PI * 2 - 1e-6) return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
  return `M ${cx} ${cy} L ${point(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${point(a1)} Z`
}

function BreakupChart({ principal, interest }) {
  const gradientId = useId()
  const total = principal + interest
  const share = total ? principal / total : 1
  const split = share * Math.PI * 2
  const label = (a, text) => {
    const x = 100 + 100 * Math.sin(a), y = 100 - 100 * Math.cos(a)
    return <text x={x} y={y + 4} textAnchor={Math.sin(a) >= 0 ? 'start' : 'end'}>{text}</text>
  }
  return <svg className="ar-emi-pie" viewBox="-40 -10 280 220" role="img" aria-label={`Principal ${(share * 100).toFixed(2)}%, interest ${(100 - share * 100).toFixed(2)}%`}>
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#B48A3C"/><stop offset=".35" stopColor="#D6B05A"/><stop offset=".5" stopColor="#EED487"/><stop offset=".65" stopColor="#D0A850"/><stop offset="1" stopColor="#B08436"/>
      </linearGradient>
    </defs>
    {share > 0 && <path d={slice(0, split)} fill="var(--emerald)"/>}
    {share < 1 && <path d={slice(split, Math.PI * 2)} fill={`url(#${gradientId})`}/>}
    {share > 0 && share < 1 && <>{label(split / 2, `${(share * 100).toFixed(2)}%`)}{label((split + Math.PI * 2) / 2, `${(100 - share * 100).toFixed(2)}%`)}</>}
  </svg>
}

export default function EmiCalculator({ defaultLoan = 2500000, defaultRate = 10.5, defaultYears = 20 }) {
  const [loan, setLoan] = useState(String(defaultLoan))
  const [rate, setRate] = useState(String(defaultRate))
  const [tenure, setTenure] = useState(String(defaultYears))
  const [unit, setUnit] = useState('yr')
  const amount = Number(loan) || 0
  const months = Math.round((Number(tenure) || 0) * (unit === 'yr' ? 12 : 1))
  const monthlyRate = (Number(rate) || 0) / 1200
  const emi = !months ? 0 : monthlyRate ? amount * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1) : amount / months
  const totalPayment = emi * months
  const totalInterest = Math.max(totalPayment - amount, 0)
  // Switching Yr/Mo converts the tenure so the loan itself stays the same.
  const switchUnit = next => {
    if (next === unit) return
    const value = Number(tenure) || 0
    setTenure(String(next === 'mo' ? Math.round(value * 12) : +(value / 12).toFixed(1)))
    setUnit(next)
  }

  return <div className="ar-emi-calc">
    <div className="ar-emi-inputs">
      <h3>EMI Calculator</h3>
      <div className="ar-emi-fields">
        <label><span>Loan Amount</span><span className="ar-emi-input"><i aria-hidden="true">₹</i><input inputMode="numeric" value={amount ? amount.toLocaleString('en-IN') : ''} onChange={event => setLoan(digits(event.target.value))}/></span></label>
        <label><span>Interest Rate</span><span className="ar-emi-input"><i aria-hidden="true">%</i><input type="number" min="0" max="30" step="0.05" value={rate} onChange={event => setRate(event.target.value)}/></span></label>
        <div className="ar-emi-tenure">
          <label><span>Loan Tenure</span><span className="ar-emi-input"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg></i><input type="number" min="0" step={unit === 'yr' ? '0.5' : '1'} value={tenure} onChange={event => setTenure(event.target.value)}/></span></label>
          <div className="ar-emi-unit" role="group" aria-label="Tenure unit">{[['yr', 'Yr', 'Years'], ['mo', 'Mo', 'Months']].map(([id, text, name]) => <button key={id} type="button" className={unit === id ? 'active' : ''} aria-pressed={unit === id} aria-label={name} onClick={() => switchUnit(id)}>{text}</button>)}</div>
        </div>
      </div>
    </div>

    <dl className="ar-emi-figures" aria-live="polite">
      <div><dt>Loan EMI</dt><dd className="ar-emi-main">{rupees(emi)}</dd></div>
      <div><dt>Total Interest Payable</dt><dd>{rupees(totalInterest)}</dd></div>
      <div><dt>Total of Payments<br/>(Principal + Interest)</dt><dd>{rupees(totalPayment)}</dd></div>
    </dl>

    <div className="ar-emi-breakup">
      <h4>Break-up of Total Payment</h4>
      <BreakupChart principal={amount} interest={totalInterest}/>
      <ul className="ar-emi-legend"><li><i className="principal"/>Principal Loan Amount</li><li><i className="interest"/>Total Interest</li></ul>
    </div>
  </div>
}
