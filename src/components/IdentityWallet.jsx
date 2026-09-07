import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { getIcon } from './IconRegistry';
import { Shield, ShieldCheck, ShieldAlert, Wifi, WifiOff, Fingerprint, QrCode, KeyRound, ChevronDown, ChevronUp, Users, Globe } from 'lucide-react';
import './IdentityWallet.css';

const IdentityWallet = () => {
  const { identity, family, documents } = useDigiYatra();
  const [expandedSection, setExpandedSection] = useState('credentials');
  const [showFallback, setShowFallback] = useState(false);

  const toggle = (section) => setExpandedSection(prev => prev === section ? null : section);

  const statusBadge = (status) => {
    const map = {
      verified: { color: '#16a34a', bg: '#dcfce7', label: 'Verified' },
      active: { color: '#0ea5e9', bg: '#e0f2fe', label: 'Active' },
      linked: { color: '#8b5cf6', bg: '#f3e8ff', label: 'Linked' },
      pending: { color: '#f59e0b', bg: '#fef3c7', label: 'Pending' },
      expired: { color: '#ef4444', bg: '#fee2e2', label: 'Expired' },
    };
    const s = map[status] || map.pending;
    return <span className="iw-badge" style={{ color: s.color, background: s.bg }}>{s.label}</span>;
  };

  return (
    <div className="iw-card">
      {/* Header */}
      <div className="iw-header">
        <div className="iw-header-left">
          <div className="iw-avatar">
            <Fingerprint size={22} />
          </div>
          <div>
            <h3 className="iw-name">{identity.name}</h3>
            <p className="iw-subtitle">Multi-Credential Identity Wallet</p>
          </div>
        </div>
        <div className="iw-verification-badge">
          <ShieldCheck size={14} />
          <span>DigiYatra Verified</span>
        </div>
      </div>

      {/* Biometric & Offline Status Bar */}
      <div className="iw-status-bar">
        <div className="iw-status-item">
          <Fingerprint size={13} />
          <span>Face: <strong style={{ color: identity.faceEmbeddingStatus === 'active' ? '#16a34a' : '#ef4444' }}>
            {identity.faceEmbeddingStatus === 'active' ? 'Active' : 'Inactive'}
          </strong></span>
        </div>
        <div className="iw-status-item">
          {identity.offlineToken?.valid ? <Wifi size={13} /> : <WifiOff size={13} />}
          <span>Offline Token: <strong style={{ color: identity.offlineToken?.valid ? '#16a34a' : '#ef4444' }}>
            {identity.offlineToken?.valid ? 'Valid' : 'Expired'}
          </strong></span>
        </div>
        <div className="iw-status-item">
          <Globe size={13} />
          <span>IATA One ID: <strong style={{ color: '#16a34a' }}>Ready</strong></span>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="iw-section">
        <button className="iw-section-header" onClick={() => toggle('credentials')}>
          <div className="iw-section-title">
            <Shield size={14} />
            <span>Verified Credentials ({documents.length})</span>
          </div>
          {expandedSection === 'credentials' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSection === 'credentials' && (
          <div className="iw-credential-list">
            {documents.map(doc => (
              <div className="iw-credential-row" key={doc.id}>
                <span className="iw-cred-icon">{getIcon(doc.iconName, { size: 16 })}</span>
                <div className="iw-cred-info">
                  <span className="iw-cred-type">{doc.type}</span>
                  <span className="iw-cred-issuer">{doc.issuer} · {doc.standard}</span>
                </div>
                {statusBadge(doc.status)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Family / Group Identity */}
      <div className="iw-section">
        <button className="iw-section-header" onClick={() => toggle('family')}>
          <div className="iw-section-title">
            <Users size={14} />
            <span>Family & Group ({family.length} members)</span>
          </div>
          {expandedSection === 'family' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSection === 'family' && (
          <div className="iw-family-list">
            {family.map(member => (
              <div className="iw-family-row" key={member.id}>
                <div className="iw-family-avatar" style={{ background: member.verified ? '#dcfce7' : '#fef3c7', color: member.verified ? '#16a34a' : '#f59e0b' }}>
                  {member.name.charAt(0)}
                </div>
                <div className="iw-family-info">
                  <span className="iw-family-name">{member.name}</span>
                  <span className="iw-family-relation">{member.relation} {member.accessibility && `· ${member.accessibility}`}</span>
                </div>
                {statusBadge(member.verified ? 'verified' : 'pending')}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Biometric Fallback */}
      <div className="iw-section">
        <button className="iw-section-header" onClick={() => setShowFallback(!showFallback)}>
          <div className="iw-section-title">
            <ShieldAlert size={14} />
            <span>Biometric Fallback Chain</span>
          </div>
          {showFallback ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showFallback && (
          <div className="iw-fallback-chain">
            <div className="iw-fallback-step active"><Fingerprint size={14} /><span>Face Recognition</span><span className="iw-fb-arrow">→</span></div>
            <div className="iw-fallback-step"><span className="iw-fb-retry">Retry</span><span className="iw-fb-arrow">→</span></div>
            <div className="iw-fallback-step"><QrCode size={14} /><span>QR / Credential</span><span className="iw-fb-arrow">→</span></div>
            <div className="iw-fallback-step"><KeyRound size={14} /><span>Passkey / PIN</span><span className="iw-fb-arrow">→</span></div>
            <div className="iw-fallback-step"><Users size={14} /><span>Assisted Verification</span></div>
            <p className="iw-fallback-note">Never trapped — if AI fails, fallback always available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityWallet;
