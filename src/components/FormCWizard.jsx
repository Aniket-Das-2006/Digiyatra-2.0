import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { FileText, CheckCircle2, Clock, User, Globe, Building2, Send } from 'lucide-react';
import './FormCWizard.css';

const FormCWizard = () => {
  const { hotelBooking, identity } = useDigiYatra();
  const [guestType, setGuestType] = useState('indian'); // 'indian' | 'foreign'

  const STATUS_MAP = {
    not_required: { label: 'Not Required', color: '#64748b', bg: '#f1f5f9' },
    pending: { label: 'Pending', color: '#92400e', bg: '#fef3c7' },
    auto_filled: { label: 'Auto-Filled', color: '#1e40af', bg: '#dbeafe' },
    submitted: { label: 'Submitted', color: '#166534', bg: '#dcfce7' },
    completed: { label: 'Completed', color: '#166534', bg: '#dcfce7' },
  };

  const formCStatus = STATUS_MAP[hotelBooking.formCStatus] || STATUS_MAP.pending;
  const grcStatus = STATUS_MAP[hotelBooking.grcStatus] || STATUS_MAP.pending;

  return (
    <div className="formc-wizard">
      <div className="fc-header">
        <h3><FileText size={16} /> Hotel Compliance Center</h3>
        <p className="fc-subtitle">{hotelBooking.hotelName} — {hotelBooking.city}</p>
      </div>

      {/* Guest Type Selector */}
      <div className="fc-guest-toggle">
        <button
          className={`fc-gt-btn ${guestType === 'indian' ? 'active' : ''}`}
          onClick={() => setGuestType('indian')}
        >
          <User size={14} /> Indian Guest
        </button>
        <button
          className={`fc-gt-btn ${guestType === 'foreign' ? 'active' : ''}`}
          onClick={() => setGuestType('foreign')}
        >
          <Globe size={14} /> Foreign Guest
        </button>
      </div>

      {/* Status Cards */}
      <div className="fc-status-grid">
        <div className="fc-status-card">
          <div className="fc-sc-header">
            <Building2 size={14} />
            <span>Guest Registration Card</span>
          </div>
          <span className="fc-sc-badge" style={{ background: grcStatus.bg, color: grcStatus.color }}>
            <CheckCircle2 size={12} /> {grcStatus.label}
          </span>
          <div className="fc-sc-details">
            <div className="fc-detail"><span>Guest</span><span>{identity.name}</span></div>
            <div className="fc-detail"><span>Room</span><span>{hotelBooking.roomType}</span></div>
            <div className="fc-detail"><span>Check-in</span><span>{hotelBooking.checkIn}</span></div>
            <div className="fc-detail"><span>Check-out</span><span>{hotelBooking.checkOut}</span></div>
          </div>
        </div>

        {guestType === 'foreign' && (
          <div className="fc-status-card fc-formc">
            <div className="fc-sc-header">
              <Globe size={14} />
              <span>Form C — Bureau of Immigration</span>
            </div>
            <span className="fc-sc-badge" style={{ background: formCStatus.bg, color: formCStatus.color }}>
              <CheckCircle2 size={12} /> {formCStatus.label}
            </span>
            <p className="fc-sc-note">
              Under the Foreigners Act 1946 & Registration of Foreigners Rules 1992, Form C must be filed within 24 hours of check-in.
            </p>
            <div className="fc-sc-details">
              <div className="fc-detail"><span>Passport</span><span>{identity.passportNumber}</span></div>
              <div className="fc-detail"><span>Filed to</span><span>e-FRRO Portal</span></div>
              <div className="fc-detail"><span>Auto-file at checkout</span><span>Enabled</span></div>
            </div>
            <button className="fc-submit-btn">
              <Send size={14} /> Submit Form C
            </button>
          </div>
        )}

        {guestType === 'indian' && (
          <div className="fc-status-card">
            <div className="fc-sc-header">
              <FileText size={14} />
              <span>Form C — Not Required</span>
            </div>
            <span className="fc-sc-badge" style={{ background: '#f1f5f9', color: '#64748b' }}>
              Not Applicable
            </span>
            <p className="fc-sc-note">
              Form C filing is only required for foreign nationals. Indian guests only need a Guest Registration Card.
            </p>
          </div>
        )}
      </div>

      {/* Data Retention Note */}
      <div className="fc-retention-note">
        <Clock size={13} />
        <span>Hotel compliance data retained until checkout + 30 days, then auto-purged.</span>
      </div>
    </div>
  );
};

export default FormCWizard;
