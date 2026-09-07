import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Shield, Eye, Clock, Activity, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, FileSearch, Database, Globe } from 'lucide-react';
import './TrustCenter.css';

const TrustCenter = () => {
  const { trustStats, accessLog } = useDigiYatra();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="tc-card">
      <div className="tc-header">
        <div>
          <h3 className="tc-title"><Shield size={16} /> Privacy & Trust Center</h3>
          <p className="tc-subtitle">Full transparency into your data</p>
        </div>
        <div className="tc-compliance-badges">
          {trustStats.dpdpCompliant && <span className="tc-badge tc-badge-green"><CheckCircle2 size={10} /> DPDP</span>}
          {trustStats.iataOneIdReady && <span className="tc-badge tc-badge-blue"><Globe size={10} /> IATA One ID</span>}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tc-tabs">
        {['overview', 'access', 'retention', 'audit'].map(tab => (
          <button key={tab} className={`tc-tab ${activeTab === tab ? 'tc-tab-active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'overview' && <Activity size={12} />}
            {tab === 'access' && <Eye size={12} />}
            {tab === 'retention' && <Database size={12} />}
            {tab === 'audit' && <FileSearch size={12} />}
            <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="tc-content">
          <div className="tc-stats-grid">
            <div className="tc-stat"><span className="tc-stat-value">{trustStats.uptime}</span><span className="tc-stat-label">System Uptime</span></div>
            <div className="tc-stat"><span className="tc-stat-value">{trustStats.totalJourneys}</span><span className="tc-stat-label">Total Journeys</span></div>
            <div className="tc-stat"><span className="tc-stat-value">{trustStats.consentRate}</span><span className="tc-stat-label">Consent Rate</span></div>
            <div className="tc-stat">
              <span className="tc-stat-value" style={{ color: trustStats.incidentsLast90d === 0 ? '#16a34a' : '#ef4444' }}>
                {trustStats.incidentsLast90d}
              </span>
              <span className="tc-stat-label">Incidents (90d)</span>
            </div>
          </div>
          <div className="tc-audit-info">
            <FileSearch size={14} />
            <span>Last audit by <strong>{trustStats.auditor}</strong> on {trustStats.lastAudit}</span>
          </div>
        </div>
      )}

      {/* Access History */}
      {activeTab === 'access' && (
        <div className="tc-content">
          <h4 className="tc-section-title"><Eye size={14} /> Who accessed my travel identity?</h4>
          <div className="tc-access-list">
            {accessLog.map(entry => (
              <div className="tc-access-row" key={entry.id}>
                <div className="tc-access-who">
                  <span className="tc-access-name">{entry.who}</span>
                  <span className="tc-access-purpose">{entry.purpose}</span>
                </div>
                <div className="tc-access-what">
                  <span className="tc-access-data">{entry.what}</span>
                  <span className="tc-access-when">{entry.when}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Retention */}
      {activeTab === 'retention' && (
        <div className="tc-content">
          <h4 className="tc-section-title"><Database size={14} /> Data Retention Dashboard</h4>
          <div className="tc-retention-table">
            <div className="tc-retention-header">
              <span>Data</span>
              <span>Purpose</span>
              <span>Retention</span>
            </div>
            {trustStats.dataRetention?.map((row, i) => (
              <div className="tc-retention-row" key={i}>
                <span className="tc-ret-data">{row.data}</span>
                <span className="tc-ret-purpose">{row.purpose}</span>
                <span className="tc-ret-retention">{row.retention}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log */}
      {activeTab === 'audit' && (
        <div className="tc-content">
          <h4 className="tc-section-title"><FileSearch size={14} /> Security & Audit</h4>
          <div className="tc-audit-list">
            <div className="tc-audit-item tc-audit-ok">
              <CheckCircle2 size={14} />
              <div>
                <span className="tc-audit-event">Ernst & Young Security Audit — Passed</span>
                <span className="tc-audit-date">15 Aug 2026</span>
              </div>
            </div>
            <div className="tc-audit-item tc-audit-ok">
              <CheckCircle2 size={14} />
              <div>
                <span className="tc-audit-event">DPDP Compliance Review — Compliant</span>
                <span className="tc-audit-date">01 Jul 2026</span>
              </div>
            </div>
            <div className="tc-audit-item tc-audit-ok">
              <CheckCircle2 size={14} />
              <div>
                <span className="tc-audit-event">Penetration Test — No Vulnerabilities</span>
                <span className="tc-audit-date">22 Jun 2026</span>
              </div>
            </div>
            <div className="tc-audit-item tc-audit-ok">
              <Shield size={14} />
              <div>
                <span className="tc-audit-event">Bug Bounty Programme — Active</span>
                <span className="tc-audit-date">Ongoing</span>
              </div>
            </div>
            {trustStats.breachHistory.length === 0 && (
              <div className="tc-no-breach">
                <CheckCircle2 size={14} /> Zero security breaches on record
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustCenter;
