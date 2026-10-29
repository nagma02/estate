import SiteAerialViewer from './components/SiteAerialViewer'
import InteriorTourViewer from './components/InteriorTourViewer'
import { OrbitIcon } from '../../components/shared/Icons'
import PageHero from '../../components/shared/PageHero'
import { heroImages } from '../../components/shared/heroImages'

const chapters = [
  { id: 'vt-site', index: '01', title: 'Exterior & Drone Aerial 360° Site View', hint: 'Switch camera views from the top-right menu and tap a pin to see the distance to nearby landmarks.', Viewer: SiteAerialViewer },
  { id: 'vt-interior', index: '02', title: 'Interior Room 360° Virtual Tour', hint: 'Pick a room from the strip at the bottom of the viewer to step inside.', Viewer: InteriorTourViewer },
]

export default function PanoramaTour({ onNavigate }) {
  return <div className="ar-page ar-tour virtual-tour">
    <PageHero eyebrow="Experience it before you visit" title={<>Virtual tour <em>in 360°</em></>} text="Explore the site from above and walk through every room in 360°. Drag to look around, scroll or use + / − to zoom." images={heroImages.tour} crumbs={[['Home', '/'], ['Virtual tour']]} onNavigate={onNavigate}>
      <nav className="ar-tour-jump" aria-label="Tour sections">{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`}><small>{chapter.index}</small>{chapter.index === '01' ? 'Aerial site view' : 'Interior rooms'}</a>)}</nav>
    </PageHero>

    {chapters.map(({ id, index, title, hint, Viewer }) => <section className="ar-tour-chapter" id={id} key={id} aria-labelledby={`${id}-heading`}>
      <div className="ar-wrap">
        <div className="ar-tour-chapter-head"><span className="ar-tour-chapter-index"><OrbitIcon width="20" height="20"/>{index}</span><div><h2 id={`${id}-heading`}>{title}</h2><p>{hint}</p></div></div>
        <Viewer/>
      </div>
    </section>)}
  </div>
}
