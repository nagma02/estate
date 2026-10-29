// Panoramas live in /public/panoramas as 2:1 equirectangular JPGs (4096×2048).
// They are CC0 placeholders from Poly Haven — swap in the project's own drone
// and interior 360° shots by replacing the files (or the paths below).
// `pitch` / `yaw` are degrees: yaw 0 is the centre of the image, -180…180 left→right.
export const siteTour = {
  panorama: '/panoramas/site-aerial.jpg',
  landmarks: [
    { id: 'metro', label: 'Airport Metro Station', distance: '3.6 km', kind: 'Metro', pitch: 3, yaw: -122 },
    { id: 'hospital', label: 'Chandan Hospital', distance: '2.3 km', kind: 'Hospital', pitch: 4, yaw: 92 },
    { id: 'mall', label: 'Fun Mall', distance: '3 km', kind: 'Mall', pitch: 3, yaw: -18 },
  ],
  views: [
    { id: 'main', label: 'Main View', pitch: 0, yaw: 0, hfov: 100 },
    { id: 'bird', label: 'Top Floor - Bird View', pitch: -38, yaw: -10, hfov: 120 },
    { id: 'orthographic', label: 'Orthographic View', pitch: -90, yaw: 0, hfov: 120 },
    { id: 'connectivity', label: 'Connectivity View', pitch: 3, yaw: -122, hfov: 70 },
    { id: 'landmarks', label: 'Surrounding Landmarks (Hospitals, Malls, Metro)', pitch: 4, yaw: -20, hfov: 120, showAllLandmarks: true },
  ],
}

export const rooms = [
  { id: 'living-room', label: 'Living Room', yaw: 25 },
  { id: 'dining-room', label: 'Dining Room', yaw: 105 },
  { id: 'kitchen', label: 'Kitchen', yaw: 150 },
  { id: 'master-bedroom', label: 'Master Bedroom', yaw: 100 },
  { id: 'breakfast-nook', label: 'Breakfast Nook', yaw: -75 },
].map(room => ({ ...room, panorama: `/panoramas/${room.id}.jpg`, thumbnail: `/panoramas/${room.id}-thumb.jpg` }))

export const AUTO_ROTATE_SPEED = -3
export const viewerDefaults = {
  autoLoad: true, showControls: false, showFullscreenCtrl: false, showZoomCtrl: false,
  mouseZoom: true, keyboardZoom: true, draggable: true, friction: 0.15,
  hfov: 100, minHfov: 40, maxHfov: 120,
}
