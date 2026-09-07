import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDigiYatra } from '../context/DigiYatraContext';
import { User, Home, Loader2, CheckCircle2 } from 'lucide-react';
import ProfilePanel from './ProfilePanel';
import SubMenuDrawer from './SubMenuDrawer';
import FaceIdAnimation from './FaceIdAnimation';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [verifyState, setVerifyState] = useState('idle'); // idle | verifying | success
  const { toggleProfilePanel, setDigiYatraSubView, setHotelSubView } = useDigiYatra();
  const location = useLocation();

  const isHotels = location.pathname.includes('hotel');
  const currentTab = isHotels ? 'hotels' : 'digiyatra';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    // Reset sub views so we go back to default landing pages
    setDigiYatraSubView(null);
    setHotelSubView(null);
  };

  const handleVerifyClick = () => {
    if (verifyState !== 'idle') return;
    setVerifyState('verifying');
    
    setTimeout(() => {
      setVerifyState('success');
      setTimeout(() => setVerifyState('idle'), 2500);
    }, 2000);
  };

  return (
    <>
      <div className={`dynamic-island ${verifyState !== 'idle' ? 'active' : ''} ${verifyState}`}>
        <FaceIdAnimation status={verifyState} />
        {verifyState === 'verifying' && <span>{t('header.verifying')}</span>}
        {verifyState === 'success' && <span>{t('header.verification_done')}</span>}
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" onClick={handleHomeClick} className="logo" style={{ textDecoration: 'none' }}>
            <span className="logo-wordmark">DIGI</span>
            <span className="logo-y">Y</span>
            <span className="logo-wordmark">ATRA</span>
          </Link>
          
          <nav className="nav-links">
            <button className="btn-login" onClick={handleVerifyClick}>{t('header.verify_identity')}</button>
            <button
              className={`btn-profile ${scrolled ? 'btn-profile-scrolled' : ''}`}
              onClick={toggleProfilePanel}
              title="Profile & Settings"
              aria-label="Open profile panel"
              style={{ marginRight: '8px' }}
            >
              <User size={18} />
            </button>
            <SubMenuDrawer tab={currentTab} />
          </nav>
        </div>
      </header>
      <ProfilePanel />
    </>
  );
};

export default Header;

