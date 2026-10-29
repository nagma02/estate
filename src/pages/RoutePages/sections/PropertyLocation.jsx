import MapEmbed from '../../../components/shared/MapEmbed'

export default function PropertyLocation({ rishita, location }) {
  return <>
      <section className="detail-section"><h2>LOCATION ADVANTAGES</h2><ul className="location-list">{(rishita ? ['5 Min from IT City','7 Min from Medanta Hospital','8 min from Ekana Stadium','15 min from Sahara Hospital'] : ['Sultanpur Road – 5 Minutes','Purvanchal Expressway – 10 Minutes','CMS Faizabad Road – 15 Minutes']).map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="detail-section"><h2>LOCATION MAP</h2><MapEmbed title={`${rishita ? 'Rishita Manhattan' : 'Nottingham Homz'} location`} query={location}/></section>
  </>
}
