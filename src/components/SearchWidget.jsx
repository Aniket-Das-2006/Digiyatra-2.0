import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plane, Building2, ArrowRightLeft, Calendar, User, Search, CheckCircle2, Shield, Activity, Award, FileCheck } from 'lucide-react';
import { useDigiYatra } from '../context/DigiYatraContext';
import './SearchWidget.css';

const SearchWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [animating, setAnimating] = useState(false);
  const [flightType, setFlightType] = useState('oneway');
  const { digiYatraSubView, hotelSubView } = useDigiYatra();

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [currentPath, digiYatraSubView, hotelSubView]);

  const tabs = [
    { id: '/digiyatra', label: 'Flights', icon: <Plane size={16} />, drawer: 'digiyatra' },
    { id: '/hotels-stay', label: 'Hotels & Stay', icon: <Building2 size={16} />, drawer: 'hotels' },
  ];

  const isDigiYatra = currentPath.startsWith('/digiyatra') || currentPath === '/';
  const isHotels = currentPath.startsWith('/hotels-stay');

  // Which sub-view form to render
  const showFlightSearch = isDigiYatra && (!digiYatraSubView || digiYatraSubView === 'utility');
  const showAuthForm = isDigiYatra && digiYatraSubView === 'authentication';
  const showHotelSearch = isHotels && (!hotelSubView || hotelSubView === 'checkin');
  const showComplianceForm = isHotels && hotelSubView === 'compliance';

  const renderFlightsForm = () => (
    <div className="flights-stacked-container">
      <div className="flight-types-header">
        <button className={`flight-type-btn ${flightType === 'oneway' ? 'active' : ''}`} onClick={() => setFlightType('oneway')}>One Way</button>
        <button className={`flight-type-btn ${flightType === 'round' ? 'active' : ''}`} onClick={() => setFlightType('round')}>Round Trip</button>
        <button className={`flight-type-btn ${flightType === 'multi' ? 'active' : ''}`} onClick={() => setFlightType('multi')}>Multi-city</button>
      </div>
      <div className="stacked-capsules">
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle"><Calendar size={18} /></div>
            <div className="capsule-text">
              <label>DEPARTURE DATE</label>
              <div className="capsule-val">Sep 03 <span className="year">2026</span></div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section flex-between flex-1">
            <div className="capsule-text"><label>DATE</label></div>
            <button className="swap-icon-btn touch-sensitive" title="Swap From/To"><ArrowRightLeft size={16} /></button>
            <div className="capsule-text text-right">
              <label>FROM</label>
              <div className="capsule-val bold">DEL</div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle"><Plane size={18} /></div>
            <div className="capsule-text">
              <label>TO</label>
              <div className="capsule-val bold">BOM</div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section">
            <div className="capsule-text">
              <label>RETURN DATE</label>
              <div className="capsule-val">Sep 05 <span className="year">2026</span></div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive flex-between">
          <div className="capsule-section">
            <div className="icon-circle"><User size={18} /></div>
            <div className="capsule-text">
              <label>TRAVELER</label>
              <div className="capsule-val bold">1</div>
            </div>
          </div>
          <button className="pill-search-btn touch-sensitive"><Search size={18} /> Search Flights</button>
        </div>
      </div>
    </div>
  );

  const renderAuthForm = () => (
    <div className="auth-form-container">
      <div className="stacked-capsules">
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle" style={{ background: 'var(--primary)', color: '#ffffff' }}><Shield size={18} /></div>
            <div className="capsule-text">
              <label>IDENTITY STATUS</label>
              <div className="capsule-val bold" style={{ color: '#16a34a' }}>Verified</div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section">
            <div className="capsule-text">
              <label>CREDENTIAL TYPE</label>
              <div className="capsule-val">Aadhaar + Passport</div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle"><Activity size={18} /></div>
            <div className="capsule-text">
              <label>CONSENT STATUS</label>
              <div className="capsule-val">4 of 5 Active</div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section">
            <div className="capsule-text">
              <label>IATA ONE ID</label>
              <div className="capsule-val bold" style={{ color: 'var(--primary)' }}>Ready</div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive flex-between">
          <div className="capsule-section">
            <div className="icon-circle"><Award size={18} /></div>
            <div className="capsule-text">
              <label>TRUST SCORE</label>
              <div className="capsule-val bold">98.2%</div>
            </div>
          </div>
          <button className="pill-search-btn touch-sensitive" style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
            <Shield size={18} /> Manage Identity
          </button>
        </div>
      </div>
    </div>
  );

  const renderHotelsForm = () => (
    <div className="hotels-stacked-container">
      <div className="stacked-capsules">
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle"><Building2 size={18} /></div>
            <div className="capsule-text">
              <label>DESTINATION</label>
              <div className="capsule-val bold">Mumbai <span className="country">India</span></div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section flex-1">
            <div className="icon-circle"><Calendar size={18} /></div>
            <div className="capsule-text">
              <label>CHECK-IN</label>
              <div className="capsule-val">Sep 03 <span className="year">2026</span></div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section flex-1">
            <div className="icon-circle"><Calendar size={18} /></div>
            <div className="capsule-text">
              <label>CHECK-OUT</label>
              <div className="capsule-val">Sep 05 <span className="year">2026</span></div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive flex-between">
          <div className="capsule-section gap-24">
            <div className="capsule-text">
              <label>ROOM</label>
              <div className="capsule-val bold">01</div>
            </div>
            <div className="capsule-divider" style={{height: '24px'}} />
            <div className="capsule-text">
              <label>GUEST</label>
              <div className="capsule-val bold">02</div>
            </div>
          </div>
          <button className="pill-search-btn touch-sensitive"><Search size={18} /> Search Hotels</button>
        </div>
      </div>
    </div>
  );

  const renderComplianceForm = () => (
    <div className="compliance-form-container">
      <div className="stacked-capsules">
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle" style={{ background: '#1e40af', color: '#ffffff' }}><FileCheck size={18} /></div>
            <div className="capsule-text">
              <label>FORM C STATUS</label>
              <div className="capsule-val bold" style={{ color: '#1e40af' }}>Auto-Filled</div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section">
            <div className="capsule-text">
              <label>GRC STATUS</label>
              <div className="capsule-val bold" style={{ color: '#16a34a' }}>Completed</div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive">
          <div className="capsule-section">
            <div className="icon-circle"><Building2 size={18} /></div>
            <div className="capsule-text">
              <label>HOTEL</label>
              <div className="capsule-val">The Taj Mahal Palace</div>
            </div>
          </div>
          <div className="capsule-divider" />
          <div className="capsule-section">
            <div className="capsule-text">
              <label>ROOM TYPE</label>
              <div className="capsule-val bold">Luxury Suite</div>
            </div>
          </div>
        </div>
        <div className="glass-capsule touch-sensitive flex-between">
          <div className="capsule-section">
            <div className="icon-circle"><Calendar size={18} /></div>
            <div className="capsule-text">
              <label>STAY DATES</label>
              <div className="capsule-val">03 Sep — 05 Sep 2026</div>
            </div>
          </div>
          <button className="pill-search-btn touch-sensitive" style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}>
            <FileCheck size={18} /> View Compliance
          </button>
        </div>
      </div>
    </div>
  );

  // Determine perks based on context
  const perks = isDigiYatra
    ? [
      { label: 'DigiYatra Verified' },
      { label: 'DPDP Act Compliant' },
      { label: 'IATA One ID Ready' },
      { label: '24×7 Trust Support' },
    ]
    : [
      { label: 'Digital Check-in' },
      { label: 'Form C Auto-Fill' },
      { label: 'Biometric Room Access' },
      { label: 'Automated Checkout' },
    ];

  return (
    <div className="stacked-widget-wrapper">
      <div className="white-back-deck">
        <div className="top-tab-bar">
          {tabs.map((tab) => {
            const isActive = currentPath.startsWith(tab.id) || (currentPath === '/' && tab.id === '/digiyatra');
            return (
              <div key={tab.id} className="tab-with-drawer">
                <button
                  className={`top-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(tab.id)}
                >
                  {tab.icon} <span>{tab.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`front-glass-card ${animating ? 'tab-switching' : ''}`}>
        <div className="front-glass-content">
          {showFlightSearch && renderFlightsForm()}
          {showAuthForm && renderAuthForm()}
          {showHotelSearch && renderHotelsForm()}
          {showComplianceForm && renderComplianceForm()}
        </div>

        <div className="mint-glass-footer">
          <div className="perks-grid">
            {perks.map((p, i) => (
              <div className="perk-item touch-sensitive" key={i}>
                <CheckCircle2 size={15} className="perk-check" /> {p.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
