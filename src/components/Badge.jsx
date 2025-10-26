import React from 'react';
import { motion } from 'framer-motion';
import './Badge.css';

/**
 * Badge Component
 * Small status or label indicator
 */
const Badge = ({ 
  children, 
  variant = 'default',
  dot = false,
  className = '',
  ...props 
}) => {
  return (
    <motion.span
      className={`badge badge--${variant} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {dot && <span className="badge__dot"></span>}
      <span className="badge__text">{children}</span>
    </motion.span>
  );
};

export default Badge;
