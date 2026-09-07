import React from 'react';
import './OfferCard.css';

const OfferCard = ({ title, subtitle, image, gradient, code, bankLogo }) => {
  return (
    <div className="offer-card" style={{ background: gradient }}>
      <div className="offer-content">
        {bankLogo && <img src={bankLogo} alt="Bank Logo" className="bank-logo" />}
        {!bankLogo && <span className="offer-tag">Flat</span>}
        <h3>{title}</h3>
        <p>{subtitle}</p>
        {code && <button className="btn-code">{code}</button>}
      </div>
      <div className="offer-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default OfferCard;
