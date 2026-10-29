// Photo sets for each page hero (high-res and free of baked-in text). Swap freely.
import heroTowers from '../../assets/hero/hero-towers.jpg'
import heroVilla from '../../assets/hero/hero-villa.jpg'
import heroBoulevard from '../../assets/hero/hero-boulevard.jpg'
import rishitaManhattan from '../../assets/reference/deal-1.jpg'
import mulberryHeights from '../../assets/reference/deal-2.jpg'
import vasto from '../../assets/reference/deal-3.jpg'
import oroConstella from '../../assets/reference/deal-5.jpg'
import ekanaMall from '../../assets/reference/deal-6.jpg'
import pintail from '../../assets/reference/deal-7.jpg'
import waterscape from '../../assets/reference/deal-8.jpg'
import villaBanner from '../../assets/reference/villa-banner.jpg'
import eldecoTrinity from '../../assets/eldeco-trinity.jpg'
import livingRoom from '../../assets/rooms/living-room.jpg'
import lounge from '../../assets/rooms/lounge.jpg'
import dining from '../../assets/rooms/dining.jpg'

export const heroImages = {
  apartments: [rishitaManhattan, oroConstella, waterscape, mulberryHeights],
  villas: [villaBanner, heroVilla],
  plots: [pintail, vasto],
  commercial: [ekanaMall, heroBoulevard, heroTowers],
  about: [heroBoulevard, rishitaManhattan, heroTowers],
  tour: [lounge, livingRoom, dining],
  team: [heroTowers, heroBoulevard],
  sales: [oroConstella, heroTowers],
  contact: [heroBoulevard, heroVilla],
  career: [heroTowers, mulberryHeights],
  media: [mulberryHeights, heroBoulevard],
  walkthrough: [eldecoTrinity],
  policy: [heroBoulevard],
  leadership: [heroTowers, rishitaManhattan],
  favourites: [heroVilla, mulberryHeights],
}
