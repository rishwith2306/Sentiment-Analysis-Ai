import React from 'react';
import './AgentCard.css';

function AgentCard({ agent, icon, color }) {
  return (
    <div className="agent-card" style={{ borderColor: color }}>
      <div className="agent-card-header">
        <div className="agent-icon" style={{ color: color }}>{icon}</div>
        <h4 className="agent-name" style={{ color: color }}>{agent.agent_name}</h4>
      </div>
      
      <div className="agent-metrics">
        <div className="metric-item">
          <span className="metric-label">Sentiment Score</span>
          <span className="metric-value" style={{ color: color }}>
            {(agent.sentiment_score || 0).toFixed(1)}
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Confidence</span>
          <span className="metric-value" style={{ color: color }}>
            {(agent.confidence || 0).toFixed(1)}%
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Type</span>
          <span className="metric-value">
            {agent.analysis_type?.replace(/_/g, ' ') || 'N/A'}
          </span>
        </div>
      </div>

      {agent.key_findings && agent.key_findings.length > 0 && (
        <div className="agent-findings">
          <h5 className="findings-title">Key Findings</h5>
          <ul className="findings-list">
            {agent.key_findings.map((finding, index) => (
              <li key={index} className="finding-item">
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AgentCard;
