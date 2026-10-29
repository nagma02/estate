import { useEffect, useRef, useState } from 'react'
import reraQr from '../../../assets/reference/rera-qr.jpg'
import { slides } from '../homeData'
import LeadForm from './LeadForm'

export default function HeroSlider({ slide, setSlide, leadOpen, leadCardRef, sent, onEnquirySubmit, onLeadContinue }) {
  const [previousHeroImage, setPreviousHeroImage] = useState(null)
  const active = slides[slide]
  const heroImage = active.image
  const heroImageRef = useRef(heroImage)

  useEffect(() => {
    const rotation = window.setInterval(() => setSlide(current => (current + 1) % slides.length), 5000)
    return () => window.clearInterval(rotation)
  }, [setSlide])

  useEffect(() => {
    if (heroImageRef.current === heroImage) return undefined
    setPreviousHeroImage(heroImageRef.current)
    heroImageRef.current = heroImage
    const clearPrevious = window.setTimeout(() => setPreviousHeroImage(null), 900)
    return () => window.clearTimeout(clearPrevious)
  }, [heroImage])

  const changeSlide = (step) => setSlide((slide + step + slides.length) % slides.length)

  return <section className="hero" id="home">
        {previousHeroImage && <img className="hero-image hero-image-previous" src={previousHeroImage} alt="" aria-hidden="true"/>}
        <img className="hero-image visible" key={`${slide}-${leadOpen}`} src={heroImage} alt="" aria-hidden="true"/>
        <div className={`hero-shade${leadOpen ? ' modal-dim' : ''}`}/>
        <div className="rera"><span className="rera-copy">Project Rera Number<strong>{active.rera}</strong><small>https://www.up-rera.in</small></span><img src={reraQr} alt={`RERA verification QR code for ${active.name}`}/></div>
        <div className="hero-content entering" key={`copy-${slide}`}>
          <span className="hero-kicker">{active.kicker}</span>
          <h1>{active.name}</h1>
          <p>{active.subtitle}</p>
          <a className="gold-button hero-discover" href="#properties">DISCOVER MORE <span>↗</span></a>
        </div>
        <button className="slide-arrow prev" onClick={() => changeSlide(-1)} aria-label="Previous slide">‹</button><button className="slide-arrow next" onClick={() => changeSlide(1)} aria-label="Next slide">›</button>
        <div className="slide-dots">{slides.map((s, i) => <button key={s.name} aria-label={`Show ${s.name}`} className={i === slide ? 'selected' : ''} onClick={() => setSlide(i)}/>)}</div>
        {leadOpen && <LeadForm formRef={leadCardRef} sent={sent} onSubmit={onEnquirySubmit} onContinue={onLeadContinue}/>}
        <div className="hero-label"><span>{String(slide + 1).padStart(2, '0')}</span><i/> {String(slides.length).padStart(2, '0')}</div>
      </section>
}
