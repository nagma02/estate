export default function AboutStats() {
  return <section className="about-stats route-container">{[['10,000+','Happy Customers'],['2,500+','Properties'],['750+','Happy Families'],['1,000+','Dream Homes']].map(([number,label]) => <article key={label}><b>{number}</b><span>{label}</span></article>)}</section>
}
