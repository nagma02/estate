import { useEffect, useRef, useState } from 'react'
import arLogo from '../../assets/advik-brand-mark.png'
import { ArrowUpRightIcon, BlogIcon, BuildingIcon, ChatIcon, ChevronIcon, CloseIcon, MailIcon, OrbitIcon, PhoneIcon, PlotIcon, ShieldIcon, SparkIcon, StoreIcon, VillaIcon } from '../shared/Icons'

// Slide-out drawer opened from the header's menu button. Every existing page is reachable here.
// Property types open straight from tiles; the rest is grouped under small labels.
const collections = [
  { label: 'Apartments', href: '/apartment', icon: BuildingIcon },
  { label: 'Villas', href: '/villas', icon: VillaIcon },
  { label: 'Plots', href: '/plots', icon: PlotIcon },
  { label: 'Commercial', href: '/commercial', icon: StoreIcon },
]
const groups = [
  { title: 'Company', items: [
    { label: 'About Us', icon: ShieldIcon, children: [{ label: 'About Company', href: '/about' }, { label: 'CMD Message', href: '/cmd-message' }, { label: 'Our Team', href: '/operations' }, { label: 'Sales Team', href: '/sales' }] },
    { label: 'Careers', icon: SparkIcon, children: [{ label: 'Explore Careers', href: '/career' }] },
    { label: 'Contact', icon: ChatIcon, children: [{ label: 'Contact Us', href: '/contact-3' }, { label: 'Call 1800-570-8686', href: 'tel:18005708686' }, { label: 'Email Advik', href: 'mailto:info@advikrealtor.com' }] },
  ] },
  { title: 'Resources', items: [
    { label: 'Blogs & Media', icon: BlogIcon, children: [{ label: 'Advik Ka Karwan', href: '/media' }, { label: 'Project Details & Walkthrough', href: '/project-details' }] },
    { label: 'Research / Virtual Tour', icon: OrbitIcon, href: '/virtual-tour' },
  ] },
]

export default function Navbar({ open, pathname, onClose, onNavigate, returnFocusRef }) {
  const [expanded, setExpanded] = useState('')
  const drawerRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const returnFocus = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      // Keep keyboard focus inside the open drawer.
      const focusable = drawerRef.current.querySelectorAll('a[href], button, input, select')
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocus?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocusRef])

  const go = href => event => { event.preventDefault(); onClose(); onNavigate(href) }
  const pageLink = (item, label = item.label) => <a href={item.href} onClick={/^(tel:|mailto:|https?:)/.test(item.href) ? undefined : go(item.href)} aria-current={pathname === item.href ? 'page' : undefined}>{label}<ArrowUpRightIcon width="14" height="14"/></a>
  const itemLabel = item => <span className="ar-drawer-label"><span className="ar-drawer-icon"><item.icon width="17" height="17"/></span>{item.label}</span>

  const renderItem = item => {
    if (item.href) return <li key={item.label}>{pageLink(item, itemLabel(item))}</li>
    const isOpen = expanded === item.label
    const panelId = `drawer-${item.label.replace(/[^a-z]+/gi, '-').toLowerCase()}`
    return <li key={item.label}>
      <button type="button" className="ar-drawer-toggle" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setExpanded(isOpen ? '' : item.label)}>{itemLabel(item)}<ChevronIcon/></button>
      <div className={`ar-drawer-sub${isOpen ? ' open' : ''}`} id={panelId}><div>
        <ul>{item.children.map(child => <li key={child.label}>{pageLink(child)}</li>)}</ul>
      </div></div>
    </li>
  }

  return <div className={`ar-drawer-root${open ? ' open' : ''}`}>
    <div className="ar-drawer-backdrop" onClick={onClose}/>
    <aside className="ar-drawer" id="site-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}>
      <div className="ar-drawer-head"><span className="ar-logo-mark"><img src={arLogo} alt="" width="34" height="34"/></span><div><small>ADVIK REALTOR</small><h2>Explore <em>Lucknow</em></h2></div><button type="button" className="ar-drawer-close" ref={closeRef} aria-label="Close menu" onClick={onClose}><CloseIcon width="18" height="18"/></button></div>
      <nav aria-label="Site">
        <p className="ar-drawer-title">Browse properties</p>
        <ul className="ar-drawer-tiles">{collections.map(item => <li key={item.href}><a href={item.href} onClick={go(item.href)} aria-current={pathname === item.href ? 'page' : undefined}><span className="ar-drawer-icon"><item.icon width="20" height="20"/></span>{item.label}</a></li>)}</ul>
        {groups.map(group => <div className="ar-drawer-section" key={group.title}><p className="ar-drawer-title">{group.title}</p><ul className="ar-drawer-group">{group.items.map(renderItem)}</ul></div>)}
      </nav>
      <div className="ar-drawer-help">
        <h3>Need any help?</h3>
        <p>Talk to a Lucknow property advisor — free, no obligation.</p>
        <a className="ar-drawer-call" href="tel:18005708686"><PhoneIcon width="17" height="17"/> Call 1800-570-8686</a>
        <a href="tel:+916306303011"><PhoneIcon/> +91-63063-03011</a>
        <a href="mailto:support@advikrealtor.com"><MailIcon/> support@advikrealtor.com</a>
      </div>
    </aside>
  </div>
}
