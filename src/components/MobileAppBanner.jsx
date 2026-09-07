import React from 'react';
import './MobileAppBanner.css';

const MobileAppBanner = () => {
  return (
    <div className="mobile-app-banner">
      <div className="banner-bg-wrapper">
        <div className="banner-slash-bg"></div>
      </div>
      <div className="container banner-content">
        <div className="banner-text">
          <h3 className="banner-super-title">DigiYatra 2.0</h3>
          <h2>Your face,<br/>Your boarding pass.</h2>
          <p>Seamless travel from home to hotel. Manage your digital identity, boarding passes, and baggage with secure biometric verification.</p>
          <div className="store-buttons">
            <button className="store-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" />
            </button>
            <button className="store-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
            </button>
          </div>
        </div>
        <div className="banner-images">
          <div className="phone-mockup phone-1">
            <img src="/dy_mobile_dash_3.png" alt="DigiYatra Dashboard" />
          </div>
          <div className="phone-mockup phone-2">
            <img src="/dy_mobile_wallet_3.png" alt="DigiYatra Wallet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppBanner;
