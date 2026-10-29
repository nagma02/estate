export default function ProjectHeader({ project, type, onEnquiry, onNavigate }) {
  return <div className="route-container detail-top">
      <div className="detail-breadcrumb"><button onClick={() => onNavigate('/')}>Home</button> / <button onClick={() => onNavigate(type === 'VILLA' ? '/villas' : type === 'PLOT' ? '/plots' : '/apartment')}>{type === 'VILLA' ? 'Villas' : type === 'PLOT' ? 'Plots' : type === 'COMMERCIAL' ? 'Commercial' : 'Apartment'}</button> / {project.name}</div>
      <div className="detail-heading"><div><h1>{project.name}</h1><p>{project.place}</p><span className="sale-chip">AVAILABLE</span><span className="type-chip">{type}</span></div><div className="detail-price"><strong>{project.price || 'Contact for price'}</strong><span>Pricing and availability on enquiry</span><button onClick={onEnquiry}>GET PRICE INFO</button></div></div>
    </div>
}
