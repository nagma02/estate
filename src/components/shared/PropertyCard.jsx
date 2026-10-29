import { useState } from 'react'
import { CameraIcon, HeartIcon, PinIcon, ShieldIcon } from './Icons'

// Listing card shared by the home page rails and the listings grid.
// Favourites are kept by the parent when it passes `favorite`/`onFavorite`, otherwise locally.
export default function PropertyCard({ item, label, config = item.bhk || item.type, tags = [], price = item.price, favorite, onFavorite, onPriceInfo, onDetails, detailsLabel = 'Get More Details' }) {
  const [localFavorite, setLocalFavorite] = useState(false)
  const isFavorite = favorite ?? localFavorite
  const toggleFavorite = () => (onFavorite ? onFavorite() : setLocalFavorite(value => !value))
  const photos = item.gallery?.length || (item.image ? 1 : 0)
  const configPills = String(config || '').split('|').map(value => value.trim()).filter(Boolean)

  return <article className="ar-card ar-reveal">
    <div className="ar-card-media">
      <img src={item.image} alt={item.name} loading="lazy"/>
      {label && <span className="ar-card-label">{label}</span>}
      {item.reraApproved && <span className="ar-card-rera"><ShieldIcon width="13" height="13"/>RERA APPROVED</span>}
      <button type="button" className={`ar-card-heart${isFavorite ? ' active' : ''}`} aria-label={isFavorite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`} aria-pressed={isFavorite} onClick={toggleFavorite}><HeartIcon width="17" height="17"/></button>
      <span className="ar-card-photos"><CameraIcon width="13" height="13"/>{photos} {photos === 1 ? 'Photo' : 'Photos'}</span>
    </div>
    <div className="ar-card-body">
      <h3>{item.name}</h3>
      <p className="ar-card-place"><PinIcon width="14" height="14"/>{item.place}</p>
      {configPills.length > 0 && <div className="ar-card-config">{configPills.map(value => <span key={value}>{value}</span>)}</div>}
      {tags.length > 0 && <div className="ar-card-tags">{tags.map(value => <span key={value}>{value}</span>)}</div>}
      <div className="ar-card-foot">
        <div className="ar-card-price"><small>Price</small><strong>{price || 'Price on request'}</strong></div>
        <div className="ar-card-ctas">
          {onPriceInfo && <button type="button" className="ar-btn ar-btn-outline" onClick={onPriceInfo}>Get Price Info?</button>}
          <button type="button" className="ar-btn ar-btn-primary" onClick={onDetails}>{detailsLabel}</button>
        </div>
      </div>
    </div>
  </article>
}
