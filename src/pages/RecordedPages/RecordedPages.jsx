import { useState } from 'react'
import MediaGallery from './sections/MediaGallery'
import WalkthroughList from './sections/WalkthroughList'
import WalkthroughPlayer from './sections/WalkthroughPlayer'
import PrivacyPolicyContent from './sections/PrivacyPolicyContent'
import TermsContent from './sections/TermsContent'
import CareerContactInfo from './sections/CareerContactInfo'
import CareerForm from './sections/CareerForm'
import ContactForm from './sections/ContactForm'
import ContactDetails from './sections/ContactDetails'
import arLogo from '../../assets/advik-brand-mark.png'
import PageHero from '../../components/shared/PageHero'
import { heroImages } from '../../components/shared/heroImages'
import './RecordedPages.css'

// Pages rebuilt from the recorded reference site: Media, Walkthrough videos, Policy, Career and Contact.

export function MediaPage({ onNavigate }) {
  return <div className="route-page recorded-media-page">
    <PageHero eyebrow="Advik Realtor ka karwan" title={<>Media &amp; <em>moments</em></>} text="Celebrations, recognitions and milestones from our journey in Lucknow real estate." images={heroImages.media} crumbs={[['Home', '/'], ['Media']]} onNavigate={onNavigate}/>
    <section className="media-karwaan-title"><h2>ADVIK REALTOR KA KARWAN</h2></section>
    <MediaGallery/>
  </div>
}

export function ProjectVideosPage({ onNavigate }) {
  const [activeVideo, setActiveVideo] = useState(0)
  return <div className="route-page recorded-videos-page">
    <PageHero eyebrow="Project details & walkthrough videos" title={<>Eldeco Trinity <em>Lucknow</em></>} text="Luxury 3 & 4 BHK flats — watch the walkthroughs before you visit." images={heroImages.walkthrough} crumbs={[['Home', '/'], ['Walkthrough videos']]} onNavigate={onNavigate}/>
    <section className="walkthrough-layout">
      <WalkthroughList activeVideo={activeVideo} onSelect={setActiveVideo}/>
      <WalkthroughPlayer activeVideo={activeVideo}/>
    </section>
  </div>
}

export function PolicyPage({ terms = false, onNavigate }) {
  return <article className="route-page policy-page">
    <PageHero eyebrow={terms ? 'Terms of service' : 'Data & privacy'} title={terms ? <>Terms <em>&amp; Conditions</em></> : <>Privacy <em>Policy</em></>} text="Advik Estate Services (OPC) Pvt. Ltd." images={heroImages.policy} crumbs={[['Home', '/'], [terms ? 'Terms & Conditions' : 'Privacy Policy']]} onNavigate={onNavigate}/>
    <div className="policy-layout">
      <article className="policy-copy">
        <div className="policy-document-label"><span><img src={arLogo} alt="Advik Realtor"/></span><div><b>{terms ? 'Terms of service' : 'Data & privacy'}</b><small>Advik Estate Services (OPC) Pvt. Ltd.</small></div></div>
        {terms ? <TermsContent/> : <PrivacyPolicyContent/>}
      </article>
      <aside className="policy-contact-card">
        <span className="policy-contact-icon">AR</span>
        <small>WE’RE HERE TO HELP</small>
        <h2>Questions about this {terms ? 'document' : 'policy'}?</h2>
        <p>Our team can help clarify anything you’d like to know.</p>
        <a href="mailto:info@advikrealtor.com">info@advikrealtor.com</a>
        <a href="tel:+916391063911">+91 63910 63911</a>
        <div className="policy-contact-rule"/>
        <address>1414, 14th Floor, Skyline Plaza-3,<br/>International Business Bay-1,<br/>Sushant Golf City, Lucknow 226030</address>
        <a className="policy-contact-cta" href="/contact-3">Contact our team <span>↗</span></a>
      </aside>
    </div>
  </article>
}

export function CareerPage({ onNavigate }) {
  return <div className="route-page career-page">
    <PageHero eyebrow="Careers at Advik Realtor" title={<>Build your next chapter <em>with us.</em></>} text="Bring your ideas, grow your skills, and help people find a place they can call home. Tell us a little about yourself and our team will be in touch." images={heroImages.career} crumbs={[['Home', '/'], ['Careers']]} onNavigate={onNavigate}>
      <a className="career-explore-cta" href="#career-application-form">Explore opportunities <span aria-hidden="true">↓</span></a>
    </PageHero>
    <section className="career-content"><CareerContactInfo/>
      <CareerForm/>
    </section>
  </div>
}

export function ContactPage({ onNavigate }) {
  const mapQuery = 'Skyline%20Plaza%203%20Sushant%20Golf%20City%20Lucknow'
  return <div className="ar-page ar-contact">
    <PageHero eyebrow="Get in touch" title={<>We'd love to <em>hear from you</em></>} text="Speak with a Lucknow property advisor about buying, investing or booking a site visit." images={heroImages.contact} crumbs={[['Home', '/'], ['Contact']]} onNavigate={onNavigate}/>
    <section className="ar-wrap ar-contact-grid"><ContactForm/>
      <div className="ar-contact-side">
        <ContactDetails/>
        <div className="ar-map-card ar-reveal"><iframe title="Advik Estate Services location in Lucknow" src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="ar-map-card-foot"><span><b>Skyline Plaza-3</b><small>Sushant Golf City, Lucknow</small></span><a className="ar-btn ar-btn-primary" href={`https://maps.google.com/?q=${mapQuery}`} target="_blank" rel="noreferrer">Directions</a></div></div>
      </div>
    </section>
  </div>
}
