import React, { useState } from 'react';
import './DetailedAnalysis.css';

function DetailedAnalysis({ fusionReport }) {
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    textVsVisual: false,
    rawOutput: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!fusionReport) return null;

  // Parse the raw_output if it contains JSON
  let detailedAnalysis = null;
  try {
    const jsonMatch = fusionReport.raw_output?.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      detailedAnalysis = JSON.parse(jsonMatch[1]);
    }
  } catch (e) {
    console.log('Could not parse detailed analysis:', e);
  }

  return (
    <div className="detailed-analysis-section">
      <h3 className="section-title">
        <span className="title-icon">📊</span>
        Detailed Analysis Report
      </h3>

      {/* Main Analysis Card */}
      <div className="analysis-card main-analysis">
        <div 
          className="card-header"
          onClick={() => toggleSection('main')}
        >
          <h4 className="card-heading">
            <span className="icon">🧠</span>
            Core Analysis
          </h4>
          <span className={`expand-icon ${expandedSections.main ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {expandedSections.main && detailedAnalysis && (
          <div className="card-content">
            <div className="analysis-grid">
              {/* Agent Info */}
              <div className="info-block">
                <div className="info-label">Agent Name</div>
                <div className="info-value agent-name">{detailedAnalysis.agent_name}</div>
              </div>

              <div className="info-block">
                <div className="info-label">Analysis Type</div>
                <div className="info-value">{detailedAnalysis.analysis_type}</div>
              </div>

              {/* Sentiment Score */}
              <div className="info-block highlight">
                <div className="info-label">Sentiment Score</div>
                <div className={`info-value score ${detailedAnalysis.final_sentiment_score >= 0 ? 'positive' : 'negative'}`}>
                  {detailedAnalysis.final_sentiment_score}
                </div>
              </div>

              <div className="info-block highlight">
                <div className="info-label">Confidence</div>
                <div className="info-value confidence">{detailedAnalysis.confidence}%</div>
              </div>

              {/* Alignment Status */}
              <div className="info-block">
                <div className="info-label">Alignment Status</div>
                <div className={`info-value status ${detailedAnalysis.alignment_status}`}>
                  {detailedAnalysis.alignment_status}
                </div>
              </div>

              {/* True Sentiment */}
              <div className="info-block">
                <div className="info-label">True Sentiment</div>
                <div className="info-value sentiment">{detailedAnalysis.true_sentiment}</div>
              </div>

              {/* Sarcasm Detection */}
              {detailedAnalysis.sarcasm_detected !== undefined && (
                <div className="info-block">
                  <div className="info-label">Sarcasm Detected</div>
                  <div className={`info-value sarcasm ${detailedAnalysis.sarcasm_detected ? 'yes' : 'no'}`}>
                    {detailedAnalysis.sarcasm_detected ? '✓ Yes' : '✗ No'}
                  </div>
                </div>
              )}

              {/* Contradictions */}
              {detailedAnalysis.contradictions !== undefined && (
                <div className="info-block">
                  <div className="info-label">Contradictions Found</div>
                  <div className="info-value">
                    {detailedAnalysis.contradictions.length > 0 ? detailedAnalysis.contradictions.length : 'None'}
                  </div>
                </div>
              )}
            </div>

            {/* Synthesis */}
            {detailedAnalysis.synthesis && (
              <div className="synthesis-block">
                <div className="synthesis-label">
                  <span className="icon">🔬</span>
                  Synthesis
                </div>
                <div className="synthesis-content">
                  {detailedAnalysis.synthesis}
                </div>
              </div>
            )}

            {/* Recommendation */}
            {detailedAnalysis.recommendation && (
              <div className="recommendation-block">
                <div className="recommendation-label">
                  <span className="icon">💡</span>
                  Recommendation
                </div>
                <div className="recommendation-content">
                  {detailedAnalysis.recommendation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Text vs Visual Analysis Card */}
      {detailedAnalysis?.text_vs_visual && (
        <div className="analysis-card text-visual-analysis">
          <div 
            className="card-header"
            onClick={() => toggleSection('textVsVisual')}
          >
            <h4 className="card-heading">
              <span className="icon">🔄</span>
              Text vs Visual Comparison
            </h4>
            <span className={`expand-icon ${expandedSections.textVsVisual ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          
          {expandedSections.textVsVisual && (
            <div className="card-content">
              <div className="comparative-analysis">
                <div className="analysis-text">
                  {detailedAnalysis.text_vs_visual.comparative_analysis}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Raw Output Card */}
      <div className="analysis-card raw-output">
        <div 
          className="card-header"
          onClick={() => toggleSection('rawOutput')}
        >
          <h4 className="card-heading">
            <span className="icon">📝</span>
            Raw JSON Output
          </h4>
          <span className={`expand-icon ${expandedSections.rawOutput ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {expandedSections.rawOutput && detailedAnalysis && (
          <div className="card-content">
            <pre className="json-output">
              {JSON.stringify(detailedAnalysis, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailedAnalysis;
