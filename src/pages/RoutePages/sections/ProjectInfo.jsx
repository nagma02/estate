// Description, property facts and amenities for a catalog project.
export default function ProjectInfo({ project, type }) {
  return <>
      <section className="detail-section description-section"><h2>ABOUT {project.name}</h2><p>{project.name} is a {type.toLowerCase()} property in {project.place}. Explore the available configurations, property features and location information below, or contact our team for current pricing and availability.</p></section>
      <section className="detail-section"><h2>PROPERTY INFORMATION</h2><div className="project-facts"><div><small>PROPERTY TYPE</small><strong>{type}</strong></div><div><small>CONFIGURATION</small><strong>{project.bhk || 'Contact for details'}</strong></div><div><small>LOCATION</small><strong>{project.place}</strong></div><div><small>PRICE</small><strong>{project.price || 'Contact for price'}</strong></div></div></section>
      <section className="detail-section"><h2>TOP AMENITIES &amp; FEATURES</h2><div className="amenity-grid">{(project.amenities || ['Contact our team for property features']).map(item => <span key={item}>{item}</span>)}</div></section>
  </>
}
