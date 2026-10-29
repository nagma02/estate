import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import RelatedProjects from './sections/RelatedProjects'
import FloorPlanDiagram from './sections/FloorPlanDiagram'
import ScrollCarousel from './sections/ScrollCarousel'
import EmiCalculator from '../../components/shared/EmiCalculator'
import { formatArea, formatPrice, getPropertyDetails } from './propertyDetails'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, BedIcon, CheckIcon, ClubhouseIcon, CloseIcon, DownloadIcon, ExpandIcon, GymIcon, HallIcon, HeartIcon, ParkingIcon, PinIcon, PlayIcon, PoolIcon, PowerIcon, RunIcon, ShieldIcon, SparkIcon, TreeIcon, WifiIcon } from '../../components/shared/Icons'

const sectionLinks = [['about', 'About'], ['amenities', 'Amenities'], ['price', 'Price'], ['floor-plan', 'Floor Plan'], ['location', 'Location'], ['gallery', 'Gallery'], ['specifications', 'Specifications'], ['emi', 'EMI Calculator']]
const categoryRoutes = { VILLA: ['Villas', '/villas'], PLOT: ['Plots', '/plots'], COMMERCIAL: ['Commercial', '/commercial'] }
const amenityIcons = [[/gym|fitness/i, GymIcon], [/pool/i, PoolIcon], [/fib|wi-?fi|internet/i, WifiIcon], [/club/i, ClubhouseIcon], [/hall|amphi|community/i, HallIcon], [/green|garden|landscap|park(?!ing)/i, TreeIcon], [/secur|cctv|camera/i, ShieldIcon], [/kid|play/i, PlayIcon], [/jog|track|court|sport/i, RunIcon], [/power|backup/i, PowerIcon], [/parking/i, ParkingIcon]]
const amenityIcon = label => (amenityIcons.find(([pattern]) => pattern.test(label)) || [null, SparkIcon])[1]
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function InterestForm({ compact = false, onComplete }) {
  const [sent, setSent] = useState(false)
  const submit = event => { event.preventDefault(); setSent(true); onComplete?.() }
  if (sent) return <div className="ar-success"><span><CheckIcon/></span><b>Thank you for your interest</b>Our property advisor will call you shortly.</div>
  return <form className={`ar-form${compact ? ' compact' : ''}`} onSubmit={submit}>
    <label className="ar-field"><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" required/></label>
    <label className="ar-field"><span>Phone</span><span className="ar-phone"><select aria-label="Country code" defaultValue="+91"><option value="+91">+91 India</option><option value="+1">+1 USA</option><option value="+44">+44 UK</option></select><input name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="Phone number" required/></span></label>
    <label className="ar-field"><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="Email address" required/></label>
    <label className="ar-consent"><input type="checkbox" required/><span>I agree to the <a href="/terms-conditions">Terms</a> and <a href="/privacy-policy">Privacy Policy</a>, and consent to be contacted.</span></label>
    <button type="submit" className="ar-btn ar-btn-primary ar-btn-block">Get a Call <ArrowUpRightIcon width="15" height="15"/></button>
  </form>
}

function Section({ id, kicker, title, aside, children }) {
  return <section className="ar-pd-section ar-reveal" id={`pdp-${id}`}>
    <header className="ar-pd-section-head"><div><span className="ar-eyebrow">{kicker}</span><h2>{title}</h2></div>{aside}</header>
    {children}
  </section>
}

function HeroSlider({ slides, name }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  useEffect(() => {
    if (count < 2 || paused || prefersReducedMotion()) return undefined
    const timer = setTimeout(() => setIndex((index + 1) % count), 6000)
    return () => clearTimeout(timer)
  }, [index, count, paused])
  const go = step => setIndex((index + step + count) % count)
  return <div className="ar-pd-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    {slides.map((slide, slideIndex) => <img key={slide.src} src={slide.src} alt={slideIndex === index ? `${name} – ${slide.label}` : ''} aria-hidden={slideIndex !== index} className={slideIndex === index ? 'active' : ''} loading={slideIndex ? 'lazy' : 'eager'}/>)}
    {count > 1 && <div className="ar-pd-slider-controls">
      <button type="button" aria-label="Previous photo" onClick={() => go(-1)}><ArrowLeftIcon/></button>
      <span aria-live="polite">{slides[index].label} · {index + 1} / {count}</span>
      <button type="button" aria-label="Next photo" onClick={() => go(1)}><ArrowRightIcon/></button>
    </div>}
  </div>
}

function LeadBar({ project, onExpand }) {
  const [sent, setSent] = useState(false)
  const submit = event => { event.preventDefault(); setSent(true) }
  return <div className="ar-pd-leadbar" role="region" aria-label="Quick enquiry">
    <div className="ar-pd-leadbar-inner">
      <p className="ar-pd-leadbar-title"><b>Interested in {project.name.toLowerCase()}?</b><small>Get the latest price list and a free site visit.</small></p>
      {sent
        ? <p className="ar-pd-leadbar-sent"><CheckIcon width="18" height="18"/>Thank you! Our property advisor will call you shortly.</p>
        : <form onSubmit={submit}>
          <input name="name" autoComplete="name" placeholder="Name" aria-label="Name" required/>
          <input name="email" type="email" autoComplete="email" placeholder="Email" aria-label="Email" required/>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile Number" aria-label="Mobile number" pattern="[0-9+ -]{10,15}" required/>
          <input name="message" placeholder="Message" aria-label="Message"/>
          <button type="submit" className="ar-btn ar-btn-gold">Submit Enquiry</button>
        </form>}
      <button type="button" className="ar-btn ar-btn-gold ar-pd-leadbar-mobile" onClick={onExpand}>Enquire Now <ArrowUpRightIcon width="15" height="15"/></button>
    </div>
  </div>
}

export default function ProjectDetailPage({ project, type, favorites = [], onToggleFavorite, onNavigate }) {
  const details = useMemo(() => getPropertyDetails(project), [project])
  const { configs, gallery, specs } = details
  const favorite = favorites.some(item => item.name.toLowerCase() === project.name.toLowerCase())
  const [activeSection, setActiveSection] = useState('about')
  const [planId, setPlanId] = useState(configs[0].id)
  const [specId, setSpecId] = useState(specs[0].id)
  const [popup, setPopup] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const tabsRef = useRef(null)
  const [categoryLabel, categoryRoute] = categoryRoutes[type] || ['Apartments', '/apartment']
  const plan = configs.find(config => config.id === planId) || configs[0]
  const spec = specs.find(item => item.id === specId) || specs[0]
  const areaRange = `${formatArea(Math.min(...configs.map(config => config.carpet || config.superArea)))} – ${formatArea(Math.max(...configs.map(config => config.superArea)))}`

  // The sub-navigation sticks right under the site header, whatever height the header has.
  useEffect(() => {
    const header = document.querySelector('.ar-header')
    if (!header) return undefined
    const place = () => document.documentElement.style.setProperty('--pd-header', `${header.offsetHeight}px`)
    place()
    const resize = new ResizeObserver(place)
    resize.observe(header)
    return () => resize.disconnect()
  }, [])
  // Highlight the tab for whichever section sits under the sticky tab bar.
  useEffect(() => {
    const sections = sectionLinks.map(([id]) => document.getElementById(`pdp-${id}`)).filter(Boolean)
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id.slice(4))
    }, { rootMargin: '-170px 0px -55% 0px' })
    sections.forEach(section => io.observe(section))
    return () => io.disconnect()
  }, [project])
  // Slide the gold underline under the active tab and keep that tab scrolled into view.
  useLayoutEffect(() => {
    const nav = tabsRef.current
    if (!nav) return undefined
    const place = () => {
      const tab = nav.querySelector('a.active')
      if (!tab) return
      nav.style.setProperty('--tab-x', `${tab.offsetLeft}px`)
      nav.style.setProperty('--tab-w', `${tab.offsetWidth}px`)
      if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
    }
    place()
    const resize = new ResizeObserver(place)
    resize.observe(nav)
    return () => resize.disconnect()
  }, [activeSection])
  useEffect(() => {
    if (popup === null && lightbox === null) return undefined
    const keys = event => {
      if (event.key === 'Escape') { setPopup(null); setLightbox(null) }
      if (lightbox !== null && event.key === 'ArrowRight') setLightbox((lightbox + 1) % gallery.length)
      if (lightbox !== null && event.key === 'ArrowLeft') setLightbox((lightbox - 1 + gallery.length) % gallery.length)
    }
    document.addEventListener('keydown', keys)
    return () => document.removeEventListener('keydown', keys)
  }, [popup, lightbox, gallery.length])

  const scrollToSection = (event, id) => { event.preventDefault(); setActiveSection(id); document.getElementById(`pdp-${id}`)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }) }
  const bookVisit = () => setPopup({ title: 'Book a site visit', intro: `Pick a time that suits you and we will arrange a guided visit to ${project.name}.` })
  const requestDetails = topic => setPopup({ title: 'Connect with us', intro: `Request ${topic} for ${project.name}.` })

  return <div className="ar-page ar-pd">
    <section className="ar-pd-hero" aria-label={`${project.name} overview`}>
      <HeroSlider slides={gallery.slice(0, 5)} name={project.name}/>
      <div className="ar-pd-hero-shade" aria-hidden="true"/>
      <div className="ar-wrap ar-pd-hero-content">
        <nav className="ar-breadcrumb" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')}>Home</button><i aria-hidden="true">/</i><button onClick={() => onNavigate('/apartment')}>Lucknow</button><i aria-hidden="true">/</i><button onClick={() => onNavigate(categoryRoute)}>{categoryLabel}</button><i aria-hidden="true">/</i><strong>{project.name}</strong>
        </nav>
        <div className="ar-pd-hero-tags"><span className="ar-pd-tag">{categoryLabel.replace(/s$/, '')}</span>{details.bhkTag && <span className="ar-pd-tag"><BedIcon width="14" height="14"/>{details.bhkTag}</span>}</div>
        <h1>{project.name}</h1>
        <p className="ar-pd-hero-place"><PinIcon width="16" height="16"/>{project.place}</p>
        <div className="ar-pd-hero-actions">
          <span className="ar-pd-price-pill"><small>Starting from</small>{formatPrice(details.startingPrice)}+</span>
          <button type="button" className="ar-btn ar-btn-gold" onClick={bookVisit}>Book Site Visit <ArrowUpRightIcon width="15" height="15"/></button>
          <button type="button" className="ar-btn ar-pd-btn-ghost" onClick={() => requestDetails('the brochure')}><DownloadIcon width="16" height="16"/>Brochure</button>
          <button type="button" className={`ar-pd-heart${favorite ? ' active' : ''}`} aria-label={favorite ? 'Remove from favourites' : 'Add to favourites'} aria-pressed={favorite} onClick={() => onToggleFavorite(project)}><HeartIcon width="20" height="20"/></button>
        </div>
      </div>
    </section>

    <div className="ar-pd-subnav">
      <div className="ar-wrap ar-pd-subnav-inner">
        <nav ref={tabsRef} aria-label="Property details sections"><span className="ar-pd-subnav-indicator" aria-hidden="true"/>{sectionLinks.map(([id, label]) => <a key={id} href={`#pdp-${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'true' : undefined} onClick={event => scrollToSection(event, id)}>{label}</a>)}</nav>
        <button type="button" className="ar-btn ar-btn-gold ar-pd-subnav-cta" onClick={bookVisit}>Book Site Visit</button>
      </div>
    </div>

    <div className="ar-wrap ar-pd-body">
      <Section id="about" kicker="Overview" title={`About ${project.name.toLowerCase()}`}>
        <div className="ar-pd-about">
          <div className="ar-pd-about-copy">
            {details.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <span className="ar-pd-rera"><ShieldIcon width="16" height="16"/>{details.rera ? <>RERA Reg. No. <b>{details.rera}</b></> : <>RERA registration details <b>on request</b></>}</span>
          </div>
          <dl className="ar-pd-facts">
            <div><dt>Configuration</dt><dd>{details.bhkTag || 'On request'}</dd></div>
            <div><dt>Area range</dt><dd>{areaRange}</dd></div>
            <div><dt>Starting price</dt><dd>{formatPrice(details.startingPrice)}+</dd></div>
            <div><dt>Developer</dt><dd>{project.builder || 'On request'}</dd></div>
          </dl>
        </div>
      </Section>

      <Section id="amenities" kicker="Live well" title="Project Amenities">
        <ScrollCarousel label="amenities" className="ar-pd-amenities">
          {details.amenities.map(item => { const Icon = amenityIcon(item); return <li key={item}><span className="ar-pd-amenity-icon"><Icon width="30" height="30"/></span><b>{item}</b></li> })}
        </ScrollCarousel>
      </Section>

      <Section id="price" kicker="Price list" title="Pricing" aside={<button type="button" className="ar-btn ar-btn-outline" onClick={() => requestDetails('the latest price list')}>Get latest price list</button>}>
        <div className="ar-pd-table-wrap">
          <table className="ar-pd-table">
            <thead><tr><th scope="col">Configuration</th><th scope="col">Carpet Area</th><th scope="col">Built-up Area</th><th scope="col">Super Area</th><th scope="col">Price</th><th scope="col"><span className="ar-sr-only">Action</span></th></tr></thead>
            <tbody>{configs.map(config => <tr key={config.id}>
              <th scope="row">{config.label}</th><td>{formatArea(config.carpet)}</td><td>{formatArea(config.builtUp)}</td><td>{formatArea(config.superArea)}</td><td className="price">{formatPrice(config.price)}*</td>
              <td><button type="button" className="ar-pd-link" onClick={() => requestDetails(`a ${config.label} quote`)}>Get quote <ArrowUpRightIcon width="13" height="13"/></button></td>
            </tr>)}</tbody>
          </table>
        </div>
        <small className="ar-note">*Indicative prices for illustration. Final pricing depends on floor, facing and current offers — confirm with our advisor.</small>
      </Section>

      <Section id="floor-plan" kicker="Home options" title="Floor Plans">
        <div className="ar-pd-pills" role="tablist" aria-label="Unit type">{configs.map(config => <button key={config.id} type="button" role="tab" aria-selected={plan.id === config.id} className={plan.id === config.id ? 'active' : ''} onClick={() => setPlanId(config.id)}>{config.label}</button>)}</div>
        <div className="ar-pd-plan" role="tabpanel" aria-label={`${plan.label} floor plan`}>
          <div className="ar-pd-plan-canvas" key={plan.id}><FloorPlanDiagram config={plan}/></div>
          <div className="ar-pd-plan-info">
            <h3>{plan.label}</h3>
            <ul className="ar-pd-area-pills">
              {plan.carpet && <li><small>Carpet</small><b>{formatArea(plan.carpet)}</b></li>}
              {plan.builtUp && <li><small>Built-up</small><b>{formatArea(plan.builtUp)}</b></li>}
              <li><small>Super Area</small><b>{formatArea(plan.superArea)}</b></li>
            </ul>
            <p className="ar-pd-plan-price"><small>Price</small>{formatPrice(plan.price)}*</p>
            <button type="button" className="ar-btn ar-btn-primary" onClick={() => requestDetails(`the detailed ${plan.label} floor plan`)}><DownloadIcon width="16" height="16"/>Get detailed plan</button>
            <small className="ar-note">Schematic layout for illustration; the developer’s approved plan applies.</small>
          </div>
        </div>
      </Section>

      <Section id="location" kicker="Find your way" title="Location">
        <p className="ar-detail-place"><PinIcon width="15" height="15"/>{project.place}</p>
        <div className="ar-map"><iframe title={`${project.name} location map`} src={`https://maps.google.com/maps?q=${encodeURIComponent(project.place)}&z=13&output=embed`} loading="lazy"/></div>
      </Section>

      <Section id="gallery" kicker="Take a look" title="Gallery">
        <ScrollCarousel label="photos" className="ar-pd-gallery">
          {gallery.map((photo, index) => <li key={photo.src}><button type="button" onClick={() => setLightbox(index)} aria-label={`Open ${photo.label}`}>
            <img src={photo.src} alt="" loading="lazy"/>
            <span className="ar-pd-gallery-overlay"><b>{photo.label}</b><ExpandIcon width="18" height="18"/></span>
            {photo.sample && <small className="ar-pd-sample">Representative image</small>}
          </button></li>)}
        </ScrollCarousel>
      </Section>

      <Section id="specifications" kicker="Built to last" title="Specifications">
        <div className="ar-pd-specs">
          <div className="ar-pd-spec-tabs" role="tablist" aria-orientation="vertical" aria-label="Specification areas">{specs.map(item => <button key={item.id} type="button" role="tab" id={`spec-tab-${item.id}`} aria-selected={spec.id === item.id} aria-controls="spec-panel" className={spec.id === item.id ? 'active' : ''} onClick={() => setSpecId(item.id)}>{item.label}<ArrowRightIcon width="15" height="15"/></button>)}</div>
          <div className="ar-pd-spec-pane" role="tabpanel" id="spec-panel" aria-labelledby={`spec-tab-${spec.id}`} key={spec.id}>
            <figure>{spec.image ? <img src={spec.image} alt="" loading="lazy"/> : <span className="ar-pd-spec-fallback"><SparkIcon width="34" height="34"/></span>}<figcaption>{spec.label}</figcaption></figure>
            <ol>{spec.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
          </div>
        </div>
      </Section>

      <Section id="emi" kicker="Plan your budget" title="EMI Calculator">
        <EmiCalculator key={project.name} defaultLoan={Math.round(details.startingPrice * 0.8 / 1e5) * 1e5}/>
        <small className="ar-note">Illustrative estimate only. Actual rates and terms are set by your lender.</small>
      </Section>

      <RelatedProjects project={project} type={type} onNavigate={onNavigate}/>
    </div>

    <LeadBar key={project.name} project={project} onExpand={() => setPopup({ title: 'Enquire now', intro: `Request details about ${project.name}.` })}/>

    {lightbox !== null && <div className="ar-modal-backdrop ar-pd-lightbox" onMouseDown={event => { if (event.target === event.currentTarget) setLightbox(null) }}>
      <figure role="dialog" aria-modal="true" aria-label={gallery[lightbox].label}>
        <img src={gallery[lightbox].src} alt={gallery[lightbox].label}/>
        <figcaption>{gallery[lightbox].label}{gallery[lightbox].sample && <small> · Representative image</small>}<span>{lightbox + 1} / {gallery.length}</span></figcaption>
        <button type="button" className="ar-modal-close" aria-label="Close" onClick={() => setLightbox(null)}><CloseIcon width="18" height="18"/></button>
        <button type="button" className="ar-pd-arrow prev" aria-label="Previous photo" onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)}><ArrowLeftIcon/></button>
        <button type="button" className="ar-pd-arrow next" aria-label="Next photo" onClick={() => setLightbox((lightbox + 1) % gallery.length)}><ArrowRightIcon/></button>
      </figure>
    </div>}
    {popup && <div className="ar-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setPopup(null) }}><section className="ar-modal" role="dialog" aria-modal="true" aria-labelledby="pdp-popup-title"><button type="button" className="ar-modal-close" aria-label="Close" onClick={() => setPopup(null)}><CloseIcon width="18" height="18"/></button><small className="ar-eyebrow">Advik Realtor</small><h2 id="pdp-popup-title">{popup.title}</h2><p>{popup.intro}</p><InterestForm compact/></section></div>}
  </div>
}
