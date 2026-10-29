import mediaLegacy from '../../../assets/reference/media-legacy.jpg'
import mediaRecognition from '../../../assets/reference/media-recognition.jpg'
import mediaVidhiEstate from '../../../assets/reference/media-vidhi-estate.jpg'
import mediaTeam from '../../../assets/reference/media-team.jpg'
import mediaCelebration from '../../../assets/reference/media-celebration.jpg'

const moments = [
  { image: mediaLegacy, title: 'THE DAY LEGACY LAID ITS FIRST BRICK', className: 'media-moment-legacy' },
  { image: mediaRecognition, title: 'ADVIK REALTOR RECOGNITION NIGHT', className: 'media-moment-recognition' },
  { image: mediaVidhiEstate, title: 'A NEW MILESTONE AT VIDHI ESTATE', className: 'media-moment-vidhi' },
  { image: mediaTeam, title: 'TOGETHER, WE BUILD THE FUTURE', className: 'media-moment-team' },
  { image: mediaCelebration, title: 'CELEBRATING OUR GROWING TEAM', className: 'media-moment-celebration' },
]

export default function MediaGallery() {
  return <div className="media-masonry">{moments.map(moment => <figure className={`media-moment ${moment.className}`} key={moment.title}><img src={moment.image} alt={moment.title}/><figcaption>{moment.title}</figcaption></figure>)}</div>
}
