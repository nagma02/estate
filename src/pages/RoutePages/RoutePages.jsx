// Import order sets the CSS cascade: PanoramaTour, About, RoutePages, then RecordedPages.
import PanoramaTour from '../PanoramaTour/PanoramaTour'
import About from '../About/About'
import './RoutePages.css'
import { MediaPage, ProjectVideosPage, PolicyPage, CareerPage, ContactPage } from '../RecordedPages/RecordedPages'
import { findProject } from './listingsData'
import CmdMessage from './sections/CmdMessage'
import PropertyListingsPage from './PropertyListingsPage'
import ProjectDetailPageLayout from './ProjectDetailPage'
import PropertyHeader from './sections/PropertyHeader'
import PropertyGallery from './sections/PropertyGallery'
import PropertyDescription from './sections/PropertyDescription'
import FloorPlans from './sections/FloorPlans'
import PropertyAmenities from './sections/PropertyAmenities'
import PropertyLocation from './sections/PropertyLocation'
import LatestProperties from './sections/LatestProperties'
import CallbackForm from './sections/CallbackForm'
import EmiCalculator from '../../components/shared/EmiCalculator'
import SalesTeam from './sections/SalesTeam'
import OperationsTeam from './sections/OperationsTeam'
import FavouritesPage from './FavouritesPage'
import PageHero from '../../components/shared/PageHero'
import { heroImages } from '../../components/shared/heroImages'

export function RoutePage({ pathname, favorites = [], onToggleFavorite, onEnquiry, onNavigate }) {
  const route = pathname.replace(/\/+$/, '') || '/'
  if (route === '/favourites') return <FavouritesPage favorites={favorites} onToggleFavorite={onToggleFavorite} onNavigate={onNavigate} onEnquiry={onEnquiry}/>
  if (route === '/media') return <MediaPage onNavigate={onNavigate}/>
  if (route === '/project-details' || route === '/new-page') return <ProjectVideosPage onNavigate={onNavigate}/>
  if (route === '/virtual-tour') return <VirtualTourPage onNavigate={onNavigate}/>
  if (route === '/privacy-policy') return <PolicyPage onNavigate={onNavigate}/>
  if (route === '/terms-conditions') return <PolicyPage terms onNavigate={onNavigate}/>
  if (route === '/career') return <CareerPage onNavigate={onNavigate}/>
  if (route === '/contact-3' || route === '/contact') return <ContactPage onNavigate={onNavigate}/>
  if (route === '/about') return <About onNavigate={onNavigate}/>
  if (route === '/cmd-message') return <CmdMessagePage onNavigate={onNavigate}/>
  if (['/apartment', '/villas', '/plots', '/commercial'].includes(route)) return <PropertyListingsPage type={route === '/apartment' ? 'apartments' : route.slice(1)} favorites={favorites} onToggleFavorite={onToggleFavorite} onEnquiry={onEnquiry} onNavigate={onNavigate}/>
  if (route === '/home-apartment/nottingham-homz') return <DetailPage onEnquiry={onEnquiry} onNavigate={onNavigate}/>
  if (route === '/home-apartment-rishita-manhattan') return <DetailPage rishita onEnquiry={onEnquiry} onNavigate={onNavigate}/>
  if (route.startsWith('/property/')) {
    const slug = route.slice('/property/'.length)
    const project = findProject(slug)
    if (project) return <ProjectDetailPage project={project} favorites={favorites} onToggleFavorite={onToggleFavorite} onEnquiry={onEnquiry} onNavigate={onNavigate}/>
  }
  if (route === '/operations' || route === '/sales') return <OperationsPage sales={route === '/sales'} onNavigate={onNavigate}/>
  return <PropertyListingsPage onEnquiry={onEnquiry} onNavigate={onNavigate}/>
}

function VirtualTourPage({ onNavigate }) {
  return <PanoramaTour onNavigate={onNavigate}/>
}

function CmdMessagePage({ onNavigate }) {
  return <div className="route-page cmd-route">
    <PageHero eyebrow="Leadership" title={<>Our vision for <em>real estate</em></>} text="A message from our founder and managing director." images={heroImages.leadership} crumbs={[['Home', '/'], ['CMD message']]} onNavigate={onNavigate}/>
    <section className="ar-leadership">
      <span className="ar-leadership-glow" aria-hidden="true"/>
      <span className="ar-leadership-glow ar-leadership-glow-end" aria-hidden="true"/>
      <span className="ar-leadership-quote" aria-hidden="true">&ldquo;</span>
      <CmdMessage/>
    </section>
  </div>
}

function ProjectDetailPage({ project, favorites, onToggleFavorite, onEnquiry, onNavigate }) {
  return <ProjectDetailPageLayout key={project.name} project={project} type={project.category || 'PROPERTY'} favorites={favorites} onToggleFavorite={onToggleFavorite} onNavigate={onNavigate} onEnquiry={onEnquiry}/>
}

// Hand-built detail pages for Rishita Manhattan (`rishita`) and Nottingham Homz.
function DetailPage({ onEnquiry, onNavigate, rishita = false }) {
  const location = rishita ? 'Gomti Nagar Extension, Lucknow' : 'Malookpur Dhakwa, Kisan Path Off Sultanpur Road, Lucknow'
  return <div className={`route-page detail-page${rishita ? ' detail-page-rishita' : ''}`}>
    <PropertyHeader rishita={rishita} location={location}/>
    <PropertyGallery rishita={rishita}/>
    <div className="route-container detail-body"><div className="detail-primary">
      <PropertyDescription rishita={rishita}/>
      <FloorPlans rishita={rishita} onEnquiry={onEnquiry}/>
      <PropertyAmenities rishita={rishita}/>
      <PropertyLocation rishita={rishita} location={location}/>
      <section className="detail-section"><h2>EMI CALCULATOR</h2><EmiCalculator/></section>
      <LatestProperties onNavigate={onNavigate}/>
    </div><CallbackForm rishita={rishita}/></div>
  </div>
}

function OperationsPage({ sales, onNavigate }) {
  return sales ? <SalesTeam onNavigate={onNavigate}/> : <OperationsTeam onNavigate={onNavigate}/>
}
