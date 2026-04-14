// ── Fallback hostel data (used when API is down) ──────
export const FALLBACK_HOSTELS = [
  { _id: '1', name: 'Neelambari Girls PG', location: 'Sadashiv Peth, Laxmi Road, Pune 411030', price: 7000, type: 'girls', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80', images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'], amenities: ['WiFi', 'Laundry', '24/7 Security', 'Mess Available', 'CCTV'], mapLink: 'https://maps.app.goo.gl/UBQVG9gVYs5vUZdV8' },
  { _id: '2', name: 'Tenanto Kanse Boys Hostel', location: 'Deccan Gymkhana, Pune 411004', price: 5000, type: 'boys', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'], amenities: ['WiFi', 'Parking', 'CCTV'], mapLink: 'https://maps.app.goo.gl/3t1VuzU1mpJgao1W6' },
  { _id: '3', name: 'Baramati Boys Hostel', location: 'Gokhalenagar, Pune 411016', price: 7500, type: 'boys', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'], amenities: ['WiFi', 'AC Rooms', 'Laundry', 'Mess', 'Hot Water'], mapLink: 'https://maps.app.goo.gl/QQBbQQYcV9Y1T5Lp8' },
  { _id: '4', name: 'Dinanath Boys Hostel', location: 'Katraj, Pune 411046', price: 4500, type: 'boys', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'], amenities: ['WiFi', '24/7 Security'], mapLink: 'https://maps.app.goo.gl/o4VtGQCYcVvssckW6' },
  { _id: '5', name: 'Pune Boys Hostel', location: 'Gokhalenagar, Pune 411016', price: 6000, type: 'boys', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80', images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'], amenities: ['WiFi', 'Parking', 'CCTV', 'Mess'], mapLink: 'https://maps.app.goo.gl/HqEEYAh4hmzfw8j2A' },
  { _id: '6', name: 'Shivajinagar Co-ed PG', location: 'J.M. Road, Shivajinagar, Pune 411005', price: 8000, type: 'co-ed', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80', images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'], amenities: ['WiFi', 'AC', 'Laundry', 'Security', 'Mess', 'Gym'], mapLink: 'https://maps.google.com' },
  { _id: '7', name: 'Kothrud Student PG', location: 'Kothrud, Pune 411038', price: 6500, type: 'co-ed', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'], amenities: ['WiFi', 'AC', 'Mess', 'CCTV'], mapLink: 'https://maps.google.com' },
  { _id: '8', name: 'Aundh Girls Hostel', location: 'Aundh, Pune 411007', price: 7200, type: 'girls', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=80', images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80'], amenities: ['WiFi', 'CCTV', 'Laundry', 'Mess', 'Hot Water'], mapLink: 'https://maps.google.com' },
  { _id: '9', name: 'Pimpri Boys PG', location: 'Pimpri-Chinchwad, Pune 411018', price: 4000, type: 'boys', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'], amenities: ['WiFi', 'Parking'], mapLink: 'https://maps.google.com' },
];

// ── Formatters ────────────────────────────────────────
export const formatPrice = (price) =>
  Number(price).toLocaleString('en-IN');

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// ── Amenity icon map ──────────────────────────────────
export const AMENITY_ICONS = {
  'WiFi': 'fa-wifi',
  'AC': 'fa-snowflake',
  'AC Rooms': 'fa-snowflake',
  'Mess': 'fa-utensils',
  'Mess Available': 'fa-utensils',
  'Laundry': 'fa-shirt',
  'CCTV': 'fa-video',
  'Parking': 'fa-car',
  '24/7 Security': 'fa-shield-halved',
  'Security': 'fa-shield-halved',
  'Hot Water': 'fa-fire',
  'Gym': 'fa-dumbbell',
};

// ── Hero swiper images ────────────────────────────────
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
];