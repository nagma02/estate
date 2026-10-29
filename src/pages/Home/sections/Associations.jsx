// Mock wordmark logos (inline SVG) until the real partner artwork is supplied —
// swap `logo` for an imported image file per partner.
const wordmark = (name, tagline, color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 80"><text x="110" y="${tagline ? 42 : 50}" text-anchor="middle" font-family="Georgia,serif" font-size="${name.length > 9 ? 22 : 28}" font-weight="700" letter-spacing="1.5" fill="${color}">${name}</text>${tagline ? `<text x="110" y="64" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" letter-spacing="3" fill="${color}" opacity=".75">${tagline}</text>` : ''}</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const partners = [
  { name: 'ORD Constructions', logo: wordmark('ORD', 'CONSTRUCTIONS', '#1F3B6E') },
  { name: '1OAK', logo: wordmark('1OAK', '', '#111111') },
  { name: 'Tulip Housing', logo: wordmark('Tulip', 'HOUSING', '#C2185B') },
  { name: 'Sahu City', logo: wordmark('SAHU CITY', '', '#8C302D') },
  { name: 'Sapphire', logo: wordmark('Sapphire', '', '#1565C0') },
  { name: 'Experion', logo: wordmark('EXPERION', '', '#0B3A27') },
  { name: 'Excella', logo: wordmark('Excella', '', '#3884B7') },
  { name: 'Migsun Lucknow Central', logo: wordmark('MIGSUN', 'LUCKNOW CENTRAL', '#B71C1C') },
  { name: 'Rishita Developers', logo: wordmark('rishita', 'DEVELOPERS', '#6F4C85') },
  { name: 'Omaxe', logo: wordmark('OMAXE', '', '#B84331') },
  { name: 'Eldeco', logo: wordmark('ELDECO', '', '#0D47A1') },
  { name: 'Oranje', logo: wordmark('ORANJE', '', '#E65100') },
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
