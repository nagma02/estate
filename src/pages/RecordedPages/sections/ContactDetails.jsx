import { MailIcon, PhoneIcon, PinIcon } from '../../../components/shared/Icons'

export default function ContactDetails() {
  return <aside className="ar-office ar-reveal">
    <span className="ar-eyebrow ar-eyebrow-light">Lucknow office</span>
    <a className="ar-office-phone" href="tel:+916391063911"><PhoneIcon width="20" height="20"/>+91-63910 63911</a>
    <ul>
      <li><PinIcon/><span>Office No. 1414, 1415, 1416, 14th Floor, Skyline Plaza-3, International Business Bay – 1, Sushant Golf City, Lucknow – 226030</span></li>
      <li><MailIcon/><a href="mailto:info@advikrealtor.com">info@advikrealtor.com</a></li>
      <li><PhoneIcon/><a href="tel:18005708686">1800-570-8686 <small>Toll free</small></a></li>
    </ul>
    <h2>Social media</h2>
    <div className="ar-social">
    <a href="#facebook" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.7V13h2.7v8h3.1Z"/></svg></a>
    <a href="#instagram" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.7" cy="6.7" r="1.2"/></svg></a>
    <a href="#linkedin" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.4a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.7 10h3v10h-3zM9 10h2.9v1.4h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.6V20h-3v-5c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V20H9z"/></svg></a>
    <a href="#google" aria-label="Google"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.4 12.2c0-.7-.1-1.4-.2-2.1H12v3.8h5.3a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 2.9-4.3 2.9-7.2ZM12 21.8c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6a10 10 0 0 0 8.9 5.4ZM6.4 13.8a6 6 0 0 1 0-3.7V7.5H3.1a10 10 0 0 0 0 8.9zM12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2.2a10 10 0 0 0-8.9 5.3l3.3 2.6C7.2 7.8 9.4 6 12 6Z"/></svg></a>
    <a href="#youtube" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.2 7a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.5A3 3 0 0 0 .8 7 31 31 0 0 0 .3 12a31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 9.1.5 9.1.5s7.2 0 9.1-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.6 15.7V8.3l6.3 3.7z"/></svg></a>
  </div></aside>
}
