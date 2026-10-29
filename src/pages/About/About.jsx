import PageHero from '../../components/shared/PageHero'
import { heroImages } from '../../components/shared/heroImages'
import AboutCompany from './sections/AboutCompany'
import AboutValues from './sections/AboutValues'
import AboutStats from './sections/AboutStats'
import AboutTeamCta from './sections/AboutTeamCta'
import './About.css'

export default function About({ onNavigate }) {
  return <div className="route-page about-route">
    <PageHero eyebrow="Advik Estate Services" title={<>About <em>us</em></>} text="A Lucknow real estate firm working closely with trusted developers to help families and investors find the right property." images={heroImages.about} crumbs={[['Home', '/'], ['About us']]} onNavigate={onNavigate}/>
    <AboutCompany/>
    <AboutValues/>
    <AboutStats/>
    <AboutTeamCta onNavigate={onNavigate}/>
  </div>
}
