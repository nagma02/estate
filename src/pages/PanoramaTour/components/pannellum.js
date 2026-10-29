import { useEffect, useRef, useState } from 'react'
import { AUTO_ROTATE_SPEED } from './tourData'

let pannellumPromise
function loadPannellum() {
  if (window.pannellum) return Promise.resolve(window.pannellum)
  if (!pannellumPromise) {
    pannellumPromise = new Promise((resolve, reject) => {
      const cssHref = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'; link.href = cssHref; document.head.appendChild(link)
      }
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
      script.async = true
      script.onload = () => window.pannellum ? resolve(window.pannellum) : reject(new Error('Pannellum did not load'))
      script.onerror = () => { pannellumPromise = null; reject(new Error('Could not load Pannellum')) }
      document.head.appendChild(script)
    })
  }
  return pannellumPromise
}


// Creates a Pannellum viewer once for `mountRef` and destroys it on unmount.
export function usePannellum(mountRef, viewerRef, buildConfig, onReady) {
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    let cancelled = false
    loadPannellum().then(pannellum => {
      if (cancelled || !mountRef.current) return
      const viewer = pannellum.viewer(mountRef.current, buildConfig())
      viewerRef.current = viewer
      viewer.on('load', () => setStatus('ready'))
      viewer.on('error', () => setStatus('error'))
      onReady?.(viewer)
    }).catch(() => { if (!cancelled) setStatus('error') })
    return () => {
      cancelled = true
      viewerRef.current?.destroy()
      viewerRef.current = null
    }
    // The viewer is built once; later changes go through the viewer API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [status, setStatus]
}

// Shared auto-rotate state: Pannellum stops rotating as soon as the user drags,
// so the button is switched off on interaction to stay in sync.
export function useAutoRotate(viewerRef) {
  const [autoRotate, setAutoRotate] = useState(false)
  const autoRotateRef = useRef(false)
  const set = on => {
    autoRotateRef.current = on
    setAutoRotate(on)
    if (on) viewerRef.current?.startAutoRotate(AUTO_ROTATE_SPEED)
    else viewerRef.current?.stopAutoRotate()
  }
  const bindInteraction = viewer => {
    const stop = () => { if (autoRotateRef.current) set(false) }
    viewer.on('mousedown', stop)
    viewer.on('touchstart', stop)
  }
  return { autoRotate, autoRotateRef, toggle: () => set(!autoRotateRef.current), bindInteraction }
}
