import oneOak from '../../../assets/partners/1oak.webp'
import eldeco from '../../../assets/partners/eldeco.webp'
import excella from '../../../assets/partners/excella.webp'
import experion from '../../../assets/partners/experion.webp'
import migsun from '../../../assets/partners/migsun-lucknow-central.webp'
import oranje from '../../../assets/partners/oranje.webp'
import ord from '../../../assets/partners/ord-constructions.webp'
import rishita from '../../../assets/partners/rishita-developers.webp'
import sahuCity from '../../../assets/partners/sahu-city.webp'
import sapphire from '../../../assets/partners/sapphire.webp'
import tulip from '../../../assets/partners/tulip-housing.webp'

const partners = [
  { name: 'ORD Constructions', logo: ord },
  { name: '1OAK', logo: oneOak },
  { name: 'Tulip Housing', logo: tulip },
  { name: 'Sahu City', logo: sahuCity },
  { name: 'Sapphire', logo: sapphire },
  { name: 'Experion', logo: experion },
  { name: 'Excella', logo: excella },
  { name: 'Migsun Lucknow Central', logo: migsun },
  { name: 'Rishita Developers', logo: rishita },
  { name: 'Eldeco', logo: eldeco },
  { name: 'Oranje', logo: oranje },
]

function LogoRow({ hidden }) {
  return <ul className="ar-assoc-row" aria-hidden={hidden || undefined}>
    {partners.map(({ name, logo }) => <li key={name} className="ar-assoc-card"><img src={logo} alt={hidden ? '' : name} loading="lazy"/></li>)}
  </ul>
}

export default function Associations() {
  return <section className="ar-assoc">
    <h2>Our Association</h2>
    <p>Collaborative Allies: FDI Developers and Authorized Channel Partners with a Strategic Approach</p>
    <div className="ar-assoc-marquee">
      <LogoRow/>
      <LogoRow hidden/>
    </div>
  </section>
}
