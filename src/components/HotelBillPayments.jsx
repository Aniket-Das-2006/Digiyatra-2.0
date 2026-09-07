import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Receipt, CreditCard, Download, CheckCircle2, Clock, IndianRupee } from 'lucide-react';
import './HotelBillPayments.css';

const HotelBillPayments = () => {
  const { hotelBooking } = useDigiYatra();
  const [showFull, setShowFull] = useState(false);

  const paidPercent = Math.round((hotelBooking.paidAmount / hotelBooking.totalBill) * 100);
  const due = hotelBooking.totalBill - hotelBooking.paidAmount;

  return (
    <div className="hbp-card">
      <div className="hbp-header">
        <h3 className="hbp-title"><Receipt size={16} /> Bill & Payments</h3>
        <span className={`hbp-pay-status ${hotelBooking.paymentStatus === 'paid' ? 'hbp-paid' : 'hbp-partial'}`}>
          {hotelBooking.paymentStatus === 'paid' ? <><CheckCircle2 size={10} /> Paid</> : <><Clock size={10} /> Partial</>}
        </span>
      </div>

      {/* Total */}
      <div className="hbp-total-row">
        <div className="hbp-total-info">
          <span className="hbp-total-label">Total Bill</span>
          <span className="hbp-total-amount"><IndianRupee size={16} />{hotelBooking.totalBill?.toLocaleString()}</span>
        </div>
        <div className="hbp-pay-progress">
          <div className="hbp-pay-bar">
            <div className="hbp-pay-fill" style={{ width: `${paidPercent}%` }} />
          </div>
          <div className="hbp-pay-legend">
            <span className="hbp-legend-paid">Paid: {'\u20B9'}{hotelBooking.paidAmount?.toLocaleString()}</span>
            <span className="hbp-legend-due">Due: {'\u20B9'}{due.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <button className="hbp-toggle" onClick={() => setShowFull(!showFull)}>
        {showFull ? 'Hide Breakdown' : 'View Breakdown'}
      </button>

      {showFull && (
        <div className="hbp-breakdown">
          {hotelBooking.billBreakdown?.map((item, i) => (
            <div className="hbp-line" key={i}>
              <span className="hbp-line-item">{item.item}</span>
              <span className="hbp-line-amount">{item.amount === 0 ? 'Included' : `\u20B9${item.amount.toLocaleString()}`}</span>
            </div>
          ))}
          <div className="hbp-line hbp-line-total">
            <span className="hbp-line-item">Total</span>
            <span className="hbp-line-amount">{'\u20B9'}{hotelBooking.totalBill?.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="hbp-actions">
        {due > 0 && (
          <button className="hbp-pay-btn">
            <CreditCard size={14} /> Pay {'\u20B9'}{due.toLocaleString()}
          </button>
        )}
        <button className="hbp-download-btn">
          <Download size={14} /> GST Invoice
        </button>
      </div>
    </div>
  );
};

export default HotelBillPayments;
