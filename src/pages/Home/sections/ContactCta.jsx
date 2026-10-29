import { ArrowUpRightIcon, PhoneIcon } from '../../../components/shared/Icons'

export default function ContactCta({ onEnquiry }) {
  return <section className="ar-section ar-section-tight" id="contact"><div className="ar-wrap">
    <div className="ar-cta-band ar-reveal">
      <div><span className="ar-eyebrow ar-eyebrow-light">Let's talk</span><h2>Let's find you the place <em>you deserve.</em></h2><p>Advik Estate Services OPC Private Limited is committed to making homeownership easy for you.</p></div>
      <div className="ar-cta-actions"><button type="button" className="ar-btn ar-btn-gold" onClick={() => onEnquiry()}>Contact us <ArrowUpRightIcon width="15" height="15"/></button><a className="ar-btn ar-btn-ghost" href="tel:18005708686"><PhoneIcon width="15" height="15"/>1800-570-8686</a></div>
    </div>
  </div></section>
}
