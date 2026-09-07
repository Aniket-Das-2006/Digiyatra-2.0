import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { TrendingDown, TrendingUp, Bell, BellOff, AlertTriangle, CheckCircle2, Minus, BarChart3, Target } from 'lucide-react';
import './PriceIntelligence.css';

const PriceIntelligenceDashboard = () => {
  const { priceIntel, addPriceAlert, removePriceAlert } = useDigiYatra();
  const [newAlertRoute, setNewAlertRoute] = useState('');
  const [newAlertPrice, setNewAlertPrice] = useState('');
  const [showAddAlert, setShowAddAlert] = useState(false);

  if (!priceIntel?.route) return null;

  const maxPrice = Math.max(...priceIntel.priceHistory.map(p => p.price));
  const minPrice = Math.min(...priceIntel.priceHistory.map(p => p.price));
  const range = maxPrice - minPrice || 1;

  const recColor = priceIntel.recommendation === 'buy' ? '#16a34a' : priceIntel.recommendation === 'wait' ? '#f59e0b' : '#64748b';
  const recIcon = priceIntel.recommendation === 'buy' ? <TrendingDown size={16} /> : priceIntel.recommendation === 'wait' ? <TrendingUp size={16} /> : <Minus size={16} />;
  const recLabel = priceIntel.recommendation === 'buy' ? 'BUY — Good time to book' : priceIntel.recommendation === 'wait' ? 'WAIT — Consider waiting' : 'NEUTRAL';

  return (
    <div className="pi-card">
      <div className="pi-header">
        <div>
          <h3 className="pi-title"><BarChart3 size={16} /> AI Price Intelligence</h3>
          <p className="pi-route">{priceIntel.route}</p>
        </div>
        <div className="pi-current-price">
          <span className="pi-price-label">Current</span>
          <span className="pi-price-value">₹{priceIntel.currentPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="pi-recommendation" style={{ borderColor: recColor + '40', background: recColor + '10' }}>
        <div className="pi-rec-icon" style={{ color: recColor }}>{recIcon}</div>
        <div>
          <span className="pi-rec-label" style={{ color: recColor }}>{recLabel}</span>
          <span className="pi-rec-text">{priceIntel.recommendationText}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="pi-stats">
        <div className="pi-stat">
          <span className="pi-stat-label">7-Day Avg</span>
          <span className="pi-stat-value">₹{priceIntel.avg7d.toLocaleString()}</span>
        </div>
        <div className="pi-stat">
          <span className="pi-stat-label">30-Day Avg</span>
          <span className="pi-stat-value">₹{priceIntel.avg30d.toLocaleString()}</span>
        </div>
        <div className="pi-stat">
          <span className="pi-stat-label">Lowest</span>
          <span className="pi-stat-value" style={{ color: '#16a34a' }}>₹{priceIntel.historicalLow.toLocaleString()}</span>
        </div>
        <div className="pi-stat">
          <span className="pi-stat-label">Highest</span>
          <span className="pi-stat-value" style={{ color: '#ef4444' }}>₹{priceIntel.historicalHigh.toLocaleString()}</span>
        </div>
      </div>

      {/* Price History Graph (CSS-only bar chart) */}
      <div className="pi-graph-section">
        <h4 className="pi-graph-title">Price History</h4>
        <div className="pi-graph">
          {priceIntel.priceHistory.map((point, i) => {
            const height = ((point.price - minPrice) / range) * 80 + 20;
            const isLowest = point.price === minPrice;
            const isCurrent = i === priceIntel.priceHistory.length - 1;
            return (
              <div className="pi-bar-wrapper" key={i}>
                <div
                  className={`pi-bar ${isCurrent ? 'pi-bar-current' : ''} ${isLowest ? 'pi-bar-lowest' : ''}`}
                  style={{ height: `${height}%` }}
                >
                  <span className="pi-bar-tooltip">₹{point.price.toLocaleString()}</span>
                </div>
                <span className="pi-bar-label">{point.date.split(' ')[1] + ' ' + point.date.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Volatility */}
      <div className="pi-volatility">
        <span>Volatility:</span>
        <div className="pi-vol-bar">
          <div className={`pi-vol-fill pi-vol-${priceIntel.volatility}`}></div>
        </div>
        <span className="pi-vol-label">{priceIntel.volatility.charAt(0).toUpperCase() + priceIntel.volatility.slice(1)}</span>
      </div>

      {/* Price Alerts */}
      <div className="pi-alerts-section">
        <div className="pi-alerts-header">
          <h4><Bell size={14} /> Price Alerts</h4>
          <button className="pi-add-alert-btn" onClick={() => setShowAddAlert(!showAddAlert)}>
            {showAddAlert ? 'Cancel' : '+ Add Alert'}
          </button>
        </div>

        {showAddAlert && (
          <div className="pi-add-alert-form">
            <input
              type="text"
              placeholder="Route (e.g. CCU → DEL)"
              value={newAlertRoute}
              onChange={e => setNewAlertRoute(e.target.value)}
              className="pi-alert-input"
            />
            <input
              type="number"
              placeholder="Price threshold ₹"
              value={newAlertPrice}
              onChange={e => setNewAlertPrice(e.target.value)}
              className="pi-alert-input"
            />
            <button
              className="pi-alert-submit"
              onClick={() => {
                if (newAlertRoute && newAlertPrice) {
                  addPriceAlert(newAlertRoute, parseInt(newAlertPrice));
                  setNewAlertRoute('');
                  setNewAlertPrice('');
                  setShowAddAlert(false);
                }
              }}
            >
              <Target size={12} /> Set Alert
            </button>
          </div>
        )}

        <div className="pi-alert-list">
          {priceIntel.alerts?.map(alert => (
            <div className="pi-alert-row" key={alert.id}>
              <div className="pi-alert-info">
                <span className="pi-alert-route">{alert.route}</span>
                <span className="pi-alert-threshold">Below ₹{alert.threshold.toLocaleString()}</span>
              </div>
              <button className="pi-alert-remove" onClick={() => removePriceAlert(alert.id)}>
                <BellOff size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="pi-disclaimer">
        <AlertTriangle size={10} /> Prices are forecasts, not guaranteed predictions. Always verify before booking.
      </p>
    </div>
  );
};

export default PriceIntelligenceDashboard;
