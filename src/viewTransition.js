import { flushSync } from 'react-dom'

// Route changes run inside the View Transitions API: the new page opens as a circle from
// the click point, and a property card photo morphs into the detail page hero.
// Browsers without the API (or with reduced motion) simply swap the page.
const MORPH_SOURCES = '.ar-card, .ar-bento-tile, .ar-hk-home, .ar-related > button, .deal-card, .property-card, .pl-property-card, .listing-row, .latest-links button'
let morphImage = null

export const viewTransitionsOn = () => typeof document.startViewTransition === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Remember where the visitor clicked (circle origin) and which card photo may morph.
export function rememberTransitionSource(event) {
  const root = document.documentElement
  root.style.setProperty('--vt-x', `${event.clientX}px`)
  root.style.setProperty('--vt-y', `${event.clientY}px`)
  morphImage = (event.target instanceof Element && event.target.closest(MORPH_SOURCES)?.querySelector('img')) || null
}

const onScreen = image => {
  const box = image.getBoundingClientRect()
  return box.width > 0 && box.bottom > 0 && box.top < window.innerHeight
}

export function transitionRoute(update, { morph = false } = {}) {
  if (!viewTransitionsOn()) { update(); return }
  const root = document.documentElement
  const image = morph && morphImage?.isConnected && onScreen(morphImage) ? morphImage : null
  if (image) image.style.viewTransitionName = 'ar-morph'
  root.classList.add('vt-route')
  const transition = document.startViewTransition(() => {
    // Name the detail hero only after the old page is captured, so the name stays unique.
    if (image) root.classList.add('vt-morph')
    flushSync(update)
  })
  transition.finished.finally(() => {
    root.classList.remove('vt-route', 'vt-morph')
    if (image) image.style.viewTransitionName = ''
    morphImage = null
  })
}
