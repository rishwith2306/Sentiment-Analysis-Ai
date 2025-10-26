import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import './Loading.css';

const agents = [
  { name: 'Text Analysis', label: 'Understanding your words...', icon: '📝' },
  { name: 'Emotion Detection', label: 'Identifying emotional patterns...', icon: '💭' },
  { name: 'Insight Generation', label: 'Creating personalized insights...', icon: '✨' }
];

function Loading() {
  const [currentAgent, setCurrentAgent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgent((prev) => (prev + 1) % agents.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="loading-section">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard padding="xl" className="loading-container">
          <h2 className="loading-title">Analyzing Your Reflection</h2>
          <p className="loading-subtitle">Our AI is processing your thoughts...</p>
          
          <div className="spinner-container">
            <motion.div 
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="spinner-glow"></div>
          </div>

          <div className="agents-progress">
            {agents.map((agent, index) => (
              <motion.div 
                key={agent.name}
                className={`agent-progress-item ${index <= currentAgent ? 'active' : ''} ${index < currentAgent ? 'completed' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="agent-icon">{agent.icon}</div>
                <div className="agent-info">
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-status">{agent.label}</div>
                </div>
                <div className="agent-indicator">
                  {index < currentAgent && <span className="check">✓</span>}
                  {index === currentAgent && <div className="pulse-dot"></div>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="loading-message">
            Please wait while we analyze your reflection...
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

export default Loading;
