import React from 'react';
import { motion } from 'framer-motion';
import './ProgressBar.css';

/**
 * ProgressBar Component
 * Animated progress bar for displaying metrics
 */
const ProgressBar = ({ 
  label,
  value = 0,
  max = 100,
  color = 'primary',
  showValue = true,
  className = '',
  ...props 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorVariants = {
    primary: 'linear-gradient(90deg, var(--color-peach) 0%, var(--color-orange) 100%)',
    secondary: 'linear-gradient(90deg, var(--color-lavender) 0%, var(--color-purple) 100%)',
    success: 'linear-gradient(90deg, #6BCF7F 0%, #4CAF50 100%)',
    joy: 'linear-gradient(90deg, #FFD93D 0%, #FFC107 100%)',
    love: 'linear-gradient(90deg, #FF6B9D 0%, #E91E63 100%)',
    peace: 'linear-gradient(90deg, #6BCF7F 0%, #4CAF50 100%)',
  };

  return (
    <div className={`progress-bar ${className}`} {...props}>
      {label && (
        <div className="progress-bar__header">
          <span className="progress-bar__label">{label}</span>
          {showValue && (
            <span className="progress-bar__value">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className="progress-bar__track">
        <motion.div
          className="progress-bar__fill"
          style={{ background: colorVariants[color] || colorVariants.primary }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
