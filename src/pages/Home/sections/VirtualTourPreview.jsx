import { ArrowUpRightIcon, OrbitIcon } from '../../../components/shared/Icons'

const tours = ['Rooftop Screening Area', 'Rooftop Poolside', 'Club Mulberry Heights']

export default function VirtualTourPreview({ onEnquiry, onNavigate }) {
  return <section className="ar-section ar-section-sand" id="virtual-tour"><div className="ar-wrap">
    <header className="ar-section-head ar-section-head-split ar-reveal">
      <div><span className="ar-eyebrow">05 — Experience</span><h2>Walk through it <em>in 360°</em></h2><p>Experience it before you visit — drone aerials and room-by-room interiors.</p></div>
      <button type="button" className="ar-btn ar-btn-primary" onClick={() => onNavigate('/virtual-tour')}>Open virtual tour <ArrowUpRightIcon width="15" height="15"/></button>
    </header>
    <div className="ar-tour-grid">{tours.map((title, index) => <button type="button" className="ar-tour-card ar-reveal" key={title} onClick={() => onEnquiry()}>
      <span className="ar-tour-index">0{index + 1}</span>
      <span className="ar-tour-orbit"><OrbitIcon width="30" height="30"/><i>360°</i></span>
      <small>360° virtual tour</small><b>{title}</b>
      <span className="ar-tour-cta">Request this tour <ArrowUpRightIcon width="14" height="14"/></span>
    </button>)}</div>
  </div></section>
}
