import { ArrowUpRightIcon } from '../../../components/shared/Icons'

const pillars = [['RERA', 'Approved projects'], ['2,500+', 'Properties listed'], ['360°', 'Virtual site tours'], ['Lucknow', 'Local advisors']]

export default function AboutIntro({ onNavigate }) {
  return <section className="ar-section" id="about"><div className="ar-wrap ar-about">
    <div className="ar-about-copy ar-reveal">
      <span className="ar-eyebrow">08 — Who we are</span>
      <h2>A trusted name in <em>Lucknow</em> real estate</h2>
      <p>Advik Estate Services (OPC) Private Limited is a rapidly growing real estate enterprise that has recently launched its operations in the vibrant markets of Lucknow. Recognized as a prestigious and meticulously managed firm, Advik Estate Services OPC Private Limited is actively involved in a wide spectrum of business domains.</p>
      <p>Our diverse portfolio encompasses the sale of row houses, apartments, commercial properties, society projects, and various utility services. We operate in close collaboration with esteemed developers, leveraging their expertise to offer unparalleled real estate solutions in the market. Our commitment to professionalism and excellence sets us apart, making Advik Estate Services OPC Private Limited a trusted name in the evolving real estate landscape.</p>
      <button type="button" className="ar-btn ar-btn-outline" onClick={() => onNavigate('/about')}>Read more <ArrowUpRightIcon width="15" height="15"/></button>
    </div>
    <div className="ar-pillars">{pillars.map(([value, label]) => <div className="ar-pillar ar-reveal" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
  </div></section>
}
