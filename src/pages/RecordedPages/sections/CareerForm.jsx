import { useState } from 'react'

export default function CareerForm() {
  const [sent, setSent] = useState(false)
  const submit = event => { event.preventDefault(); setSent(true) }
  return <form id="career-application-form" className="career-form" onSubmit={submit}><h2>UNLOCK YOUR CAREER POTENTIAL</h2>{sent ? <p className="career-success">Thank you. Your application has been received.</p> : <><div className="career-fields"><label>First Name <em>*</em><input required placeholder="First Name"/></label><label>Last Name<input placeholder="Last Name"/></label><label>Current Job Opening <em>*</em><select required defaultValue=""><option value="" disabled>Career Openings</option><option>Sales Executive</option><option>Relationship Manager</option><option>Operations</option></select></label><label>Email<input type="email" placeholder="Email"/></label><label>Current Organization Name <em>*</em><input required placeholder="Current Organization Name"/></label><label>Mobile <em>*</em><input required type="tel" placeholder="Mobile"/></label><label>Upload Resume <em>*</em><input required type="file" accept=".pdf,.doc,.docx"/></label><label>Message<textarea rows="3" placeholder="Write a short message"/></label></div><button type="submit">Submit Application</button></>}</form>
}
