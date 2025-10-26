import React, { useState } from 'react';
import './AnalysisForm.css';

function AnalysisForm({ onAnalyze }) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchDepth, setSearchDepth] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text, imageUrl, searchDepth);
    }
  };

  return (
    <section className="analysis-section">
      <div className="analysis-container">
        <h2 className="section-title">Analyze Content</h2>
        
        <form onSubmit={handleSubmit} className="analysis-form">
          <div className="form-group">
            <label htmlFor="text-input" className="form-label">
              Topic to Analyze
              <span className="required">*</span>
            </label>
            <textarea
              id="text-input"
              className="form-textarea"
              placeholder="Enter a topic (e.g., 'AI technology', 'climate change', 'new product launch')..."
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image-input" className="form-label">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="image-input"
              className="form-input"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <span className="form-hint">
              Provide an image URL for multimodal analysis
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="depth-slider" className="form-label">
              Number of Articles: <span className="depth-value">{searchDepth}</span>
            </label>
            <input
              type="range"
              id="depth-slider"
              className="form-slider"
              min="1"
              max="10"
              value={searchDepth}
              onChange={(e) => setSearchDepth(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <button type="submit" className="submit-button">
            <span className="button-text">Start Analysis</span>
            <span className="button-icon">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default AnalysisForm;
