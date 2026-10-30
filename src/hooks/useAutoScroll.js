import { useEffect, useRef } from 'react'

// Glides a horizontal list continuously, like a marquee, while `query` matches.
// The list must render its items twice (the copies marked `data-clone`): when the first
// copy has scrolled fully past, the position jumps back by one set, so the loop is seamless.
// Pauses on touch, hover or keyboard focus and resumes `resumeAfter` ms after the user lets go.
export function useAutoScroll({ speed = 40, resumeAfter = 4000, query = '(max-width: 767px)' } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const list = ref.current
    const media = window.matchMedia?.(query)
    if (!list || !media || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0, last = 0, position = 0, resumeTimer = 0, visible = false, held = false
    const loopWidth = () => {
      const clone = list.querySelector('[data-clone]')
      return clone ? clone.offsetLeft - list.firstElementChild.offsetLeft : 0
    }
    const tick = now => {
      const width = loopWidth()
      position += speed * Math.min(now - last, 64) / 1000
      if (width && position >= width) position -= width
      list.scrollLeft = position
      last = now
      frame = requestAnimationFrame(tick)
    }
    const sync = () => {
      cancelAnimationFrame(frame)
      const running = media.matches && visible && !held && !document.hidden
      list.classList.toggle('is-gliding', running)
      if (!running) return
      position = list.scrollLeft
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const hold = () => { held = true; clearTimeout(resumeTimer); sync() }
    const release = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { held = false; sync() }, resumeAfter) }
    const blur = event => { if (!list.contains(event.relatedTarget)) release() }
    // A manual swipe past the first set also wraps, so the strip never runs out.
    const wrap = () => { const width = loopWidth(); if (held && width && list.scrollLeft >= width) list.scrollLeft -= width }

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: 0.3 })
    io.observe(list)
    const listeners = [['touchstart', hold], ['touchend', release], ['touchcancel', release], ['mouseenter', hold], ['mouseleave', release], ['focusin', hold], ['focusout', blur], ['scroll', wrap]]
    listeners.forEach(([type, fn]) => list.addEventListener(type, fn, { passive: true }))
    media.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      cancelAnimationFrame(frame); clearTimeout(resumeTimer); io.disconnect()
      list.classList.remove('is-gliding')
      listeners.forEach(([type, fn]) => list.removeEventListener(type, fn))
      media.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [speed, resumeAfter, query])
  return ref
}
