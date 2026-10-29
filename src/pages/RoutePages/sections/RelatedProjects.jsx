import { openProject, projectCatalog } from '../listingsData'
import { ArrowUpRightIcon, PinIcon } from '../../../components/shared/Icons'

export default function RelatedProjects({ project, type, onNavigate }) {
  // The catalog lists some projects twice; keep the first entry of each.
  const related = projectCatalog.filter((item, index) => item.category === type && item.name !== project.name && projectCatalog.findIndex(other => other.name === item.name) === index).slice(0, 3)
  if (!related.length) return null
  return <section className="ar-detail-section ar-reveal"><span className="ar-eyebrow">Keep exploring</span><h2>Related {type.toLowerCase()} properties</h2><div className="ar-related">{related.map(item => <button type="button" key={item.name} onClick={() => openProject(item, item.category, onNavigate)}><img src={item.image} alt=""/><span><b>{item.name}</b><small><PinIcon width="13" height="13"/>{item.place}</small></span><ArrowUpRightIcon width="16" height="16"/></button>)}</div></section>
}
