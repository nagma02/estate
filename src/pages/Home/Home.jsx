import HomeSearchHero from './sections/HomeSearchHero'
import UpdatesTicker from './sections/UpdatesTicker'
import CategoryChooser from './sections/CategoryChooser'
import TrustGuidance from './sections/TrustGuidance'
import ServiceCards from './sections/ServiceCards'
import FeaturedHomes from './sections/FeaturedHomes'
import LeadershipVision from './sections/LeadershipVision'
import Localities from './sections/Localities'
import Testimonials from './sections/Testimonials'
import Associations from './sections/Associations'
// Home.css still carries shared legacy classes used by the inner pages (About, Media, Career…).
import './Home.css'

export default function Home({ favorites, onToggleFavorite, onEnquiry, onNavigate }) {
  return <div className="ar-page home-page ar-hk">
    <HomeSearchHero onNavigate={onNavigate}/>
    <CategoryChooser onNavigate={onNavigate}/>
    <UpdatesTicker/>
    <TrustGuidance/>
    <ServiceCards onNavigate={onNavigate}/>
    <FeaturedHomes favorites={favorites} onToggleFavorite={onToggleFavorite} onEnquiry={onEnquiry} onNavigate={onNavigate}/>
    <LeadershipVision onNavigate={onNavigate}/>
    <Localities onNavigate={onNavigate}/>
    <Testimonials/>
    <Associations/>
  </div>
}
