import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Key, ScanFace, Smartphone, BellOff, Bell, Coffee, Shirt, Sparkles, DoorClosed, CheckCircle2 } from 'lucide-react';
import './HotelRoomStatus.css';

const HotelRoomStatus = () => {
  const { hotelBooking } = useDigiYatra();
  const [dnd, setDnd] = useState(hotelBooking.dndActive);
  const [requestSent, setRequestSent] = useState(null);

  const sendRequest = (type) => {
    setRequestSent(type);
    setTimeout(() => setRequestSent(null), 2500);
  };

  return (
    <div className="hrs-card">
      <div className="hrs-header">
        <div>
          <h3 className="hrs-title"><DoorClosed size={16} /> Room Status</h3>
          <p className="hrs-subtitle">{hotelBooking.hotelName}</p>
        </div>
        <div className="hrs-room-badge">
          <span className="hrs-room-number">{hotelBooking.roomNumber}</span>
          <span className="hrs-floor">{hotelBooking.floor}</span>
        </div>
      </div>

      {/* Door Lock */}
      <div className="hrs-lock-section">
        <div className="hrs-lock-visual">
          <div className="hrs-lock-ring">
            <Key size={24} />
          </div>
          <span className="hrs-lock-status">Door Locked</span>
        </div>
        <div className="hrs-lock-methods">
          <button className="hrs-lock-btn"><ScanFace size={14} /> Face Scan</button>
          <button className="hrs-lock-btn"><Smartphone size={14} /> NFC Tap</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="hrs-actions">
        <button className={`hrs-action ${dnd ? 'hrs-action-active' : ''}`} onClick={() => setDnd(!dnd)}>
          {dnd ? <BellOff size={14} /> : <Bell size={14} />}
          <span>{dnd ? 'DND On' : 'DND Off'}</span>
        </button>
        <button className="hrs-action" onClick={() => sendRequest('room_service')}>
          <Coffee size={14} /><span>Room Service</span>
        </button>
        <button className="hrs-action" onClick={() => sendRequest('housekeeping')}>
          <Sparkles size={14} /><span>Housekeeping</span>
        </button>
        <button className="hrs-action" onClick={() => sendRequest('laundry')}>
          <Shirt size={14} /><span>Laundry</span>
        </button>
      </div>

      {requestSent && (
        <div className="hrs-request-confirm">
          <CheckCircle2 size={12} /> Request sent — {requestSent.replace('_', ' ')} notified
        </div>
      )}

      {/* Amenities */}
      <div className="hrs-amenities">
        {hotelBooking.amenities.map((a, i) => (
          <span className="hrs-amenity-chip" key={i}>{a}</span>
        ))}
      </div>
    </div>
  );
};

export default HotelRoomStatus;
