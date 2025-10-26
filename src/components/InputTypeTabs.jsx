import React from 'react';
import { motion } from 'framer-motion';
import './InputTypeTabs.css';

/**
 * InputTypeTabs Component
 * Tabs for switching between text, image, and Instagram post input
 */
const InputTypeTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'text', icon: '✍️', label: 'Write' },
    { id: 'image', icon: '🖼️', label: 'Image' },
    { id: 'instagram', icon: '📸', label: 'Instagram Post' }
  ];

  return (
    <div className="input-tabs">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`input-tabs__tab ${activeTab === tab.id ? 'input-tabs__tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="input-tabs__icon">{tab.icon}</span>
          <span className="input-tabs__label">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default InputTypeTabs;
