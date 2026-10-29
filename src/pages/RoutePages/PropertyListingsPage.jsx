import { useEffect, useMemo, useState } from 'react'
import { clearLocality, commercialListings, listings, openProject, plotListings, readLocality, villaListings } from './listingsData'
import PropertyCard from '../../components/shared/PropertyCard'
import PageHero from '../../components/shared/PageHero'
import { heroImages } from '../../components/shared/heroImages'
import { ArrowUpRightIcon, BuildingIcon, ChevronIcon, CloseIcon, FilterIcon, PlotIcon, SearchIcon, StoreIcon, VillaIcon } from '../../components/shared/Icons'

const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK / Villa']
const typeGroups = [
  { title: 'Residential', values: ['Apartments / Flats', 'Villas / Houses', 'Plots / Land'] },
  { title: 'Commercial', values: ['Retail Shops', 'Office Spaces', 'Showrooms'] },
]
const possessionOptions = ['Ready to Move', 'Under Construction', 'Possession in 1 Year', 'Possession in 2+ Years']
const locations = ['Sushant Golf City', 'Gomti Nagar Extension', 'Shaheed Path', 'Faizabad Road', 'Bijnor Road', 'Sultanpur Road']
const amenities = ['Swimming Pool', 'Gymnasium', 'Club House', '24x7 Security', 'Power Backup', 'Park / Garden']
const budgetChips = [
  { label: '< ₹50L', min: 10, max: 50 },
  { label: '₹50L - ₹1Cr', min: 50, max: 100 },
  { label: '₹1Cr - ₹2Cr', min: 100, max: 200 },
  { label: '₹2Cr+', min: 200, max: 500 },
]
const freshFilters = () => ({ minPrice: 10, maxPrice: 500, budgetApplied: false, bhk: [], types: [], possession: [], rera: false, cashback: false, locations: [], amenities: [] })

function priceInLacs(value) {
  if (typeof value === 'number') return value
  if (!value || /contact|request/i.test(value)) return null
  const text = String(value).toLowerCase().replace(/,/g, '')
  const amount = Number(text.match(/[\d.]+/)?.[0])
  if (!Number.isFinite(amount)) return null
  if (/cr|crore/.test(text)) return amount * 100
  if (/l|lac/.test(text)) return amount
  return amount / 100000
}

function projectTypeFor(item, pageType) {
  if (pageType === 'commercial') {
    const type = `${item.propertyType || ''} ${item.bhk || ''}`.toLowerCase()
    if (type.includes('office')) return 'Office Spaces'
    if (type.includes('retail') || type.includes('mall')) return 'Retail Shops'
    return 'Showrooms'
  }
  return ({ apartments: 'Apartments / Flats', villas: 'Villas / Houses', plots: 'Plots / Land' })[pageType]
}

function hasBhk(item, selected) {
  const available = [...String(item.bhk || '').matchAll(/(\d+)\s*bhk/gi)].map(match => Number(match[1]))
  return selected.some(option => {
    if (option.startsWith('4+')) return available.some(value => value >= 4)
    const value = Number(option.match(/\d+/)?.[0])
    return available.includes(value)
  })
}

function amenityMatches(item, selected) {
  const normalize = value => value.toLowerCase().replace(/×/g, 'x').replace(/[^a-z0-9]/g, '')
  const values = (item.amenities || []).map(normalize)
  const target = normalize(selected)
  if (target === 'parkgarden') return values.some(value => /park|green|garden|natural/.test(value))
  return values.some(value => value.includes(target))
}

function FilterGroup({ title, open, onToggle, count = 0, children }) {
  const panelId = `filter-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <section className={`ar-filter-group${open ? ' open' : ''}`}><button className="ar-filter-heading" type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}><span>{title}{count > 0 && <em>{count}</em>}</span><ChevronIcon width="16" height="16"/></button><div className={`ar-filter-reveal${open ? ' open' : ''}`} id={panelId} aria-hidden={!open} inert={!open}><div className="ar-filter-content">{children}</div></div></section>
}

function CheckList({ items, selected, onChange }) {
  return <div className="ar-check-list">{items.map(item => <label key={item}><input type="checkbox" checked={selected.includes(item)} onChange={() => onChange(item)}/><span>{item}</span></label>)}</div>
}

function PillList({ items, selected, onChange, format = value => value }) {
  return <div className="ar-pill-list">{items.map(item => <button type="button" key={item} aria-pressed={selected.includes(item)} className={selected.includes(item) ? 'selected' : ''} onClick={() => onChange(item)}>{format(item)}</button>)}</div>
}

const categoryIcons = { Apartments: BuildingIcon, Villas: VillaIcon, Plots: PlotIcon, Commercial: StoreIcon }
const sortOptions = [['featured', 'Popularity / Featured'], ['price-low', 'Price: Low to High'], ['price-high', 'Price: High to Low'], ['newest', 'Newest Listed First']]

export default function PropertyListingsPage({ type = 'apartments', favorites = [], onToggleFavorite, onEnquiry, onNavigate }) {
  const pageType = type
  const isCommercial = pageType === 'commercial'
  const source = pageType === 'villas' ? villaListings : pageType === 'plots' ? plotListings : isCommercial ? commercialListings : listings
  const title = isCommercial ? 'Commercial Properties in Lucknow' : `${pageType[0].toUpperCase()}${pageType.slice(1)} for Sale in Lucknow`
  const categoryCards = [
    { label: 'Apartments', route: '/apartment', detail: 'Modern city living' },
    { label: 'Villas', route: '/villas', detail: 'Room to live differently' },
    { label: 'Plots', route: '/plots', detail: 'Build your own vision' },
    { label: 'Commercial', route: '/commercial', detail: 'Spaces for business' },
  ]
  // Read (not consume) the home-page locality here so StrictMode's double render sees it too.
  const [presetLocality] = useState(() => { const value = readLocality(); return locations.includes(value) ? value : null })
  const initial = { ...freshFilters(), ...(presetLocality && { locations: [presetLocality] }) }
  useEffect(() => { clearLocality() }, [])
  const [filters, setFilters] = useState(initial)
  const [draftFilters, setDraftFilters] = useState(initial)
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState({ price: true, bhk: true, offers: true, location: true, possession: false, types: false, amenities: false })
  useEffect(() => {
    if (!mobileOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = event => { if (event.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown) }
  }, [mobileOpen])

  const currentFilters = mobileOpen ? draftFilters : filters
  const changeFilters = update => {
    if (mobileOpen) setDraftFilters(current => update(current))
    else { setFilters(current => update(current)); setDraftFilters(current => update(current)) }
  }
  const toggleList = (key, value) => changeFilters(current => ({ ...current, [key]: current[key].includes(value) ? current[key].filter(item => item !== value) : [...current[key], value] }))
  const toggleBoolean = key => changeFilters(current => ({ ...current, [key]: !current[key] }))
  const resetFilters = () => { const reset = freshFilters(); setFilters(reset); setDraftFilters(reset) }
  const toggleGroup = key => setOpenGroups(current => ({ ...current, [key]: !current[key] }))

  const filtered = useMemo(() => source.filter(item => {
    const searchText = `${item.name || ''} ${item.place || ''} ${item.builder || ''}`.toLowerCase()
    if (query.trim() && !searchText.includes(query.trim().toLowerCase())) return false
    if (filters.bhk.length && !hasBhk(item, filters.bhk)) return false
    if (filters.types.length && !filters.types.includes(projectTypeFor(item, pageType))) return false
    if (filters.possession.length && !filters.possession.includes(item.possessionStatus)) return false
    if (filters.rera && item.reraApproved !== true) return false
    if (filters.cashback && item.cashback !== true) return false
    if (filters.locations.length && !filters.locations.some(location => item.place?.toLowerCase().includes(location.toLowerCase()))) return false
    if (filters.amenities.length && !filters.amenities.every(amenity => amenityMatches(item, amenity))) return false
    if (filters.budgetApplied) {
      const price = priceInLacs(item.price)
      if (price == null || price < filters.minPrice || (filters.maxPrice < 500 && price > filters.maxPrice)) return false
    }
    return true
  }), [source, filters, pageType, query])

  const results = useMemo(() => {
    const ordered = [...filtered]
    if (sort === 'price-low') ordered.sort((a, b) => (priceInLacs(a.price) ?? Infinity) - (priceInLacs(b.price) ?? Infinity))
    else if (sort === 'price-high') ordered.sort((a, b) => (priceInLacs(b.price) ?? -Infinity) - (priceInLacs(a.price) ?? -Infinity))
    else if (sort === 'newest') ordered.reverse()
    else ordered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    return ordered
  }, [filtered, sort])

  const activeCount = Object.values(filters).reduce((n, value) => n + (Array.isArray(value) ? value.length : value === true ? 1 : 0), 0)
  const minPercent = (currentFilters.minPrice - 10) / 490 * 100
  const maxPercent = (currentFilters.maxPrice - 10) / 490 * 100
  const activeRoute = `/${pageType === 'apartments' ? 'apartment' : pageType}`
  const sortSelect = <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort properties">{sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>

  const priceControl = <>
    <div className="ar-range-values"><span><small>Min</small><b>₹ {currentFilters.minPrice} L</b></span><i/><span><small>Max</small><b>{currentFilters.maxPrice >= 500 ? '₹ 5 Cr+' : `₹ ${currentFilters.maxPrice} L`}</b></span></div>
    <div className="ar-dual-range" style={{ '--from': `${minPercent}%`, '--to': `${maxPercent}%` }}><input aria-label="Minimum budget" type="range" min="10" max="500" step="5" value={currentFilters.minPrice} onChange={event => changeFilters(current => ({ ...current, minPrice: Math.min(Number(event.target.value), current.maxPrice), budgetApplied: true }))}/><input aria-label="Maximum budget" type="range" min="10" max="500" step="5" value={currentFilters.maxPrice} onChange={event => changeFilters(current => ({ ...current, maxPrice: Math.max(Number(event.target.value), current.minPrice), budgetApplied: true }))}/></div>
    <div className="ar-pill-list ar-pill-list-grid">{budgetChips.map(chip => <button type="button" className={currentFilters.budgetApplied && currentFilters.minPrice === chip.min && currentFilters.maxPrice === chip.max ? 'selected' : ''} key={chip.label} onClick={() => changeFilters(current => ({ ...current, minPrice: chip.min, maxPrice: chip.max, budgetApplied: true }))}>{chip.label}</button>)}</div>
  </>
  const filtersPanel = <>
    <div className="ar-filter-title"><span><FilterIcon/>Filters{activeCount > 0 && <em>{activeCount}</em>}</span><button type="button" onClick={resetFilters}>Clear all</button></div>
    <FilterGroup title="Budget" open={openGroups.price} onToggle={() => toggleGroup('price')} count={currentFilters.budgetApplied ? 1 : 0}>{priceControl}</FilterGroup>
    <FilterGroup title="BHK Configuration" open={openGroups.bhk} onToggle={() => toggleGroup('bhk')} count={currentFilters.bhk.length}><PillList items={bhkOptions} selected={currentFilters.bhk} onChange={value => toggleList('bhk', value)} format={value => value.replace(' / Villa', '')}/></FilterGroup>
    <FilterGroup title="Approval & Offers" open={openGroups.offers} onToggle={() => toggleGroup('offers')} count={Number(currentFilters.rera) + Number(currentFilters.cashback)}>
      <label className="ar-switch"><span>RERA approved only</span><input type="checkbox" role="switch" checked={currentFilters.rera} onChange={() => toggleBoolean('rera')}/><i aria-hidden="true"/></label>
      <label className="ar-switch"><span>Hot offers / Cashback deals</span><input type="checkbox" role="switch" checked={currentFilters.cashback} onChange={() => toggleBoolean('cashback')}/><i aria-hidden="true"/></label>
    </FilterGroup>
    <FilterGroup title="Possession Status" open={openGroups.possession} onToggle={() => toggleGroup('possession')} count={currentFilters.possession.length}><PillList items={possessionOptions} selected={currentFilters.possession} onChange={value => toggleList('possession', value)}/></FilterGroup>
    <FilterGroup title="Lucknow Locations" open={openGroups.location} onToggle={() => toggleGroup('location')} count={currentFilters.locations.length}><PillList items={locations} selected={currentFilters.locations} onChange={value => toggleList('locations', value)}/></FilterGroup>
    <FilterGroup title="Property Type" open={openGroups.types} onToggle={() => toggleGroup('types')} count={currentFilters.types.length}><small className="ar-filter-sub">Residential</small><CheckList items={typeGroups[0].values} selected={currentFilters.types} onChange={value => toggleList('types', value)}/><small className="ar-filter-sub">Commercial</small><CheckList items={typeGroups[1].values} selected={currentFilters.types} onChange={value => toggleList('types', value)}/></FilterGroup>
    <FilterGroup title="Amenities" open={openGroups.amenities} onToggle={() => toggleGroup('amenities')} count={currentFilters.amenities.length}><CheckList items={amenities} selected={currentFilters.amenities} onChange={value => toggleList('amenities', value)}/></FilterGroup>
    <div className="ar-filter-mobile-actions"><button type="button" className="ar-btn ar-btn-outline" onClick={resetFilters}>Clear all</button><button type="button" className="ar-btn ar-btn-primary" onClick={() => { setFilters(draftFilters); setMobileOpen(false) }}>Apply filters</button></div>
  </>

  return <div className="ar-page ar-listing">
    <PageHero eyebrow="A more considered way to find home" title={<>{title.replace(' in Lucknow', '')} <em>in Lucknow</em></>} text="Explore thoughtfully selected Lucknow properties, compare the details that matter, and find a place that feels right." images={heroImages[pageType] || heroImages.apartments} crumbs={[['Home', '/'], ['Lucknow'], [title]]} onNavigate={onNavigate}>
      <div className="ar-type-switch" role="navigation" aria-label="Property types">{categoryCards.map(card => { const Icon = categoryIcons[card.label]; return <button type="button" className={card.route === activeRoute ? 'active' : ''} aria-current={card.route === activeRoute ? 'page' : undefined} key={card.route} onClick={() => onNavigate(card.route)} title={card.detail}><Icon width="16" height="16"/>{card.label}</button> })}</div>
    </PageHero>
    <div className="ar-wrap ar-listing-layout">
      <div className={`ar-filter-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} aria-hidden="true"/>
      <aside className={`ar-filter-panel${mobileOpen ? ' open' : ''}`} aria-label="Property filters">
        <div className="ar-filter-drawer-head"><h2>Filter &amp; Sort</h2><button type="button" aria-label="Close filters" onClick={() => setMobileOpen(false)}><CloseIcon/></button></div>
        <label className="ar-filter-mobile-sort"><span>Sort by</span>{sortSelect}</label>
        {filtersPanel}
      </aside>
      <section className="ar-results" id="pl-results" aria-label="Property results">
        <div className="ar-toolbar">
          <p><strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'} in Lucknow</p>
          <label className="ar-toolbar-search"><SearchIcon width="16" height="16"/><span className="sr-only">Search property by name or location</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name or location"/></label>
          <label className="ar-toolbar-sort"><span>Sort</span>{sortSelect}</label>
        </div>
        {results.length ? <div className="ar-card-grid ar-card-grid-3">{results.map(item => <PropertyCard key={item.name} item={item} label={isCommercial ? 'Commercial' : pageType.slice(0, -1)} config={item.bhk || 'Commercial space'} tags={(item.amenities || []).filter(value => value !== 'More Facility').slice(0, 3)} favorite={favorites.some(saved => saved.name.toLowerCase() === item.name.toLowerCase())} onFavorite={() => onToggleFavorite(item)} onPriceInfo={() => onEnquiry(item)} onDetails={() => openProject(item, isCommercial ? 'Commercial' : pageType.slice(0, -1), onNavigate)}/>)}</div>
          : <div className="ar-empty"><span><FilterIcon width="26" height="26"/></span><h2>No properties match these filters</h2><p>Try adjusting your budget or clearing some filters.</p><button type="button" className="ar-btn ar-btn-primary" onClick={resetFilters}>Clear all filters <ArrowUpRightIcon width="15" height="15"/></button></div>}
      </section>
    </div>
    <div className="ar-mobile-dock"><button type="button" onClick={() => { setDraftFilters(filters); setMobileOpen(true) }}><FilterIcon/>Filter &amp; Sort{activeCount > 0 && <em>{activeCount}</em>}</button></div>
  </div>
}
