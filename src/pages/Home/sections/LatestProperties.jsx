import { useRef } from 'react'
import { latestCategories } from '../homeData'
import { openProject } from '../../RoutePages/listingsData'
import PropertyCard from '../../../components/shared/PropertyCard'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/shared/Icons'
import towers from '../../../assets/hero/hero-boulevard.jpg'

export default function LatestProperties({ latestCategory, setLatestCategory, favorites = [], onToggleFavorite, onEnquiry, onNavigate }) {
  const categorySet = latestCategories.find(category => category.name === latestCategory)
  const index = latestCategories.findIndex(category => category.name === latestCategory)
  const railRef = useRef(null)
  const switchCategory = offset => setLatestCategory(latestCategories[(index + offset + latestCategories.length) % latestCategories.length].name)
  // Arrows scroll the rail; at either end they move on to the neighbouring category.
  const step = offset => {
    const rail = railRef.current
    const atEdge = !rail || (offset > 0 ? rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4 : rail.scrollLeft <= 4)
    if (atEdge) switchCategory(offset)
    else rail.scrollBy({ left: offset * rail.clientWidth * 0.8, behavior: 'smooth' })
  }

  return <section className="ar-section ar-section-photo" id="properties" style={{ '--section-photo': `url(${towers})` }}><div className="ar-wrap">
    <header className="ar-section-head ar-section-head-split ar-reveal">
      <div><span className="ar-eyebrow">02 — Featured</span><h2>Featured <em>projects</em></h2><p>The noteworthy real estate of Lucknow, handpicked this season.</p></div>
      <div className="ar-tabs-row">
        <div className="ar-tabs" role="tablist" aria-label="Property type">{latestCategories.map(category => <button key={category.name} type="button" role="tab" aria-selected={latestCategory === category.name} className={latestCategory === category.name ? 'active' : ''} onClick={() => setLatestCategory(category.name)}>{category.name[0] + category.name.slice(1).toLowerCase()}</button>)}</div>
        <div className="ar-arrows"><button type="button" aria-label="Previous properties" onClick={() => step(-1)}><ArrowLeftIcon/></button><button type="button" aria-label="Next properties" onClick={() => step(1)}><ArrowRightIcon/></button></div>
      </div>
    </header>
    <div className="ar-card-rail" ref={railRef} key={categorySet.name}>{categorySet.properties.map(p => <PropertyCard key={p.name} item={p} label={categorySet.name.slice(0, -1)} config={p.type} favorite={favorites.some(saved => saved.name.toLowerCase() === p.name.toLowerCase())} onFavorite={() => onToggleFavorite(p)} onPriceInfo={() => onEnquiry(p)} onDetails={() => openProject(p, categorySet.name.slice(0, -1), onNavigate)} detailsLabel="Details"/>)}</div>
    <div className="ar-center"><button type="button" className="ar-btn ar-btn-outline" onClick={() => onEnquiry()}>Get more details</button></div>
  </div></section>
}
