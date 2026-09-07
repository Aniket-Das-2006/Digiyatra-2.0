import React, { useState, useRef } from 'react';
import SearchWidget from '../components/SearchWidget';
import OfferCard from '../components/OfferCard';
import MobileAppBanner from '../components/MobileAppBanner';
import BackgroundDecorations from '../components/BackgroundDecorations';
import { Star, Volume2, VolumeX } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './pages.css';

const HotelsPage = () => {
  const [hotelsRef, hotelsVisible] = useScrollReveal();
  const [offersRef, offersVisible] = useScrollReveal();
  const [destRef, destVisible] = useScrollReveal();
  const [bannerRef, bannerVisible] = useScrollReveal({ threshold: 0.05 });
  
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const topHotels = [
    { name: 'The Taj Garden Dubai', price: '₹5,297', rating: 4.5, reviews: 267, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
    { name: 'The Taj Garden Dubai', price: '₹5,297', rating: 4.5, reviews: 267, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
    { name: 'The Taj Garden Dubai', price: '₹5,297', rating: 4.5, reviews: 267, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
    { name: 'The Taj Garden Dubai', price: '₹5,297', rating: 4.5, reviews: 267, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80' },
  ];

  const destinations = [
    { name: 'New Delhi', count: '8,342 Properties', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80' },
    { name: 'Goa', count: '2,405 Properties', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
    { name: 'Chennai', count: '2,429 Properties', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?w=400&q=80' },
    { name: 'Mumbai', count: '3,624 Properties', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&q=80' },
    { name: 'Kolkata', count: '10,577 Properties', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80' },
  ];

  const offers = [
    { title: '45% Off', subtitle: 'on domestic hotels', code: 'Use: FLAT45', gradient: 'linear-gradient(135deg, #a8e6cf, #dcedc1)', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80' },
    { title: 'Flat 15% Off', subtitle: 'On domestic hotels with HSBC credit card + EMI', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png' },
    { title: 'Flat ₹700 Off', subtitle: 'On domestic hotels with HDFC credit card + EMI', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png' },
    { title: 'Flat 15% Off', subtitle: 'On hotels with HDFC credit card + EMI', gradient: 'linear-gradient(135deg, #ff6a88, #ffb199)', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png' },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero — video is position:fixed inside, stays locked at viewport top */}
      <section className="hero hotel-hero">
        <video 
          ref={videoRef}
          className="hero-video"
          src="/HC.mp4"
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          preload="auto"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Your journey,<br/>Just a Tap Away</h1>
          <p>Search & book hotels, resorts and stays with one easy search</p>
        </div>
      </section>

      {/* Content below hero — solid bg scrolls OVER the fixed video */}
      <div className="below-hero-content">
        <BackgroundDecorations />
        <div className="container">
          <SearchWidget />

          <section
            ref={hotelsRef}
            className={`top-hotels-section animate-on-scroll ${hotelsVisible ? 'is-visible' : ''}`}
          >
            <div className="section-header">
              <div>
                <span className="section-subtitle">Best Properties Discovered</span>
                <h2 className="section-title">Top Hotels in Dubai</h2>
              </div>
              <div className="filter-tabs">
                <button className="filter-tab active">Hotel</button>
                <button className="filter-tab">Flight</button>
              </div>
            </div>
            <div className="hotels-grid">
              {topHotels.map((hotel, i) => (
                <div className="hotel-card" key={i}>
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} loading="lazy" />
                    <div className="hotel-image-overlay">
                      <span className="hotel-view-btn">View Details</span>
                    </div>
                  </div>
                  <div className="hotel-info">
                    <h4>{hotel.name}</h4>
                    <div className="hotel-meta">
                      <div className="hotel-rating">
                        <Star size={12} fill="#facc15" stroke="#facc15" />
                        <span>{hotel.rating}</span>
                        <span className="review-count">({hotel.reviews} Reviews)</span>
                      </div>
                      <span className="hotel-price">{hotel.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={offersRef}
            className={`offers-section animate-on-scroll ${offersVisible ? 'is-visible' : ''}`}
          >
            <div className="section-header">
              <div>
                <span className="section-subtitle">Offers for you</span>
                <h2 className="section-title">Best offers for you</h2>
              </div>
              <button className="btn-secondary">View All</button>
            </div>
            <div className="offers-grid">
              {offers.map((o, i) => (
                <OfferCard key={i} {...o} />
              ))}
            </div>
          </section>

          <section
            ref={destRef}
            className={`destinations-section animate-on-scroll ${destVisible ? 'is-visible' : ''}`}
          >
            <div className="section-header">
              <div>
                <span className="section-subtitle">Filter Route</span>
                <h2 className="section-title">Popular Destinations</h2>
              </div>
              <button className="btn-secondary">View All</button>
            </div>
            <div className="destinations-grid">
              {destinations.map((d, i) => (
                <div className="destination-card" key={i}>
                  <div className="dest-image-wrapper">
                    <img src={d.image} alt={d.name} loading="lazy" />
                    <div className="dest-overlay">
                      <h3>{d.name}</h3>
                    </div>
                  </div>
                  <div className="dest-footer">
                    <span>{d.count} →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div
          ref={bannerRef}
          className={`animate-on-scroll ${bannerVisible ? 'is-visible' : ''}`}
        >
          <MobileAppBanner />
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
