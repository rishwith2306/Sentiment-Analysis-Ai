import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './InstagramInput.css';

/**
 * InstagramInput Component
 * Input for Instagram post URL analysis
 */
const InstagramInput = ({ onUrlChange, url }) => {
  const [isValid, setIsValid] = useState(true);

  const validateInstagramUrl = (url) => {
    const patterns = [
      /^https?:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/,
      /^https?:\/\/(www\.)?instagram\.com\/reel\/[\w-]+\/?/,
      /^https?:\/\/(www\.)?instagram\.com\/[\w.]+\/p\/[\w-]+\/?/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    onUrlChange(value);
    
    if (value.trim()) {
      setIsValid(validateInstagramUrl(value));
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className="instagram-input">
      <motion.div 
        className="instagram-input__container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="instagram-input__header">
          <div className="instagram-input__icon">
            📸
          </div>
          <div className="instagram-input__header-text">
            <h3 className="instagram-input__title">Analyze Instagram Post</h3>
            <p className="instagram-input__subtitle">
              Paste the URL of an Instagram post or reel to analyze its sentiment
            </p>
          </div>
        </div>

        <div className="instagram-input__field-wrapper">
          <input
            type="url"
            className={`instagram-input__field ${!isValid ? 'instagram-input__field--error' : ''}`}
            placeholder="https://www.instagram.com/p/example..."
            value={url}
            onChange={handleChange}
            aria-label="Instagram post URL"
          />
          {!isValid && (
            <motion.p 
              className="instagram-input__error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Please enter a valid Instagram post or reel URL
            </motion.p>
          )}
        </div>

        <div className="instagram-input__examples">
          <p className="instagram-input__examples-title">
            <strong>💡 Examples:</strong>
          </p>
          <ul className="instagram-input__examples-list">
            <li>https://www.instagram.com/p/ABC123xyz/</li>
            <li>https://www.instagram.com/reel/XYZ789abc/</li>
            <li>https://www.instagram.com/username/p/ABC123/</li>
          </ul>
        </div>

        <div className="instagram-input__info">
          <div className="instagram-input__info-item">
            <span className="instagram-input__info-icon">✨</span>
            <div>
              <strong>Multi-modal Analysis</strong>
              <p>We analyze both the image/video content and caption text</p>
            </div>
          </div>
          <div className="instagram-input__info-item">
            <span className="instagram-input__info-icon">🔒</span>
            <div>
              <strong>Privacy First</strong>
              <p>Only public posts can be analyzed</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InstagramInput;
