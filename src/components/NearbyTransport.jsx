import React from 'react';
import { Car, Train, Bus, Clock, IndianRupee, MapPin } from 'lucide-react';
import './NearbyTransport.css';

const NearbyTransport = () => {
  const options = [
    { type: 'Cab', icon: <Car size={16} />, provider: 'Uber / Ola', eta: '8 min', cost: '350-500', color: '#0f172a' },
    { type: 'Metro', icon: <Train size={16} />, provider: 'Delhi Metro', eta: '5 min', cost: '60', color: '#0a4cd9' },
    { type: 'Bus', icon: <Bus size={16} />, provider: 'DTC Volvo', eta: '12 min', cost: '40', color: '#16a34a' },
  ];

  return (
    <div className="nt-card">
      <h3 className="nt-title"><MapPin size={16} /> Nearby Transport</h3>
      <p className="nt-subtitle">Options at destination airport</p>
      <div className="nt-options">
        {options.map((opt, i) => (
          <div className="nt-option" key={i}>
            <div className="nt-icon" style={{ background: opt.color + '12', color: opt.color }}>{opt.icon}</div>
            <div className="nt-info">
              <span className="nt-type">{opt.type}</span>
              <span className="nt-provider">{opt.provider}</span>
            </div>
            <div className="nt-meta">
              <span className="nt-eta"><Clock size={10} /> {opt.eta}</span>
              <span className="nt-cost"><IndianRupee size={9} />{opt.cost}</span>
            </div>
            <button className="nt-book-btn">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyTransport;
