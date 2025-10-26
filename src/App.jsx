import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import JournalEntry from './components/JournalEntry';
import AnalysisModal from './components/AnalysisModal';
import Loading from './components/Loading';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'entry'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleGetStarted = () => {
    setCurrentView('entry');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setResults(null);
    setError(null);
  };

  const handleStartAnalysis = async (text) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      // Use proxy for development, direct URL for production
      const apiUrl = import.meta.env.DEV 
        ? '/api/analyze' 
        : 'http://localhost:8000/api/analyze';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: text,
          noofarticles: 5,
          platforms: ["tiktok", "instagram", "twitter"]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Analysis failed. Please ensure the backend server is running on port 8000.');
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data.success) {
        throw new Error(data.error || 'Analysis returned unsuccessful result');
      }
      
      setResults(data);
      setShowModal(true);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setCurrentView('home');
      setResults(null);
    }, 300);
  };

  return (
    <div className="app">
      <main className="main-content">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onGetStarted={handleGetStarted} />
            </motion.div>
          )}
          
          {currentView === 'entry' && !isAnalyzing && (
            <motion.div
              key="entry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <JournalEntry 
                onStartAnalysis={handleStartAnalysis}
                onBack={handleBackToHome}
              />
            </motion.div>
          )}
          
          {isAnalyzing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading />
            </motion.div>
          )}
        </AnimatePresence>
        
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Error: {error}</p>
            <button onClick={handleBackToHome}>Try Again</button>
          </motion.div>
        )}
      </main>
      
      <AnalysisModal 
        isOpen={showModal}
        onClose={handleCloseModal}
        results={results}
      />
    </div>
  );
}

export default App;
