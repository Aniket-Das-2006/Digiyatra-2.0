import React from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { BarChart3, Plane, Hotel, CreditCard, Leaf, TrendingUp } from 'lucide-react';
import './TravelAnalytics.css';

const TravelAnalytics = () => {
  const { analytics } = useDigiYatra();
  if (!analytics?.year) return null;

  const maxSpend = Math.max(...analytics.monthlySpend.map(m => m.amount));

  return (
    <div className="ta-card">
      <div className="ta-header">
        <h3 className="ta-title"><BarChart3 size={16} /> Your {analytics.year} Travel</h3>
      </div>

      {/* Stats Row */}
      <div className="ta-stats">
        <div className="ta-stat">
          <Plane size={16} className="ta-stat-icon" />
          <span className="ta-stat-value">{analytics.totalFlights}</span>
          <span className="ta-stat-label">Flights</span>
        </div>
        <div className="ta-stat">
          <Hotel size={16} className="ta-stat-icon" />
          <span className="ta-stat-value">{analytics.totalHotels}</span>
          <span className="ta-stat-label">Hotels</span>
        </div>
        <div className="ta-stat">
          <CreditCard size={16} className="ta-stat-icon" />
          <span className="ta-stat-value">₹{(analytics.totalSpent / 1000).toFixed(0)}K</span>
          <span className="ta-stat-label">Spent</span>
        </div>
        <div className="ta-stat">
          <Leaf size={16} className="ta-stat-icon" style={{ color: '#16a34a' }} />
          <span className="ta-stat-value">{analytics.carbonFootprint}</span>
          <span className="ta-stat-label">CO₂</span>
        </div>
      </div>

      {/* Monthly Spend Chart */}
      <div className="ta-chart-section">
        <h4 className="ta-chart-title">Monthly Spending</h4>
        <div className="ta-chart">
          {analytics.monthlySpend.map((m, i) => (
            <div className="ta-chart-bar-wrap" key={i}>
              <div
                className="ta-chart-bar"
                style={{ height: `${(m.amount / maxSpend) * 100}%` }}
              >
                <span className="ta-chart-tooltip">₹{m.amount.toLocaleString()}</span>
              </div>
              <span className="ta-chart-label">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Airlines & Frequent Route */}
      <div className="ta-bottom-grid">
        <div className="ta-frequent">
          <TrendingUp size={12} />
          <span>Frequent Route: <strong>{analytics.frequentRoute}</strong></span>
        </div>
        <div className="ta-frequent">
          <CreditCard size={12} />
          <span>Avg Ticket: <strong>₹{analytics.avgTicket.toLocaleString()}</strong></span>
        </div>
      </div>

      <div className="ta-airlines">
        <h4 className="ta-airlines-title">Top Airlines</h4>
        <div className="ta-airline-bars">
          {analytics.topAirlines.map((a, i) => (
            <div className="ta-airline-row" key={i}>
              <span className="ta-airline-name">{a.name}</span>
              <div className="ta-airline-bar-bg">
                <div
                  className="ta-airline-bar-fill"
                  style={{ width: `${(a.count / analytics.topAirlines[0].count) * 100}%` }}
                />
              </div>
              <span className="ta-airline-count">{a.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelAnalytics;
