import { useEffect, useState } from 'react'

const SLIDE_INTERVAL = 5000

// Full-bleed photo hero shared by every inner page, matching the home hero:
// silent cross-fading photos, an emerald shade, and the page's own title and actions.
// crumbs: [['Home', '/'], ['Lucknow'], ['Apartments']] — the last one is the current page.
export default function PageHero({ eyebrow, title, text, images = [], crumbs = [], onNavigate, align = 'left', children }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (images.length < 2) return undefined
    const timer = setInterval(() => setIndex(current => (current + 1) % images.length), SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [images.length])
  return <section className={`ar-ph ar-ph-${align}`}>
    <div className="ar-ph-media" aria-hidden="true">
      <div className="ar-hero-slides">{images.map((src, slide) => <img key={src} src={src} alt="" className={slide === index ? 'active' : ''} loading={slide ? 'lazy' : 'eager'} decoding="async"/>)}</div>
      <div className="ar-ph-shade"/>
    </div>
    <div className="ar-wrap ar-ph-copy">
      {crumbs.length > 0 && <nav className="ar-breadcrumb" aria-label="Breadcrumb">{crumbs.map(([label, path], position) => <span key={label} className="ar-ph-crumb">
        {position > 0 && <i aria-hidden="true">/</i>}
        {position === crumbs.length - 1 ? <strong>{label}</strong> : path && onNavigate ? <button type="button" onClick={() => onNavigate(path)}>{label}</button> : <span>{label}</span>}
      </span>)}</nav>}
      {eyebrow && <span className="ar-eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {children && <div className="ar-ph-extra">{children}</div>}
    </div>
  </section>
}
