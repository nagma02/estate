import livingRoom from '../../assets/rooms/living-room.jpg'
import lounge from '../../assets/rooms/lounge.jpg'
import kitchen from '../../assets/rooms/kitchen.jpg'
import bedroom from '../../assets/rooms/bedroom.jpg'
import balcony from '../../assets/rooms/balcony.jpg'
import dining from '../../assets/rooms/dining.jpg'
import ceiling from '../../assets/rooms/ceiling.jpg'
import rooftop from '../../assets/rooms/rooftop.jpg'
import sunroom from '../../assets/rooms/sunroom.jpg'
import siteAerial from '../../assets/reference/tour-skyom-aerial.jpg'

// Sample detail content for the property page. Projects only carry name, place, BHK and
// photos today, so pricing, areas and specifications below are indicative placeholders —
// give a project its own `configs`, `rera`, `description` or `specs` to override them.

// Typical [carpet, built-up, super] areas in sq.ft per bedroom count.
const HOME_SIZES = { 1: [410, 520, 650], 2: [620, 790, 985], 3: [890, 1130, 1410], 4: [1230, 1560, 1950], 5: [1560, 1980, 2480] }

const hash = text => [...text].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7)
const roundTo = (value, step) => Math.round(value / step) * step

export const formatPrice = rupees => rupees >= 1e7 ? `₹${(rupees / 1e7).toFixed(2)} Cr` : `₹${(rupees / 1e5).toFixed(2)} Lacs`
export const formatArea = sqft => sqft ? `${sqft.toLocaleString('en-IN')} sq.ft` : '—'

// "₹ 1.65 Cr*" → 16500000
const parseRupees = text => {
  const match = /([\d.]+)\s*(cr|lac|lakh|l)\b/i.exec(text || '')
  return match ? Number(match[1]) * (/^cr/i.test(match[2]) ? 1e7 : 1e5) : null
}

function buildConfigs(project) {
  const type = project.category
  const bedrooms = [...new Set([...(project.bhk || '').matchAll(/(\d)\s*BHK/gi)].map(match => Number(match[1])))].sort()
  let configs
  if (type === 'PLOT') configs = [1000, 1500, 2000].map(size => ({ id: `plot-${size}`, label: `${size} sq.ft Plot`, bedrooms: 0, superArea: size }))
  else if (type === 'COMMERCIAL') configs = [['shop', 'Retail Shop', 320], ['office', 'Office Space', 850]].map(([id, label, size]) => ({ id, label, bedrooms: 0, carpet: roundTo(size * 0.62, 5), builtUp: roundTo(size * 0.8, 5), superArea: size }))
  else {
    const scale = type === 'VILLA' ? 1.6 : 1
    configs = (bedrooms.length ? bedrooms : [2, 3]).map(count => {
      const [carpet, builtUp, superArea] = HOME_SIZES[count].map(size => roundTo(size * scale, 5))
      return { id: `${count}bhk`, label: `${count} BHK`, bedrooms: count, carpet, builtUp, superArea }
    })
  }
  // A listed price anchors the smallest unit; otherwise use a steady per-project sample rate.
  const listed = parseRupees(project.price)
  const rate = listed ? listed / configs[0].superArea : (type === 'PLOT' ? 2600 : 5200) + roundTo(hash(project.name) % 3000, 50)
  return configs.map(config => ({ ...config, price: roundTo(config.superArea * rate, 1000) }))
}

const residentialSpecs = [
  { id: 'living', label: 'Living / Bedrooms', image: livingRoom, items: ['Vitrified tiles (800 × 800 mm) in living, dining and bedrooms', 'Laminated wooden flooring in the master bedroom', 'Acrylic emulsion paint over POP punning on all walls', 'Large UPVC windows for cross-ventilation and daylight'] },
  { id: 'structure', label: 'Structure', image: null, items: ['Earthquake-resistant RCC framed structure (Seismic Zone IV)', 'AAC block masonry for thermal and sound insulation', 'Anti-termite treatment at foundation level'] },
  { id: 'balcony', label: 'Balcony / Verandah', image: balcony, items: ['Anti-skid ceramic floor tiles', 'MS railing with toughened glass panels', 'Weatherproof exterior-grade paint'] },
  { id: 'kitchen', label: 'Kitchen', image: kitchen, items: ['Granite counter with a stainless-steel sink', 'Ceramic dado tiles 2 ft above the counter', 'Provision for RO, chimney and piped gas'] },
  { id: 'bathrooms', label: 'Bathrooms / Toilet', image: null, items: ['Anti-skid ceramic floor tiles', 'Glazed wall tiles up to door height', 'Premium CP fittings and sanitaryware (Jaquar or equivalent)', 'Hot and cold water provision'] },
  { id: 'ceiling', label: 'Ceiling', image: ceiling, items: ['POP false ceiling in living and dining', 'Cove-lighting provision', 'Oil-bound distemper on all ceilings'] },
  { id: 'electrical', label: 'Electrical', image: bedroom, items: ['Concealed copper wiring with modular switches', 'AC points in living and all bedrooms', 'Power backup for lights, fans and lifts', 'TV and data points in living and master bedroom'] },
]
const plotSpecs = [
  { id: 'roads', label: 'Roads & Access', image: siteAerial, items: ['Wide internal roads with street lighting', 'Gated entry with boom barrier', 'Footpaths along main avenues'] },
  { id: 'utilities', label: 'Utilities', image: null, items: ['Underground electricity cabling', 'Water supply line to every plot', 'Planned sewage and storm-water drainage'] },
  { id: 'greens', label: 'Greens', image: rooftop, items: ['Landscaped parks and tree-lined avenues', 'Children’s play area', 'Jogging and walking track'] },
]
const commercialSpecs = [
  { id: 'structure', label: 'Structure', image: null, items: ['RCC framed structure designed for heavy footfall', 'High floor-to-floor height', 'Glass façade with aluminium glazing'] },
  { id: 'services', label: 'Services', image: null, items: ['High-speed passenger and service lifts', 'Centralised air-conditioning provision', '100% power backup for common areas'] },
  { id: 'safety', label: 'Safety', image: null, items: ['Fire detection and sprinkler system', 'CCTV surveillance with 24×7 security', 'Dedicated visitor and tenant parking'] },
]

const baseAmenities = ['Gym', 'Swimming Pool', 'Fiber Optic Connectivity', 'Clubhouse', 'Multipurpose Hall', 'Landscaped Greens', '24×7 Security', "Kids' Play Area", 'Jogging Track', 'Power Backup', 'Covered Parking']

function buildGallery(project) {
  const photos = [project.image, ...(project.gallery || [])].filter(Boolean).map((src, index) => ({ src, label: index ? 'Project View' : 'Project Exterior' }))
  if (project.category === 'PLOT') return [...photos, { src: siteAerial, label: 'Site Aerial', sample: true }, { src: rooftop, label: 'Open Greens', sample: true }]
  if (project.category === 'COMMERCIAL') return photos
  return [...photos, ...[[livingRoom, 'Living Room'], [kitchen, 'Kitchen'], [bedroom, 'Master Bedroom'], [dining, 'Dining Area'], [lounge, 'Family Lounge'], [balcony, 'Balcony View'], [sunroom, 'Clubhouse Lounge'], [rooftop, 'Rooftop Terrace']].map(([src, label]) => ({ src, label, sample: true }))]
}

export function getPropertyDetails(project) {
  const configs = project.configs || buildConfigs(project)
  const typeWord = { VILLA: 'villa', PLOT: 'plotted', COMMERCIAL: 'commercial' }[project.category] || 'residential'
  const offering = project.category === 'COMMERCIAL' ? 'retail and office spaces' : project.category === 'PLOT' ? 'residential plots' : `${configs.map(config => config.bedrooms).join(', ')} BHK ${project.category === 'VILLA' ? 'villas' : 'homes'}`
  const specs = project.specs || (project.category === 'PLOT' ? plotSpecs : project.category === 'COMMERCIAL' ? commercialSpecs : residentialSpecs)
  return {
    configs,
    startingPrice: Math.min(...configs.map(config => config.price)),
    bhkTag: configs.every(config => config.bedrooms) ? `${configs.map(config => config.bedrooms).join(', ')} BHK` : project.bhk,
    rera: project.rera || null,
    description: project.description || [
      `${project.name} is a ${typeWord} project in ${project.place}${project.builder ? ` by ${project.builder}` : ''}, offering ${offering}. It is planned around open greens, everyday conveniences and quick connectivity to the city’s key roads.`,
      'Our advisors can arrange a site visit, share the latest price list and help you compare units, floors and payment plans before you decide.',
    ],
    amenities: [...baseAmenities, ...(project.amenities || []).filter(item => !baseAmenities.some(base => base.toLowerCase() === item.toLowerCase()))],
    gallery: buildGallery(project),
    specs: specs.map(spec => ({ ...spec, image: spec.image || (spec.id === 'structure' ? project.image : null) })),
  }
}
