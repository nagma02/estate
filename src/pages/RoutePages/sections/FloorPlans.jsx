export default function FloorPlans({ rishita, onEnquiry }) {
  const plans = rishita ? [
    {type:'2 BHK APARTMENT',area:'1085 – 1099 sq.ft.',beds:'2 Beds | 2 Bath',price:'₹ 70.53 – 81.03 L'},
    {type:'3 BHK APARTMENT',area:'1375 – 1900 sq.ft.',beds:'3 Beds | 3 Bath',price:'₹ 89.38 L – 1.4 Cr'},
    {type:'4 BHK APARTMENT',area:'2460 – 2745 sq.ft.',beds:'4 Beds | 4 Bath',price:'₹ 1.6 – 2.02 Cr'},
  ] : [
    {type:'1 BHK APARTMENT',area:'705 sq.ft.',beds:'2 Beds | 1 Bath',price:'₹ 28 Lac'},
    {type:'2 BHK APARTMENT',area:'1245 sq.ft.',beds:'2 Beds | 2 Bath',price:'₹ 49 Lac'},
  ]
  return <section className="detail-section" id="floor-plans"><h2>FLATS - {rishita ? '2, 3, 4' : '1, 2'} BHK APARTMENT</h2><div className="floor-plans">{plans.map(plan => <article key={plan.type}><h3>{plan.type}</h3><p>Super Built-up Area</p><p>{plan.beds} | {plan.area}</p><strong>Sell Price : {plan.price} + Govt. Charges</strong><button onClick={onEnquiry}>Get Price Info?</button></article>)}</div></section>
}
