import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Filter, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { destinations } from '../data/flightDatabase';
import './LiveFlightSearch.css';

const LiveFlightSearch = ({ onSearch, selectedDestId }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Update "to" field if a destination card is clicked externally
  useEffect(() => {
    if (selectedDestId) {
      const dest = destinations.find(d => d.id === selectedDestId);
      if (dest) setTo(dest.name);
    }
  }, [selectedDestId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const fromCode = destinations.find(d => d.name.toLowerCase() === from.toLowerCase())?.code || '';
    const toCode = destinations.find(d => d.name.toLowerCase() === to.toLowerCase())?.code || '';
    onSearch({ from: fromCode, to: toCode, date, passengers });
  };

  return (
    <div className="live-flight-search-container">
      <form className="flight-search-form" onSubmit={handleSearch}>
        <div className="search-inputs-row">
          <div className="input-group location-input">
            <PlaneTakeoff size={18} className="input-icon" />
            <div className="input-field-wrapper">
              <label>From</label>
              <input 
                type="text" 
                placeholder="Origin City or Airport" 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                list="origins-list"
              />
              <datalist id="origins-list">
                {destinations.map(d => <option key={`from-${d.id}`} value={d.name} />)}
              </datalist>
            </div>
          </div>
          
          <div className="input-group location-input">
            <PlaneLanding size={18} className="input-icon" />
            <div className="input-field-wrapper">
              <label>To</label>
              <input 
                type="text" 
                placeholder="Destination City" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                list="dest-list"
              />
              <datalist id="dest-list">
                {destinations.map(d => <option key={`to-${d.id}`} value={d.name} />)}
              </datalist>
            </div>
          </div>

          <div className="input-group date-input">
            <Calendar size={18} className="input-icon" />
            <div className="input-field-wrapper">
              <label>Departure</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="input-group pax-input">
            <Users size={18} className="input-icon" />
            <div className="input-field-wrapper">
              <label>Travellers</label>
              <select value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?'Adult':'Adults'}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="search-action-btn">
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
        
        {/* Minimal filter toggle */}
        <div className="search-filters-toggle">
          <button type="button" onClick={() => setShowFilters(!showFilters)} className="toggle-filters-btn">
            <Filter size={14} /> {showFilters ? 'Hide Filters' : 'Advanced Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="advanced-filters-panel fade-in">
             <div className="filter-option">
               <input type="checkbox" id="nonstop" />
               <label htmlFor="nonstop">Non-stop flights only</label>
             </div>
             <div className="filter-option">
               <label>Max Price (₹)</label>
               <input type="range" min="3000" max="100000" step="1000" className="price-slider"/>
             </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LiveFlightSearch;
