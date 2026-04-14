import { Link } from 'react-router-dom';
import { FALLBACK_HOSTELS } from '../../utils/constants';

export default function GallerySection({ gallery }) {
  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow amber"><i className="fas fa-images"></i> Gallery</div>
          <h2>See Inside Our Hostels</h2>
          <p>Real photos from verified listings across Pune</p>
          <div className="divider"></div>
        </div>
      </div>
      <div className="gallery-masonry">
        {gallery.map(h => (
          <div key={h._id} className="gallery-item">
            <img
              src={h.image || FALLBACK_HOSTELS[0].image}
              alt={h.name}
              loading="lazy"
              onError={e => { e.target.src = FALLBACK_HOSTELS[0].image; }}
            />
            <div className="gallery-caption">
              <Link to={`/hostels/${h._id}`}>
                <i className="fas fa-eye"></i> {h.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}