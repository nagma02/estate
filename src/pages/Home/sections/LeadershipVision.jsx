import cmdMayankOffice from '../../../assets/reference/cmd-mayank-office.jpg'
import { ArrowUpRightIcon, CheckIcon } from '../../../components/shared/Icons'

// Summarises the CMD message page; the full text lives at /cmd-message.
const strengths = ['16+ years in real estate', 'Residential & commercial', 'Investment strategy']

export default function LeadershipVision({ onNavigate }) {
  return <section className="ar-section ar-section-pearl" id="leadership"><div className="ar-wrap">
    <article className="ar-vision ar-reveal">
      <span className="ar-vision-flare one" aria-hidden="true"/>
      <span className="ar-vision-flare two" aria-hidden="true"/>
      <figure className="ar-vision-photo"><img src={cmdMayankOffice} alt="Mr. Mayank Shukla, CEO and Founder, in his office" loading="lazy"/></figure>
      <div className="ar-vision-copy">
        <span className="ar-eyebrow">Leadership vision</span>
        <h2>Delivering exceptional value through <em>meticulous planning</em> and a relentless focus on client satisfaction.</h2>
        <p>With over 16 years in Lucknow real estate, our founder has led residential and commercial projects to completion — and built Advik around growth, innovation and sustainable development.</p>
        <ul>{strengths.map(item => <li key={item}><CheckIcon width="14" height="14"/>{item}</li>)}</ul>
        <footer><span><b>Mr. Mayank Shukla</b><small>CEO &amp; Founder</small></span><button type="button" className="ar-btn ar-btn-gold" onClick={() => onNavigate('/cmd-message')}>Read the CMD message <ArrowUpRightIcon width="15" height="15"/></button></footer>
      </div>
    </article>
  </div></section>
}
