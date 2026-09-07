import React from 'react';
import { Send, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

// Helper to convert names to slugs
const toSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const Footer = () => {
  const { t } = useTranslation();
  
  const columns = [
    { title: 'DigiYatra', items: ['Trust Center', 'Consent Manager', 'Identity Wallet', 'Flight Tracker', 'Baggage Tracking', 'SOS Emergency', 'Accessibility'] },
    { title: 'Hotels & Stay', items: ['Digital Check-in', 'Form C Auto-Fill', 'Biometric Access', 'Group Stays', 'Loyalty Linking', 'Automated Checkout'] },
    { title: 'Compliance', items: ['DPDP Act 2023', 'IATA One ID', 'Data Retention', 'Privacy Policy', 'Security Audits', 'Bug Bounty'] },
    { title: 'About', items: ['About DigiYatra', 'MoCA', 'AAI Partnership', 'Help & Support', 'Terms & Conditions', 'Contact Us'] },
  ];

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/custom_logo.png" alt="DigiYatra Logo" style={{ height: '84px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p className="brand-text">DigiYatra 2.0<br/>{t('footer.brand_desc')}</p>
          <div className="newsletter">
            <div className="input-group">
              <input type="email" placeholder={t('footer.placeholder_email')} />
              <button className="btn-send"><Send size={16} /></button>
            </div>
          </div>
          <div className="app-stores">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
          </div>
        </div>
        <div className="footer-links">
          {columns.map((col, i) => {
            const categorySlug = toSlug(col.title);
            return (
              <div className="link-column" key={i}>
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item, j) => {
                    const tabSlug = toSlug(item);
                    return (
                      <li key={j}><Link to={`/info/${categorySlug}/${tabSlug}`}>{item}</Link></li>
                    )
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container footer-bottom flex-between">
        <p>{t('footer.copyright')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#">Designed by Aniket Das</a>
          <Link to="/info/digiyatra/trust-center" style={{ display: 'inline-flex', color: 'inherit', opacity: 0.7, hover: { opacity: 1 } }}>
            <Info size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
