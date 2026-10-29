import { useEffect, useRef, useState } from 'react'
import arLogo from '../../assets/advik-brand-mark.png'
import HeaderSearch from '../shared/HeaderSearch'
import { searchLocalities } from '../shared/propertySearch'
import { BlogIcon, ChevronIcon, CloseIcon, HeartIcon, MenuIcon, PhoneIcon, PinIcon } from '../shared/Icons'
import Navbar from './Navbar'

// City is fixed to Lucknow; picking a locality fills the property search with it.
function LocationSelector({ onPickLocality }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const close = event => { if (!boxRef.current?.contains(event.target)) setOpen(false) }
    const escape = event => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) }
  }, [open])

  return <div className="ar-city" ref={boxRef}>
    <button type="button" className="ar-city-button" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(current => !current)}><PinIcon width="16" height="16"/>Lucknow<ChevronIcon width="15" height="15"/></button>
    {open && <div className="ar-city-menu">
      <small>CITY</small>
      <button type="button" className="current" onClick={() => setOpen(false)}><PinIcon/> Lucknow, Uttar Pradesh</button>
      <small>POPULAR LOCALITIES</small>
      <div className="ar-city-grid">{searchLocalities.map(locality => <button type="button" key={locality} onClick={() => { setOpen(false); onPickLocality(locality) }}>{locality}</button>)}</div>
    </div>}
  </div>
}

export default function Header({ pathname, menuOpen, favoritesCount = 0, onOpenMenu, onCloseMenu, onNavigate }) {
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef(null)
  const menuButtonRef = useRef(null)
  const link = href => event => { event.preventDefault(); onNavigate(href) }

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <>
    <header className={`ar-header${scrolled ? ' is-scrolled' : ''}`}><div className="ar-header-inner">
      <a className="ar-logo" href="/" onClick={link('/')} aria-label="Advik Realtor home">
        <span className="ar-logo-mark"><img src={arLogo} alt="" width="40" height="40"/></span>
        <span className="ar-logo-type"><b>ADVIK</b><small>Realtor</small></span>
      </a>
      <LocationSelector onPickLocality={locality => { setQuery(locality); searchRef.current?.focus() }}/>
      <HeaderSearch query={query} setQuery={setQuery} onNavigate={onNavigate} inputRef={searchRef}/>
      <div className="ar-header-actions">
        <a className="ar-tollfree" href="tel:18005708686" aria-label="Call toll free 1800-570-8686"><span className="ar-tollfree-icon"><PhoneIcon width="16" height="16"/></span><span className="ar-tollfree-text"><small>Toll free</small><b>1800-570-8686</b></span></a>
        <a className={`ar-icon-link${pathname === '/media' ? ' active' : ''}`} href="/media" onClick={link('/media')}><BlogIcon/><span>Blog</span></a>
        <a className="ar-icon-link ar-favourites-link" href="/favourites" onClick={link('/favourites')} aria-label={`Favourites${favoritesCount ? `, ${favoritesCount} saved` : ''}`}><span className="ar-favourites-heart"><HeartIcon/>{favoritesCount > 0 && <b>{favoritesCount}</b>}</span><span>Favourites</span></a>
        <button type="button" className="ar-menu-button" ref={menuButtonRef} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="site-drawer" onClick={menuOpen ? onCloseMenu : onOpenMenu}>{menuOpen ? <CloseIcon width="21" height="21"/> : <MenuIcon width="22" height="22"/>}</button>
      </div>
    </div></header>
    <Navbar open={menuOpen} pathname={pathname} onClose={onCloseMenu} onNavigate={onNavigate} returnFocusRef={menuButtonRef}/>
  </>
}
