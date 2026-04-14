import { AMENITY_ICONS } from '../../utils/constants';

// Usage: <AmenityChip label="WiFi" />
export default function AmenityChip({ label }) {
  const icon = AMENITY_ICONS[label] || 'fa-check';
  return (
    <span className="amenity-chip">
      <i className={`fas ${icon}`}></i> {label}
    </span>
  );
}