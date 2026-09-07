import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import i18n from '../i18n';
import {
  User, X, LogIn, Phone, MessageCircle, MapPin, FolderKey, ScanFace, Fingerprint,
  Bell, Globe, Shield, Settings, Eye, Palette, Wifi, WifiOff, ChevronDown, ChevronUp,
  CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, Lock, Accessibility, Info, Smartphone
} from 'lucide-react';
import './ProfilePanel.css';

const Toggle = ({ value, onChange }) => (
  <button className="pp-toggle" onClick={onChange}>
    {value ? <ToggleRight size={24} color="#16a34a" /> : <ToggleLeft size={24} color="#94a3b8" />}
  </button>
);

const ProfilePanel = () => {
  const { identity, profilePanelOpen, toggleProfilePanel, userSettings, updateSettings, updateIdentity } = useDigiYatra();
  const [activeSettings, setActiveSettings] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  if (!profilePanelOpen) return null;

  const toggleSettings = (id) => setActiveSettings(prev => prev === id ? null : id);

  const startEdit = (field, current) => { setEditingField(field); setEditValue(current || ''); };
  const saveEdit = (field) => { updateIdentity(field, editValue); setEditingField(null); };

  const quickActions = [
    { id: 'emergency', label: 'Emergency Contact', icon: <Phone size={16} />, value: identity.emergencyContact, editable: 'emergencyContact', color: '#ef4444' },
    { id: 'whatsapp', label: 'WhatsApp Number', icon: <MessageCircle size={16} />, value: identity.whatsappNumber, editable: 'whatsappNumber', color: '#22c55e' },
    { id: 'location', label: 'Location Permission', icon: <MapPin size={16} />, toggle: true, settingKey: 'locationPermission', value: identity.locationPermission, color: '#2563eb' },
    { id: 'digilocker', label: 'DigiLocker', icon: <FolderKey size={16} />, status: identity.digiLockerLinked ? 'Connected' : 'Connect', color: '#8b5cf6' },
    { id: 'face', label: 'Face Recognition', icon: <ScanFace size={16} />, status: identity.faceEmbeddingStatus === 'active' ? 'Enrolled' : 'Setup', color: '#0ea5e9' },
    { id: 'fingerprint', label: 'Fingerprint', icon: <Fingerprint size={16} />, status: identity.fingerprintStatus === 'enrolled' ? 'Enrolled' : 'Setup', color: '#f59e0b' },
  ];

  const settingsSections = [
    { id: 'notifications', label: 'Notifications', icon: <Bell size={14} />, items: [
      { key: 'flightAlerts', label: 'Flight Status Alerts' },
      { key: 'priceAlerts', label: 'Price Drop Alerts' },
      { key: 'baggageAlerts', label: 'Baggage Tracking Alerts' },
      { key: 'gateChangeAlerts', label: 'Gate Change Alerts' },
    ]},
    { id: 'security', label: 'Security & Privacy', icon: <Lock size={14} />, items: [
      { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
      { key: 'biometricLogin', label: 'Biometric Login' },
    ]},
    { id: 'travel', label: 'Travel Preferences', icon: <Globe size={14} />, items: [
      { key: 'autoCheckin', label: 'Auto Check-in' },
      { key: 'shareAnalytics', label: 'Share Travel Analytics' },
    ]},
    { id: 'accessibility', label: 'Accessibility', icon: <Accessibility size={14} />, items: [
      { key: 'highContrast', label: 'High Contrast Mode' },
    ]},
    { id: 'app', label: 'App Settings', icon: <Settings size={14} />, items: [
      { key: 'offlineMode', label: 'Offline Mode' },
      { key: 'language', label: 'Language (भाषा)', type: 'select', options: [
        { value: 'en', label: 'English' },
        { value: 'hi', label: 'हिंदी (Hindi)' },
        { value: 'bn', label: 'বাংলা (Bengali)' }
      ]},
    ]},
  ];

  const changeLanguage = (e) => {
    const lang = e.target.value;
    updateSettings('language', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <div className="pp-backdrop" onClick={toggleProfilePanel} />
      <div className="pp-panel">
        {/* Header */}
        <div className="pp-header">
          <div className="pp-user-card">
            <div className="pp-avatar">
              <User size={20} />
            </div>
            <div className="pp-user-info">
              <h3 className="pp-user-name">{identity.name}</h3>
              <p className="pp-user-email">{identity.email}</p>
            </div>
            <div className="pp-verified-badge">
              <CheckCircle2 size={10} /> Verified
            </div>
          </div>
          <button className="pp-close" onClick={toggleProfilePanel}><X size={18} /></button>
        </div>

        {/* Verification Status */}
        <div className="pp-verification-bar">
          <div className="pp-vb-item">
            <ScanFace size={13} />
            <span>Face: <strong style={{ color: identity.faceEmbeddingStatus === 'active' ? '#16a34a' : '#ef4444' }}>
              {identity.faceEmbeddingStatus === 'active' ? 'Active' : 'Inactive'}
            </strong></span>
          </div>
          <div className="pp-vb-item">
            <Fingerprint size={13} />
            <span>Print: <strong style={{ color: identity.fingerprintStatus === 'enrolled' ? '#16a34a' : '#ef4444' }}>
              {identity.fingerprintStatus === 'enrolled' ? 'Active' : 'Setup'}
            </strong></span>
          </div>
          <div className="pp-vb-item">
            <Shield size={13} />
            <span>Aadhaar: <strong style={{ color: '#16a34a' }}>****{identity.aadhaarLast4}</strong></span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pp-section-label">Quick Actions</div>
        <div className="pp-actions-grid">
          {quickActions.map(action => (
            <div className="pp-action-card" key={action.id}>
              <div className="pp-action-icon" style={{ background: action.color + '18', color: action.color }}>{action.icon}</div>
              <div className="pp-action-content">
                <span className="pp-action-label">{action.label}</span>
                {action.editable && editingField !== action.editable && (
                  <span className="pp-action-value" onClick={() => startEdit(action.editable, action.value)}>
                    {action.value || 'Add'} <Settings size={9} />
                  </span>
                )}
                {action.editable && editingField === action.editable && (
                  <div className="pp-action-edit">
                    <input value={editValue} onChange={e => setEditValue(e.target.value)} className="pp-edit-input" autoFocus />
                    <button className="pp-edit-save" onClick={() => saveEdit(action.editable)}>Save</button>
                  </div>
                )}
                {action.toggle && (
                  <Toggle value={action.value} onChange={() => updateIdentity('locationPermission', !identity.locationPermission)} />
                )}
                {action.status && (
                  <span className={`pp-action-status ${action.status === 'Enrolled' || action.status === 'Connected' ? 'pp-status-ok' : 'pp-status-setup'}`}>
                    {action.status === 'Enrolled' || action.status === 'Connected' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {action.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Settings Accordion */}
        <div className="pp-section-label">Settings</div>
        <div className="pp-settings-list">
          {settingsSections.map(section => (
            <div className="pp-settings-section" key={section.id}>
              <button className="pp-settings-header" onClick={() => toggleSettings(section.id)}>
                <div className="pp-settings-title">{section.icon} {section.label}</div>
                {activeSettings === section.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {activeSettings === section.id && (
                <div className="pp-settings-items">
                  {section.items.map(item => (
                    <div className="pp-setting-row" key={item.key}>
                      <span>{item.label}</span>
                      {item.type === 'select' ? (
                        <select 
                          className="pp-edit-input" 
                          style={{ width: '140px', padding: '4px' }}
                          value={userSettings[item.key] || 'en'}
                          onChange={changeLanguage}
                        >
                          {item.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      ) : (
                        <Toggle value={userSettings[item.key]} onChange={() => updateSettings(item.key, !userSettings[item.key])} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* About */}
        <div className="pp-about">
          <Info size={12} />
          <span>DigiYatra 2.0 v3.1.0 — DPDP Compliant — IATA One ID Ready</span>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
