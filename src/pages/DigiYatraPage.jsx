import React, { useState, useRef } from 'react';
import SearchWidget from '../components/SearchWidget';
import SubMenuDrawer from '../components/SubMenuDrawer';
import CustomSidebar from '../components/CustomSidebar';
import OfferCard from '../components/OfferCard';
import BackgroundDecorations from '../components/BackgroundDecorations';
import FlightTracker from '../components/FlightTracker';
import BaggageTracker from '../components/BaggageTracker';
import SOSButton from '../components/SOSButton';
import IdentityWallet from '../components/IdentityWallet';
import TrustCenter from '../components/TrustCenter';
import ConsentManager from '../components/ConsentManager';
import DigiYatraChat from '../components/DigiYatraChat';
import BookingModal from '../components/BookingModal';
import PriceIntelligenceDashboard from '../components/PriceIntelligence';
import TripManager from '../components/TripManager';
import SmartAirportMap from '../components/SmartAirportMap';
import TravelAnalytics from '../components/TravelAnalytics';
import AccessibilityCenter from '../components/AccessibilityCenter';
import InternationalTravelAssistant from '../components/InternationalAssistant';
import TravelProfile from '../components/TravelProfile';
import WeatherIntelligence from '../components/WeatherIntelligence';
import CarbonOffsetCard from '../components/CarbonOffsetCard';
import NearbyTransport from '../components/NearbyTransport';
import MobileAppBanner from '../components/MobileAppBanner';
import { Plane, Luggage, Navigation, MapPin, Shield, FileCheck, Sparkles, BarChart3, Sun, Leaf, Globe, Bus, AlertTriangle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useDigiYatra } from '../context/DigiYatraContext';
import { destinations } from '../data/flightDatabase';
import { useTranslation } from 'react-i18next';
import './pages.css';

const DigiYatraPage = () => {
  const { t } = useTranslation();
  const [destRef, destVisible] = useScrollReveal();
  const [offersRef, offersVisible] = useScrollReveal();

  const { digiYatraSubView } = useDigiYatra();

  const [isMuted] = useState(true);
  const videoRef = useRef(null);

  const [hoveredDest, setHoveredDest] = useState(null);
  const [selectedDestId, setSelectedDestId] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const [activeTab, setActiveTab] = useState('sec-flight-tracker');

  // When subview changes, set the appropriate default active tab
  React.useEffect(() => {
    if (digiYatraSubView === 'utility') {
      setActiveTab(prev => prev && prev.startsWith('sec-') && ['sec-flight-tracker', 'sec-baggage', 'sec-trip-manager', 'sec-airport-map', 'sec-price-intel', 'sec-weather', 'sec-carbon', 'sec-transport', 'sec-sos'].includes(prev) ? prev : 'sec-flight-tracker');
    } else if (digiYatraSubView === 'authentication') {
      setActiveTab(prev => prev && prev.startsWith('sec-') && ['sec-identity-wallet', 'sec-consent', 'sec-trust', 'sec-profile', 'sec-analytics', 'sec-international'].includes(prev) ? prev : 'sec-identity-wallet');
    }
  }, [digiYatraSubView]);

  // Separate national and international for display
  const internationalDests = destinations.filter(d => d.type === 'international').slice(0, 5);
  const nationalDests = destinations.filter(d => d.type === 'national').slice(0, 5);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleBookNow = (dest) => {
    setSelectedDestId(dest.id);
    setShowBookingModal(true);
  };

  const allSidebarTabs = {
    utility: [
      { id: 'sec-flight-tracker', label: 'Flight Tracker', icon: <Plane size={15} /> },
      { id: 'sec-baggage', label: 'Baggage Tracker', icon: <Luggage size={15} /> },
      { id: 'sec-trip-manager', label: 'Trip Manager', icon: <Navigation size={15} /> },
      { id: 'sec-airport-map', label: 'Airport Map', icon: <MapPin size={15} /> },
      { id: 'sec-price-intel', label: 'Price Intel', icon: <BarChart3 size={15} /> },
      { id: 'sec-weather', label: 'Weather Intel', icon: <Sun size={15} /> },
      { id: 'sec-carbon', label: 'Carbon Offset', icon: <Leaf size={15} /> },
      { id: 'sec-transport', label: 'Nearby Transport', icon: <Bus size={15} /> },
      { id: 'sec-sos', label: 'Emergency SOS', icon: <AlertTriangle size={15} /> }
    ],
    authentication: [
      { id: 'sec-identity-wallet', label: 'Identity Wallet', icon: <Shield size={15} /> },
      { id: 'sec-consent', label: 'Consent Manager', icon: <FileCheck size={15} /> },
      { id: 'sec-trust', label: 'Trust Center', icon: <Sparkles size={15} /> },
      { id: 'sec-profile', label: 'Travel Profile', icon: <BarChart3 size={15} /> },
      { id: 'sec-analytics', label: 'Travel Analytics', icon: <BarChart3 size={15} /> },
      { id: 'sec-international', label: 'International Hub', icon: <Globe size={15} /> }
    ]
  };

  const sidebarTabs = digiYatraSubView ? allSidebarTabs[digiYatraSubView] : [];

  const offers = [
    { title: '45% Off', subtitle: 'on domestic flights', code: 'Use: FLAT45', gradient: 'linear-gradient(135deg, #a8e6cf, #dcedc1)', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80' },
    { title: 'Flat 15% Off', subtitle: 'On international flights with HSBC credit card', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)', image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg' },
    { title: 'Flat ₹700 Off', subtitle: 'On domestic flights with HDFC credit card', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
    { title: 'Flat 15% Off', subtitle: 'On flights with HDFC credit card + EMI', gradient: 'linear-gradient(135deg, #ff6a88, #ffb199)', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  ];

  return (
    <div className="page-wrapper">
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
          <h1>{t('hero.title')}<br />{t('hero.subtitle')}</h1>
          <p>{t('hero.desc')}</p>
        </div>
      </section>

      {/* Content below hero */}
      <div 
        className="below-hero-content"
        style={{
          '--dynamic-bg': hoveredDest ? `url(${hoveredDest.image})` : 'none',
          '--dynamic-color': hoveredDest ? hoveredDest.themeColor : 'transparent'
        }}
      >
        <div className="dynamic-background-overlay" />
        <BackgroundDecorations />
        
        {!digiYatraSubView ? (
          /* Default Old UI when no SubView is selected */
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div id="sec-search">
              <SearchWidget />
            </div>

            <section
              id="sec-destinations"
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
                      <div className="dest-overlay">
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
              id="sec-offers"
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

            <div id="sec-mobile-banner">
              <MobileAppBanner />
            </div>
          </div>
        ) : (
          /* Sidebar Layout when SubView is selected */
          <div className="container page-layout-wrapper">
            {/* Sidebar */}
            <CustomSidebar tabs={sidebarTabs} activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Main Content Area */}
            <div className="main-content-area">
              {activeTab === 'sec-search' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Search & Flight Booking</h3>
                    <p>Search, compare, and book flights quickly. Your booking is automatically linked to your DigiYatra ID.</p>
                  </div>
                  <SearchWidget />
                </div>
              )}
              
              {activeTab === 'sec-flight-tracker' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Live Flight Tracker & Boarding Pass</h3>
                    <p>View your upcoming flights and digital boarding pass. Gates and times sync in real-time.</p>
                  </div>
                  <FlightTracker />
                </div>
              )}
              
              {activeTab === 'sec-trip-manager' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Trip Itinerary Manager</h3>
                    <p>Organize your trips, hotels, and connecting flights all in one unified timeline.</p>
                  </div>
                  <TripManager />
                </div>
              )}
              
              {activeTab === 'sec-baggage' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Smart Baggage Tracking</h3>
                    <p>Track your checked bags using RFID/BLE scanning. Receive alerts upon arrival at the carousel.</p>
                  </div>
                  <BaggageTracker />
                </div>
              )}
              
              {activeTab === 'sec-airport-map' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Smart Airport Map</h3>
                    <p>Navigate terminals with step-by-step augmented reality directions and estimated walking times.</p>
                  </div>
                  <SmartAirportMap />
                </div>
              )}
              
              {activeTab === 'sec-identity-wallet' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Multi-Credential Wallet</h3>
                    <p>Manage your linked IDs (Aadhaar, Passport, DigiLocker). These enable seamless biometric entry.</p>
                  </div>
                  <IdentityWallet />
                </div>
              )}
              
              {activeTab === 'sec-consent' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Data Consent Manager</h3>
                    <p>Control who has access to your identity and travel data. Revoke permissions at any time.</p>
                  </div>
                  <ConsentManager />
                </div>
              )}
              
              {activeTab === 'sec-trust' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Trust & Compliance Score</h3>
                    <p>Monitor your verified trust score which enables faster security lanes and priority services.</p>
                  </div>
                  <TrustCenter />
                </div>
              )}
              
              {activeTab === 'sec-profile' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Travel Profile</h3>
                    <p>Customize your seat preferences, dietary requirements, and frequent flyer numbers.</p>
                  </div>
                  <TravelProfile />
                </div>
              )}
              
              {activeTab === 'sec-analytics' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Travel Analytics</h3>
                    <p>Review your travel history, miles flown, and favorite destinations across the year.</p>
                  </div>
                  <TravelAnalytics />
                </div>
              )}

              {activeTab === 'sec-price-intel' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>AI Price Intelligence</h3>
                    <p>Predict future flight prices and set alerts for when your desired route hits the lowest fare.</p>
                  </div>
                  <PriceIntelligenceDashboard />
                </div>
              )}
              
              {activeTab === 'sec-weather' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Destination Weather</h3>
                    <p>Check the forecast for your upcoming destination to pack appropriately.</p>
                  </div>
                  <WeatherIntelligence />
                </div>
              )}
              
              {activeTab === 'sec-carbon' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Carbon Offset & Eco</h3>
                    <p>Calculate and offset the carbon footprint of your journey. Contribute to green initiatives.</p>
                  </div>
                  <CarbonOffsetCard />
                </div>
              )}
              
              {activeTab === 'sec-international' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Passport & Visa Hub</h3>
                    <p>Check visa requirements, apply for e-Visas, and manage passport expiration alerts.</p>
                  </div>
                  <InternationalTravelAssistant />
                </div>
              )}
              
              {activeTab === 'sec-transport' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Nearby Transport & Cabs</h3>
                    <p>Pre-book cabs, track airport shuttles, or buy metro tickets directly upon arrival.</p>
                  </div>
                  <NearbyTransport />
                </div>
              )}
              
              {activeTab === 'sec-sos' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Emergency SOS Center</h3>
                    <p>Instantly alert airport security or your emergency contacts. One-tap medical assistance.</p>
                  </div>
                  <SOSButton />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {showBookingModal && (
        <BookingModal 
          destId={selectedDestId} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
      
      <DigiYatraChat />
    </div>
  );
};

export default DigiYatraPage;
