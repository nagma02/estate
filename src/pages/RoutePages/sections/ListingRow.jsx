import { projectSlug } from '../listingsData'

export default function ListingRow({ item, onEnquiry, onNavigate }) {
  return <article className="listing-row">
        <div className="listing-photo"><img src={item.image} alt={item.name}/><span>FLAT | RERA APPROVED</span></div>
        <div className="listing-main"><h2>{item.name}</h2><p className="listing-location">{item.place}</p><div className="listing-features">{(item.amenities || ['Swimming Pool','ATM','24×7 Security','More Facility']).map(amenity => <span key={amenity}>{amenity}</span>)}</div></div>
        <div className="listing-actions"><button onClick={onEnquiry}>Get Price Info?</button><button className="secondary" onClick={() => onNavigate(`/property/${projectSlug(item.name)}`)}>Get More Details</button><span className="listing-bhk">{item.bhk}</span></div>
      </article>
}
