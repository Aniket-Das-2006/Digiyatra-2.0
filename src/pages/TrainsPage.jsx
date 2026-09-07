import React from 'react';
import SearchWidget from '../components/SearchWidget';
import OfferCard from '../components/OfferCard';
import MobileAppBanner from '../components/MobileAppBanner';
import { FileText, Ticket, Pizza, List, CalendarCheck, FileMinus, Info } from 'lucide-react';
import './TrainsPage.css';

const TrainsPage = () => {
  const quickLinks = [
    { icon: <FileText size={24} />, label: 'Running\nStatus' },
    { icon: <Ticket size={24} />, label: 'PNR\nStatus' },
    { icon: <Ticket size={24} />, label: 'Metro\nTicket' },
    { icon: <Pizza size={24} />, label: 'Order Food\nOn Train' },
    { icon: <List size={24} />, label: 'Train by\nName/No.' },
    { icon: <CalendarCheck size={24} />, label: 'Seat\nAvailability' },
    { icon: <FileMinus size={24} />, label: 'Ticket\nCancellation' },
    { icon: <Info size={24} />, label: 'Station\nStatus' },
  ];

  const popularDestinations = [
    { name: 'New Delhi', code: 'DELHI', trains: 226, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Goa', code: 'GOA', trains: 686, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Chennai', code: 'CHENNAI', trains: 224, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Mumbai', code: 'MUMBAI', trains: 245, image: 'https://images.unsplash.com/photo-1522240974868-b7100b21a719?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Kolkata', code: 'KOLKATA', trains: 104, image: 'https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="page-wrapper">
      <section className="hero train-hero">
        <div className="hero-content">
          <h1>Your journey,<br/>Just a Tap Away</h1>
          <p>Search & book train tickets, flights, hotels and more with one easy search</p>
        </div>
      </section>

      <div className="container">
        <SearchWidget />
        
        <section className="quick-links">
          {quickLinks.map((link, index) => (
            <div key={index} className="quick-link-item">
              <div className="quick-link-icon">{link.icon}</div>
              <span>{link.label}</span>
            </div>
          ))}
        </section>

        <section className="destinations-section">
          <div className="flex-between">
             <div>
               <span className="section-subtitle">Popular Train Routes in India</span>
               <h2 className="section-title">Popular Destinations</h2>
             </div>
             <button className="btn-secondary">View All</button>
          </div>
          
          <div className="destinations-grid">
            {popularDestinations.map((dest, index) => (
              <div key={index} className="destination-card">
                <img src={dest.image} alt={dest.name} />
                <div className="dest-overlay">
                   <h3>{dest.name}</h3>
                   <p>{dest.code}</p>
                </div>
                <div className="dest-footer">
                  <span>{dest.trains} Trains &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="vande-bharat-banner">
          <div className="banner-content-inner">
            <h2 style={{fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: '32px'}}>Vande Bharat EXPRESS</h2>
            <h3 style={{fontSize: '48px', fontWeight: '800', marginTop: '16px'}}>Train at a glance 2025</h3>
            <p style={{marginTop: '8px', marginBottom: '24px'}}>with effect from 1 January 2025 HOD</p>
            <button className="btn-secondary" style={{border: 'none'}}>Book Now</button>
          </div>
        </section>

        <section className="offers-section">
           <div className="flex-between">
             <div>
               <span className="section-subtitle">Offers for you</span>
               <h2 className="section-title">Best offers for you</h2>
             </div>
             <button className="btn-secondary">View All</button>
          </div>
          
          <div className="offers-grid">
            <OfferCard 
              title="45% Off" 
              subtitle="on domestic hotels" 
              code="Use: FLAT45"
              gradient="linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)"
              image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            />
            <OfferCard 
              title="Flat 15% Off" 
              subtitle="On domestic hotels with HSBC credit card + interest free EMI" 
              bankLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/1200px-HSBC_logo_%282018%29.svg.png"
              gradient="linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
              image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            />
            <OfferCard 
              title="Flat ₹700 Off" 
              subtitle="On domestic hotels with HDFC credit card + interest free EMI" 
              bankLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png"
              gradient="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
              image="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            />
            <OfferCard 
              title="Flat 15% Off" 
              subtitle="On domestic hotels with HDFC credit card + interest free EMI" 
              bankLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png"
              gradient="linear-gradient(135deg, #ff0844 0%, #ffb199 100%)"
              image="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            />
          </div>
        </section>

      </div>
      
      <MobileAppBanner />
    </div>
  );
};

export default TrainsPage;
