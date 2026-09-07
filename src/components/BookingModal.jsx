import React, { useState, useEffect } from 'react';
import { X, PlaneTakeoff, CheckCircle2 } from 'lucide-react';
import { destinations, searchFlights } from '../data/flightDatabase';
import './BookingModal.css';

const BookingModal = ({ destId, onClose }) => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState(null);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    const dest = destinations.find(d => d.id === destId);
    if (dest) {
      setDestination(dest);
      // Simulate searching for flights to this destination
      const flights = searchFlights(null, dest.code);
      setAvailableFlights(flights);
    }
  }, [destId]);

  if (!destination) return null;

  const handleBook = () => {
    setStep(2);
    setTimeout(() => setStep(3), 2000);
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content fade-in-up">
        <button className="close-modal-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {step === 1 && (
          <div className="booking-step-1">
            <div className="modal-header" style={{ background: `linear-gradient(135deg, ${destination.themeColor}cc, ${destination.themeColor})` }}>
              <h2>Book your trip to {destination.name}</h2>
              <p>{destination.description}</p>
            </div>
            
            <div className="flight-selection-area">
              <h3>Available Flights</h3>
              {availableFlights.length > 0 ? (
                <div className="flight-list">
                  {availableFlights.map(f => (
                    <div 
                      key={f.id} 
                      className={`flight-option ${selectedFlight?.id === f.id ? 'selected' : ''}`}
                      onClick={() => setSelectedFlight(f)}
                      style={{ borderColor: selectedFlight?.id === f.id ? destination.themeColor : '#e2e8f0' }}
                    >
                      <div className="flight-details">
                        <span className="airline">{f.airline}</span>
                        <div className="route-time">
                          <span>{f.departure}</span>
                          <div className="duration-line">
                            <span className="dur-text">{f.duration}</span>
                            <div className="line"><PlaneTakeoff size={12} /></div>
                            <span className="stops-text">{f.type}</span>
                          </div>
                          <span>{f.arrival}</span>
                        </div>
                      </div>
                      <div className="flight-price">
                        <span>₹{f.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No flights found for this route today.</p>
              )}
            </div>

            <div className="modal-footer">
              <button 
                className="confirm-btn" 
                disabled={!selectedFlight}
                onClick={handleBook}
                style={{ background: selectedFlight ? destination.themeColor : '#cbd5e1' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step-processing">
            <div className="spinner" style={{ borderTopColor: destination.themeColor }}></div>
            <h3>Processing Payment...</h3>
            <p>Please don't close this window.</p>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step-success">
            <CheckCircle2 size={64} color="#10b981" />
            <h2>Booking Confirmed!</h2>
            <p>Your flight to {destination.name} has been booked successfully.</p>
            <div className="ticket-summary">
              <p><strong>PNR:</strong> {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              <p><strong>Flight:</strong> {selectedFlight?.airline} ({selectedFlight?.from} - {selectedFlight?.to})</p>
            </div>
            <button className="done-btn" onClick={onClose}>Done</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
