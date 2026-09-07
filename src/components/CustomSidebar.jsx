import React from 'react';
import './CustomSidebar.css';

const CustomSidebar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <aside className="custom-sidebar glass-panel">
      <div className="sidebar-header">
        <h3>Services</h3>
      </div>
      <div className="sidebar-scroll-area">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`sidebar-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CustomSidebar;
