import { useState } from 'react'

export default function CallbackForm({ rishita }) {
  const [sent, setSent] = useState(false)
  const submit = event => { event.preventDefault(); setSent(true) }
  return <aside className="callback-card"><h2>GET A CALLBACK</h2>{sent ? <div className="callback-success">Thank you. We’ll contact you shortly.</div> : <form onSubmit={submit}>{rishita && <strong>Name <em>*</em></strong>}<div className={rishita ? 'callback-name-pair' : undefined}><input required placeholder={rishita ? 'First' : 'Your Name'}/>{rishita && <input required placeholder="Last"/>}</div>{rishita && <strong>Phone <em>*</em></strong>}<input required type="tel" placeholder="Mobile Number"/>{rishita && <strong>Email</strong>}<input type="email" placeholder="Email Address"/>{rishita && <strong>Comment or Message</strong>}<textarea placeholder="Message" rows="3"/><label><input type="checkbox" required/> {rishita ? 'I hereby authorize to send notifications on SMS/RCS/WhatsApp Messages (Promotional / informational messages). By clicking Sign Up, you agree to our Terms of Service and that you have read our Privacy Policy.' : 'I agree to be contacted about my enquiry.'}</label><button>{rishita ? 'Submit' : 'SUBMIT'}</button></form>}</aside>
}
