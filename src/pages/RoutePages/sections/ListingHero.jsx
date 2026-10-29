export default function ListingHero({ villas, plots }) {
  const category = villas ? 'Villas' : plots ? 'Plots' : 'Apartments'
  return <div className={`property-list-hero property-list-hero-${category.toLowerCase()}`}>
    <div><small>EXPLORE LUCKNOW</small><h1>RESIDENTIAL {category.toUpperCase()}</h1><i/><span>Home / {category}</span></div>
  </div>
}
