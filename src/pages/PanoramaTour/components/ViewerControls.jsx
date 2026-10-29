import { useEffect, useState } from 'react'

export default function ViewerControls({ viewerRef, stageRef, autoRotate, onToggleAutoRotate }) {
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === stageRef.current)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [stageRef])

  const zoom = step => {
    const viewer = viewerRef.current
    if (viewer) viewer.setHfov(viewer.getHfov() + step, 300)
  }
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await stageRef.current?.requestFullscreen()
    } catch { /* fullscreen can be blocked by the browser */ }
  }

  return <div className="vt-controls" aria-label="Viewer controls">
    <button type="button" title="Zoom in" aria-label="Zoom in" onClick={() => zoom(-15)}>+</button>
    <button type="button" title="Zoom out" aria-label="Zoom out" onClick={() => zoom(15)}>−</button>
    <button type="button" className={autoRotate ? 'active' : ''} title={autoRotate ? 'Stop auto-rotate' : 'Start auto-rotate'} aria-label="Toggle auto-rotate" aria-pressed={autoRotate} onClick={onToggleAutoRotate}>↻</button>
    <button type="button" title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} aria-label="Toggle fullscreen" aria-pressed={fullscreen} onClick={toggleFullscreen}>{fullscreen ? '✕' : '⛶'}</button>
  </div>
}
