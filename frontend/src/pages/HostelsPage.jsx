import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import hostelApi from '../api/hostelApi';
import { FALLBACK_HOSTELS } from '../utils/fallbackData';
import HostelCard from '../components/hostel/HostelCard';
import HostelGrid from '../components/hostel/HostelGrid';
import AddHostelModal from '../components/auth/AddHostelModal';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import '../styles/hostels.css';

export default function HostelsPage() {
  const { user }        = useAuth();
  const { showToast }   = useToast();
  const [searchParams]  = useSearchParams();

  const [hostels,   setHostels]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showAdd,   setShowAdd]   = useState(false);
  const [activeType, setActiveType] = useState(searchParams.get('type') || '');
  const [sort,      setSort]      = useState('newest');
  const [filters,   setFilters]   = useState({
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  useEffect(() => { loadHostels(); }, []);

  const loadHostels = async (customFilters) => {
    setLoading(true);
    const f = customFilters || { ...filters, type: activeType };
    try {
      const { data } = await hostelApi.getAll(f);
      setHostels(sortHostels(data, sort));
    } catch {
      let fallback = FALLBACK_HOSTELS;
      if (f.location) fallback = fallback.filter(h => h.location.toLowerCase().includes(f.location.toLowerCase()));
      if (f.type)     fallback = fallback.filter(h => h.type === f.type);
      if (f.minPrice) fallback = fallback.filter(h => h.price >= Number(f.minPrice));
      if (f.maxPrice) fallback = fallback.filter(h => h.price <= Number(f.maxPrice));
      setHostels(sortHostels(fallback, sort));
    } finally { setLoading(false); }
  };

  const sortHostels = (list, s) => {
    if (s === 'price-asc')  return [...list].sort((a, b) => a.price - b.price);
    if (s === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  };

  const handleApply = () => {
    loadHostels({ ...filters, type: activeType });
  };

  const handleClear = () => {
    setFilters({ location: '', minPrice: '', maxPrice: '' });
    setActiveType('');
    setSort('newest');
    loadHostels({ location: '', minPrice: '', maxPrice: '', type: '' });
  };

  const handleListHostel = () => {
    if (!user) { showToast('Please login to list a hostel', 'info'); return; }
    setShowAdd(true);
  };

  return (
    <div className="hostels-page-wrap">
      <div className="page-banner">
        <div className="page-banner-inner">
          <h1>Browse Hostels in Pune</h1>
          <p>Find verified, affordable student accommodation near your college</p>
          <div className="breadcrumb-bar">
            <a href="/">Home</a>
            <i className="fas fa-chevron-right"></i>
            <span>Hostels</span>
          </div>
        </div>
      </div>

      <div className="hostels-layout">
        {/* Filters sidebar */}
        <aside className="filters-panel">
          <div className="filters-panel-header">
            <h3><i className="fas fa-sliders-h"></i> Filters</h3>
            <button className="btn-clear-filters" onClick={handleClear}>Clear All</button>
          </div>
          <div className="filters-panel-body">
            <div className="filter-group">
              <label className="filter-label">Location / Area</label>
              <input type="text" className="form-control" placeholder="Shivajinagar, Kothrud..."
                value={filters.location}
                onChange={e => setFilters(p => ({ ...p, location: e.target.value }))}
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">Price Range (₹/month)</label>
              <div className="price-inputs">
                <input type="number" className="form-control" placeholder="Min"
                  value={filters.minPrice}
                  onChange={e => setFilters(p => ({ ...p, minPrice: e.target.value }))}
                />
                <input type="number" className="form-control" placeholder="Max"
                  value={filters.maxPrice}
                  onChange={e => setFilters(p => ({ ...p, maxPrice: e.target.value }))}
                />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Hostel Type</label>
              <div className="type-buttons">
                {['', 'boys', 'girls', 'co-ed'].map(t => (
                  <button key={t}
                    className={`type-btn${activeType === t ? ' active' : ''}`}
                    onClick={() => setActiveType(t)}
                  >
                    {t === '' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select className="form-control sort-select"
                value={sort}
                onChange={e => { setSort(e.target.value); setHostels(sortHostels(hostels, e.target.value)); }}
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="filters-apply">
            <button className="btn btn-primary btn-block" onClick={handleApply}>
              <i className="fas fa-search"></i> Apply Filters
            </button>
          </div>
        </aside>

        {/* Listings */}
        <main className="hostels-main">
          <div className="hostels-toolbar">
            <div className="toolbar-left">
              <h2>Available Hostels</h2>
              <div className="result-count">
                {loading ? 'Loading...' : `${hostels.length} hostel${hostels.length !== 1 ? 's' : ''} found`}
              </div>
            </div>
            <div className="toolbar-right">
              <button className="btn btn-teal btn-sm" onClick={handleListHostel}>
                <i className="fas fa-plus"></i> List Your Hostel
              </button>
            </div>
          </div>

          {loading ? (
            <div className="spinner-wrap"><div className="spinner"></div><p>Loading hostels...</p></div>
          ) : hostels.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏠</div>
              <h3>No hostels found</h3>
              <p>Try different filters or clear them</p>
              <button className="btn btn-primary btn-sm mt-3" onClick={handleClear}>Clear Filters</button>
            </div>
          ) : (
            <div className="hostels-grid">
              {hostels.map(h => (
                <HostelCard key={h._id} hostel={h} onDeleted={() => loadHostels()} />
              ))}
            </div>
          )}
        </main>
      </div>

      <AddHostelModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSuccess={() => loadHostels()} />
    </div>
  );
}