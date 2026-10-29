import { useEffect, useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/shared/Icons'

// Horizontal scroll-snap rail with prev/next arrows that disable at either end.
export default function ScrollCarousel({ label, className = '', children }) {
  const railRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return undefined
    const update = () => setEdges({ start: rail.scrollLeft <= 2, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 })
    update()
    rail.addEventListener('scroll', update, { passive: true })
    const resize = new ResizeObserver(update)
    resize.observe(rail)
    return () => { rail.removeEventListener('scroll', update); resize.disconnect() }
  }, [])
  const move = direction => railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.8, behavior: 'smooth' })
  return <div className={`ar-pd-carousel ${className}`}>
    <button type="button" className="ar-pd-arrow prev" aria-label={`Previous ${label}`} disabled={edges.start} onClick={() => move(-1)}><ArrowLeftIcon/></button>
    <ul className="ar-pd-rail" ref={railRef} aria-label={label}>{children}</ul>
    <button type="button" className="ar-pd-arrow next" aria-label={`Next ${label}`} disabled={edges.end} onClick={() => move(1)}><ArrowRightIcon/></button>
  </div>
}
