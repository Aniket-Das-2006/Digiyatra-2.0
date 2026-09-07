import React from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { User, Plane, Utensils, Award, MapPin, Globe } from 'lucide-react';
import './TravelProfile.css';

const TravelProfile = () => {
  const { profile, identity } = useDigiYatra();
  if (!profile) return null;

  return (
    <div className="tp-card">
      <div className="tp-header">
        <div className="tp-avatar-section">
          <div className="tp-avatar"><User size={22} /></div>
          <div>
            <h3 className="tp-name">{identity.name}</h3>
            <p className="tp-lang"><Globe size={10} /> {profile.language}</p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="tp-prefs">
        <div className="tp-pref"><Plane size={12} /><span className="tp-pref-label">Airline</span><span className="tp-pref-value">{profile.preferredAirline}</span></div>
        <div className="tp-pref"><MapPin size={12} /><span className="tp-pref-label">Seat</span><span className="tp-pref-value">{profile.preferredSeat}</span></div>
        <div className="tp-pref"><Utensils size={12} /><span className="tp-pref-label">Meal</span><span className="tp-pref-value">{profile.mealPreference}</span></div>
      </div>

      {/* Loyalty Programs */}
      <h4 className="tp-section-title"><Award size={12} /> Loyalty Programs</h4>
      <div className="tp-loyalty-list">
        {profile.loyaltyPrograms.map((lp, i) => (
          <div className="tp-loyalty-row" key={i}>
            <div className="tp-loyalty-info">
              <span className="tp-loyalty-airline">{lp.airline}</span>
              <span className="tp-loyalty-program">{lp.program} · {lp.number}</span>
            </div>
            <span className={`tp-loyalty-tier tp-tier-${lp.tier.toLowerCase()}`}>{lp.tier}</span>
          </div>
        ))}
      </div>

      {/* Frequent Routes */}
      <h4 className="tp-section-title"><MapPin size={12} /> Frequent Routes</h4>
      <div className="tp-routes">
        {profile.frequentRoutes.map((route, i) => (
          <span className="tp-route-chip" key={i}>{route}</span>
        ))}
      </div>
    </div>
  );
};

export default TravelProfile;
