import { useRef, useState } from 'react'
import { siteTour, viewerDefaults } from './tourData'
import { usePannellum, useAutoRotate } from './pannellum'
import ViewerControls from './ViewerControls'
import ViewerStatus from './ViewerStatus'
import ArWatermark from './ArWatermark'

function landmarkPin(element, landmark) {
  element.classList.add('vt-pin')
  element.setAttribute('role', 'button')
  element.setAttribute('aria-label', `${landmark.label}, ${landmark.distance}`)
  const card = document.createElement('span')
  card.className = 'vt-pin-card'
  const kind = document.createElement('small')
  kind.textContent = landmark.kind
  const name = document.createElement('b')
  name.textContent = landmark.label
  const distance = document.createElement('em')
  distance.textContent = `${landmark.distance} from site`
  card.append(kind, name, distance)
  element.append(card)
}

export default function SiteAerialViewer() {
  const mountRef = useRef(null)
  const stageRef = useRef(null)
  const [viewId, setViewId] = useState('main')
  const [menuOpen, setMenuOpen] = useState(false)
  const currentView = siteTour.views.find(view => view.id === viewId)
  const viewerRef = useRef(null)
  const rotation = useAutoRotate(viewerRef)
  const [status] = usePannellum(mountRef, viewerRef, () => ({
    ...viewerDefaults,
    type: 'equirectangular',
    panorama: siteTour.panorama,
    pitch: currentView.pitch, yaw: currentView.yaw, hfov: currentView.hfov,
    hotSpots: siteTour.landmarks.map(landmark => ({
      id: landmark.id, pitch: landmark.pitch, yaw: landmark.yaw, type: 'custom',
      createTooltipFunc: landmarkPin, createTooltipArgs: landmark,
      clickHandlerFunc: event => event.currentTarget.classList.toggle('open'),
    })),
  }), viewer => rotation.bindInteraction(viewer))

  const chooseView = view => {
    setViewId(view.id)
    setMenuOpen(false)
    viewerRef.current?.lookAt(view.pitch, view.yaw, view.hfov, 1200)
  }

  return <div className={`vt-stage${currentView.showAllLandmarks ? ' show-all-pins' : ''}`} ref={stageRef}>
    <div className="vt-canvas" ref={mountRef} aria-label="Aerial 360 degree view of the site" />
    <ViewerStatus status={status} />
    <ArWatermark />
    <span className="vt-hint">↔ DRAG TO LOOK AROUND · SCROLL TO ZOOM</span>
    <div className="vt-view-picker">
      <button type="button" className="vt-view-trigger" aria-haspopup="listbox" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
        <span><small>CAMERA VIEW</small><b>{currentView.label}</b></span><i aria-hidden="true">⌄</i>
      </button>
      {menuOpen && <ul className="vt-view-menu" role="listbox" aria-label="Camera view">
        {siteTour.views.map(view => <li key={view.id}><button type="button" role="option" aria-selected={view.id === viewId} className={view.id === viewId ? 'selected' : ''} onClick={() => chooseView(view)}>{view.label}</button></li>)}
      </ul>}
    </div>
    <div className="vt-bottom-bar">
      <ul className="vt-legend" aria-label="Nearby landmarks">
        {siteTour.landmarks.map(landmark => <li key={landmark.id}><button type="button" onClick={() => viewerRef.current?.lookAt(landmark.pitch, landmark.yaw, 70, 1000)}><b>{landmark.label}</b><span>{landmark.distance}</span></button></li>)}
      </ul>
      <ViewerControls viewerRef={viewerRef} stageRef={stageRef} autoRotate={rotation.autoRotate} onToggleAutoRotate={rotation.toggle} />
    </div>
  </div>
}
