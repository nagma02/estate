import arLogo from '../../../assets/advik-brand-mark.png'

export default function ViewerStatus({ status }) {
  if (status === 'ready') return null
  return <div className={`vt-status ${status}`} role="status">
    {status === 'error' ? '360° view could not be loaded. Please check your internet connection and refresh.' : <><span className="vt-ar-loader" aria-hidden="true"><img src={arLogo} alt=""/></span>Loading 360° view…</>}
  </div>
}
