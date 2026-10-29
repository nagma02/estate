import { useState } from 'react'
import { ArrowUpRightIcon, CheckIcon } from '../../../components/shared/Icons'

const topics = ['Buying a home', 'Investment', 'Site visit', 'NRI services']

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [topic, setTopic] = useState(topics[0])
  const submit = event => { event.preventDefault(); setSent(true) }
  return <form className="ar-contact-form ar-reveal" onSubmit={submit}>
    <span className="ar-eyebrow">Write to us</span>
    <h2>Send us a message</h2>
    {sent ? <div className="ar-success"><span><CheckIcon/></span><b>Thank you</b>Your message has been received.</div> : <>
      <div className="ar-topic" role="group" aria-label="What is this about?">{topics.map(item => <button type="button" key={item} aria-pressed={topic === item} className={topic === item ? 'selected' : ''} onClick={() => setTopic(item)}>{item}</button>)}</div>
      <input type="hidden" name="topic" value={topic}/>
      <div className="ar-field-row">
        <label className="ar-field"><span>First name <em>*</em></span><input required name="firstName" autoComplete="given-name" placeholder="First name"/></label>
        <label className="ar-field"><span>Last name <em>*</em></span><input required name="lastName" autoComplete="family-name" placeholder="Last name"/></label>
      </div>
      <div className="ar-field-row">
        <label className="ar-field"><span>Phone <em>*</em></span><input required name="phone" type="tel" autoComplete="tel" placeholder="Your phone number"/></label>
        <label className="ar-field"><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="Your email address"/></label>
      </div>
      <label className="ar-field"><span>Comment or message</span><textarea name="message" rows="5" placeholder="How can we help?"/></label>
      <label className="ar-consent"><input type="checkbox" defaultChecked/><span>I agree to receive updates by SMS, RCS or WhatsApp. By submitting, you agree to our Terms of Service and confirm that you have read our Privacy Policy.</span></label>
      <button type="submit" className="ar-btn ar-btn-primary">Send message <ArrowUpRightIcon width="15" height="15"/></button>
    </>}
  </form>
}
