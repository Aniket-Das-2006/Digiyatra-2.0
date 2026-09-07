import React, { useState, useRef, useCallback } from 'react';
import { AlertTriangle, Shield, MapPin, MessageCircle, Stethoscope, Baby, UserX, HelpCircle, Phone, Check } from 'lucide-react';
import './SOSButton.css';

const SlideButton = ({ label, buttonColor, onSlide, triggeredLabel, isTriggered, icon }) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const buttonSize = 44; 
  const containerPadding = 4;

  const handlePointerDown = (e) => { if (isTriggered) return; setIsDragging(true); e.target.setPointerCapture(e.pointerId); };
  const handlePointerMove = (e) => {
    if (!isDragging || isTriggered || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const maxDrag = containerWidth - buttonSize - (containerPadding * 2);
    const bounds = containerRef.current.getBoundingClientRect();
    let x = e.clientX - bounds.left - (buttonSize / 2) - containerPadding;
    if (x < 0) x = 0; if (x > maxDrag) x = maxDrag;
    setDragX(x);
    if (x >= maxDrag * 0.95) { setIsDragging(false); setDragX(maxDrag); onSlide(); }
  };
  const handlePointerUp = (e) => { if (isTriggered) return; setIsDragging(false); setDragX(0); e.target.releasePointerCapture(e.pointerId); };

  return (
    <div ref={containerRef} className="sos-slider" style={{ touchAction: 'none' }}>
      <div className="sos-slider-label">{isTriggered ? triggeredLabel : label}</div>
      <div
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
        className="sos-slider-thumb"
        style={{
          backgroundColor: buttonColor,
          transform: `translateX(${isTriggered ? (containerRef.current?.offsetWidth - buttonSize - containerPadding * 2) || dragX : dragX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
        }}
      >
        {isTriggered ? <Check size={18} /> : icon}
      </div>
    </div>
  );
};

const SOSButton = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [defaultTriggered, setDefaultTriggered] = useState(false);
  const [waTriggered, setWaTriggered] = useState(false);

  const categories = [
    { id: 'medical', label: 'Medical Emergency', icon: <Stethoscope size={14} />, color: '#ef4444' },
    { id: 'security', label: 'Airport Security', icon: <Shield size={14} />, color: '#f59e0b' },
    { id: 'lost_child', label: 'Lost Child', icon: <Baby size={14} />, color: '#ec4899' },
    { id: 'lost_elderly', label: 'Lost Elderly', icon: <UserX size={14} />, color: '#8b5cf6' },
    { id: 'assistance', label: 'Assistance Needed', icon: <HelpCircle size={14} />, color: '#0ea5e9' },
  ];

  const handleDefaultSOS = () => {
    setDefaultTriggered(true);
    setTimeout(() => setDefaultTriggered(false), 4000);
  };

  const handleWhatsAppSOS = () => {
    setWaTriggered(true);
    const cat = categories.find(c => c.id === activeCategory);
    const categoryText = cat ? cat.label : 'General Emergency';
    const emergencyText = `[EMERGENCY SOS]\nCategory: ${categoryText}\n\nKnown Location: T3 Security — DEL Airport\nSent via DigiYatra AI Assistant`;
    window.open(`https://wa.me/?text=${encodeURIComponent(emergencyText)}`, '_blank');
    setTimeout(() => setWaTriggered(false), 4000);
  };

  return (
    <div className="sos-card">
      <h4 className="sos-title"><Shield size={14} /> Emergency SOS</h4>
      <p className="sos-subtitle">Select category, then slide to alert</p>

      {/* Category Grid */}
      <div className="sos-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`sos-cat-btn ${activeCategory === cat.id ? 'sos-cat-active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            style={activeCategory === cat.id ? { borderColor: cat.color, background: cat.color + '15' } : {}}
          >
            <span style={{ color: cat.color }}>{cat.icon}</span>
            <span className="sos-cat-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="sos-sliders">
        <SlideButton 
          label="Slide to SOS" buttonColor="#ef4444"
          onSlide={handleDefaultSOS} isTriggered={defaultTriggered}
          triggeredLabel="Alert Sent" icon="SOS"
        />
        <SlideButton 
          label="WhatsApp SOS" buttonColor="#22c55e"
          onSlide={handleWhatsAppSOS} isTriggered={waTriggered}
          triggeredLabel="Opening..." icon={<MessageCircle size={16} />}
        />
      </div>

      {(defaultTriggered || waTriggered) && (
        <div className="sos-confirmation">
          <MapPin size={12} />
          Alert dispatched with current location
          {activeCategory && ` — ${categories.find(c => c.id === activeCategory)?.label}`}
        </div>
      )}

      {/* Family Safety Sharing */}
      <div className="sos-family-safety">
        <Phone size={12} />
        <span>Family safety sharing: <strong>Active</strong> — trusted contacts receive flight updates</span>
      </div>

      {!defaultTriggered && !waTriggered && (
        <div className="sos-geo-info">
          <MapPin size={11} /> Geofenced to nearest airport
        </div>
      )}
    </div>
  );
};

export default SOSButton;
