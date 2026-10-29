import { walkThroughVideos, walkthroughThumbnails } from './walkthroughVideos'

export default function WalkthroughList({ activeVideo, onSelect }) {
  return <div className="walkthrough-list"><header><strong>PROJECT DETAILS &amp; WALKTHROUGH VIDEOS</strong><span>15 Videos</span></header><div className="walkthrough-items">{walkThroughVideos.map(([title, duration], index) => <button className={activeVideo === index ? 'active' : ''} key={title} onClick={() => onSelect(index)}><span className={`walkthrough-thumb walkthrough-thumb-${index % 5}`}><img src={walkthroughThumbnails[index]} alt=""/><i>▶</i></span><span className="walkthrough-video-name">{title}</span><small>{duration}</small></button>)}</div></div>
}
