import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import AssistWidget from './components/shared/AssistWidget'
import EnquiryModal from './components/shared/EnquiryModal'
import { RoutePage } from './pages/RoutePages/RoutePages'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useExperience } from './hooks/useExperience'
import { rememberTransitionSource, transitionRoute, viewTransitionsOn } from './viewTransition'
// Home styles load before the shared theme and page-specific polish layer.
import Home from './pages/Home/Home'
import './theme.css'
import './pageRefinements.css'
import './design.css'
import './motion.css'
import './experience.css'

// Switching between these listing tabs keeps the page still instead of replaying the page entrance.
const listingRoutes = ['/apartment', '/villas', '/plots', '/commercial']
const isListingSwitch = (from, to) => listingRoutes.includes(from) && listingRoutes.includes(to)

function App() {
  // Home page state lives here so the slide, category and lead popup survive route changes.
  const [slide, setSlide] = useState(0)
  const [latestCategory, setLatestCategory] = useState('APARTMENTS')
  const [modal, setModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [leadOpen, setLeadOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [pathname, setPathname] = useState(() => window.location.pathname || '/')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('advik-favorites') || '[]') }
    catch { return [] }
  })
  const leadCardRef = useRef(null)
  const [staticPage, setStaticPage] = useState(false)
  const pathRef = useRef(pathname)
  useEffect(() => { pathRef.current = pathname }, [pathname])
  useScrollReveal(true)
  useExperience()
  useEffect(() => {
    document.addEventListener('pointerdown', rememberTransitionSource, true)
    return () => document.removeEventListener('pointerdown', rememberTransitionSource, true)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('advik-favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = item => setFavorites(current => {
    const key = item.name.trim().toLowerCase()
    return current.some(saved => saved.name.trim().toLowerCase() === key)
      ? current.filter(saved => saved.name.trim().toLowerCase() !== key)
      : [...current, item]
  })

  const changeRoute = (path, hash = '') => {
    const next = `${path}${hash}`
    if (path === pathname && !hash) { setMenuOpen(false); return }
    window.history.pushState({}, '', next)
    const keepPlace = !hash && isListingSwitch(pathname, path)
    const swap = () => {
      // The view transition is the page entrance, so skip the CSS one.
      setStaticPage(keepPlace ? 'static' : viewTransitionsOn() ? 'vt' : false)
      setPathname(path)
      setMenuOpen(false)
      setLeadOpen(false)
      if (!keepPlace) window.scrollTo({ top: 0, behavior: 'instant' })
    }
    // Listing tab switches stay still; every other page change plays the view transition.
    if (keepPlace) swap()
    else transitionRoute(swap, { morph: path.startsWith('/property/') })
    // Wait for the new page to render before scrolling to a section on it.
    if (hash) window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  const navigate = target => {
    // Drop focus from the clicked link so it doesn't stay highlighted on the new page.
    document.activeElement?.blur?.()
    if (target.startsWith('#')) {
      if (pathname === '/') {
        setMenuOpen(false)
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      } else changeRoute('/', target)
    } else changeRoute(target)
  }

  useEffect(() => {
    const pop = () => {
      const nextPath = window.location.pathname || '/'
      const keepPlace = isListingSwitch(pathRef.current, nextPath)
      const swap = () => {
        setStaticPage(keepPlace ? 'static' : viewTransitionsOn() ? 'vt' : false)
        setPathname(nextPath)
        setLeadOpen(false)
        setMenuOpen(false)
        if (!keepPlace) window.scrollTo({ top: 0, behavior: 'instant' })
      }
      if (keepPlace) swap()
      else transitionRoute(swap)
    }
    window.addEventListener('popstate', pop)
    return () => window.removeEventListener('popstate', pop)
  }, [])

  useEffect(() => {
    if (!leadOpen) return undefined
    const closeOnOutsideClick = (event) => {
      if (!leadCardRef.current?.contains(event.target)) setLeadOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [leadOpen])

  const enquiry = (e) => { e.preventDefault(); setSent(true) }
  const openEnquiry = project => { setSelectedProject(project || null); setSent(false); setModal(true) }
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return <>
    <div className="ar-scroll-progress" aria-hidden="true"/>
    <Header pathname={pathname} menuOpen={menuOpen} favoritesCount={favorites.length} onOpenMenu={() => setMenuOpen(true)} onCloseMenu={closeMenu} onNavigate={navigate}/>

    {/* Keyed by path so each page plays its entrance animation when opened. */}
    <main className={staticPage === 'static' ? 'page-static' : staticPage === 'vt' ? 'page-vt' : 'page-transition'} key={pathname}>{pathname === '/'
      ? <Home slide={slide} setSlide={setSlide} latestCategory={latestCategory} setLatestCategory={setLatestCategory} leadOpen={leadOpen} leadCardRef={leadCardRef} sent={sent} favorites={favorites} onToggleFavorite={toggleFavorite} onEnquirySubmit={enquiry} onLeadContinue={() => { setSent(false); setLeadOpen(false) }} onEnquiry={openEnquiry} onNavigate={navigate}/>
      : <RoutePage pathname={pathname} favorites={favorites} onToggleFavorite={toggleFavorite} onEnquiry={openEnquiry} onNavigate={navigate}/>}
    </main>

    <Footer/>
    <AssistWidget onEnquiry={openEnquiry}/>
    {modal && <EnquiryModal project={selectedProject} sent={sent} onSubmit={enquiry} onClose={() => { setModal(false); setSent(false); setSelectedProject(null) }}/>}
  </>
}

export default App
