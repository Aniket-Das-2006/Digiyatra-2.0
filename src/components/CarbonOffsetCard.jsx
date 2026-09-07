import React, { useState } from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { Leaf, TreePine, TrendingDown, CheckCircle2 } from 'lucide-react';
import './CarbonOffsetCard.css';

const CarbonOffsetCard = () => {
  const { flight, analytics } = useDigiYatra();
  const [offsetDone, setOffsetDone] = useState(false);

  const handleOffset = () => {
    setOffsetDone(true);
    setTimeout(() => setOffsetDone(false), 3000);
  };

  return (
    <div className="co-card">
      <h3 className="co-title"><Leaf size={16} /> Carbon Footprint</h3>

      <div className="co-stats">
        <div className="co-stat">
          <span className="co-stat-val">{flight.co2Estimate}</span>
          <span className="co-stat-label">This Flight</span>
        </div>
        <div className="co-stat">
          <span className="co-stat-val">{analytics.carbonFootprint}</span>
          <span className="co-stat-label">Year Total</span>
        </div>
        <div className="co-stat co-stat-green">
          <span className="co-stat-val">{analytics.carbonOffset}</span>
          <span className="co-stat-label">Offset</span>
        </div>
      </div>

      <div className="co-progress-wrap">
        <div className="co-progress-label">
          <span>Offset Progress</span>
          <span>33%</span>
        </div>
        <div className="co-progress-bar">
          <div className="co-progress-fill" style={{ width: '33%' }} />
        </div>
      </div>

      <div className="co-offset-action">
        {offsetDone ? (
          <div className="co-offset-done"><CheckCircle2 size={14} /> Offset contribution recorded</div>
        ) : (
          <button className="co-offset-btn" onClick={handleOffset}>
            <TreePine size={14} /> Offset This Flight — Rs. 120
          </button>
        )}
      </div>

      <div className="co-tip">
        <TrendingDown size={11} />
        <span>Your carbon per-km is 18% below average for this route</span>
      </div>
    </div>
  );
};

export default CarbonOffsetCard;
