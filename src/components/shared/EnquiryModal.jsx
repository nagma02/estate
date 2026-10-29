import { useEffect } from 'react'
import { CheckIcon, CloseIcon } from './Icons'

export default function EnquiryModal({ project, sent, onSubmit, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = event => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return <div className="ar-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="ar-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button type="button" className="ar-modal-close" aria-label="Close enquiry" onClick={onClose}><CloseIcon width="18" height="18"/></button>
      <small className="ar-eyebrow">ADVIK ESTATE SERVICES</small>
      <h2 id="contact-modal-title">Get in touch</h2>
      <p>Please fill in your details below and we will get in touch with you shortly.</p>
      {project && <div className="ar-modal-project"><img src={project.image} alt={project.name}/><span><small>I am interested in</small>{project.name}</span></div>}
      {sent ? <div className="ar-success" role="status"><span><CheckIcon/></span><b>Thank you</b>Your enquiry has been received.</div> : <form className="ar-form" onSubmit={onSubmit}>
        {!project && <h3>I AM INTERESTED IN</h3>}
        <input type="hidden" name="property" value={project?.name || ''}/>
        <label className="ar-field"><span>Name</span><input id="contact-modal-name" name="name" required placeholder="Your name" autoComplete="name"/></label>
        <label className="ar-field"><span>Phone</span><span className="ar-phone"><select aria-label="Country code" defaultValue="+91"><option value="+91">+91 India</option></select><input id="contact-modal-phone" name="phone" type="tel" required placeholder="Phone number" autoComplete="tel"/></span></label>
        <label className="ar-field"><span>Email</span><input id="contact-modal-email" name="email" type="email" required placeholder="Email address" autoComplete="email"/></label>
        <label className="ar-consent"><input type="checkbox" required defaultChecked/><span>I agree to Advik Estate's <a href="/terms-conditions">T&amp;C</a> &amp; <a href="/privacy-policy">Privacy Policy</a>.</span></label>
        <button type="submit" className="ar-btn ar-btn-primary ar-btn-block">Get a Call</button>
      </form>}
    </section>
  </div>
}
