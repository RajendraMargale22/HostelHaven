import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { HERO_IMAGES } from '../../utils/constants';

export default function HeroSection() {
  return (
    <section className="hero">
      <Swiper
        className="hero-swiper"
        modules={[Autoplay, EffectFade]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1400}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        {HERO_IMAGES.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Hostel ${i + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          Pune's #1 Student Accommodation Platform
        </div>

        <h1>
          Find Your Perfect<br />
          <span className="highlight">Home Away</span> From Home
        </h1>

        <p>
          Verified, affordable hostels and PGs near top colleges in Pune.
          No brokerage. No hidden charges.
        </p>

        <div className="hero-actions">
          <Link to="/hostels" className="btn btn-primary btn-xl">
            <i className="fas fa-search"></i> Browse Hostels
          </Link>
          <a href="#about" className="btn btn-outline-white btn-xl">
            <i className="fas fa-circle-info"></i> Learn More
          </a>
        </div>

        <div className="hero-stats-bar">
          {[
            { value: '200+',   label: 'Verified Listings' },
            { value: '1,500+', label: 'Happy Students' },
            { value: '15+',    label: 'Areas in Pune' },
            { value: '5★',     label: 'Student Rating' },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{ display: 'contents' }}>
              <div className="hero-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
              {i < arr.length - 1 && <div className="hero-stat-divider"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}