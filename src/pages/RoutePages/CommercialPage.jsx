import { useMemo, useState } from 'react'
import { commercialListings, projectSlug } from './listingsData'
import './CommercialPage.css'

export default function CommercialPage({ onEnquiry, onNavigate }) {
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [filtersOpen, setFiltersOpen] = useState({ type: true, location: true })
  const propertyTypes = [...new Set(commercialListings.map(project => project.bhk).filter(Boolean))]
  const visibleProjects = useMemo(() => commercialListings.filter(project => {
    const matchesSearch = `${project.name} ${project.place}`.toLowerCase().includes(search.toLowerCase())
    const matchesType = !selectedTypes.length || selectedTypes.includes(project.bhk)
    return matchesSearch && matchesType
  }), [search, selectedTypes])
  const toggleType = type => setSelectedTypes(current => current.includes(type) ? current.filter(value => value !== type) : [...current, type])

  return <div className="commercial-page">
    <div className="commercial-container">
      <nav className="commercial-breadcrumb" aria-label="Breadcrumb"><button onClick={() => onNavigate('/')}>Home</button><span>›</span><span>Lucknow</span><span>›</span><strong>Commercial Properties</strong></nav>
      <header className="commercial-heading"><div><span className="commercial-kicker">EXPLORE BUSINESS SPACES</span><h1>Commercial Property for Sale in Lucknow</h1></div><span className="commercial-count">Showing {visibleProjects.length} Projects</span></header>
      <p className="commercial-intro">Explore commercial spaces in Lucknow for your business or investment. Browse the available projects and contact our team for current pricing, area details, and availability.</p>
      <div className="commercial-layout">
        <aside className="commercial-filters" aria-label="Filter commercial properties">
          <div className="commercial-filter-title"><span aria-hidden="true">☷</span><h2>Filters</h2><button type="button" onClick={() => { setSearch(''); setSelectedTypes([]) }}>Clear</button></div>
          <section className="commercial-filter-group">
            <button type="button" aria-expanded={filtersOpen.type} onClick={() => setFiltersOpen(current => ({ ...current, type: !current.type }))}>Property Type <span>{filtersOpen.type ? '−' : '+'}</span></button>
            {filtersOpen.type && <div className="commercial-filter-options">{propertyTypes.map(type => <label key={type}><input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)}/><span>{type}</span><small>{commercialListings.filter(project => project.bhk === type).length}</small></label>)}</div>}
          </section>
          <section className="commercial-filter-group">
            <button type="button" aria-expanded={filtersOpen.location} onClick={() => setFiltersOpen(current => ({ ...current, location: !current.location }))}>Location <span>{filtersOpen.location ? '−' : '+'}</span></button>
            {filtersOpen.location && <label className="commercial-location-search"><span className="commercial-filter-sr">Search by project or location</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search projects or locality"/></label>}
          </section>
          <div className="commercial-filter-note"><span>Need help choosing?</span><button onClick={() => onEnquiry()}>Talk to an advisor <b>→</b></button></div>
        </aside>

        <section className="commercial-results" aria-label="Commercial property results" aria-live="polite">
          {visibleProjects.length ? <div className="commercial-grid">{visibleProjects.map(project => <article className="commercial-card" key={project.name}>
            <div className="commercial-card-image"><img src={project.image} alt={project.name}/><span className="commercial-card-tag">{project.bhk || 'Commercial'}</span><button className="commercial-card-favorite" aria-label={`Add ${project.name} to favourites`} onClick={event => event.currentTarget.classList.toggle('is-favorite')}>♡</button></div>
            <div className="commercial-card-body"><div className="commercial-card-title"><button onClick={() => onNavigate(`/property/${projectSlug(project.name)}`)}>{project.name}</button>{project.rera && <span className="commercial-rera">RERA <b>✓</b></span>}</div>
              {project.builder && <p>By {project.builder}</p>}<p>{project.place}</p><div className="commercial-card-specs"><span>{project.bhk || 'Commercial space'}</span><span>{project.area || 'Area on request'}</span></div>
              <div className="commercial-card-footer"><strong>{project.price || 'Price on request'}</strong><button onClick={() => onEnquiry(project)}>Contact</button></div>
            </div>
          </article>)}</div> : <div className="commercial-empty"><h2>No projects match those filters</h2><p>Try another property type or locality.</p><button onClick={() => { setSearch(''); setSelectedTypes([]) }}>Clear filters</button></div>}
        </section>
      </div>
    </div>
  </div>
}
