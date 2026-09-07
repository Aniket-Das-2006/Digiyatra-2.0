import React, { useState } from 'react';
import { Accessibility, CheckCircle2, Clock, MapPin, Phone, ChevronRight, AlertCircle, PersonStanding, Eye, Ear, Stethoscope, Baby } from 'lucide-react';
import './AccessibilityCenter.css';

const AccessibilityCenter = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Wheelchair', status: 'confirmed', gate: 'T3-G24', time: '07:30 AM', assignee: 'Airport Assist Team A' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('wheelchair');

  const serviceTypes = [
    { id: 'wheelchair', label: 'Wheelchair Assistance', icon: <Accessibility size={18} />, desc: 'From terminal entry to aircraft door' },
    { id: 'elderly', label: 'Elderly Assistance', icon: <PersonStanding size={18} />, desc: 'Dedicated escort and priority lanes' },
    { id: 'visual', label: 'Visual Assistance', icon: <Eye size={18} />, desc: 'Audio guidance and tactile assistance' },
    { id: 'hearing', label: 'Hearing Assistance', icon: <Ear size={18} />, desc: 'Visual alerts and sign language support' },
    { id: 'medical', label: 'Medical Support', icon: <Stethoscope size={18} />, desc: 'Oxygen, medication, or special equipment' },
    { id: 'child', label: 'Unaccompanied Minor', icon: <Baby size={18} />, desc: 'Dedicated child escort service' },
  ];

  const handleRequest = () => {
    const svc = serviceTypes.find(s => s.id === formType);
    setRequests(prev => [...prev, {
      id: Date.now(), type: svc.label, status: 'pending', gate: 'T3-G24', time: 'Next available', assignee: 'Assigning...'
    }]);
    setShowForm(false);
  };

  return (
    <div className="ac-card">
      <div className="ac-header">
        <div>
          <h3 className="ac-title"><Accessibility size={16} /> Accessibility Center</h3>
          <p className="ac-subtitle">Request assistance for your journey</p>
        </div>
        <button className="ac-request-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Request'}
        </button>
      </div>

      {/* Active Requests */}
      {requests.length > 0 && (
        <div className="ac-active">
          <h4 className="ac-section-label">Active Requests</h4>
          {requests.map(req => (
            <div className="ac-request-card" key={req.id}>
              <div className="ac-req-top">
                <span className="ac-req-type">{req.type}</span>
                <span className={`ac-req-status ac-status-${req.status}`}>
                  {req.status === 'confirmed' ? <><CheckCircle2 size={10} /> Confirmed</> : <><Clock size={10} /> Pending</>}
                </span>
              </div>
              <div className="ac-req-details">
                <span><MapPin size={10} /> {req.gate}</span>
                <span><Clock size={10} /> {req.time}</span>
                <span><Phone size={10} /> {req.assignee}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Form */}
      {showForm && (
        <div className="ac-form">
          <h4 className="ac-section-label">Select Assistance Type</h4>
          <div className="ac-service-grid">
            {serviceTypes.map(svc => (
              <button
                key={svc.id}
                className={`ac-service-card ${formType === svc.id ? 'ac-service-active' : ''}`}
                onClick={() => setFormType(svc.id)}
              >
                <span className="ac-svc-icon">{svc.icon}</span>
                <span className="ac-svc-label">{svc.label}</span>
                <span className="ac-svc-desc">{svc.desc}</span>
              </button>
            ))}
          </div>
          <button className="ac-submit-btn" onClick={handleRequest}>
            <Accessibility size={14} /> Confirm Request <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Accessible Routes Info */}
      <div className="ac-routes-info">
        <AlertCircle size={12} />
        <span>Accessible routes are automatically calculated for wheelchair users. All gates in T3 are step-free.</span>
      </div>
    </div>
  );
};

export default AccessibilityCenter;
