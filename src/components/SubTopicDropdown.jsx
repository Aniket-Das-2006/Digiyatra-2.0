import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDigiYatra } from '../context/DigiYatraContext';
import { 
  ChevronDown, Plane, Shield, Luggage, MapPin, BarChart3, 
  AlertTriangle, Sun, Leaf, Globe, Bus, Building2, Key, 
  FileCheck, Receipt, Tag, Star, Navigation, Sparkles, Check
} from 'lucide-react';
import './SubTopicDropdown.css';

const SubTopicDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { digiYatraSubView, setDigiYatraSubView, hotelSubView, setHotelSubView } = useDigiYatra();

  const isHotels = location.pathname.startsWith('/hotels-stay');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Section configurations for DigiYatra
  const digiYatraSections = [
    {
      category: 'Core Travel & Boarding',
      items: [
        { id: 'sec-search', label: 'Search & Flight Booking', icon: <Plane size={15} />, subView: 'utility' },
        { id: 'sec-flight-tracker', label: 'Flight & Boarding Pass', icon: <Plane size={15} />, subView: 'utility' },
        { id: 'sec-trip-manager', label: 'Trip Itinerary Manager', icon: <Navigation size={15} />, subView: 'utility' },
        { id: 'sec-baggage', label: 'Baggage Tracker', icon: <Luggage size={15} />, subView: 'utility' },
        { id: 'sec-airport-map', label: 'Smart Airport Map', icon: <MapPin size={15} />, subView: 'utility' },
      ]
    },
    {
      category: 'AI & Intelligence Tools',
      items: [
        { id: 'sec-price-intel', label: 'AI Price Intelligence', icon: <BarChart3 size={15} />, subView: 'utility' },
        { id: 'sec-weather', label: 'Destination Weather', icon: <Sun size={15} />, subView: 'utility' },
        { id: 'sec-carbon', label: 'Carbon Offset & Eco', icon: <Leaf size={15} />, subView: 'utility' },
        { id: 'sec-international', label: 'Passport & Visa Hub', icon: <Globe size={15} />, subView: 'utility' },
        { id: 'sec-transport', label: 'Nearby Cabs & Metro', icon: <Bus size={15} />, subView: 'utility' },
        { id: 'sec-analytics', label: 'Travel Analytics', icon: <BarChart3 size={15} />, subView: 'utility' },
        { id: 'sec-sos', label: 'Emergency SOS Center', icon: <AlertTriangle size={15} />, subView: 'utility' },
      ]
    },
    {
      category: 'Identity & Security Vault',
      items: [
        { id: 'sec-identity-wallet', label: 'Multi-Credential Wallet', icon: <Shield size={15} />, subView: 'authentication' },
        { id: 'sec-consent', label: 'Data Consent Manager', icon: <FileCheck size={15} />, subView: 'authentication' },
        { id: 'sec-trust', label: 'Trust & Compliance Score', icon: <Sparkles size={15} />, subView: 'authentication' },
      ]
    },
    {
      category: 'Explore & App',
      items: [
        { id: 'sec-destinations', label: 'Popular Destinations', icon: <Globe size={15} /> },
        { id: 'sec-offers', label: 'Exclusive Offers', icon: <Tag size={15} /> },
        { id: 'sec-mobile-banner', label: 'DigiYatra Mobile App', icon: <Building2 size={15} /> },
      ]
    }
  ];

  // Section configurations for Hotels & Stay
  const hotelSections = [
    {
      category: 'Hotel Dashboard',
      items: [
        { id: 'sec-hotel-search', label: 'Hotel & Stay Search', icon: <Building2 size={15} />, subView: 'checkin' },
        { id: 'sec-room-status', label: 'Digital Key & Room Access', icon: <Key size={15} />, subView: 'checkin' },
        { id: 'sec-bill-payments', label: 'Folio & Bill Breakdown', icon: <Receipt size={15} />, subView: 'checkin' },
        { id: 'sec-form-c', label: 'Form C Compliance Wizard', icon: <FileCheck size={15} />, subView: 'compliance' },
      ]
    },
    {
      category: 'Offers & Top Stays',
      items: [
        { id: 'sec-hotel-offers', label: 'Verified Hotel Deals', icon: <Tag size={15} /> },
        { id: 'sec-top-hotels', label: 'Top Curated Hotels', icon: <Star size={15} /> },
        { id: 'sec-destinations', label: 'Popular Cities', icon: <MapPin size={15} /> },
        { id: 'sec-mobile-banner', label: 'Mobile Experience', icon: <Building2 size={15} /> },
      ]
    }
  ];

  const categories = isHotels ? hotelSections : digiYatraSections;

  const handleJumpToSection = (item) => {
    setIsOpen(false);

    // Switch sub-view if needed
    if (item.subView) {
      if (isHotels && hotelSubView !== item.subView) {
        setHotelSubView(item.subView);
      } else if (!isHotels && digiYatraSubView !== item.subView) {
        setDigiYatraSubView(item.subView);
      }
    }

    // Smooth scroll with a slight delay for subview rendering
    setTimeout(() => {
      const targetEl = document.getElementById(item.id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('highlight-section-pulse');
        setTimeout(() => targetEl.classList.remove('highlight-section-pulse'), 2000);
      }
    }, 120);
  };

  return (
    <div className="subtopic-dropdown-wrapper" ref={dropdownRef}>
      <button 
        className={`subtopic-trigger-btn touch-sensitive ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Quick Jump to Section"
        aria-label="Section Quick Jump"
      >
        <span className="trigger-label">Jump to</span>
        <ChevronDown size={18} className="animated-arrow-icon" />
      </button>

      {isOpen && (
        <div className="subtopic-menu-panel glass-card slide-down-fade">
          <div className="subtopic-menu-header">
            <Navigation size={15} className="header-icon" />
            <span>Quick Page Navigator</span>
          </div>

          <div className="subtopic-scroll-area">
            {categories.map((group, gIdx) => (
              <div key={gIdx} className="subtopic-group">
                <div className="subtopic-group-title">{group.category}</div>
                <div className="subtopic-group-items">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      className="subtopic-item-btn"
                      onClick={() => handleJumpToSection(item)}
                    >
                      <span className="item-icon">{item.icon}</span>
                      <span className="item-label">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubTopicDropdown;
