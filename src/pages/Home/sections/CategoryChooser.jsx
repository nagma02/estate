import { listings, plotListings, villaListings, commercialListings } from '../../RoutePages/listingsData'
import { ArrowUpRightIcon, BuildingIcon, PlotIcon, StoreIcon, VillaIcon } from '../../../components/shared/Icons'

const categories = [
  { label: 'Villas', detail: 'Private homes in gated communities', icon: VillaIcon, count: villaListings.length, route: '/villas' },
  { label: 'Apartments', detail: 'High-rise living with resort amenities', icon: BuildingIcon, count: listings.length, route: '/apartment' },
  { label: 'Plots', detail: 'Land to build your own vision', icon: PlotIcon, count: plotListings.length, route: '/plots' },
  { label: 'Commercial', detail: 'Retail and office spaces', icon: StoreIcon, count: commercialListings.length, route: '/commercial' },
]

export default function CategoryChooser({ onNavigate }) {
  return <section className="ar-hk-categories" id="categories" aria-label="Browse by property type"><div className="ar-wrap">
    <div className="ar-hk-category-grid">{categories.map(({ label, detail, icon: Icon, count, route }) => <button type="button" className="ar-hk-category ar-hk-category-tile ar-reveal" key={label} onClick={() => onNavigate(route)}>
      <span className="ar-hk-category-icon"><Icon width="28" height="28"/></span>
      <span className="ar-hk-category-text"><b>{label}</b><small>{detail}</small><em>{String(count).padStart(2, '0')} projects</em></span>
      <ArrowUpRightIcon className="ar-hk-category-go" width="16" height="16"/>
    </button>)}</div>
  </div></section>
}
