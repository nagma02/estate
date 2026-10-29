import cmdMayankOffice from '../../../assets/reference/cmd-mayank-office.jpg'
import { CheckIcon, MailIcon } from '../../../components/shared/Icons'

// Same profile card layout as the Our Team page.
const highlights = ['16+ Years in Real Estate', 'Residential and Commercial Properties', 'Market Dynamics and Investment Strategy', 'Property Development', 'Client Relations', 'Operational Excellence']

export default function CmdMessage() {
  return <div className="ar-wrap ar-team-list">
    <article className="ar-profile ar-reveal">
      <div className="ar-profile-media"><img src={cmdMayankOffice} alt="Mr. Mayank Shukla, CEO and Founder, in his office"/></div>
      <div className="ar-profile-body">
        <span className="ar-chip">CMD Message</span>
        <h2>Mr. Mayank Shukla</h2>
        <p className="ar-profile-role">CEO &amp; FOUNDER</p>
        <p>Welcome to <strong>Advik Estate Services OPC Private Limited.</strong> We are proud to introduce our esteemed Director, <strong>Mr. Mayank Shukla,</strong> whose vast experience and visionary leadership have been instrumental in our success and growth within the real estate industry.</p>
        <p><strong>Vision and Strategy:</strong> With over 16+ years of experience in the real estate sector, he has honed a deep understanding of market dynamics, property development, investment strategies, and client relations. Specializing in residential and commercial properties, he has led numerous high-profile projects to successful completion.</p>
        <p><strong>Mr. Mayank Shukla</strong> is committed to driving growth, innovation, and sustainable development within the real estate sector. His strategic vision focuses on delivering exceptional value to our clients and stakeholders through meticulous planning, operational excellence, and a relentless focus on client satisfaction.</p>
        <h3>Key expertise</h3>
        <ul>{highlights.map(item => <li key={item}><CheckIcon width="14" height="14"/>{item}</li>)}</ul>
        <a className="ar-btn ar-btn-outline" href="mailto:info@advikrealtor.com"><MailIcon width="16" height="16"/>info@advikrealtor.com</a>
      </div>
    </article>
  </div>
}
