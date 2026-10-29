import arLogo from '../../assets/advik-brand-mark.png'
import upgradeLogo from '../../assets/upgrade-logo.png'
import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from '../shared/Icons'

const explore = [['Apartments', '/apartment'], ['Villas', '/villas'], ['Plots', '/plots'], ['Commercial', '/commercial'], ['Virtual Tour', '/virtual-tour']]
const company = [['About Us', '/about'], ['Our Team', '/operations'], ['Careers', '/career'], ['News & Media', '/media'], ['Contact', '/contact-3']]

export default function Footer() {
  return <footer className="ar-footer">
    <div className="ar-footer-inner">
      <div className="ar-footer-cta">
        <div><small>START YOUR SEARCH</small><h2>Find a place to call <em>home.</em></h2></div>
      </div>
      <div className="ar-footer-grid">
        <section className="ar-footer-brand">
          <a className="ar-logo" href="/" aria-label="Advik Realtor home"><span className="ar-logo-mark"><img src={arLogo} alt="" width="40" height="40"/></span><span className="ar-logo-type"><b>ADVIK</b><small>Realtor</small></span></a>
          <p>Advik Realtor helps people explore residential and commercial properties in Lucknow with thoughtful guidance at every step.</p>
        </section>
        <nav aria-label="Explore Advik"><h3>Explore</h3>{explore.map(([label, href]) => <a key={href} href={href}>{label}<ArrowUpRightIcon width="13" height="13"/></a>)}</nav>
        <nav aria-label="Company links"><h3>Company</h3>{company.map(([label, href]) => <a key={href} href={href}>{label}<ArrowUpRightIcon width="13" height="13"/></a>)}</nav>
        <section className="ar-footer-contact">
          <h3>Get in touch</h3>
          <a href="tel:18005708686"><PhoneIcon width="15" height="15"/><span><small>Call us</small>1800-570-8686</span></a>
          <a href="tel:+916391063911"><PhoneIcon width="15" height="15"/><span><small>Sales</small>+91-63910 63911</span></a>
          <a href="mailto:info@advikrealtor.com"><MailIcon width="15" height="15"/><span><small>Email</small>info@advikrealtor.com</span></a>
          <p><PinIcon width="15" height="15"/><span>Skyline Plaza-3, Sushant Golf City,<br/>Lucknow, Uttar Pradesh 226030</span></p>
        </section>
      </div>
      <div className="ar-footer-bottom">
        <span>© 2026 Advik Estate Services (OPC) Private Limited</span>
        <div className="ar-footer-legal"><nav aria-label="Legal information"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-conditions">Terms &amp; Conditions</a></nav><span className="ar-footer-credit"><span className="ar-footer-powered">Powered by</span><img className="ar-footer-partner-logo" src={upgradeLogo} alt="Upgrade"/></span></div>
      </div>
    </div>
  </footer>
}
