import { useEffect, useRef, useState } from 'react'

// Counts from 0 to `target` once the element scrolls into view.
export function useCountUp(target, duration = 1600) {
  const ref = useRef(null)
  const [reduced] = useState(() => Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches))
  const [value, setValue] = useState(reduced ? target : 0)
  useEffect(() => {
    const element = ref.current
    if (!element || reduced) return undefined
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1)
        setValue(Math.round(target * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(element)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [target, duration, reduced])
  return [ref, value]
}
