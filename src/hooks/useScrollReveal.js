import { useEffect, useRef } from 'react'
import './scrollReveal.css'

// Content blocks that fade & rise into place when they scroll into view.
// New elements (route changes, tab switches) are picked up automatically.
const TARGETS = [
  // Home
  '.section-heading', '.tabs', '.latest-tabs', '.intro-photo', '.intro-copy', '.stats > div',
  '.property-card', '.deal-card', '.looking-card', '.review-video', '.review-card', '.team-card', '.team-note',
  '.virtual-tour-card', '.center-link', '.latest-more', '.review-more', '.contact-call', '.associations-section > div > *',
  // Inner pages
  '.route-container > h1', '.route-container > h2', '.listing-row', '.team-route-card', '.floor-plans article', '.latest-links button',
  '.about-company > *', '.about-values article', '.about-stats article', '.detail-section', '.walkthrough-items > button',
  '.media-masonry > *', '.sales-team-list > *', '.operations-department', '.policy-copy', '.contact-page-form', '.contact-details',
  '.career-form', '.career-contact-info', '.pl-property-card', '.lx-pillars > div', '.lx-map-card', '.pdp-content-section',
  // Redesigned pages mark their reveal blocks explicitly
  '.ar-reveal', '.ar-google-review-card', '.ar-plan-card', '.ar-spec-grid > div', '.ar-amenities > span', '.ar-tour-chapter-head',
  '.ar-favourites-heading', '.ar-city-grid > *', '.ar-emi',
  // Virtual tour
  '.vt-intro > *', '.vt-section-heading',
  // Footer
  '.footer-info > section', '.footer-bottom',
  // Every page: headings (mask reveal), the subtitle under them and call-to-action buttons
  'main h1', 'main h2', 'main :is(h1,h2) + p', 'main .ar-btn',
].join(',')

// Headings play a clip-path mask reveal, so they may animate inside a revealing block.
const HEADING = 'h1, h2'
// Photos scale down from 1.15 inside their overflow-hidden frame.
const IMAGES = 'main img'

// Never animate overlays, fixed bottom bars, the hero carousel (it has its own entrance) or 360° viewer internals.
const EXCLUDE = '.preloader, .header, .ar-header, .hero, .modal-backdrop, .ar-modal-backdrop, .vt-canvas, .vt-stage, .ar-pd-leadbar, .ar-mobile-dock, .ar-mobile-cta'
const STAGGER = 0.1
const MAX_DELAY = 0.9

// Phones and touch tablets skip the reveal: hidden-until-revealed content shows up blank
// during fast flick scrolling, so there everything simply renders in place.
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce), (max-width: 767px), (hover: none) and (pointer: coarse)').matches

// Elements go pending → in → done. "done" strips every reveal style, so the
// element sits in its normal layout and its own hover/transition CSS applies.
function finish(element) {
  element.dataset.reveal = 'done'
  element.style.removeProperty('--reveal-delay')
}

function finishImage(image) {
  image.dataset.imgReveal = 'done'
  image.style.removeProperty('--reveal-delay')
}

// Blocks fade and rise and photos scale down (transform transitions); headings unmask (an animation).
function reveal(element, delay) {
  const isImage = element.dataset.imgReveal === 'pending'
  element.style.setProperty('--reveal-delay', `${delay}s`)
  if (isImage) element.dataset.imgReveal = 'in'
  else element.dataset.reveal = 'in'
  const done = event => {
    if (event && (event.target !== element || (event.type === 'transitionend' && event.propertyName !== 'transform'))) return
    element.removeEventListener('transitionend', done)
    element.removeEventListener('animationend', done)
    window.clearTimeout(fallback)
    if (isImage) finishImage(element)
    else finish(element)
  }
  const fallback = window.setTimeout(done, (delay + 1.4) * 1000)
  element.addEventListener('transitionend', done)
  element.addEventListener('animationend', done)
}

const isClipped = element => {
  const style = element && window.getComputedStyle(element)
  return style && [style.overflow, style.overflowX, style.overflowY].some(value => value === 'hidden' || value === 'clip')
}

export function useScrollReveal(ready) {
  const pending = useRef(new Set())
  const observer = useRef(null)

  // Mark new target elements as pending (hidden) as soon as they render, even
  // behind the splash screen, so nothing flashes before it is revealed.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const scan = () => {
      document.querySelectorAll(TARGETS).forEach(element => {
        if (element.dataset.reveal || element.closest(EXCLUDE)) return
        // A target inside another animating target would move twice (headings only unmask, so they may).
        if (!element.matches(HEADING) && element.parentElement?.closest('[data-reveal="pending"], [data-reveal="in"]')) { element.dataset.reveal = 'skip'; return }
        const style = window.getComputedStyle(element)
        if (style.position === 'fixed' || style.position === 'absolute' || style.animationName !== 'none' || style.transform !== 'none') { element.dataset.reveal = 'skip'; return }
        element.dataset.reveal = 'pending'
        if (observer.current) observer.current.observe(element)
        else pending.current.add(element)
      })
      document.querySelectorAll(IMAGES).forEach(image => {
        if (image.dataset.imgReveal || image.closest(EXCLUDE)) return
        const style = window.getComputedStyle(image)
        // Only photos whose frame hides the overflow can safely start oversized.
        if (!isClipped(image.parentElement) || style.position === 'fixed' || style.animationName !== 'none' || style.transform !== 'none') { image.dataset.imgReveal = 'skip'; return }
        image.dataset.imgReveal = 'pending'
        if (observer.current) observer.current.observe(image)
        else pending.current.add(image)
      })
    }
    let frame = 0
    const mutations = new MutationObserver(() => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(scan)
    })
    scan()
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => { mutations.disconnect(); window.cancelAnimationFrame(frame) }
  }, [])

  // Start revealing only once the page is ready (splash gone).
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined
    const queue = pending.current
    const io = new IntersectionObserver(entries => {
      // Elements entering together reveal one after another, in page order.
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        io.unobserve(entry.target)
        reveal(entry.target, Math.min(index * STAGGER, MAX_DELAY))
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    observer.current = io
    queue.forEach(element => { if (element.isConnected) io.observe(element) })
    queue.clear()
    return () => {
      io.disconnect()
      observer.current = null
      // Anything still hidden waits for the next ready page.
      document.querySelectorAll('[data-reveal="pending"], [data-img-reveal="pending"]').forEach(element => queue.add(element))
    }
  }, [ready])
}
