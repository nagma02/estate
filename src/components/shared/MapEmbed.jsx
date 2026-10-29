// Google Maps embed used by the property detail pages.
export default function MapEmbed({ title, query }) {
  return <iframe className="detail-map" title={title} src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`} loading="lazy"/>
}
