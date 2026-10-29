import { ArrowRightIcon, CheckIcon, ShieldIcon, SparkIcon, StarIcon } from '../../../components/shared/Icons'

const services = [
  { icon: SparkIcon, title: 'Smart Price Advice', text: 'Market-based guidance' },
  { icon: CheckIcon, title: 'Verified Listings', text: 'Carefully reviewed homes' },
  { icon: StarIcon, title: 'Simple Buying Process', text: 'Clear steps, less hassle' },
  { icon: ShieldIcon, title: 'Home Protection', text: 'Support after closing' },
]

export default function ServiceCards({ onNavigate }) {
  return <section className="ar-section ar-section-pearl ar-hk-help" id="services"><div className="ar-wrap">
    <header className="ar-section-head ar-hk-center ar-reveal"><h2>How we <em>help</em></h2><p>Straightforward support from search to move-in.</p></header>
    <ul className="ar-hk-services">{services.map(({ icon: Icon, title, text }) => <li key={title} className="ar-hk-service ar-reveal">
      <span className="ar-hk-service-icon"><Icon width="24" height="24"/></span>
      <b>{title}</b><small>{text}</small>
    </li>)}</ul>
    <div className="ar-hk-actions"><button type="button" className="ar-btn ar-btn-gold" onClick={() => onNavigate('/about')}>Explore Services <ArrowRightIcon width="16" height="16"/></button></div>
  </div></section>
}
