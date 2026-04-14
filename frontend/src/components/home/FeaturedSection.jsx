import { Link } from 'react-router-dom';
import HostelCard from '../hostel/HostelCard';
import Spinner from '../ui/Spinner';

export default function FeaturedSection({ hostels, loading, onDeleted }) {
  return (
    <section className="featured-section" id="hostels">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow"><i className="fas fa-fire"></i> Featured</div>
          <h2>Popular Hostels in Pune</h2>
          <p>Hand-picked, verified accommodations loved by students</p>
          <div className="divider"></div>
        </div>

        {loading ? (
          <Spinner label="Loading hostels..." />
        ) : (
          <div className="cards-grid">
            {hostels.map(h => (
              <HostelCard key={h._id} hostel={h} onDeleted={onDeleted} />
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/hostels" className="btn btn-secondary btn-lg">
            View All Hostels <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}