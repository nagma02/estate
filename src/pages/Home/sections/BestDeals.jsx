import { properties } from '../homeData'
import { openProject } from '../../RoutePages/listingsData'
import PropertyCard from '../../../components/shared/PropertyCard'

export default function BestDeals({ onNavigate, onEnquiry }) {
  return <section className="ar-section ar-section-sand" id="deals"><div className="ar-wrap">
    <header className="ar-section-head ar-reveal"><span className="ar-eyebrow">04 — Offers</span><h2>Discover our <em>best deals</em></h2><p>Where homeownership dreams come true.</p></header>
    <div className="ar-card-grid ar-card-grid-4">{properties.map(p => <PropertyCard key={p.name} item={p} config={p.type} tags={p.features.split('|').map(value => value.trim())} onPriceInfo={() => onEnquiry(p)} onDetails={() => openProject(p, null, onNavigate)} detailsLabel="View Details"/>)}</div>
  </div></section>
}
