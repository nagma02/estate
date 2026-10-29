import { openProject } from '../../RoutePages/listingsData'
import { searchableProperties } from '../../../components/shared/propertySearch'
import { ArrowUpRightIcon, PinIcon } from '../../../components/shared/Icons'

// Asymmetric showcase: one hero tile, one tall, one wide and two small tiles.
const FEATURED = ['RISHITA MULBERRY HEIGHTS', 'ELDECO HANGING GARDENS', 'EKANA BUSINESS CENTRE', 'OMAXE WATERSCAPE', 'Pintail Park City']
const categoryLabel = { APARTMENT: 'Apartment', VILLA: 'Villa', PLOT: 'Plot', COMMERCIAL: 'Commercial' }

export default function PortfolioBento({ onNavigate }) {
  const projects = FEATURED.map(name => searchableProperties.find(item => item.name === name)).filter(Boolean)
  return <section className="ar-section ar-section-pearl" id="portfolio"><div className="ar-wrap">
    <header className="ar-section-head ar-section-head-split ar-reveal">
      <div><span className="ar-eyebrow">05 — Portfolio</span><h2>Our portfolio of <em>pioneering design</em></h2></div>
      <button type="button" className="ar-btn ar-btn-gold" onClick={() => onNavigate('/apartment')}>See More Projects <ArrowUpRightIcon width="15" height="15"/></button>
    </header>
    <div className="ar-bento">{projects.map((project, index) => <button type="button" key={project.name} className={`ar-bento-tile ar-reveal tile-${index + 1}`} onClick={() => openProject(project, project.category, onNavigate)}>
      <img src={project.image} alt="" loading="lazy"/>
      <span className="ar-bento-shade" aria-hidden="true"/>
      <span className="ar-bento-tag"><PinIcon width="13" height="13"/>{project.place.split(',')[0]}</span>
      <span className="ar-bento-copy"><small>{categoryLabel[project.category] || 'Project'}</small><b>{project.name.toLowerCase()}</b></span>
      <span className="ar-bento-go" aria-hidden="true"><ArrowUpRightIcon width="18" height="18"/></span>
    </button>)}</div>
  </div></section>
}
