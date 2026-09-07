import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Shield, Wrench, LogIn, FileCheck, Menu, Home } from 'lucide-react';
import './SubMenuDrawer.css';

const SUB_MENUS = {
  digiyatra: [
    { id: 'authentication', label: 'Authentication', icon: <Shield size={15} />, desc: 'Identity & Consent' },
    { id: 'utility', label: 'Utility', icon: <Wrench size={15} />, desc: 'Track & Manage' },
  ],
  hotels: [
    { id: 'checkin', label: 'Check-in', icon: <LogIn size={15} />, desc: 'Digital Entry' },
    { id: 'compliance', label: 'Compliance', icon: <FileCheck size={15} />, desc: 'Form C & GRC' },
  ],
};

const SubMenuDrawer = ({ tab }) => {
  const { 
    drawerOpen, toggleDrawer,
    digiYatraSubView, setDigiYatraSubView,
    hotelSubView, setHotelSubView,
  } = useDigiYatra();
  const location = useLocation();
  const navigate = useNavigate();
  const isInfoPage = location.pathname.startsWith('/info');

  const isOpen = drawerOpen === tab;
  const items = isInfoPage ? [] : (SUB_MENUS[tab] || []);
  const activeId = tab === 'digiyatra' ? digiYatraSubView : hotelSubView;
  const setActive = tab === 'digiyatra' ? setDigiYatraSubView : setHotelSubView;

  const handleSelect = (id) => {
    setActive(id);
    toggleDrawer(tab); // close after selecting
    if (isInfoPage && id === null) {
      navigate('/digiyatra');
    }
  };

  return (
    <div className="submenu-drawer-wrapper">
      <button 
        className={`submenu-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => toggleDrawer(tab)}
        title="Switch view"
        aria-label="Toggle sub-menu"
      >
        <Menu size={20} />
      </button>

      <div className={`submenu-drawer ${isOpen ? 'drawer-open' : ''}`}>
        <div className="submenu-items">
          <button
            className={`submenu-item ${activeId === null ? 'active' : ''}`}
            onClick={() => handleSelect(null)}
          >
            <span className="submenu-icon"><Home size={15} /></span>
            <div className="submenu-text">
              <span className="submenu-label">Home</span>
              <span className="submenu-desc">Search & Landing Page</span>
            </div>
          </button>
          
          {items.map((item) => (
            <button
              key={item.id}
              className={`submenu-item ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              <span className="submenu-icon">{item.icon}</span>
              <div className="submenu-text">
                <span className="submenu-label">{item.label}</span>
                <span className="submenu-desc">{item.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenuDrawer;
