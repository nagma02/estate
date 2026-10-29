import { useCountUp } from '../../../hooks/useCountUp'
import { AwardIcon, BuildingIcon, HeartIcon, UsersIcon } from '../../../components/shared/Icons'
import exterior from '../../../assets/reference/deal-2.jpg'
import interior from '../../../assets/rooms/lounge.jpg'

// Figures match the site's existing claims (hero stats and the CMD message).
const stats = [
  { icon: UsersIcon, value: 10000, label: 'Happy clients' },
  { icon: BuildingIcon, value: 2500, label: 'Verified properties', featured: true },
  { icon: AwardIcon, value: 16, label: 'Years experience' },
  { icon: HeartIcon, value: 750, label: 'Families settled' },
]

function Stat({ icon: Icon, value, label, featured }) {
  const [ref, current] = useCountUp(value)
  return <li className={`ar-hk-stat ar-reveal${featured ? ' featured' : ''}`} ref={ref}>
    <span className="ar-hk-stat-icon"><Icon width="22" height="22"/></span>
    <span><b>{current.toLocaleString('en-IN')}+</b><small>{label}</small></span>
  </li>
}

export default function TrustGuidance() {
  return <section className="ar-section ar-section-pearl ar-hk-trust" id="about"><div className="ar-wrap ar-hk-trust-grid">
    <div>
      <header className="ar-section-head ar-reveal"><span className="ar-eyebrow">Why Advik</span><h2>Property guidance <em>you can trust</em></h2><p>Curated homes and clear advice for every move.</p></header>
      <ul className="ar-hk-stats">{stats.map(stat => <Stat key={stat.label} {...stat}/>)}</ul>
    </div>
    <div className="ar-hk-collage ar-reveal" aria-hidden="true">
      <figure className="ar-hk-collage-main"><img src={exterior} alt="" loading="lazy"/></figure>
      <figure className="ar-hk-collage-inset"><img src={interior} alt="" loading="lazy"/></figure>
      <p className="ar-hk-collage-note">A place<br/>to call<br/><em>home</em></p>
    </div>
  </div></section>
}
