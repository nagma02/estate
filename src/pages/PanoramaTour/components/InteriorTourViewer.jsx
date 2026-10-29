import { useEffect, useRef, useState } from 'react'
import { rooms, viewerDefaults, AUTO_ROTATE_SPEED } from './tourData'
import { usePannellum, useAutoRotate } from './pannellum'
import ViewerControls from './ViewerControls'
import ViewerStatus from './ViewerStatus'
import ArWatermark from './ArWatermark'

export default function InteriorTourViewer() {
  const mountRef = useRef(null)
  const stageRef = useRef(null)
  const thumbsRef = useRef(null)
  const [roomId, setRoomId] = useState(rooms[0].id)
  const viewerRef = useRef(null)
  const rotation = useAutoRotate(viewerRef)
  const [status, setStatus] = usePannellum(mountRef, viewerRef, () => ({
    default: { ...viewerDefaults, firstScene: rooms[0].id, sceneFadeDuration: 900 },
    scenes: Object.fromEntries(rooms.map(room => [room.id, { type: 'equirectangular', panorama: room.panorama, title: '', yaw: room.yaw, pitch: 0, hfov: 100 }])),
  }), viewer => {
    rotation.bindInteraction(viewer)
    viewer.on('scenechange', id => setRoomId(id))
    // A new scene resets Pannellum's rotation, so resume it if the toggle is on.
    viewer.on('load', () => { if (rotation.autoRotateRef.current) viewer.startAutoRotate(AUTO_ROTATE_SPEED) })
  })

  const showRoom = id => {
    const viewer = viewerRef.current
    if (!viewer || id === viewer.getScene()) return
    setRoomId(id)
    setStatus('loading')
    viewer.loadScene(id)
  }
  // Glide the room strip so the selected thumbnail sits in the middle.
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.querySelector('.vt-thumb.active')
    if (thumb && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' })
  }, [roomId])
  const room = rooms.find(item => item.id === roomId)

  return <div className="vt-stage vt-stage-interior" ref={stageRef}>
    <div className="vt-canvas" ref={mountRef} aria-label={`${room.label} 360 degree view`} />
    <ViewerStatus status={status} />
    <ArWatermark />
    <span className="vt-hint">↔ DRAG TO LOOK AROUND · SCROLL TO ZOOM</span>
    <div className="vt-room-title"><small>NOW VIEWING</small><b>{room.label}</b></div>
    <div className="vt-bottom-bar">
      <div className="vt-thumbnails" ref={thumbsRef} role="tablist" aria-label="Choose a room">
        {rooms.map(item => <button type="button" role="tab" aria-selected={item.id === roomId} key={item.id} className={`vt-thumb${item.id === roomId ? ' active' : ''}`} onClick={() => showRoom(item.id)}>
          <span><img src={item.thumbnail} alt="" /></span>
          <b>{item.label}</b>
        </button>)}
      </div>
      <ViewerControls viewerRef={viewerRef} stageRef={stageRef} autoRotate={rotation.autoRotate} onToggleAutoRotate={rotation.toggle} />
    </div>
  </div>
}
