import MapEmbed from '../../../components/shared/MapEmbed'

export default function ProjectLocation({ project }) {
  return <section className="detail-section"><h2>LOCATION</h2><p>{project.place}</p><MapEmbed title={`${project.name} location`} query={project.place}/></section>
}
