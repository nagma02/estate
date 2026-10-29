import { listings } from '../listingsData'

export default function LatestProperties({ onNavigate }) {
  return <section className="detail-section latest-links"><h2>OUR LATEST PROPERTIES</h2><div>{listings.slice(0,3).map(item => <button key={item.name} onClick={() => onNavigate('/apartment')}><img src={item.image} alt=""/><span>{item.name}</span></button>)}</div></section>
}
