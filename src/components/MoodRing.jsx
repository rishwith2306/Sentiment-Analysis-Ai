import React from 'react';
import { motion } from 'framer-motion';
import './MoodRing.css';

/**
 * MoodRing Component
 * Circular mood indicator with score and emotion label
 */
const MoodRing = ({ 
  score = 0,
  emotion = 'Neutral',
  size = 'lg',
  className = '',
  ...props 
}) => {
  // Normalize score to 0-100 range
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Calculate stroke dash offset for circular progress
  const circumference = 2 * Math.PI * 90; // radius = 90
  const offset = circumference - (normalizedScore / 100) * circumference;
  
  // Emotion colors
  const emotionColors = {
    'Joy': { gradient: 'url(#gradient-joy)', glow: '#FFD93D' },
    'Happy': { gradient: 'url(#gradient-joy)', glow: '#FFD93D' },
    'Peace': { gradient: 'url(#gradient-peace)', glow: '#6BCF7F' },
    'Calm': { gradient: 'url(#gradient-peace)', glow: '#6BCF7F' },
    'Love': { gradient: 'url(#gradient-love)', glow: '#FF6B9D' },
    'Excited': { gradient: 'url(#gradient-love)', glow: '#FF6B9D' },
    'Anxiety': { gradient: 'url(#gradient-anxiety)', glow: '#FF8B7B' },
    'Worried': { gradient: 'url(#gradient-anxiety)', glow: '#FF8B7B' },
    'Sadness': { gradient: 'url(#gradient-sadness)', glow: '#7B9BFF' },
    'Sad': { gradient: 'url(#gradient-sadness)', glow: '#7B9BFF' },
    'Neutral': { gradient: 'url(#gradient-neutral)', glow: '#C7B8FF' },
  };
  
  const currentEmotion = emotionColors[emotion] || emotionColors['Neutral'];
  
  const sizeClasses = {
    sm: 'mood-ring--sm',
    md: 'mood-ring--md',
    lg: 'mood-ring--lg',
    xl: 'mood-ring--xl',
  };

  return (
    <div className={`mood-ring ${sizeClasses[size]} ${className}`} {...props}>
      <svg className="mood-ring__svg" viewBox="0 0 200 200">
        <defs>
          {/* Gradients for different emotions */}
          <linearGradient id="gradient-joy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
          
          <linearGradient id="gradient-peace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6BCF7F" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
          
          <linearGradient id="gradient-love" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#E91E63" />
          </linearGradient>
          
          <linearGradient id="gradient-anxiety" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8B7B" />
            <stop offset="100%" stopColor="#E87461" />
          </linearGradient>
          
          <linearGradient id="gradient-sadness" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B9BFF" />
            <stop offset="100%" stopColor="#5A7FE0" />
          </linearGradient>
          
          <linearGradient id="gradient-neutral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C7B8FF" />
            <stop offset="100%" stopColor="#A89FD9" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          className="mood-ring__bg"
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="8"
        />
        
        {/* Progress circle */}
        <motion.circle
          className="mood-ring__progress"
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={currentEmotion.gradient}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          filter="url(#glow)"
        />
      </svg>
      
      {/* Center content */}
      <div className="mood-ring__content">
        <motion.div
          className="mood-ring__score"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {Math.round(normalizedScore)}
        </motion.div>
        
        <motion.div
          className="mood-ring__emotion"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {emotion}
        </motion.div>
      </div>
    </div>
  );
};

export default MoodRing;
