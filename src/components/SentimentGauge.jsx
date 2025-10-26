import React, { useEffect, useRef } from 'react';
import './SentimentGauge.css';

function SentimentGauge({ score, label }) {
  const gaugeRef = useRef(null);

  useEffect(() => {
    if (gaugeRef.current) {
      // Animate the gauge fill
      setTimeout(() => {
        gaugeRef.current.style.width = `${score * 100}%`;
      }, 100);
    }
  }, [score]);

  const getGaugeColor = (score) => {
    if (score >= 0.6) return 'var(--neon-green)';
    if (score >= 0.4) return '#ffaa00';
    return '#ff4444';
  };

  return (
    <div className="sentiment-gauge">
      <div className="gauge-container">
        <div className="gauge-bg">
          <div 
            ref={gaugeRef}
            className="gauge-fill"
            style={{ 
              backgroundColor: getGaugeColor(score),
              boxShadow: `0 0 20px ${getGaugeColor(score)}`
            }}
          />
        </div>
        <div className="gauge-markers">
          <span className="marker">0</span>
          <span className="marker">25</span>
          <span className="marker">50</span>
          <span className="marker">75</span>
          <span className="marker">100</span>
        </div>
      </div>
      
      <div className="gauge-label">
        <span className="label-text" style={{ color: getGaugeColor(score) }}>
          {label}
        </span>
        <span className="label-score">
          {(score * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default SentimentGauge;
