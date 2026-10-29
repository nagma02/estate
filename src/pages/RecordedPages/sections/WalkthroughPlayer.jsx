import { walkThroughVideos } from './walkthroughVideos'

export default function WalkthroughPlayer({ activeVideo }) {
  return <div className="walkthrough-player" aria-label={`Video player: ${walkThroughVideos[activeVideo][0]}`}><div className="walkthrough-player-title"><b className="player-logo">AR</b><span><strong>{walkThroughVideos[activeVideo][0]}</strong><small>Advik Estate Services (OPC) Private Limited</small></span><span className="player-tools">◖　CC　⚙</span></div><div className="walkthrough-unavailable"><span className="youtube-mark">▶ YouTube</span><b>Video unavailable</b><small>This video is unavailable</small></div><div className="walkthrough-controls"><span>0:00 / {walkThroughVideos[activeVideo][1]}</span><i/><div><span>↗</span><span>◷</span><span>⛶</span></div></div></div>
}
