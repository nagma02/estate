import aerial from '../../../assets/reference/tour-skyom-aerial.jpg'
import { openLocality } from '../../RoutePages/listingsData'
import { searchableProperties } from '../../../components/shared/propertySearch'
import { ArrowUpRightIcon, PinIcon } from '../../../components/shared/Icons'

const localities = [
  ['Gomti Nagar Extension', 'Fast-growing residential and business hub around Ekana Stadium.'],
  ['Sushant Golf City', 'Integrated township with golf-course greens off Sultanpur Road.'],
  ['Shaheed Path', 'Arterial corridor linking Lucknow’s newer growth zones.'],
  ['Sultanpur Road', 'Expanding corridor with quick Purvanchal Expressway access.'],
  ['Bijnor Road', 'Emerging plotted developments in south Lucknow.'],
]
const routeFor = { APARTMENT: '/apartment', VILLA: '/villas', PLOT: '/plots', COMMERCIAL: '/commercial' }
// Open the listing for the category with the most projects in that locality (apartments win ties).
const routeOf = projects => {
  const counts = projects.reduce((tally, item) => ({ ...tally, [item.category]: (tally[item.category] || 0) + 1 }), { APARTMENT: 0 })
  return routeFor[Object.keys(counts).reduce((best, key) => counts[key] > counts[best] ? key : best, 'APARTMENT')] || '/apartment'
}

export default function Localities({ onNavigate }) {
  return <section className="ar-section ar-localities" id="localities" style={{ '--section-photo': `url(${aerial})` }}><div className="ar-wrap">
    <header className="ar-section-head ar-reveal"><span className="ar-eyebrow">Localities</span><h2>Where Lucknow is <em>growing next</em></h2><p>Explore projects in the city’s best-connected neighbourhoods.</p></header>
    <ul className="ar-locality-grid">{localities.map(([name, note]) => {
      const projects = searchableProperties.filter(item => item.place.toLowerCase().includes(name.toLowerCase()))
      return <li key={name} className="ar-reveal"><button type="button" onClick={() => openLocality(name, onNavigate, routeOf(projects))}>
        <span className="ar-locality-pin"><PinIcon width="18" height="18"/></span>
        <b>{name}</b><small>{note}</small>
        <span className="ar-locality-count">{projects.length ? `${String(projects.length).padStart(2, '0')} ${projects.length === 1 ? 'project' : 'projects'}` : 'Explore listings'}<ArrowUpRightIcon width="15" height="15"/></span>
      </button></li>
    })}</ul>
  </div></section>
}
