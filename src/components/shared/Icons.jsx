// Small stroke icons used across the site.
const Svg = ({ children, ...props }) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>

export const SearchIcon = props => <Svg {...props}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></Svg>
export const PhoneIcon = props => <Svg {...props}><path d="M5 4h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 6.9 6.9l1.3-2 4 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.6 16.6 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z"/></Svg>
export const MailIcon = props => <Svg {...props}><rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></Svg>
export const BlogIcon = props => <Svg {...props}><rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/></Svg>
export const HeartIcon = props => <Svg {...props}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/></Svg>
export const ChevronIcon = props => <Svg {...props}><path d="m6 9 6 6 6-6"/></Svg>
export const CloseIcon = props => <Svg {...props}><path d="M6 6l12 12M18 6 6 18"/></Svg>
export const MenuIcon = props => <Svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></Svg>
export const PinIcon = props => <Svg {...props}><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/></Svg>
export const ArrowRightIcon = props => <Svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></Svg>
export const ArrowLeftIcon = props => <Svg {...props}><path d="M19 12H5M11 6l-6 6 6 6"/></Svg>
export const ArrowUpRightIcon = props => <Svg {...props}><path d="M7 17 17 7M8 7h9v9"/></Svg>
export const ShieldIcon = props => <Svg {...props}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z"/><path d="m9 12 2 2 4-4"/></Svg>
export const CameraIcon = props => <Svg {...props}><path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.2"/></Svg>
export const BedIcon = props => <Svg {...props}><path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="1.6"/></Svg>
export const AreaIcon = props => <Svg {...props}><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></Svg>
export const BuildingIcon = props => <Svg {...props}><path d="M5 21V4h10v17M15 9h4v12M3 21h18M8 8h4M8 12h4M8 16h4"/></Svg>
export const VillaIcon = props => <Svg {...props}><path d="M3 11 12 4l9 7M5 9.5V20h14V9.5M10 20v-5h4v5"/></Svg>
export const PlotIcon = props => <Svg {...props}><path d="M3 8l9-4 9 4-9 4Z"/><path d="M3 8v8l9 4 9-4V8M12 12v8"/></Svg>
export const StoreIcon = props => <Svg {...props}><path d="M4 9h16l-1.5-4h-13ZM5 9v11h14V9M9 20v-6h6v6"/></Svg>
export const StarIcon = props => <Svg fill="currentColor" stroke="none" {...props}><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z"/></Svg>
export const CheckIcon = props => <Svg {...props}><path d="m5 12.5 4.5 4.5L19 7.5"/></Svg>
export const FilterIcon = props => <Svg {...props}><path d="M4 6h16M7 12h10M10 18h4"/></Svg>
export const SparkIcon = props => <Svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></Svg>
export const OrbitIcon = props => <Svg {...props}><ellipse cx="12" cy="12" rx="9" ry="4"/><circle cx="12" cy="12" r="2"/><path d="M12 3v2M12 19v2"/></Svg>
export const DownloadIcon = props => <Svg {...props}><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></Svg>
export const ChatIcon = props => <Svg {...props}><path d="M4.5 5.5h15A2.5 2.5 0 0 1 22 8v8a2.5 2.5 0 0 1-2.5 2.5H10l-5.5 3v-3.2A2.5 2.5 0 0 1 2 16V8a2.5 2.5 0 0 1 2.5-2.5Z"/><path d="M7 11h10M7 14h7"/></Svg>

export const UsersIcon = props => <Svg {...props}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.2a5 5 0 0 1 3 5.3"/></Svg>
export const AwardIcon = props => <Svg {...props}><circle cx="12" cy="9" r="5.5"/><path d="m9 13.8-1.5 7 4.5-2.4 4.5 2.4-1.5-7"/></Svg>
// Amenity icons (property detail page).
export const GymIcon = props => <Svg {...props}><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></Svg>
export const PoolIcon = props => <Svg {...props}><path d="M3 17c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0M3 20.5c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0M9 14V6a2 2 0 0 0-2-2M15 14V6a2 2 0 0 0-2-2M9 9h6M9 12h6"/></Svg>
export const WifiIcon = props => <Svg {...props}><path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></Svg>
export const ClubhouseIcon = props => <Svg {...props}><path d="M3.5 20.5h17M5 20.5V11l7-5 7 5v9.5M10 20.5v-5h4v5M12 6V2.5l3 1.2-3 1.2"/></Svg>
export const HallIcon = props => <Svg {...props}><path d="M3 20.5h18M4 9.5h16L12 4ZM6.5 9.5v11M10.2 9.5v11M13.8 9.5v11M17.5 9.5v11"/></Svg>
export const TreeIcon = props => <Svg {...props}><path d="M12 21v-6M12 15c-3.6 0-6-2.2-6-5.2C6 6.5 8.7 3.5 12 3.5s6 3 6 6.3c0 3-2.4 5.2-6 5.2ZM9 21h6"/></Svg>
export const PlayIcon = props => <Svg {...props}><path d="M4 20.5 8 4h8l4 16.5M8 4l2 10M16 4l-2 10M9.5 14h5"/></Svg>
export const PowerIcon = props => <Svg {...props}><path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z"/></Svg>
export const RunIcon = props => <Svg {...props}><circle cx="14" cy="4.5" r="1.8"/><path d="m7 21 3.2-5.5 3 2.5V22M5.5 11.5 9 8.5l4 .5 2.5 3.5 3 1M10 8.8l-1 5.6"/></Svg>
export const ParkingIcon = props => <Svg {...props}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16.5v-9h3a2.6 2.6 0 0 1 0 5.2h-3"/></Svg>
export const ExpandIcon = props => <Svg {...props}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></Svg>

export const IndiaFlag = () => <svg className="india-flag" viewBox="0 0 30 20" width="22" height="15" role="img" aria-label="India"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#ff9933"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth=".7"/><circle cx="15" cy="10" r=".55" fill="#000080"/></svg>
