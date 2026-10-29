import { useState } from 'react'
import deal1 from '../../../assets/reference/deal-1.jpg'
import deal2 from '../../../assets/reference/deal-2.jpg'
import deal3 from '../../../assets/reference/deal-3.jpg'
import deal4 from '../../../assets/reference/deal-4.jpg'
import deal8 from '../../../assets/reference/deal-8.jpg'

export default function PropertyGallery({ rishita }) {
  const [activeImage, setActiveImage] = useState(0)
  const gallery = rishita ? [deal1, deal2, deal3] : [deal8, deal4, deal1]
  return <div className="route-container detail-gallery"><div className="gallery-main"><img src={gallery[activeImage]} alt={`${rishita ? 'Rishita Manhattan' : 'Nottingham Homz'} property view`}/></div>{!rishita && <div className="gallery-thumbs">{gallery.map((image, index) => <button className={index === activeImage ? 'selected' : ''} key={image} onClick={() => setActiveImage(index)}><img src={image} alt={`Property view ${index + 1}`}/></button>)}</div>}</div>
}
