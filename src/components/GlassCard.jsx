import React from 'react';
import { motion } from 'framer-motion';
import './GlassCard.css';

/**
 * GlassCard Component
 * Reusable glassmorphism card with backdrop blur effect
 */
const GlassCard = ({ 
  children, 
  className = '', 
  padding = 'lg',
  hover = false,
  onClick,
  ...props 
}) => {
  const paddingClasses = {
    sm: 'glass-card--padding-sm',
    md: 'glass-card--padding-md',
    lg: 'glass-card--padding-lg',
    xl: 'glass-card--padding-xl',
    none: '',
  };

  return (
    <motion.div
      className={`glass-card ${paddingClasses[padding]} ${hover ? 'glass-card--hover' : ''} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
