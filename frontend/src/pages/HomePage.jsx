import { useState, useEffect } from 'react';
import hostelApi from '../api/hostelApi';
import { FALLBACK_HOSTELS } from '../utils/fallbackData';
import HeroSection     from '../components/home/HeroSection';
import SearchBox       from '../components/home/SearchBox';
import FeaturedSection from '../components/home/FeaturedSection';
import WhySection      from '../components/home/WhySection';
import GallerySection  from '../components/home/GallerySection';
import AboutSection    from '../components/home/AboutSection';
import ContactSection  from '../components/home/ContactSection';
import '../styles/index.css';

export default function HomePage() {
  const [hostels,  setHostels]  = useState([]);
  const [gallery,  setGallery]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => { loadFeatured(); }, []);

  const loadFeatured = async () => {
    setLoading(true);
    try {
      const { data } = await hostelApi.getAll();
      setHostels(data.slice(0, 6));
      setGallery(data.slice(0, 5));
    } catch {
      setHostels(FALLBACK_HOSTELS.slice(0, 6));
      setGallery(FALLBACK_HOSTELS.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroSection />

      {/* Features strip sits inside SearchBox component below hero */}
      <SearchBox />

      <FeaturedSection
        hostels={hostels}
        loading={loading}
        onDeleted={loadFeatured}
      />

      <WhySection />

      <GallerySection gallery={gallery} />

      <AboutSection />

      <ContactSection />
    </>
  );
}