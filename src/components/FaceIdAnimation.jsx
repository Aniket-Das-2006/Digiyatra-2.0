import React from 'react';
import './FaceIdAnimation.css';

const FaceIdAnimation = ({ status }) => {
  // status: 'idle' | 'verifying' | 'success'
  let wrapperClass = 'face-id-wrapper';
  if (status === 'verifying') {
    wrapperClass += ' active';
  } else if (status === 'success') {
    wrapperClass += ' active completed';
  }

  return (
    <div className="face-id-container">
      <div className={wrapperClass}>
        {/* The Face ID outline */}
        <svg className="face-id-default" version="1.1" viewBox="0 0 30 30">
          <path d="M12.062 20c.688.5 1.688 1 2.938 1s2.25-.5 2.938-1M20 12v2M10 12v2M15 12v4a1 1 0 0 1-1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"/>
          <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M26 9V6a2 2 0 0 0-2-2h-3M9 4H6a2 2 0 0 0-2 2v3M21 26h3a2 2 0 0 0 2-2v-3M4 21v3a2 2 0 0 0 2 2h3"/>
          </g>
        </svg>
        
        {/* Colorful rotating rings */}
        <div className="face-id-circle green"></div>
        <div className="face-id-circle blue"></div>
        <div className="face-id-circle purple"></div>
        
        {/* The checkmark that draws itself at the end */}
        <svg version="1.1" viewBox="0 0 80 80">
          <path
            className="path-tick"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 25,45 35,55 60,30"
          />
        </svg>
      </div>
    </div>
  );
};

export default FaceIdAnimation;
