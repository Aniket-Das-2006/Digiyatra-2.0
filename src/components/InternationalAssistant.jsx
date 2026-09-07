import React from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Globe, CheckCircle2, AlertTriangle, Clock, FileText, Shield, BookOpen } from 'lucide-react';
import './InternationalAssistant.css';

const InternationalTravelAssistant = () => {
  const { intlChecklist, identity } = useDigiYatra();

  const statusIcon = (status) => {
    if (status === 'ok' || status === 'active') return <CheckCircle2 size={14} className="ia-icon-ok" />;
    if (status === 'pending') return <Clock size={14} className="ia-icon-pending" />;
    return <AlertTriangle size={14} className="ia-icon-warn" />;
  };

  const completedCount = intlChecklist.filter(i => i.status === 'ok' || i.status === 'active').length;

  return (
    <div className="ia-card">
      <div className="ia-header">
        <div>
          <h3 className="ia-title"><Globe size={16} /> International Travel Assistant</h3>
          <p className="ia-subtitle">Pre-departure checklist & compliance</p>
        </div>
        <div className="ia-progress-badge">
          <span>{completedCount}/{intlChecklist.length}</span>
        </div>
      </div>

      {/* Passport Quick Info */}
      <div className="ia-passport-card">
        <div className="ia-passport-icon"><BookOpen size={22} /></div>
        <div className="ia-passport-info">
          <span className="ia-passport-number">{identity.passportNumber}</span>
          <span className="ia-passport-expiry">Expires: {identity.passportExpiry}</span>
        </div>
        <span className="ia-passport-status">
          <Shield size={10} /> Valid
        </span>
      </div>

      {/* Checklist */}
      <div className="ia-checklist">
        {intlChecklist.map(item => (
          <div className={`ia-check-row ia-check-${item.status}`} key={item.id}>
            {statusIcon(item.status)}
            <div className="ia-check-info">
              <span className="ia-check-label">{item.label}</span>
              <span className="ia-check-detail">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Transit Tips */}
      <div className="ia-tips">
        <FileText size={12} />
        <span>For transit through Dubai (DXB), no visa required for Indian passport holders with valid US visa.</span>
      </div>
    </div>
  );
};

export default InternationalTravelAssistant;
