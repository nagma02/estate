import { useEffect, useState } from 'react'
import HeaderSearch from '../../../components/shared/HeaderSearch'
import { searchLocalities } from '../../../components/shared/propertySearch'
import { BuildingIcon, FilterIcon, StoreIcon } from '../../../components/shared/Icons'
import heroTowers from '../../../assets/hero/hero-towers.jpg'
import heroVilla from '../../../assets/hero/hero-villa.jpg'
import heroBoulevard from '../../../assets/hero/hero-boulevard.jpg'
import rishitaManhattan from '../../../assets/reference/deal-1.jpg'
import mulberryHeights from '../../../assets/reference/deal-2.jpg'

const slides = [[heroTowers, 'Modern glass residential towers'], [rishitaManhattan, 'Rishita Manhattan, Gomti Nagar Extension'], [heroVilla, 'Luxury villa with a private pool'], [mulberryHeights, 'Rishita Mulberry Heights, Sushant Golf City'], [heroBoulevard, 'Premium boulevard in warm evening light']]
const SLIDE_INTERVAL = 5000

// Editorial hero: a full-bleed photo banner with the headline and a floating search pill.
export default function HomeSearchHero({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('RESIDENTIAL')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCurrentImageIndex(index => (index + 1) % slides.length), SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [currentImageIndex])
  return <section className="ar-hk-hero" id="home">
    <div className="ar-hk-banner">
      {/* Photos are clipped to the banner here, so the search suggestions can overflow it. */}
      <div className="ar-hk-media" aria-hidden="true">
        <div className="ar-hero-slides">
          {slides.map(([src], index) => <img key={src} src={src} alt="" className={index === currentImageIndex ? 'active' : ''} loading={index === 0 ? 'eager' : 'lazy'} decoding="async"/>)}
        </div>
        <div className="ar-hk-shade"/>
      </div>
      <p className="ar-hk-tagline" aria-hidden="true">Better homes<br/>brighter<br/>tomorrows</p>
      <div className="ar-wrap ar-hk-hero-inner"><div className="ar-hk-hero-copy">
        <span className="ar-eyebrow">Advik Estate Services · Lucknow</span>
        <h1>Discover luxury living in <em>Lucknow</em></h1>
        <p>RERA-approved apartments, villas, plots and commercial spaces — curated and personally guided by local advisors.</p>
        <div className="ar-hk-search">
          <div className="ar-hk-search-types" role="group" aria-label="Property category">
            {['RESIDENTIAL', 'COMMERCIAL'].map(option => <button type="button" key={option} className={category === option ? 'active' : ''} aria-pressed={category === option} onClick={() => { setCategory(option); onNavigate(option === 'COMMERCIAL' ? '/commercial' : '/apartment') }}>{option === 'COMMERCIAL' ? <StoreIcon width="14" height="14"/> : <BuildingIcon width="14" height="14"/>}{option[0] + option.slice(1).toLowerCase()}</button>)}
          </div>
          <div className="ar-hk-search-bar">
            <HeaderSearch query={query} setQuery={setQuery} onNavigate={onNavigate} categoryFilter={category} large/>
            <button type="button" className="ar-hk-filter" aria-label="Open all filters" onClick={() => onNavigate(category === 'COMMERCIAL' ? '/commercial' : '/apartment')}><FilterIcon width="18" height="18"/></button>
          </div>
          <div className="ar-hero-localities"><span>Popular:</span>{searchLocalities.slice(0, 4).map(locality => <button type="button" key={locality} onClick={() => setQuery(locality)}>{locality}</button>)}</div>
        </div>
      </div></div>
    </div>
  </section>
}
