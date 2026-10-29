import PropertyCard from '../../components/shared/PropertyCard'
import { ArrowUpRightIcon, HeartIcon } from '../../components/shared/Icons'
import { openProject } from './listingsData'
import PageHero from '../../components/shared/PageHero'
import { heroImages } from '../../components/shared/heroImages'

export default function FavouritesPage({ favorites = [], onToggleFavorite, onNavigate, onEnquiry }) {
  return <div className="ar-page ar-favourites-page">
    <PageHero eyebrow="Your shortlist" title={<>Saved <em>properties</em></>} text="Keep the places you love together while you compare your options." images={heroImages.favourites} crumbs={[['Home', '/'], ['Favourites']]} onNavigate={onNavigate}>
      <span className="ar-favourites-count"><HeartIcon width="15" height="15"/>{favorites.length} saved {favorites.length === 1 ? 'property' : 'properties'}</span>
    </PageHero>
    <section className="ar-wrap ar-favourites-content">
      {favorites.length ? <div className="ar-card-grid ar-card-grid-3">{favorites.map(item => <PropertyCard key={item.name} item={item} label={item.category || item.type || 'Property'} config={item.bhk || item.type} tags={(item.amenities || []).filter(value => value !== 'More Facility').slice(0, 3)} favorite onFavorite={() => onToggleFavorite(item)} onPriceInfo={() => onEnquiry(item)} onDetails={() => openProject(item, item.category, onNavigate)}/>)}</div>
        : <div className="ar-favourites-empty"><span><HeartIcon width="30" height="30"/></span><h2>No saved properties yet</h2><p>Tap the heart on a property card to add it to your shortlist.</p><button type="button" className="ar-btn ar-btn-primary" onClick={() => onNavigate('/apartment')}>Explore properties <ArrowUpRightIcon width="15" height="15"/></button></div>}
    </section>
  </div>
}
