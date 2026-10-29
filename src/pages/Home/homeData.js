import hangingGardenPoster from '../../assets/eldeco-hanging.jpg'
import trinityPoster from '../../assets/eldeco-trinity.jpg'

// "Best deals" on the home page; also the property options in the enquiry modal.
export const properties = [
  { name: 'Rishita Manhattan', place: 'Gomti Nagar Extension, Lucknow', type: '2 BHK | 3 BHK | 4 BHK', features: 'Piped Gas | 24X7 Security', image: new URL('../../assets/reference/deal-1.jpg', import.meta.url).href },
  { name: 'Rishita Mulberry Heights', place: 'Sushant Golf City, Lucknow', type: '2 BHK | 3 BHK', features: 'Piped Gas | Swimming pool', image: new URL('../../assets/reference/deal-2.jpg', import.meta.url).href },
  { name: 'Lala Jugal Kishore Vasto', place: 'Bijnor Road, Lucknow', type: 'PREMIUM RESIDENTIAL PLOTS', features: 'Basketball Court | Natural Greens', image: new URL('../../assets/reference/deal-3.jpg', import.meta.url).href },
  { name: 'Nottingham Homz', place: 'Sultanpur Road, Lucknow', type: '1 BHK | 2 BHK', features: 'Car parking | 24X7 Security', image: new URL('../../assets/reference/deal-4.jpg', import.meta.url).href },
  { name: 'Oro Constella', place: 'Sushant Golf City, Lucknow', type: '3 BHK | 4 BHK | 5 BHK', features: 'Piped Gas | 24X7 Security', image: new URL('../../assets/reference/deal-5.jpg', import.meta.url).href },
  { name: 'Ekana Mall', place: 'Gomti Nagar Extension, Lucknow', type: 'COMMERCIAL SPACE', features: 'Car parking | CCTV Camera', image: new URL('../../assets/reference/deal-6.jpg', import.meta.url).href },
  { name: 'Pintail Park City', place: 'Sultanpur Road, Lucknow', type: 'PREMIUM RESIDENTIAL PLOTS', features: 'Basketball Court | Natural Greens', image: new URL('../../assets/reference/deal-7.jpg', import.meta.url).href },
  { name: 'Omaxe Waterscape', place: 'Gomti Nagar Extension, Lucknow', type: 'FLAT 3BHK', features: 'Swimming Pool | 24X7 Security', image: new URL('../../assets/reference/deal-8.jpg', import.meta.url).href },
]
export const latestCategories = [
  { name: 'APARTMENTS', properties: [
    { name: 'Rishita Manhattan', place: 'Gomti Nagar Extension, Lucknow', type: '2 / 3 / 4 BHK Apartments', image: new URL('../../assets/reference/deal-1.jpg', import.meta.url).href },
    { name: 'Rishita Mulberry Heights', place: 'Sushant Golf City, Lucknow', type: '2 / 3 BHK Apartments', image: new URL('../../assets/reference/deal-2.jpg', import.meta.url).href },
    properties[3], properties[4], properties[7],
  ] },
  { name: 'VILLAS', properties: [{ name: 'Eldeco Hanging Gardens', place: 'Sushant Golf City, Lucknow', type: '3 BR Apartments', image: hangingGardenPoster }, { name: 'Eldeco Trinity', place: 'Gomti Nagar Extension, Lucknow', type: '3/4 BR Luxury Apartments', image: trinityPoster }] },
  { name: 'PLOTS', properties: [{ name: 'Lala Jugal Kishore Vasto', place: 'Bijnor Road, Lucknow', type: 'Premium Residential Plots', image: new URL('../../assets/reference/deal-3.jpg', import.meta.url).href }, { name: 'Pintail Park City', place: 'Sultanpur Road, Lucknow', type: 'Premium Residential Plots', image: new URL('../../assets/reference/deal-7.jpg', import.meta.url).href }] },
]
export const slides = [
  { name: 'SKYOM CITY', kicker: 'A NEW STANDARD OF LIVING', subtitle: 'Find your place among the clouds', image: new URL('../../assets/reference/deal-1.jpg', import.meta.url).href, rera: 'UPRERAPRJ600292/06/2025' },
  { name: 'SHALIMAR MANNAT', kicker: 'A HOME THAT FEELS LIKE YOU', subtitle: 'A life beautifully imagined', image: new URL('../../assets/reference/deal-5.jpg', import.meta.url).href, rera: 'UPRERAPRJ927134' },
  { name: 'RISHITA MULBERRY HEIGHTS', kicker: 'THE ART OF EXCEPTIONAL LIVING', subtitle: 'Find your place in the sky', image: new URL('../../assets/reference/deal-2.jpg', import.meta.url).href, rera: 'UPRERAPRJ634298' },
  { name: 'EKANA BUSINESS CENTRE', kicker: 'WHERE BUSINESS MEETS OPPORTUNITY', subtitle: 'A landmark address for a brighter future', image: new URL('../../assets/reference/deal-6.jpg', import.meta.url).href, rera: 'UPRERAPRJ546851/07/2025' },
]
