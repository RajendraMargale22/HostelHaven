import { useState, useEffect, useCallback } from 'react';
import hostelApi from '../api/hostelApi';
import { FALLBACK_HOSTELS } from '../utils/data';

/**
 * useHostels — fetch, filter, sort hostels
 * @param {object} initialFilters - { location, type, minPrice, maxPrice }
 */
export function useHostels(initialFilters = {}) {
  const [hostels,  setHostels]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [filters,  setFilters]  = useState(initialFilters);

  const sort = useCallback((list, order) => {
    if (order === 'price-asc')  return [...list].sort((a, b) => a.price - b.price);
    if (order === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    return list; // newest — default from API
  }, []);

  const fetch = useCallback(async (overrideFilters, sortOrder = 'newest') => {
    setLoading(true);
    setError(null);
    const f = overrideFilters ?? filters;
    try {
      const { data } = await hostelApi.getAll(f);
      setHostels(sort(data, sortOrder));
    } catch (err) {
      setError(err.message);
      // Apply filters to fallback data
      let fallback = FALLBACK_HOSTELS;
      if (f.location) fallback = fallback.filter(h => h.location.toLowerCase().includes(f.location.toLowerCase()));
      if (f.type)     fallback = fallback.filter(h => h.type === f.type);
      if (f.minPrice) fallback = fallback.filter(h => h.price >= Number(f.minPrice));
      if (f.maxPrice) fallback = fallback.filter(h => h.price <= Number(f.maxPrice));
      setHostels(sort(fallback, sortOrder));
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  useEffect(() => { fetch(); }, []);

  return { hostels, loading, error, fetch, setFilters, sort, setHostels };
}