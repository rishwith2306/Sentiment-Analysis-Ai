import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import './ReflectionCard.css';

/**
 * ReflectionCard Component
 * Card displaying a journal reflection entry
 */
const ReflectionCard = ({ 
  title = 'My Reflection',
  date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  mood = 'Peaceful',
  illustration = '🌸',
  excerpt = '',
  onClick,
  ...props 
}) => {
  return (
    <GlassCard 
      className="reflection-card"
      padding="lg"
      hover
      onClick={onClick}
      {...props}
    >
      <div className="reflection-card__illustration">
        <span className="reflection-card__emoji">{illustration}</span>
      </div>
      
      <div className="reflection-card__content">
        <div className="reflection-card__header">
          <span className="reflection-card__date">{date}</span>
          <span className="reflection-card__mood">{mood}</span>
        </div>
        
        <h3 className="reflection-card__title">{title}</h3>
        
        {excerpt && (
          <p className="reflection-card__excerpt">{excerpt}</p>
        )}
      </div>
    </GlassCard>
  );
};

export default ReflectionCard;
