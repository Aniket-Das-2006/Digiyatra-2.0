import React, { useState, useRef } from 'react';
import SearchWidget from '../components/SearchWidget';
import SubMenuDrawer from '../components/SubMenuDrawer';
import CustomSidebar from '../components/CustomSidebar';
import OfferCard from '../components/OfferCard';
import MobileAppBanner from '../components/MobileAppBanner';
import BackgroundDecorations from '../components/BackgroundDecorations';
import FormCWizard from '../components/FormCWizard';
import HotelRoomStatus from '../components/HotelRoomStatus';
import HotelBillPayments from '../components/HotelBillPayments';
import WeatherIntelligence from '../components/WeatherIntelligence';
import NearbyTransport from '../components/NearbyTransport';
import { Star, Shield, CheckCircle2, MapPin, Building2, Key, Receipt, FileCheck, Tag, Globe, Sun, Bus } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useDigiYatra } from '../context/DigiYatraContext';
import './pages.css';

const HotelsStayPage = () => {
  const [hotelsRef, hotelsVisible] = useScrollReveal();
  const [offersRef, offersVisible] = useScrollReveal();
  const [destRef, destVisible] = useScrollReveal();
  const [bannerRef, bannerVisible] = useScrollReveal({ threshold: 0.05 });

  const { hotelBooking, identity, hotelSubView } = useDigiYatra();

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('sec-checkin-status');

  // When subview changes, set the appropriate default active tab
  React.useEffect(() => {
    if (hotelSubView === 'checkin') setActiveTab('sec-checkin-status');
    else if (hotelSubView === 'compliance') setActiveTab('sec-form-c');
  }, [hotelSubView]);

  const checkinSteps = [
    { label: 'Booked', status: 'completed' },
    { label: 'Identity', status: 'completed' },
    { label: 'Consent', status: 'completed' },
    { label: 'Check-in', status: 'active' },
  ];
  const topHotels = [
    { name: 'The Taj Mahal Palace, Mumbai', price: '₹14,500', rating: 4.9, reviews: 1420, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
    { name: 'The Leela Palace, New Delhi', price: '₹12,800', rating: 4.8, reviews: 980, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
    { name: 'ITC Grand Chola, Chennai', price: '₹9,900', rating: 4.7, reviews: 850, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
    { name: 'JW Marriott, Bengaluru', price: '₹11,200', rating: 4.8, reviews: 1100, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80' },
  ];

  const destinations = [
    { name: 'New Delhi', count: '8,342 Properties', description: 'Experience the rich history and modern energy of the capital.', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80' },
    { name: 'Mumbai', count: '3,624 Properties', description: 'The city of dreams, bustling streets, and sea views.', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&q=80' },
    { name: 'Bengaluru', count: '1,892 Properties', description: 'The Silicon Valley of India, known for its pleasant weather and parks.', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80' },
    { name: 'Goa', count: '2,405 Properties', description: 'Relax on pristine beaches and explore vibrant nightlife.', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
    { name: 'Kolkata', count: '10,577 Properties', description: 'Immerse yourself in arts, culture, and colonial architecture.', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80' },
  ];

  const offers = [
    { title: '45% Off', subtitle: 'on domestic hotels', code: 'Use: FLAT45', gradient: 'linear-gradient(135deg, #a8e6cf, #dcedc1)', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80' },
    { title: 'Flat 15% Off', subtitle: 'On domestic hotels with HSBC credit card + EMI', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)', image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg' },
    { title: 'Flat ₹700 Off', subtitle: 'On domestic hotels with HDFC credit card + EMI', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
    { title: 'Flat 15% Off', subtitle: 'On hotels with HDFC credit card + EMI', gradient: 'linear-gradient(135deg, #ff6a88, #ffb199)', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80', bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  ];

  const allSidebarTabs = {
    checkin: [
      { id: 'sec-checkin-status', label: 'Check-in Status', icon: <Shield size={15} /> },
      { id: 'sec-room-status', label: 'Digital Key & Room', icon: <Key size={15} /> },
      { id: 'sec-bill-payments', label: 'Bill Payments', icon: <Receipt size={15} /> },
      { id: 'sec-transport', label: 'Nearby Transport', icon: <Bus size={15} /> }
    ],
    compliance: [
      { id: 'sec-form-c', label: 'Form C Compliance', icon: <FileCheck size={15} /> },
      { id: 'sec-weather', label: 'Weather Intel', icon: <Sun size={15} /> }
    ]
  };

  const sidebarTabs = hotelSubView ? allSidebarTabs[hotelSubView] : [];

  return (
    <div className="page-wrapper">
      <section className="hero hotel-hero">
        <video ref={videoRef} className="hero-video" src="/HC.mp4" autoPlay loop muted={isMuted} playsInline preload="auto" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>DigiYatra 2.0<br />Stay Verified, Stay Easy</h1>
          <p>Digital check-in, biometric access & compliance — all in one place</p>
        </div>
      </section>

      <div className="below-hero-content">
        <BackgroundDecorations />
        
        {!hotelSubView ? (
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div id="sec-hotel-search">
              <SearchWidget />
            </div>

            <section id="sec-top-hotels" ref={hotelsRef} className={`top-hotels-section animate-on-scroll ${hotelsVisible ? 'is-visible' : ''}`}>
              <div className="section-header">
                <div>
                  <span className="section-subtitle">DigiYatra Verified Properties</span>
                  <h2 className="section-title">Top Hotels in Mumbai</h2>
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
                      {hotel.accessible && (
                        <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#0a4cd9', color: 'white', padding: '2px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: 700 }}>Accessible</span>
                      )}
                    </div>
                    <div className="hotel-info">
                      <h4>{hotel.name}</h4>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={10} /> {hotel.distance}
                      </div>
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

            <section id="sec-destinations" ref={destRef} className={`destinations-section animate-on-scroll ${destVisible ? 'is-visible' : ''}`}>
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
                        <p className="dest-desc">{d.description}</p>
                      </div>
                    </div>
                    <div className="dest-footer"><span>{d.count} →</span></div>
                  </div>
                ))}
              </div>
            </section>

            <section id="sec-hotel-offers" ref={offersRef} className={`offers-section animate-on-scroll ${offersVisible ? 'is-visible' : ''}`}>
              <div className="section-header">
                <div>
                  <span className="section-subtitle">Offers for you</span>
                  <h2 className="section-title">Best offers for you</h2>
                </div>
                <button className="btn-secondary">View All</button>
              </div>
              <div className="offers-grid">
                {offers.map((o, i) => <OfferCard key={i} {...o} />)}
              </div>
            </section>
            
            <div id="sec-mobile-banner" ref={bannerRef} className={`animate-on-scroll ${bannerVisible ? 'is-visible' : ''}`}>
              <MobileAppBanner />
            </div>
          </div>
        ) : (
          <div className="container page-layout-wrapper">
            
            <CustomSidebar tabs={sidebarTabs} activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="main-content-area">
              {activeTab === 'sec-hotel-search' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Hotel Search</h3>
                    <p>Find and book DigiYatra-verified hotels. Enjoy express check-in upon arrival.</p>
                  </div>
                  <SearchWidget />
                </div>
              )}

              {activeTab === 'sec-checkin-status' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>DigiYatra Hotel Check-in</h3>
                    <p>Track your automated digital check-in progress based on your biometrics and bookings.</p>
                  </div>
                  <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.06)', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Shield size={16} /> Check-in Status
                    </h3>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 16px' }}>{hotelBooking.hotelName} — Room {hotelBooking.roomNumber}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '16px' }}>
                      {checkinSteps.map((step, i) => (
                        <React.Fragment key={i}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '50%',
                              background: step.status === 'completed' ? '#16a34a' : step.status === 'active' ? '#0a4cd9' : '#e2e8f0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: step.status === 'upcoming' ? '#94a3b8' : 'white', fontSize: '12px', fontWeight: 700,
                              boxShadow: step.status === 'active' ? '0 0 0 4px rgba(10,76,217,0.2)' : 'none',
                            }}>
                              {step.status === 'completed' ? <CheckCircle2 size={16} /> : i + 1}
                            </div>
                            <span style={{ fontSize: '9px', color: step.status === 'active' ? '#0a4cd9' : '#64748b', fontWeight: step.status === 'active' ? 800 : 600, marginTop: '4px', textAlign: 'center' }}>
                              {step.label}
                            </span>
                          </div>
                          {i < checkinSteps.length - 1 && (
                            <div style={{ height: '2px', flex: 0.5, background: i < 3 ? '#16a34a' : '#e2e8f0', marginBottom: '18px' }} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sec-room-status' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Digital Key & Room Access</h3>
                    <p>Use your phone or biometrics to unlock your room. Adjust temperature and lighting before arrival.</p>
                  </div>
                  <HotelRoomStatus />
                </div>
              )}

              {activeTab === 'sec-bill-payments' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Folio & Bill Breakdown</h3>
                    <p>Review real-time charges and split your bill. Express checkout allows you to just walk out.</p>
                  </div>
                  <HotelBillPayments />
                </div>
              )}

              {activeTab === 'sec-form-c' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Form C Compliance Wizard</h3>
                    <p>For international travelers: automatically fill and submit Form C using your DigiYatra ID.</p>
                  </div>
                  <FormCWizard />
                </div>
              )}

              {activeTab === 'sec-weather' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Destination Weather</h3>
                    <p>Get real-time weather forecasts around your hotel.</p>
                  </div>
                  <WeatherIntelligence />
                </div>
              )}

              {activeTab === 'sec-transport' && (
                <div className="function-detail-view">
                  <div className="function-guide">
                    <h3>Nearby Transport</h3>
                    <p>Find transit options to travel locally around your stay.</p>
                  </div>
                  <NearbyTransport />
                </div>
              )}

              {activeTab === 'sec-top-hotels' && (
                <div className="function-detail-view">
                  <section id="sec-top-hotels" ref={hotelsRef} className={`top-hotels-section animate-on-scroll ${hotelsVisible ? 'is-visible' : ''}`}>
                    <div className="section-header">
                      <div>
                        <span className="section-subtitle">DigiYatra Verified Properties</span>
                        <h2 className="section-title">Top Hotels in Mumbai</h2>
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
                            {hotel.accessible && (
                              <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#0a4cd9', color: 'white', padding: '2px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: 700 }}>Accessible</span>
                            )}
                          </div>
                          <div className="hotel-info">
                            <h4>{hotel.name}</h4>
                            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <MapPin size={10} /> {hotel.distance}
                            </div>
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
                </div>
              )}

              {activeTab === 'sec-hotel-offers' && (
                <div className="function-detail-view">
                  <section id="sec-hotel-offers" ref={offersRef} className={`offers-section animate-on-scroll ${offersVisible ? 'is-visible' : ''}`}>
                    <div className="section-header">
                      <div>
                        <span className="section-subtitle">Offers for you</span>
                        <h2 className="section-title">Best offers for you</h2>
                      </div>
                      <button className="btn-secondary">View All</button>
                    </div>
                    <div className="offers-grid">
                      {offers.map((o, i) => <OfferCard key={i} {...o} />)}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'sec-destinations' && (
                <div className="function-detail-view">
                  <section id="sec-destinations" ref={destRef} className={`destinations-section animate-on-scroll ${destVisible ? 'is-visible' : ''}`}>
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
                            <div className="dest-overlay"><h3>{d.name}</h3></div>
                          </div>
                          <div className="dest-footer"><span>{d.count} →</span></div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'sec-mobile-banner' && (
                <div className="function-detail-view">
                  <div id="sec-mobile-banner" ref={bannerRef} className={`animate-on-scroll ${bannerVisible ? 'is-visible' : ''}`}>
                    <MobileAppBanner />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsStayPage;
