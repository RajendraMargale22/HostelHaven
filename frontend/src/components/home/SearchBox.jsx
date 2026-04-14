import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ location: '', minPrice: '', maxPrice: '', type: '' });
  const set = (field) => (e) => setSearch(p => ({ ...p, [field]: e.target.value }));

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (search.location) p.set('location', search.location);
    if (search.minPrice) p.set('minPrice', search.minPrice);
    if (search.maxPrice) p.set('maxPrice', search.maxPrice);
    if (search.type)     p.set('type', search.type);
    navigate(`/hostels${p.toString() ? '?' + p.toString() : ''}`);
  };

  return (
    <section className="search-section">
      <div className="search-box">
        <div className="search-box-title">
          <i className="fas fa-magnifying-glass"></i> Quick Search
        </div>
        <div className="search-grid">
          <div>
            <div className="search-field-label">
              <i className="fas fa-location-dot"></i> Location / Area
            </div>
            <input
              className="form-control"
              placeholder="Shivajinagar, Kothrud, Deccan..."
              value={search.location}
              onChange={set('location')}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div>
            <div className="search-field-label">
              <i className="fas fa-indian-rupee-sign"></i> Min Price
            </div>
            <input type="number" className="form-control" placeholder="₹ 3000"
              value={search.minPrice} onChange={set('minPrice')} />
          </div>
          <div>
            <div className="search-field-label">
              <i className="fas fa-indian-rupee-sign"></i> Max Price
            </div>
            <input type="number" className="form-control" placeholder="₹ 12000"
              value={search.maxPrice} onChange={set('maxPrice')} />
          </div>
          <div>
            <div className="search-field-label">
              <i className="fas fa-users"></i> Hostel Type
            </div>
            <select className="form-control" value={search.type} onChange={set('type')}>
              <option value="">All Types</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="co-ed">Co-ed / PG</option>
            </select>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleSearch}>
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>
    </section>
  );
}