import { ChatIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons'

export default function AssistWidget({ onEnquiry }) {
  return <>
    {/* Phones get a sticky WhatsApp / Enquire bar instead of the floating buttons (see design.css). */}
    <div className="ar-mobile-cta" role="region" aria-label="Quick contact">
      <a className="ar-mobile-cta-whatsapp" href="https://wa.me/916306303011" target="_blank" rel="noreferrer"><WhatsAppIcon width="20" height="20"/>WhatsApp</a>
      <button type="button" className="ar-mobile-cta-enquire" onClick={() => onEnquiry()}><MailIcon width="19" height="19"/>Enquire Now</button>
    </div>
    <div className="ar-assist ar-call-assist"><a className="ar-assist-trigger" href="tel:18005708686" aria-label="Call toll free 1800-570-8686"><PhoneIcon width="22" height="22"/></a></div>
    <div className="ar-assist"><button className="ar-assist-trigger" aria-label="Need assistance" onClick={() => onEnquiry()}><ChatIcon width="22" height="22"/></button><div className="ar-assist-pop"><b>Need assistance?</b><a href="tel:+916306303011">Call consultant</a><button onClick={() => onEnquiry()}>Send an enquiry</button><a href="https://wa.me/916306303011">Chat on WhatsApp</a></div></div>
  </>
}
