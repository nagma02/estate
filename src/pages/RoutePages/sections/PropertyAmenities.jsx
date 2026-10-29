// Features & specifications (Rishita only) and the top amenities list.
export default function PropertyAmenities({ rishita }) {
  return <>
      {rishita && <section className="detail-section feature-specs"><h2>FEATURES &amp; SPECIFICATIONS</h2><div>{['Lush Green Parks with Jogging Tracks / Fountains / Water Bodies','Wi-Fi enabled Campus','Supermart for daily needs','Sporting amenities: swimming pool, cricket pitch, tennis court, gym and yoga center'].map(item => <span key={item}>✦　{item}</span>)}</div></section>}
      <section className="detail-section"><h2>TOP AMENITIES</h2>{rishita && <p>Rishita Manhattan Lucknow presents an exclusive opportunity to own a stunning home that offers all kinds of amenities and facilities.</p>}<div className="amenity-grid">{(rishita ? ['Swimming Pool','Grocery Shop','Amphitheatre','Club House','Park / Green Area','Visitor Parking','Shopping Centre','Jogging Track'] : ['Car parking','ATM','CCTV Camera','Lift','Power Backup','Gymnasium','24×7 Security']).map(item => <span key={item}>{item}</span>)}</div></section>
  </>
}
