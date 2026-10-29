import deal1 from '../../assets/reference/deal-1.jpg'
import deal2 from '../../assets/reference/deal-2.jpg'
import deal3 from '../../assets/reference/deal-3.jpg'
import deal4 from '../../assets/reference/deal-4.jpg'
import deal5 from '../../assets/reference/deal-5.jpg'
import deal6 from '../../assets/reference/deal-6.jpg'
import deal7 from '../../assets/reference/deal-7.jpg'
import deal8 from '../../assets/reference/deal-8.jpg'
import hangingGarden from '../../assets/eldeco-hanging.jpg'
import trinity from '../../assets/eldeco-trinity.jpg'
import ekanaBusiness from '../../assets/reference/ekana-business.jpg'

export const listings = [
  { name: 'RISHITA MANHATTAN', place: 'Gomti Nagar Extension, Lucknow', bhk: '2 BHK | 3 BHK | 4 BHK', image: deal1, amenities: ['Swimming Pool','Grocery Shop','Amphitheatre','More Facility'], reraApproved: true, detail: 'rishita' },
  { name: 'RISHITA MULBERRY HEIGHTS', place: 'Sushant Golf City, Lucknow', bhk: '2 BHK | 3 BHK', image: deal2, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'ONE OAK NATURA', place: 'Sector C, Poket -7, Golf City, Bagiamau, Lucknow – 226002', bhk: '2 BHK | 3 BHK', image: deal3, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'OKAS RESIDENCY', place: 'GH 1 B, Golf City, Bagiamau, Lucknow, Hasanpur Khevali, Uttar Pradesh – 226030', bhk: '2 BHK | 3 BHK', image: deal4, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'GREENBERRY SIGNATURES', place: 'Vrindavan Yojna, Lucknow', bhk: '3 BHK | 4 BHK', image: deal5, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'INNAYA ROYAL HEIGHT', place: 'Gomti Nagar Extension Bypass Road, Lucknow', bhk: '2 BHK | 3 BHK | 4 BHK', image: deal6, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'ORO CONSTELLA', place: 'Sushant Golf City, Lucknow', bhk: '3 BHK | 4 BHK | 5 BHK', image: deal7, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'ELDECO TRINITY', place: 'Gomti Nagar Extension, Lucknow', bhk: '3 BHK | 4 BHK', image: trinity, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'] },
  { name: 'NOTTINGHAM HOMZ', place: 'Malookpur Dhakwa, Kisan Path Off Sultanpur Road, Lucknow', bhk: '1 BHK | 2 BHK', image: deal8, amenities: ['Swimming Pool','ATM','24×7 Security','More Facility'], detail: 'nottingham' },
]
export const villaListings = [
  { name: 'ELDECO HANGING GARDENS', place: 'Sushant Golf City, Lucknow', bhk: '3 BHK | 4 BHK VILLAS', image: hangingGarden, price: '₹ 1.65 Cr*' },
  { name: 'ELDECO TRINITY', place: 'Gomti Nagar Extension, Lucknow', bhk: '3 BHK | 4 BHK VILLAS', image: trinity, price: '₹ 1.45 Cr*' },
]
export const plotListings = [
  { name: 'LALA JUGAL KISHORE VASTO', place: 'Bijnor Road, Lucknow', bhk: 'PREMIUM RESIDENTIAL PLOTS', image: deal3, amenities: ['Basketball Court', 'Natural Greens'] },
  { name: 'PINTAIL PARK CITY', place: 'Sultanpur Road, Lucknow', bhk: 'PREMIUM RESIDENTIAL PLOTS', image: deal7, amenities: ['Basketball Court', 'Natural Greens'] },
]
export const projectSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
export const projectCatalog = [
  ...villaListings.map(item => ({ ...item, category: 'VILLA', bhk: item.bhk, amenities: ['Private outdoor space', 'Planned community', 'Gated living'], price: item.price })),
  ...listings.map(item => ({ ...item, category: 'APARTMENT', price: 'Contact for price' })),
  { name: 'Lala Jugal Kishore Vasto', place: 'Bijnor Road, Lucknow', category: 'PLOT', bhk: 'Residential Plots', image: deal3, price: 'Contact for price', amenities: ['Residential plots', 'Natural greens', 'Basketball court'] },
  { name: 'Pintail Park City', place: 'Sultanpur Road, Lucknow', category: 'PLOT', bhk: 'Residential Plots', image: deal7, price: 'Contact for price', amenities: ['Residential plots', 'Natural greens', 'Basketball court'] },
  { name: 'RISHITA MULBERRY HEIGHTS', place: 'Sushant Golf City, Lucknow', category: 'APARTMENT', bhk: '2 BHK | 3 BHK', image: deal2, price: 'Contact for price', amenities: ['Swimming Pool', 'ATM', '24×7 Security'] },
  { name: 'ORO CONSTELLA', place: 'Sushant Golf City, Lucknow', category: 'APARTMENT', bhk: '3 BHK | 4 BHK | 5 BHK', image: deal5, price: 'Contact for price', amenities: ['Piped Gas', '24×7 Security'] },
  { name: 'OMAXE WATERSCAPE', place: 'Gomti Nagar Extension, Lucknow', category: 'APARTMENT', bhk: '3 BHK', image: deal8, price: 'Contact for price', amenities: ['Swimming Pool', '24×7 Security'] },
  { name: 'EKANA MALL', place: 'Gomti Nagar Extension, Lucknow', category: 'COMMERCIAL', bhk: 'Retail / Commercial Space', image: deal6, price: 'Contact for price', amenities: ['Car parking', 'CCTV Camera'] },
  { name: 'EKANA BUSINESS CENTRE', place: 'Gomti Nagar Extension, Lucknow', category: 'COMMERCIAL', bhk: 'Office Space', image: ekanaBusiness, price: 'Contact for price', amenities: ['Business spaces', 'Parking'] },
]

export const commercialListings = projectCatalog.filter(item => item.category === 'COMMERCIAL')

// The card a visitor clicked is remembered so its detail page shows that exact project,
// even when the catalog lists a name twice (e.g. Eldeco Trinity as a villa and an apartment).
const OPENED_KEY = 'advik-opened-project'

export const openProject = (item, category, onNavigate) => {
  const card = { ...item, ...(category && { category: category.toUpperCase() }) }
  try { window.sessionStorage.setItem(OPENED_KEY, JSON.stringify(card)) } catch { /* storage unavailable: catalog data is used */ }
  onNavigate(`/property/${projectSlug(item.name)}`)
}

// A locality picked on the home page opens the listings already filtered to it.
const LOCALITY_KEY = 'advik-listing-locality'
export const openLocality = (locality, onNavigate, route = '/apartment') => {
  try { window.sessionStorage.setItem(LOCALITY_KEY, locality) } catch { /* storage unavailable: listings open unfiltered */ }
  onNavigate(route)
}
export const readLocality = () => { try { return window.sessionStorage.getItem(LOCALITY_KEY) } catch { return null } }
export const clearLocality = () => { try { window.sessionStorage.removeItem(LOCALITY_KEY) } catch { /* nothing stored */ } }

const cardDetails = card => ({
  name: card.name,
  place: card.place,
  image: card.image,
  ...(card.category && { category: card.category }),
  ...(card.price && { price: card.price }),
  ...((card.bhk || card.type) && { bhk: card.bhk || card.type }),
  ...(card.amenities ? { amenities: card.amenities.filter(item => item !== 'More Facility') } : card.features && { amenities: card.features.split('|').map(item => item.trim()) }),
  ...(card.reraApproved != null && { reraApproved: card.reraApproved }),
})

export const findProject = slug => {
  let card = null
  try { card = JSON.parse(window.sessionStorage.getItem(OPENED_KEY) || 'null') } catch { card = null }
  if (card && projectSlug(card.name) !== slug) card = null
  const matches = projectCatalog.filter(item => projectSlug(item.name) === slug)
  const base = (card?.category && matches.find(item => item.category === card.category)) || matches[0]
  if (!base && !card) return null
  return card ? { ...base, ...cardDetails(card) } : base
}
