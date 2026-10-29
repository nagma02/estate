import { properties } from '../homeData'
import { openProject } from '../../RoutePages/listingsData'
import { ArrowUpRightIcon, HeartIcon, PhoneIcon, PinIcon } from '../../../components/shared/Icons'

export default function FeaturedHomes({ favorites = [], onToggleFavorite, onEnquiry, onNavigate }) {
  return <section className="ar-section ar-section-pearl ar-hk-featured" id="properties"><div className="ar-wrap">
    <header className="ar-section-head ar-hk-center ar-reveal"><h2>Browse featured <em>homes</em></h2><p>Selected homes in sought-after neighbourhoods.</p></header>
    <ul className="ar-hk-homes">{properties.map(home => {
      const saved = favorites.some(item => item.name.toLowerCase() === home.name.toLowerCase())
      const open = () => openProject(home, null, onNavigate)
      return <li key={home.name} className="ar-hk-home ar-reveal">
        <button type="button" className="ar-hk-home-photo" onClick={open} aria-label={`View ${home.name}`}><img src={home.image} alt="" loading="lazy"/><span className="ar-hk-home-go" aria-hidden="true"><ArrowUpRightIcon width="16" height="16"/></span></button>
        <div className="ar-hk-home-body">
          <button type="button" className="ar-hk-home-title" onClick={open}>{home.name}</button>
          <small><PinIcon width="13" height="13"/>{home.place.split(',')[0]}</small><em>{home.type}</em>
          <div className="ar-hk-home-ctas">
            <button type="button" className="ar-btn ar-btn-outline" onClick={() => onEnquiry(home)}><PhoneIcon width="14" height="14"/>Get in Touch</button>
            <button type="button" className="ar-btn ar-btn-primary" onClick={open}>View Details</button>
          </div>
        </div>
        <button type="button" className={`ar-hk-home-heart${saved ? ' active' : ''}`} aria-label={saved ? `Remove ${home.name} from favourites` : `Add ${home.name} to favourites`} aria-pressed={saved} onClick={() => onToggleFavorite(home)}><HeartIcon width="16" height="16"/></button>
      </li>
    })}</ul>
  </div></section>
}
