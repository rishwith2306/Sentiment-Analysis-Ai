import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Badge from './Badge';
import ReflectionCard from './ReflectionCard';
import './Hero.css';

function Hero({ onGetStarted }) {
  const scrollContainerRef = useRef(null);
  
  // Sample reflection cards data
  const reflections = [
    {
      id: 1,
      title: 'Finding Peace in Chaos',
      date: 'Oct 24',
      mood: 'Peaceful',
      illustration: '🌸',
      excerpt: 'Today I learned to embrace the uncertainty and find calm within myself.'
    },
    {
      id: 2,
      title: 'Grateful Moments',
      date: 'Oct 23',
      mood: 'Joyful',
      illustration: '✨',
      excerpt: 'Small victories and kind gestures made my day brighter than ever.'
    },
    {
      id: 3,
      title: 'Processing Change',
      date: 'Oct 22',
      mood: 'Reflective',
      illustration: '🌙',
      excerpt: 'Change is never easy, but today I saw growth in unexpected places.'
    },
    {
      id: 4,
      title: 'Self-Discovery',
      date: 'Oct 21',
      mood: 'Curious',
      illustration: '🦋',
      excerpt: 'Understanding myself better through honest reflection and patience.'
    },
  ];
  
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Badge variant="primary" dot className="hero__badge">
          AI-Powered Emotional Intelligence
        </Badge>
      </motion.div>
      
      <motion.h1 
        className="hero__title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        Reflect, Understand, and
        <span className="hero__title-gradient"> Grow Every Day</span>
      </motion.h1>
      
      <motion.p 
        className="hero__description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        Transform your thoughts into meaningful insights with AI-powered sentiment analysis.
        <br />
        Understand your emotions, track your mood patterns, and nurture your mental wellbeing
        <br />
        through the power of reflective journaling.
      </motion.p>
      
      <motion.div 
        className="hero__cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Button 
          size="lg" 
          variant="primary"
          onClick={onGetStarted}
        >
          Start Your Reflection
        </Button>
        <Button 
          size="lg" 
          variant="ghost"
        >
          Learn More
        </Button>
      </motion.div>
      
      {/* Reflection Cards Carousel */}
      <motion.div 
        className="hero__reflections"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="hero__reflections-header">
          <h2 className="hero__reflections-title">Recent Reflections</h2>
          <div className="hero__reflections-nav">
            <button 
              className="hero__nav-btn hero__nav-btn--left"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button 
              className="hero__nav-btn hero__nav-btn--right"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
        
        <div className="hero__reflections-container" ref={scrollContainerRef}>
          {reflections.map((reflection, index) => (
            <motion.div
              key={reflection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <ReflectionCard {...reflection} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
