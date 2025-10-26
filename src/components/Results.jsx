import React, { useState } from 'react';
import SentimentGauge from './SentimentGauge';
import AgentCard from './AgentCard';
import DetailedAnalysis from './DetailedAnalysis';
import './Results.css';

function Results({ results, onReset }) {
  const [showJson, setShowJson] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    alert('JSON copied to clipboard!');
  };

  // If detailed analysis view is active, show only that
  if (showDetailedAnalysis) {
    return (
      <section className="results-section detailed-view">
        <div className="results-header">
          <h2 className="results-title">
            <span onClick={() => setShowDetailedAnalysis(false)} className="back-button">
              ← Back to Results
            </span>
          </h2>
          <button onClick={onReset} className="reset-button">
            New Analysis
          </button>
        </div>
        <DetailedAnalysis fusionReport={results.fusion_report} />
      </section>
    );
  }

  const getSentimentLabel = (score) => {
    if (score >= 7) return 'Very Positive';
    if (score >= 3) return 'Positive';
    if (score >= -3) return 'Neutral';
    if (score >= -7) return 'Negative';
    return 'Very Negative';
  };

  const getSentimentColor = (score) => {
    if (score >= 3) return 'var(--neon-green)';
    if (score >= -3) return '#ffaa00';
    return '#ff4444';
  };
  
  // Normalize score to 0-1 range for gauge display (from -10 to 10 scale)
  const normalizeScore = (score) => {
    return (score + 10) / 20; // Convert -10..10 to 0..1
  };

  return (
    <section className="results-section">
      <div className="results-header">
        <h2 className="results-title">Analysis Complete</h2>
        <button onClick={onReset} className="reset-button">
          New Analysis
        </button>
      </div>

      <div className="results-container">
        {/* Final Sentiment */}
        <div className="final-sentiment-card">
          <h3 className="card-title">Final Sentiment</h3>
          <SentimentGauge 
            score={normalizeScore(results.final_sentiment?.overall_score || 0)} 
            label={results.final_sentiment?.sentiment_label || getSentimentLabel(results.final_sentiment?.overall_score || 0)}
          />
          <div className="sentiment-details">
            <div className="detail-item">
              <span className="detail-label">Score</span>
              <span className="detail-value" style={{ color: getSentimentColor(results.final_sentiment?.overall_score || 0) }}>
                {(results.final_sentiment?.overall_score || 0).toFixed(1)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Confidence</span>
              <span className="detail-value">
                {(results.final_sentiment?.confidence || 0).toFixed(1)}%
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Quality</span>
              <span className="detail-value">{results.final_sentiment?.analysis_quality || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Topic</span>
              <span className="detail-value">{results.topic}</span>
            </div>
          </div>
        </div>

        {/* Agent Reports */}
        <div className="agents-section">
          <h3 className="section-subtitle">Agent Reports</h3>
          <div className="agents-grid">
            {results.lexicon_report && (
              <AgentCard 
                agent={results.lexicon_report}
                icon="🔍"
                color="var(--neon-green)"
              />
            )}
            {results.vision_report && (
              <AgentCard 
                agent={results.vision_report}
                icon="👁️"
                color="#00ddff"
              />
            )}
            {results.fusion_report && (
              <AgentCard 
                agent={results.fusion_report}
                icon="🧠"
                color="#ff00ff"
              />
            )}
          </div>
        </div>

        {/* View Detailed Analysis Button */}
        <div className="detailed-analysis-cta">
          <button 
            onClick={() => setShowDetailedAnalysis(true)} 
            className="view-detailed-button"
          >
            <span className="button-icon">📊</span>
            View Detailed Analysis
            <span className="button-arrow">→</span>
          </button>
        </div>

        {/* JSON Receipt */}
        <div className="json-section">
          <div className="json-header">
            <h3 className="section-subtitle">JSON Receipt</h3>
            <div className="json-actions">
              <button 
                onClick={() => setShowJson(!showJson)} 
                className="json-toggle-button"
              >
                {showJson ? 'Hide' : 'Show'} JSON
              </button>
              <button onClick={copyToClipboard} className="json-copy-button">
                Copy
              </button>
            </div>
          </div>
          
          {showJson && (
            <pre className="json-content">
              {JSON.stringify(results, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}

export default Results;
