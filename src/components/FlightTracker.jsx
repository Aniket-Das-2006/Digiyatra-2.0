import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { ScanFace, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './FlightTracker.css';

const FlightTracker = () => {
  const { flight, boardingPasses, activeBoardingPass, setActiveBoardingPass, family } = useDigiYatra();
  const [isHovered, setIsHovered] = useState(false);

  const bp = boardingPasses[activeBoardingPass] || boardingPasses[0];
  const member = family.find(m => m.id === bp?.memberId);

  const goNext = () => setActiveBoardingPass(prev => (prev + 1) % boardingPasses.length);
  const goPrev = () => setActiveBoardingPass(prev => (prev - 1 + boardingPasses.length) % boardingPasses.length);

  return (
    <div className="bp-wrapper">
      {/* Member Selector Tabs */}
      <div className="bp-member-tabs">
        {boardingPasses.map((pass, i) => {
          const m = family.find(f => f.id === pass.memberId);
          return (
            <button
              key={i}
              className={`bp-member-tab ${activeBoardingPass === i ? 'bp-member-active' : ''}`}
              onClick={() => setActiveBoardingPass(i)}
            >
              <span className="bp-member-name">{pass.name.split(' ')[0]}</span>
              {pass.faceVerified ? (
                <CheckCircle2 size={10} className="bp-member-verified" />
              ) : (
                <AlertCircle size={10} className="bp-member-pending" />
              )}
            </button>
          );
        })}
      </div>

      {/* Boarding Pass Card */}
      <div 
        className={`bp-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Orange Section */}
        <div className="bp-header">
          <div className="bp-header-content">
            <div className="bp-date">{flight.date?.toUpperCase()}</div>
            <div className="bp-city-blr">{flight.from}</div>
            <div className="bp-route-bottom">
              <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" className="bp-plane-icon">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <span className="bp-city-bom">{flight.to}</span>
            </div>
          </div>
          
          <div className="bp-tail-container">
            <div className="bp-tail-white">
              <div className="bp-airline-logo-container">
                <span className="bp-airline-logo-text">AIR INDIA</span>
                <span className="bp-airline-logo-bold">express</span>
              </div>
            </div>
            <div className="bp-tail-orange"></div>
          </div>
        </div>

        {/* Middle White Section */}
        <div className="bp-body">
          <div className="bp-details">
            <div className="bp-passenger">{bp.name.toUpperCase()}</div>
            <div className="bp-verification-status">
              {bp.faceVerified ? (
                <span className="bp-face-ok"><ScanFace size={12} /> Face Verified</span>
              ) : (
                <span className="bp-face-pending"><AlertCircle size={12} /> Verification Pending</span>
              )}
            </div>
            <div className="bp-flight-info">
              <div className="bp-info-row">
                <span className="bp-label">FLIGHT</span>
                <span className="bp-value">{flight.flightNo}</span>
              </div>
              <div className="bp-info-row">
                <span className="bp-label">PNR</span>
                <span className="bp-value">{bp.pnr}</span>
              </div>
            </div>
          </div>
          
          <div className="bp-qr-container">
            <img className="bp-qr-image" src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(bp.qrData)}`} alt="QR Code" />
            <div className="bp-qr-logo">
              <img src="/custom-d-logo.png" alt="D" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="bp-footer-wrapper">
          <div className="bp-footer">
            <div className="bp-footer-item">
              <span className="bp-f-label">BOARDING</span>
              <span className="bp-f-value">{bp.boarding}</span>
            </div>
            <div className="bp-footer-item">
              <span className="bp-f-label">GATE</span>
              <span className="bp-f-value">{bp.gate?.split('-')[1] || bp.gate}</span>
            </div>
            <div className="bp-footer-item">
              <span className="bp-f-label">SEAT</span>
              <span className="bp-f-value">{bp.seat}</span>
            </div>
            <div className="bp-footer-item">
              <span className="bp-f-label">STATUS</span>
              <span className="bp-f-value" style={{ color: bp.faceVerified ? '#16a34a' : '#f59e0b', fontSize: '10px' }}>
                {bp.faceVerified ? 'READY' : 'VERIFY'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Cutout Notches */}
        <div className="bp-notch bp-notch-left"></div>
        <div className="bp-notch bp-notch-right"></div>
      </div>

      {/* Nav Arrows */}
      <div className="bp-nav-arrows">
        <button className="bp-nav-btn" onClick={goPrev}><ChevronLeft size={16} /></button>
        <span className="bp-nav-count">{activeBoardingPass + 1} / {boardingPasses.length}</span>
        <button className="bp-nav-btn" onClick={goNext}><ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

export default FlightTracker;
