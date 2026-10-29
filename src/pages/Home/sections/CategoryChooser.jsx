import { listings, plotListings, villaListings, commercialListings } from '../../RoutePages/listingsData'
import { ArrowUpRightIcon } from '../../../components/shared/Icons'
import villaPhoto from '../../../assets/hero/hero-villa.jpg'
import apartmentPhoto from '../../../assets/reference/deal-2.jpg'
import plotPhoto from '../../../assets/reference/deal-3.jpg'
import commercialPhoto from '../../../assets/reference/ekana-business.jpg'

const categories = [
  { label: 'Villas', detail: 'Private homes in gated communities', image: villaPhoto, count: villaListings.length, route: '/villas' },
  { label: 'Apartments', detail: 'High-rise living with resort amenities', image: apartmentPhoto, count: listings.length, route: '/apartment' },
  { label: 'Plots', detail: 'Land to build your own vision', image: plotPhoto, count: plotListings.length, route: '/plots' },
  { label: 'Commercial', detail: 'Retail and office spaces', image: commercialPhoto, count: commercialListings.length, route: '/commercial' },
]

export default function CategoryChooser({ onNavigate }) {
  return <section className="ar-hk-categories" id="categories" aria-label="Browse by property type"><div className="ar-wrap">
    <div className="ar-hk-category-grid">{categories.map(item => <button type="button" className="ar-hk-category ar-reveal" key={item.label} onClick={() => onNavigate(item.route)}>
      <span className="ar-hk-category-photo"><img src={item.image} alt="" loading="lazy"/><small>{String(item.count).padStart(2, '0')} projects</small></span>
      <span className="ar-hk-category-label"><span><b>{item.label}</b><small>{item.detail}</small></span><ArrowUpRightIcon width="16" height="16"/></span>
    </button>)}</div>
  </div></section>
}
