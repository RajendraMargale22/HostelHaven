// ── API Base URL ──────────────────────────────────────
export const API_URL =
  import.meta.env.VITE_API_URL || 'https://hostelhaven-backend.onrender.com/api';

// ── Local storage keys ────────────────────────────────
export const TOKEN_KEY = 'hh_token';
export const USER_KEY  = 'hh_user';

// ── Hostel types ──────────────────────────────────────
export const HOSTEL_TYPES = [
  { value: '',      label: 'All Types' },
  { value: 'boys',  label: 'Boys' },
  { value: 'girls', label: 'Girls' },
  { value: 'co-ed', label: 'Co-ed / PG' },
];

// ── Booking durations ─────────────────────────────────
export const DURATIONS = [
  { value: '1',  label: '1 Month' },
  { value: '3',  label: '3 Months' },
  { value: '6',  label: '6 Months' },
  { value: '12', label: '12 Months' },
];

// ── Booking status options ────────────────────────────
export const BOOKING_STATUSES = ['pending', 'confirmed', 'rejected', 'cancelled'];

// ── Sort options ──────────────────────────────────────
export const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

// ── Amenity icon map ──────────────────────────────────
export const AMENITY_ICONS = {
  'WiFi':           'fa-wifi',
  'AC':             'fa-snowflake',
  'AC Rooms':       'fa-snowflake',
  'Mess':           'fa-utensils',
  'Mess Available': 'fa-utensils',
  'Laundry':        'fa-shirt',
  'CCTV':           'fa-video',
  'Parking':        'fa-car',
  '24/7 Security':  'fa-shield-halved',
  'Security':       'fa-shield-halved',
  'Hot Water':      'fa-fire',
  'Gym':            'fa-dumbbell',
};

// ── Hero slide images ─────────────────────────────────
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
];

// ── Fallback image ────────────────────────────────────
export const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80';

// ── Nav links ─────────────────────────────────────────
export const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/hostels', label: 'Hostels' },
  { to: '/#about',  label: 'About' },
  { to: '/#contact',label: 'Contact' },
];

// ── Fallback hostel data (re-exported from fallbackData) ──
export { FALLBACK_HOSTELS, FALLBACK_GALLERY, FALLBACK_FEATURED } from './fallbackData';