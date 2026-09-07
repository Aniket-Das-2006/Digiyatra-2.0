import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { getIcon } from './IconRegistry';
import { Map, Navigation, Clock, AlertTriangle } from 'lucide-react';
import './SmartAirportMap.css';

const SmartAirportMap = () => {
  const { airportMap, flight } = useDigiYatra();
  const [activeTab, setActiveTab] = useState('navigate');

  if (!airportMap?.airport) return null;

  return (
    <div className="am-card">
      <div className="am-header">
        <div>
          <h3 className="am-title"><Map size={16} /> Smart Airport Map</h3>
          <p className="am-airport">{airportMap.airport} — {airportMap.terminal}</p>
        </div>
        <div className="am-location-badge">
          <Navigation size={12} />
          <span>{airportMap.currentLocation}</span>
        </div>
      </div>

      <div className="am-gate-nav">
        <div className="am-gate-info">
          <span className="am-gate-label">Your Gate</span>
          <span className="am-gate-number">{flight.gate}</span>
        </div>
        <div className="am-gate-route">
          <Navigation size={14} className="am-nav-icon" />
          <div>
            <span className="am-gate-distance">{airportMap.gateDistance}</span>
            <span className="am-gate-walk">walking distance</span>
          </div>
        </div>
        <button className="am-navigate-btn">Navigate</button>
      </div>

      <div className="am-tabs">
        {[{ id: 'navigate', label: 'Amenities' }, { id: 'queues', label: 'Queue Times' }].map(tab => (
          <button key={tab.id} className={`am-tab ${activeTab === tab.id ? 'am-tab-active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'navigate' && (
        <div className="am-amenities">
          {airportMap.amenities.map((a, i) => (
            <div className="am-amenity-row" key={i}>
              <span className="am-amenity-icon">{getIcon(a.iconName, { size: 16 })}</span>
              <div className="am-amenity-info">
                <span className="am-amenity-name">{a.name}</span>
                <span className="am-amenity-type">{a.type}</span>
              </div>
              <span className="am-amenity-distance">{a.distance}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'queues' && (
        <div className="am-queues">
          {Object.entries(airportMap.queueEstimates).map(([key, value], i) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
            const isLong = value.includes('25') || value.includes('30');
            return (
              <div className={`am-queue-row ${isLong ? 'am-queue-long' : ''}`} key={i}>
                <div className="am-queue-info">
                  <Clock size={12} />
                  <span className="am-queue-label">{label}</span>
                </div>
                <span className={`am-queue-time ${isLong ? 'am-queue-warn' : ''}`}>
                  {isLong && <AlertTriangle size={10} />} {value}
                </span>
              </div>
            );
          })}
          <div className="am-queue-tip">
            <Navigation size={12} />
            <span>AI recommends leaving for gate in <strong>18 minutes</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAirportMap;
