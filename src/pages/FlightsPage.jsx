import React, { useState, useRef } from 'react';
import SearchWidget from '../components/SearchWidget';
import OfferCard from '../components/OfferCard';
import BackgroundDecorations from '../components/BackgroundDecorations';
import LiveFlightSearch from '../components/LiveFlightSearch';
import { Volume2, VolumeX, Plane } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import { destinations } from '../data/flightDatabase';
import BookingModal from '../components/BookingModal';
import './pages.css';

const FlightsPage = () => {
  const [destRef, destVisible] = useScrollReveal();
  const [offersRef, offersVisible] = useScrollReveal();

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const [searchParams, setSearchParams] = useState(null);
  const [hoveredDest, setHoveredDest] = useState(null);
  const [selectedDestId, setSelectedDestId] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Separate national and international for display
  const internationalDests = destinations.filter(d => d.type === 'international').slice(0, 5);
  const nationalDests = destinations.filter(d => d.type === 'national').slice(0, 5);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Logic to show search results could be placed here
    console.log("Search initiated:", params);
  };

  const handleBookNow = (dest) => {
    setSelectedDestId(dest.id);
    setShowBookingModal(true);
  };

  const offers = [
    { title: '45% Off', subtitle: 'on domestic flights', code: 'Use: FLAT45', gradient: 'linear-gradient(135deg, #a8e6cf, #dcedc1)', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=300&q=80' },
    { title: 'Flat 15% Off', subtitle: 'On international flights with HSBC credit card', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)', image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png' },
    { title: 'Flat ₹700 Off', subtitle: 'On domestic flights with HDFC credit card', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png' },
    { title: 'Flat 15% Off', subtitle: 'On flights with HDFC credit card + EMI', gradient: 'linear-gradient(135deg, #ff6a88, #ffb199)', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png' },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero — video is position:fixed inside, stays locked at viewport top */}
      <section className="hero flight-hero">
        <video 
          ref={videoRef}
          className="hero-video"
          src="/HV.mp4"
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          preload="auto"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Your journey,<br/>Just a Tap Away</h1>
          <p>Search & book flights, hotels and more with one easy search</p>
        </div>
      </section>

      {/* Content below hero — solid bg scrolls OVER the fixed video */}
      <div 
        className="below-hero-content"
        style={{
          '--dynamic-bg': hoveredDest ? `url(${hoveredDest.image})` : 'none',
          '--dynamic-color': hoveredDest ? hoveredDest.themeColor : 'transparent'
        }}
      >
        <div className="dynamic-background-overlay" />
        <BackgroundDecorations />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <SearchWidget />

          <section
            ref={destRef}
            className={`destinations-section animate-on-scroll ${destVisible ? 'is-visible' : ''}`}
          >
            <div className="section-header">
              <div>
                <span className="section-subtitle">Popular International Routes</span>
                <h2 className="section-title">Popular International Destinations</h2>
              </div>
              <button className="btn-secondary">View All</button>
            </div>
            <div className="destinations-grid">
              {internationalDests.map((d, i) => (
                <div 
                  className="destination-card" 
                  key={d.id}
                  onMouseEnter={() => setHoveredDest(d)}
                  onMouseLeave={() => setHoveredDest(null)}
                  onClick={() => handleBookNow(d)}
                >
                  <div className="dest-image-wrapper">
                    <img src={d.image} alt={d.name} loading="lazy" />
                    <div className="dest-overlay" style={{ background: `linear-gradient(to top, ${d.themeColor}dd, transparent)` }}>
                      <h3>{d.name}</h3>
                      <p className="dest-desc">{d.description}</p>
                    </div>
                  </div>
                  <div className="dest-footer">
                    <span>{d.flights} Flights →</span>
                    <button className="book-mini-btn" style={{ background: d.themeColor }}>Book</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* National Destinations Section */}
          <section className="destinations-section animate-on-scroll is-visible" style={{ marginTop: '60px' }}>
            <div className="section-header">
              <div>
                <span className="section-subtitle">Domestic Travel</span>
                <h2 className="section-title">Explore Incredible India</h2>
              </div>
              <button className="btn-secondary">View All</button>
            </div>
            <div className="destinations-grid">
              {nationalDests.map((d, i) => (
                <div 
                  className="destination-card" 
                  key={d.id}
                  onMouseEnter={() => setHoveredDest(d)}
                  onMouseLeave={() => setHoveredDest(null)}
                  onClick={() => handleBookNow(d)}
                >
                  <div className="dest-image-wrapper">
                    <img src={d.image} alt={d.name} loading="lazy" />
                    <div className="dest-overlay" style={{ background: `linear-gradient(to top, ${d.themeColor}dd, transparent)` }}>
                      <h3>{d.name}</h3>
                      <p className="dest-desc">{d.description}</p>
                    </div>
                  </div>
                  <div className="dest-footer">
                    <span>{d.flights} Flights →</span>
                    <button className="book-mini-btn" style={{ background: d.themeColor }}>Book</button>
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
        </div>
      </div>
      
      {showBookingModal && (
        <BookingModal 
          destId={selectedDestId} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
    </div>
  );
};

export default FlightsPage;
