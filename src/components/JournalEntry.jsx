import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import Button from './Button';
import Badge from './Badge';
import InputTypeTabs from './InputTypeTabs';
import ImageUpload from './ImageUpload';
import InstagramInput from './InstagramInput';
import './JournalEntry.css';

/**
 * JournalEntry Component
 * Split layout with writing area and reflection sidebar
 * Supports text, image, and Instagram post inputs
 */
const JournalEntry = ({ onStartAnalysis, onBack }) => {
  const [inputType, setInputType] = useState('text'); // 'text', 'image', 'instagram'
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [instagramUrl, setInstagramUrl] = useState('');
  
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  
  const handleAnalyze = () => {
    if (onStartAnalysis) {
      // Prepare data based on input type
      const analysisData = {
        type: inputType,
        content: inputType === 'text' ? content : null,
        image: inputType === 'image' ? selectedImage : null,
        instagramUrl: inputType === 'instagram' ? instagramUrl : null,
        // For now, send text content for all types to backend
        // Backend will need updates to handle image and Instagram analysis
        topic: inputType === 'text' ? content : 
               inputType === 'image' ? 'Image analysis' : 
               `Instagram post: ${instagramUrl}`
      };
      
      onStartAnalysis(analysisData.topic);
    }
  };
  
  const canAnalyze = () => {
    switch (inputType) {
      case 'text':
        return content.trim().length > 0;
      case 'image':
        return selectedImage !== null;
      case 'instagram':
        return instagramUrl.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <motion.div
      className="journal-entry"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <button className="journal-entry__back" onClick={onBack}>
        <span>←</span> Back to Home
      </button>
      
      <div className="journal-entry__container">
        {/* Left Side - Writing Area */}
        <motion.div
          className="journal-entry__writing"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard padding="xl" className="journal-entry__card">
            <div className="journal-entry__header">
              <h1 className="journal-entry__title">Your Reflection Space</h1>
              <Badge variant="info">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Badge>
            </div>
            
            {/* Input Type Tabs */}
            <InputTypeTabs 
              activeTab={inputType}
              onTabChange={setInputType}
            />
            
            {/* Conditional Input Based on Type */}
            {inputType === 'text' && (
              <>
                <textarea
                  className="journal-entry__textarea"
                  placeholder="What's on your mind today? Write freely about your thoughts, feelings, and experiences..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  aria-label="Journal entry text area"
                />
                
                <div className="journal-entry__footer">
                  <div className="journal-entry__stats">
                    <span className="journal-entry__stat">
                      <strong>{wordCount}</strong> words
                    </span>
                    <span className="journal-entry__divider">•</span>
                    <span className="journal-entry__stat">
                      <strong>{charCount}</strong> characters
                    </span>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAnalyze}
                    disabled={!canAnalyze()}
                  >
                    Analyze My Reflection
                  </Button>
                </div>
              </>
            )}
            
            {inputType === 'image' && (
              <>
                <ImageUpload
                  onImageSelect={setSelectedImage}
                  selectedImage={selectedImage}
                />
                
                <div className="journal-entry__footer">
                  <div className="journal-entry__stats">
                    {selectedImage && (
                      <span className="journal-entry__stat">
                        <strong>✓</strong> Image ready for analysis
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAnalyze}
                    disabled={!canAnalyze()}
                  >
                    Analyze Image
                  </Button>
                </div>
              </>
            )}
            
            {inputType === 'instagram' && (
              <>
                <InstagramInput
                  onUrlChange={setInstagramUrl}
                  url={instagramUrl}
                />
                
                <div className="journal-entry__footer">
                  <div className="journal-entry__stats">
                    {instagramUrl && (
                      <span className="journal-entry__stat">
                        <strong>🔗</strong> Instagram post URL ready
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAnalyze}
                    disabled={!canAnalyze()}
                  >
                    Analyze Instagram Post
                  </Button>
                </div>
              </>
            )}
          </GlassCard>
        </motion.div>
        
        {/* Right Side - Reflection Sidebar */}
        <motion.div
          className="journal-entry__sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard padding="xl" className="journal-entry__sidebar-card">
            <div className="journal-entry__sidebar-icon">
              💭
            </div>
            
            <h2 className="journal-entry__sidebar-title">
              AI Emotional Insights
            </h2>
            
            <p className="journal-entry__sidebar-description">
              Our advanced AI will analyze your reflection to understand:
            </p>
            
            <ul className="journal-entry__features">
              <li className="journal-entry__feature">
                <span className="journal-entry__feature-icon">🎯</span>
                <div>
                  <strong>Mood Analysis</strong>
                  <p>Identify your current emotional state</p>
                </div>
              </li>
              
              <li className="journal-entry__feature">
                <span className="journal-entry__feature-icon">🔑</span>
                <div>
                  <strong>Key Themes</strong>
                  <p>Discover recurring patterns in your thoughts</p>
                </div>
              </li>
              
              <li className="journal-entry__feature">
                <span className="journal-entry__feature-icon">💡</span>
                <div>
                  <strong>Insights & Growth</strong>
                  <p>Get personalized reflections and suggestions</p>
                </div>
              </li>
              
              <li className="journal-entry__feature">
                <span className="journal-entry__feature-icon">🖼️</span>
                <div>
                  <strong>Multi-Modal</strong>
                  <p>Analyze text, images, and social media posts</p>
                </div>
              </li>
            </ul>
            
            <div className="journal-entry__tip">
              <strong>💫 Tip:</strong> {
                inputType === 'text' ? 'The more you write, the deeper insights you\'ll receive!' :
                inputType === 'image' ? 'Upload an image that represents your current mood!' :
                'Paste an Instagram post URL to analyze its emotional content!'
              }
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JournalEntry;
