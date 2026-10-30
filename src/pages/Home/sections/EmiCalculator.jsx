import { useState } from 'react'
import { ArrowRightIcon } from '../../../components/shared/Icons'

const rupees = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
// ₹ 85 L / ₹ 1.25 Cr — how buyers in Lucknow read prices.
const short = value => value >= 1e7 ? `₹ ${+(value / 1e7).toFixed(2)} Cr` : `₹ ${+(value / 1e5).toFixed(1)} L`

const fields = [
  { key: 'price', label: 'Property price', min: 1e6, max: 5e7, step: 5e5, show: short },
  { key: 'down', label: 'Down payment', min: 10, max: 80, step: 5, show: v => `${v}%` },
  { key: 'rate', label: 'Interest rate', min: 6, max: 14, step: .1, show: v => `${v.toFixed(1)}% p.a.` },
  { key: 'years', label: 'Loan tenure', min: 5, max: 30, step: 1, show: v => `${v} years` },
]

export default function EmiCalculator({ onEnquiry }) {
  const [loan, setLoan] = useState({ price: 8e6, down: 20, rate: 8.5, years: 20 })
  const principal = loan.price * (1 - loan.down / 100)
  const r = loan.rate / 1200, n = loan.years * 12
  const emi = principal * r * (1 + r) ** n / ((1 + r) ** n - 1)
  const total = emi * n, interest = total - principal
  const share = Math.round(principal / total * 100)

  return <section className="ar-section ar-section-pearl ar-emi-section" id="emi"><div className="ar-wrap">
    <header className="ar-section-head ar-hk-center ar-reveal"><h2>Plan your <em>home loan</em></h2><p>Estimate your monthly EMI before you shortlist.</p></header>
    <div className="ar-emi ar-reveal">
      <div className="ar-emi-inputs">
        {fields.map(({ key, label, min, max, step, show }) => <label key={key} className="ar-emi-field">
          <span><b>{label}</b><output>{show(loan[key])}</output></span>
          <input type="range" min={min} max={max} step={step} value={loan[key]} style={{ '--fill': `${(loan[key] - min) / (max - min) * 100}%` }} onChange={event => setLoan(current => ({ ...current, [key]: +event.target.value }))}/>
          <small><i>{show(min)}</i><i>{show(max)}</i></small>
        </label>)}
      </div>
      <aside className="ar-emi-result" aria-live="polite">
        <small>Your monthly EMI</small>
        <strong>₹ {rupees.format(emi)}</strong>
        <div className="ar-emi-bar" role="img" aria-label={`Principal ${share}%, interest ${100 - share}%`}><span style={{ width: `${share}%` }}/></div>
        <dl>
          <div><dt><i className="principal"/>Loan amount</dt><dd>₹ {rupees.format(principal)}</dd></div>
          <div><dt><i className="interest"/>Total interest</dt><dd>₹ {rupees.format(interest)}</dd></div>
          <div><dt>Total payable</dt><dd>₹ {rupees.format(total)}</dd></div>
        </dl>
        <button type="button" className="ar-btn ar-btn-gold ar-btn-block" onClick={() => onEnquiry()}>Talk to a loan advisor <ArrowRightIcon width="16" height="16"/></button>
        <p>Indicative figures only. Final EMI depends on your bank&apos;s terms.</p>
      </aside>
    </div>
  </div></section>
}
