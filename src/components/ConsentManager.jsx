import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { ShieldCheck, ShieldOff, Info, Clock, Building2, FileText, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import './ConsentManager.css';

const ConsentManager = () => {
  const { consentItems, toggleConsent, revokeAllConsent } = useDigiYatra();
  const [expandedId, setExpandedId] = useState(null);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);

  const enabledCount = consentItems.filter(c => c.enabled).length;

  return (
    <div className="cm-card">
      <div className="cm-header">
        <div>
          <h3 className="cm-title"><ShieldCheck size={16} /> Consent Center</h3>
          <p className="cm-subtitle">{enabledCount}/{consentItems.length} consents active</p>
        </div>
        <button className="cm-revoke-all" onClick={() => setShowRevokeConfirm(true)}>
          <ShieldOff size={12} /> Revoke All
        </button>
      </div>

      {showRevokeConfirm && (
        <div className="cm-revoke-confirm">
          <AlertTriangle size={14} />
          <span>This will revoke all data sharing permissions. Are you sure?</span>
          <div className="cm-revoke-actions">
            <button className="cm-btn-cancel" onClick={() => setShowRevokeConfirm(false)}>Cancel</button>
            <button className="cm-btn-confirm" onClick={() => { revokeAllConsent(); setShowRevokeConfirm(false); }}>Yes, Revoke All</button>
          </div>
        </div>
      )}

      <div className="cm-list">
        {consentItems.map(item => (
          <div className={`cm-item ${item.enabled ? 'cm-enabled' : 'cm-disabled'}`} key={item.id}>
            <div className="cm-item-top">
              <div className="cm-item-info">
                <span className="cm-item-label">{item.label}</span>
                <button className="cm-expand-btn" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                  <Info size={12} /> Details
                </button>
              </div>
              <button className="cm-toggle" onClick={() => toggleConsent(item.id)}>
                {item.enabled ? <ToggleRight size={28} color="#16a34a" /> : <ToggleLeft size={28} color="#94a3b8" />}
              </button>
            </div>

            {expandedId === item.id && (
              <div className="cm-details">
                <div className="cm-detail-row">
                  <FileText size={12} />
                  <span className="cm-detail-label">What:</span>
                  <span>{item.what}</span>
                </div>
                <div className="cm-detail-row">
                  <Info size={12} />
                  <span className="cm-detail-label">Why:</span>
                  <span>{item.why}</span>
                </div>
                <div className="cm-detail-row">
                  <Building2 size={12} />
                  <span className="cm-detail-label">Who:</span>
                  <span>{item.who}</span>
                </div>
                <div className="cm-detail-row">
                  <Clock size={12} />
                  <span className="cm-detail-label">How long:</span>
                  <span>{item.howLong}</span>
                </div>
                <div className="cm-detail-row">
                  <ShieldOff size={12} />
                  <span className="cm-detail-label">Can revoke:</span>
                  <span style={{ color: item.canRevoke ? '#16a34a' : '#ef4444', fontWeight: 700 }}>
                    {item.canRevoke ? 'Yes' : 'No'}
                  </span>
                </div>
                {item.grantedAt && (
                  <div className="cm-detail-row">
                    <Clock size={12} />
                    <span className="cm-detail-label">Granted:</span>
                    <span>{new Date(item.grantedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsentManager;
