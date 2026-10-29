import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '../../../components/shared/Icons'
import arLogo from '../../../assets/advik-brand-mark.png'

const reviews = [
  { name: 'R k Gupta', text: 'All good 💯 👍', avatar: 'R', color: '#008f80' },
  { name: 'Sameer Sid', text: '👌 👌 👌 👌 👌', avatar: 'S', color: '#5969c8' },
  { name: 'Ram Singh', text: 'Good experience', avatar: 'R', color: '#465c66' },
  { name: 'Priya Sharma', text: 'Professional and helpful throughout the property search.', avatar: 'P', color: '#af6d8c' },
  { name: 'Rahul Verma', text: 'The team helped us understand our options clearly.', avatar: 'R', color: '#b78540' },
]
const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query=Advik+Estate+Services+Lucknow+reviews'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = step => setActive(current => (current + step + reviews.length) % reviews.length)

  useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => setActive(current => (current + 1) % reviews.length), 7000)
    return () => window.clearInterval(timer)
  }, [paused])

  const visibleReviews = [0, 1, 2].map(offset => reviews[(active + offset) % reviews.length])
  return <section className="ar-google-reviews-section" id="team">
    <div className="ar-google-reviews ar-reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <h2>WHAT OUR CUSTOMERS SAY</h2>
      <div className="ar-google-reviews-layout">
        <aside className="ar-google-summary">
          <span className="ar-google-brand-mark"><img src={arLogo} alt="Advik Realtor"/></span>
          <div><strong>Advik Estate Services<br/>(OPC) Private Limited</strong><span className="ar-google-stars">★★★★★</span><small>281 Google reviews</small><a href={googleReviewsUrl} target="_blank" rel="noreferrer">Write a review</a></div>
        </aside>
        <div className="ar-google-review-stage" aria-live="polite">
          <button className="ar-google-arrow prev" type="button" aria-label="Previous reviews" onClick={() => go(-1)}><ArrowLeftIcon/></button>
          <div className="ar-google-review-grid">{visibleReviews.map((review, index) => <article className="ar-google-review-card" key={`${review.name}-${active}-${index}`}>
            <header><span className="ar-google-avatar" style={{ background: review.color }}>{review.avatar}</span><span className="ar-google-review-person"><b>{review.name}</b><small>1 year ago</small></span><span className="ar-google-g" aria-label="Google">G</span></header>
            <div className="ar-google-card-stars"><span>★★★★★</span><b>✓</b></div>
            <p>{review.text}</p>
          </article>)}</div>
          <button className="ar-google-arrow next" type="button" aria-label="Next reviews" onClick={() => go(1)}><ArrowRightIcon/></button>
        </div>
      </div>
      <a className="ar-google-view-all" href={googleReviewsUrl} target="_blank" rel="noreferrer">View All Reviews <ArrowRightIcon width="16" height="16"/></a>
    </div>
  </section>
}
