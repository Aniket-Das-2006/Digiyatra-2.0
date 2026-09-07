import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { getIcon } from './IconRegistry';
import { Briefcase, Clock, CheckCircle2, MapPin, ChevronRight, Wallet, CreditCard, FileText } from 'lucide-react';
import './TripManager.css';

const TripManager = () => {
  const { trips, activeTrip, notifications } = useDigiYatra();
  const [activeSection, setActiveSection] = useState('timeline');

  const trip = trips.find(t => t.id === activeTrip);
  if (!trip) return null;

  const statusIcon = (status) => {
    const map = {
      confirmed: { icon: <CheckCircle2 size={12} />, color: '#16a34a' },
      'pre-checked-in': { icon: <CheckCircle2 size={12} />, color: '#0ea5e9' },
      booked: { icon: <Clock size={12} />, color: '#f59e0b' },
      tracked: { icon: <MapPin size={12} />, color: '#8b5cf6' },
    };
    return map[status] || map.booked;
  };

  return (
    <div className="tm-card">
      <div className="tm-header">
        <div className="tm-trip-badge">
          <Briefcase size={14} />
          <span>{trip.status === 'active' ? 'Active Trip' : 'Upcoming'}</span>
        </div>
        <h3 className="tm-trip-name">{trip.name}</h3>
        <p className="tm-trip-dates">{trip.dateRange}</p>
      </div>

      <div className="tm-tabs">
        {[
          { id: 'timeline', label: 'Timeline', icon: <Clock size={12} /> },
          { id: 'documents', label: 'Wallet', icon: <Wallet size={12} /> },
          { id: 'budget', label: 'Budget', icon: <CreditCard size={12} /> },
          { id: 'notifications', label: 'Alerts', icon: <MapPin size={12} /> },
        ].map(tab => (
          <button key={tab.id} className={`tm-tab ${activeSection === tab.id ? 'tm-tab-active' : ''}`} onClick={() => setActiveSection(tab.id)}>
            {tab.icon}<span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeSection === 'timeline' && (
        <div className="tm-timeline">
          {trip.items.map((item, i) => {
            const s = statusIcon(item.status);
            return (
              <div className="tm-timeline-item" key={i}>
                <div className="tm-tl-line">
                  <div className="tm-tl-dot" style={{ background: s.color }}>{s.icon}</div>
                  {i < trip.items.length - 1 && <div className="tm-tl-connector" />}
                </div>
                <div className="tm-tl-content">
                  <div className="tm-tl-header">
                    <span className="tm-tl-icon">{getIcon(item.iconName, { size: 14 })}</span>
                    <span className="tm-tl-title">{item.title}</span>
                  </div>
                  <div className="tm-tl-meta">
                    <span className="tm-tl-time">{item.time}</span>
                    <span className="tm-tl-status" style={{ color: s.color }}>{item.status}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="tm-tl-chevron" />
              </div>
            );
          })}
        </div>
      )}

      {activeSection === 'documents' && (
        <div className="tm-documents">
          <h4 className="tm-docs-title"><FileText size={14} /> Travel Wallet</h4>
          <div className="tm-docs-grid">
            {trip.documents.map((doc, i) => (
              <div className="tm-doc-card" key={i}>
                <span className="tm-doc-icon">{getIcon(doc.iconName, { size: 22 })}</span>
                <span className="tm-doc-title">{doc.title}</span>
                <span className="tm-doc-type">{doc.type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'budget' && (
        <div className="tm-budget">
          <h4 className="tm-budget-title"><CreditCard size={14} /> Trip Budget</h4>
          <div className="tm-budget-bar">
            <div className="tm-budget-fill" style={{ width: `${(trip.budget.spent / trip.budget.estimated) * 100}%` }} />
          </div>
          <div className="tm-budget-stats">
            <div className="tm-budget-stat">
              <span className="tm-bs-label">Estimated</span>
              <span className="tm-bs-value">{'\u20B9'}{trip.budget.estimated.toLocaleString()}</span>
            </div>
            <div className="tm-budget-stat">
              <span className="tm-bs-label">Spent</span>
              <span className="tm-bs-value" style={{ color: '#ef4444' }}>{'\u20B9'}{trip.budget.spent.toLocaleString()}</span>
            </div>
            <div className="tm-budget-stat">
              <span className="tm-bs-label">Remaining</span>
              <span className="tm-bs-value" style={{ color: '#16a34a' }}>{'\u20B9'}{trip.budget.remaining.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'notifications' && (
        <div className="tm-notifications">
          <h4 className="tm-notif-title"><MapPin size={14} /> Travel Timeline</h4>
          <div className="tm-notif-list">
            {notifications.map(n => (
              <div className={`tm-notif-row tm-notif-${n.status}`} key={n.id}>
                <span className="tm-notif-time">{n.time}</span>
                <span className="tm-notif-icon">{getIcon(n.iconName, { size: 14 })}</span>
                <span className="tm-notif-text">{n.text}</span>
                {n.status === 'completed' && <CheckCircle2 size={12} className="tm-notif-check" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripManager;
