import React from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Package, CheckCircle2, AlertTriangle, MapPin, Weight } from 'lucide-react';
import './BaggageTracker.css';

const ALL_STEPS = ['checked_in', 'security', 'loaded', 'aircraft', 'unloaded', 'belt'];
const STEP_LABELS = { checked_in: 'Checked In', security: 'Security', loaded: 'Loaded', aircraft: 'In Flight', unloaded: 'Unloaded', belt: 'Belt' };

const BaggageTracker = () => {
  const { baggage } = useDigiYatra();

  return (
    <div className="bt-card">
      <h3 className="bt-title"><Package size={16} /> Smart Baggage Tracking</h3>
      <p className="bt-subtitle">RFID / BLE real-time tracking</p>

      <div className="bt-list">
        {baggage.map(bag => {
          const currentIdx = ALL_STEPS.indexOf(bag.status);

          return (
            <div className="bt-bag" key={bag.id}>
              <div className="bt-bag-header">
                <div className="bt-bag-info">
                  <span className="bt-bag-id">{bag.tag}</span>
                  <span className="bt-bag-weight"><Weight size={10} /> {bag.weight}</span>
                </div>
                {bag.exception ? (
                  <span className="bt-exception"><AlertTriangle size={10} /> {bag.exception}</span>
                ) : (
                  <span className="bt-location"><MapPin size={10} /> {bag.currentLocation}</span>
                )}
              </div>

              {/* RFID Step Progress */}
              <div className="bt-steps">
                {ALL_STEPS.map((step, i) => {
                  const done = i <= currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div className="bt-step-wrapper" key={step}>
                      <div className={`bt-step-dot ${done ? 'bt-done' : ''} ${isCurrent ? 'bt-current' : ''}`}>
                        {done ? <CheckCircle2 size={10} /> : <span className="bt-step-num">{i + 1}</span>}
                      </div>
                      {i < ALL_STEPS.length - 1 && (
                        <div className={`bt-step-line ${done && i < currentIdx ? 'bt-line-done' : ''}`} />
                      )}
                      <span className={`bt-step-label ${isCurrent ? 'bt-label-current' : ''}`}>{STEP_LABELS[step]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Exception Alert Mock */}
      <div className="bt-alert-info">
        <CheckCircle2 size={12} />
        <span>No baggage exceptions detected. You will be alerted instantly if any issue occurs.</span>
      </div>
    </div>
  );
};

export default BaggageTracker;
