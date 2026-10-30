import { useEffect, useState } from 'react'

// Pointer-driven polish for mouse users: a gold spotlight that follows the cursor across
// cards, magnetic gold buttons, and a trailing gold cursor ring. Styles live in experience.css.
const SPOTLIGHT = '.ar-service, .ar-card, .ar-tour-card, .ar-pd-section, .ar-pillar, .ar-home-benefit, .ar-detail-section, .ar-emi-calc'
const MAGNETIC = '.ar-btn-gold, .ar-search-submit, .ar-assist-trigger, .ar-tollfree-icon, .ar-pd-heart, .ar-menu-button'
const INTERACTIVE = 'a, button, [role="tab"], label, select, summary'
const PULL = 0.28
const MAX_PULL = 10

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const finePointer = () => Boolean(window.matchMedia?.(FINE_POINTER).matches) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useExperience() {
  const [enabled, setEnabled] = useState(finePointer)
  // Re-check when the input type changes (DevTools device mode, a tablet docked to a keyboard…),
  // so the ring never lingers on a touch screen.
  useEffect(() => {
    const query = window.matchMedia?.(FINE_POINTER)
    if (!query) return undefined
    const update = () => setEnabled(finePointer())
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const ring = document.createElement('div')
    ring.className = 'ar-cursor'
    ring.setAttribute('aria-hidden', 'true')
    document.body.append(ring)
    document.documentElement.classList.add('has-cursor-ring')

    let magnet = null
    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let frame = 0

    // The ring eases toward the pointer and stops animating once it has caught up.
    const follow = () => {
      current.x += (target.x - current.x) * 0.22
      current.y += (target.y - current.y) * 0.22
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.3 ? requestAnimationFrame(follow) : 0
    }

    const release = element => {
      const from = element.style.translate || '0px 0px'
      element.style.translate = ''
      element.animate([{ translate: from }, { translate: '0px 0px' }], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)' })
    }

    const move = event => {
      target.x = event.clientX
      target.y = event.clientY
      if (!frame) frame = requestAnimationFrame(follow)
      const element = event.target instanceof Element ? event.target : null
      ring.classList.toggle('is-active', Boolean(element?.closest(INTERACTIVE)))
      ring.classList.add('is-visible')

      const card = element?.closest(SPOTLIGHT)
      if (card) {
        const box = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - box.left}px`)
        card.style.setProperty('--my', `${event.clientY - box.top}px`)
      }

      const next = element?.closest(MAGNETIC) || null
      if (magnet && magnet !== next) release(magnet)
      magnet = next
      if (magnet) {
        const box = magnet.getBoundingClientRect()
        const clamp = value => Math.max(-MAX_PULL, Math.min(MAX_PULL, value))
        magnet.style.translate = `${clamp((event.clientX - box.left - box.width / 2) * PULL)}px ${clamp((event.clientY - box.top - box.height / 2) * PULL)}px`
      }
    }
    const press = () => ring.classList.add('is-pressed')
    const lift = () => ring.classList.remove('is-pressed')
    const leave = () => { ring.classList.remove('is-visible'); if (magnet) { release(magnet); magnet = null } }

    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerdown', press, { passive: true })
    document.addEventListener('pointerup', lift, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerdown', press)
      document.removeEventListener('pointerup', lift)
      document.documentElement.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(frame)
      if (magnet) magnet.style.translate = ''
      ring.remove()
      document.documentElement.classList.remove('has-cursor-ring')
    }
  }, [enabled])
}
