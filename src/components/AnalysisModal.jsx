import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import Button from './Button';
import MoodRing from './MoodRing';
import ProgressBar from './ProgressBar';
import './AnalysisModal.css';

/**
 * AnalysisModal Component
 * Modal displaying AI sentiment analysis results
 */
const AnalysisModal = ({ 
  isOpen, 
  onClose, 
  results,
  ...props 
}) => {
  if (!results) return null;
  
  // Parse backend response structure
  const finalSentiment = results.final_sentiment || {};
  const fusionReport = results.fusion_report || {};
  const lexiconReport = results.lexicon_report || {};
  const visionReport = results.vision_report || {};
  
  // Calculate mood score from backend data (scale 0-100)
  const rawScore = finalSentiment.overall_score || fusionReport.sentiment_score || 0;
  // Convert from -10 to 10 scale to 0-100 scale
  const moodScore = Math.round(((rawScore + 10) / 20) * 100);
  
  // Get sentiment label
  const dominantEmotion = finalSentiment.sentiment_label || 
                         fusionReport.sentiment_label ||
                         'Neutral';
  
  // Extract themes from agent reports
  const themes = [];
  
  if (lexiconReport.sentiment_score !== undefined) {
    themes.push({
      name: 'Text Sentiment',
      value: Math.round(((lexiconReport.sentiment_score + 10) / 20) * 100),
      color: 'primary'
    });
  }
  
  if (visionReport.sentiment_score !== undefined) {
    themes.push({
      name: 'Visual Context',
      value: Math.round(((visionReport.sentiment_score + 10) / 20) * 100),
      color: 'secondary'
    });
  }
  
  if (fusionReport.confidence !== undefined) {
    themes.push({
      name: 'Analysis Confidence',
      value: Math.round(fusionReport.confidence),
      color: 'peace'
    });
  }
  
  // Collect key insights from all reports
  const insights = [
    ...(fusionReport.key_findings || []),
    ...(lexiconReport.key_findings || []),
    ...(visionReport.key_findings || [])
  ].filter(Boolean).slice(0, 5);
  
  // Add default insight if none found
  if (insights.length === 0) {
    insights.push(
      'Your reflection has been analyzed across multiple dimensions.',
      `Overall sentiment detected: ${dominantEmotion}`,
      'The AI agents have processed your content successfully.'
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="analysis-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="analysis-modal__wrapper"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <GlassCard padding="xl" className="analysis-modal">
              {/* Close Button */}
              <button 
                className="analysis-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
              
              {/* Header */}
              <div className="analysis-modal__header">
                <h2 className="analysis-modal__title">Your Emotional Insights</h2>
                <p className="analysis-modal__subtitle">
                  AI-powered analysis of your reflection
                </p>
              </div>
              
              {/* Mood Analysis Section */}
              <div className="analysis-modal__section">
                <h3 className="analysis-modal__section-title">Mood Analysis</h3>
                
                <div className="analysis-modal__mood">
                  <MoodRing 
                    score={moodScore} 
                    emotion={dominantEmotion}
                    size="xl"
                  />
                  
                  <div className="analysis-modal__mood-description">
                    <p>
                      Your overall emotional state reflects <strong>{dominantEmotion.toLowerCase()}</strong> energy.
                      The analysis shows a sentiment score of <strong>{moodScore}/100</strong>,
                      indicating your current emotional landscape.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Key Themes Section */}
              <div className="analysis-modal__section">
                <h3 className="analysis-modal__section-title">Key Themes</h3>
                
                <div className="analysis-modal__themes">
                  {themes.map((theme, index) => (
                    <motion.div
                      key={theme.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ProgressBar
                        label={theme.name}
                        value={theme.value}
                        color={theme.color}
                        showValue
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Key Insights Section */}
              <div className="analysis-modal__section">
                <h3 className="analysis-modal__section-title">Key Insights</h3>
                
                <ul className="analysis-modal__insights">
                  {insights.map((insight, index) => (
                    <motion.li
                      key={index}
                      className="analysis-modal__insight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 * index }}
                    >
                      <span className="analysis-modal__insight-icon">💡</span>
                      <span className="analysis-modal__insight-text">{insight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Actions */}
              <div className="analysis-modal__actions">
                <Button variant="primary" size="lg" onClick={onClose}>
                  Start New Reflection
                </Button>
                <Button variant="outline" size="lg">
                  Save Results
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnalysisModal;
