import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Button Component
 * Reusable button with multiple variants and animations
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  icon,
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const widthClass = fullWidth ? 'btn--full' : '';
  
  return (
    <motion.button
      className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </motion.button>
  );
};

export default Button;
