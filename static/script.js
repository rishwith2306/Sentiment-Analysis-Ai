// =============================================
// SENTI-CORE - Multimodal Sentiment Analysis
// Frontend JavaScript
// =============================================

// =============================================
// Global State
// =============================================
let currentAnalysis = null;
let isAnalyzing = false;

// =============================================
// DOM Elements
// =============================================
const elements = {
    // Form elements
    form: document.getElementById('analysisForm'),
    topicInput: document.getElementById('topic'),
    articlesInput: document.getElementById('noofarticles'),
    articleCountDisplay: document.getElementById('articleCountDisplay'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    
    // Sections
    heroSection: document.getElementById('heroSection'),
    analysisSection: document.getElementById('analysisSection'),
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    
    // Loading elements
    loadingText: document.getElementById('loadingText'),
    progressLexicon: document.getElementById('progressLexicon'),
    progressVision: document.getElementById('progressVision'),
    progressFusion: document.getElementById('progressFusion'),
    
    // Result elements
    overallScore: document.getElementById('overallScore'),
    overallLabel: document.getElementById('overallLabel'),
    gaugeFill: document.getElementById('gaugeFill'),
    confidenceValue: document.getElementById('confidenceValue'),
    topicValue: document.getElementById('topicValue'),
    itemsValue: document.getElementById('itemsValue'),
    
    // Agent reports
    lexiconScore: document.getElementById('lexiconScore'),
    lexiconConfidence: document.getElementById('lexiconConfidence'),
    lexiconConfidenceValue: document.getElementById('lexiconConfidenceValue'),
    lexiconFindings: document.getElementById('lexiconFindings'),
    
    visionScore: document.getElementById('visionScore'),
    visionConfidence: document.getElementById('visionConfidence'),
    visionConfidenceValue: document.getElementById('visionConfidenceValue'),
    visionFindings: document.getElementById('visionFindings'),
    
    fusionScore: document.getElementById('fusionScore'),
    fusionConfidence: document.getElementById('fusionConfidence'),
    fusionConfidenceValue: document.getElementById('fusionConfidenceValue'),
    fusionFindings: document.getElementById('fusionFindings'),
    fusionInsights: document.getElementById('fusionInsights'),
    
    // JSON viewer
    jsonToggle: document.getElementById('jsonToggle'),
    jsonContent: document.getElementById('jsonContent'),
    jsonOutput: document.getElementById('jsonOutput'),
    
    // Action buttons
    newAnalysisBtn: document.getElementById('newAnalysisBtn'),
    copyBtn: document.getElementById('copyBtn'),
    
    // Misc
    apiStatus: document.getElementById('apiStatus'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    particleCanvas: document.getElementById('particleCanvas')
};

// =============================================
// Initialization
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeParticles();
    checkAPIHealth();
    
    // Check API health every 30 seconds
    setInterval(checkAPIHealth, 30000);
});

// =============================================
// Event Listeners
// =============================================
function initializeEventListeners() {
    // Form submission
    elements.form.addEventListener('submit', handleFormSubmit);
    
    // Range input
    elements.articlesInput.addEventListener('input', (e) => {
        elements.articleCountDisplay.textContent = e.target.value;
    });
    
    // Action buttons
    elements.newAnalysisBtn.addEventListener('click', resetForm);
    elements.copyBtn.addEventListener('click', copyJSONToClipboard);
    
    // JSON toggle
    elements.jsonToggle.addEventListener('click', toggleJSON);
}

// =============================================
// API Functions
// =============================================
async function checkAPIHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (data.status === 'healthy') {
            updateAPIStatus(true);
        } else {
            updateAPIStatus(false);
        }
    } catch (error) {
        updateAPIStatus(false);
    }
}

function updateAPIStatus(isHealthy) {
    const statusDot = elements.apiStatus.querySelector('.status-dot');
    const statusText = elements.apiStatus.querySelector('span:last-child');
    
    if (isHealthy) {
        statusDot.classList.remove('error');
        statusText.textContent = 'API Ready';
    } else {
        statusDot.classList.add('error');
        statusText.textContent = 'API Error';
    }
}

async function performAnalysis(topic, noofarticles) {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            topic: topic,
            noofarticles: noofarticles,
            platforms: ['tiktok', 'instagram', 'twitter']
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// =============================================
// Form Handling
// =============================================
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isAnalyzing) return;
    
    const topic = elements.topicInput.value.trim();
    const noofarticles = parseInt(elements.articlesInput.value);
    
    if (!topic) {
        showToast('Please enter a topic', 'error');
        return;
    }
    
    isAnalyzing = true;
    
    // Show loading state
    showLoading();
    
    // Simulate progressive agent updates
    simulateAgentProgress();
    
    try {
        const result = await performAnalysis(topic, noofarticles);
        
        if (result.success) {
            currentAnalysis = result;
            displayResults(result);
        } else {
            throw new Error(result.error || 'Analysis failed');
        }
    } catch (error) {
        console.error('Analysis error:', error);
        showToast(`Analysis failed: ${error.message}`, 'error');
        resetForm();
    } finally {
        isAnalyzing = false;
    }
}

function simulateAgentProgress() {
    const steps = [
        { delay: 1000, element: elements.progressLexicon, text: 'LexiconAgent analyzing text...', status: 'Analyzing...' },
        { delay: 3000, element: elements.progressLexicon, text: 'LexiconAgent analyzing text...', status: 'Complete ✓', complete: true },
        { delay: 3500, element: elements.progressVision, text: 'VisionAgent analyzing visuals...', status: 'Analyzing...' },
        { delay: 6000, element: elements.progressVision, text: 'VisionAgent analyzing visuals...', status: 'Complete ✓', complete: true },
        { delay: 6500, element: elements.progressFusion, text: 'FusionAgent synthesizing...', status: 'Analyzing...' },
    ];
    
    steps.forEach(step => {
        setTimeout(() => {
            if (step.text) {
                elements.loadingText.textContent = step.text;
            }
            if (step.element) {
                const statusEl = step.element.querySelector('.progress-status');
                statusEl.textContent = step.status;
                
                if (step.complete) {
                    step.element.classList.add('completed');
                    step.element.classList.remove('active');
                } else {
                    step.element.classList.add('active');
                }
            }
        }, step.delay);
    });
}

function resetForm() {
    // Hide results and loading
    elements.resultsSection.classList.add('hidden');
    elements.loadingSection.classList.add('hidden');
    
    // Show form
    elements.analysisSection.classList.remove('hidden');
    elements.heroSection.classList.remove('hidden');
    
    // Reset form
    elements.form.reset();
    elements.articleCountDisplay.textContent = '4';
    
    // Reset progress items
    [elements.progressLexicon, elements.progressVision, elements.progressFusion].forEach(el => {
        el.classList.remove('active', 'completed');
        el.querySelector('.progress-status').textContent = 'Waiting...';
    });
    
    // Clear current analysis
    currentAnalysis = null;
    isAnalyzing = false;
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// Display Functions
// =============================================
function showLoading() {
    elements.heroSection.classList.add('hidden');
    elements.analysisSection.classList.add('hidden');
    elements.resultsSection.classList.add('hidden');
    elements.loadingSection.classList.remove('hidden');
    
    elements.loadingText.textContent = 'Initializing multimodal analysis...';
    
    // Scroll to loading section
    elements.loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function displayResults(data) {
    // Hide loading
    elements.loadingSection.classList.add('hidden');
    
    // Show results
    elements.resultsSection.classList.remove('hidden');
    
    // Display overall sentiment
    displayOverallSentiment(data.final_sentiment, data);
    
    // Display agent reports
    displayAgentReport('lexicon', data.lexicon_report);
    displayAgentReport('vision', data.vision_report);
    displayAgentReport('fusion', data.fusion_report);
    
    // Display JSON
    elements.jsonOutput.textContent = JSON.stringify(data, null, 2);
    
    // Scroll to results
    setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    
    showToast('Analysis complete!', 'success');
}

function displayOverallSentiment(sentiment, data) {
    if (!sentiment) return;
    
    const score = sentiment.overall_score || 0;
    const confidence = sentiment.confidence || 0;
    const label = sentiment.sentiment_label || getSentimentLabel(score);
    
    // Update score and label
    elements.overallScore.textContent = score.toFixed(1);
    elements.overallLabel.textContent = label;
    
    // Update gauge
    const normalizedScore = ((score + 10) / 20) * 100; // Convert -10 to 10 range to 0-100
    const dashArray = 251.2;
    const dashOffset = dashArray - (dashArray * normalizedScore / 100);
    
    elements.gaugeFill.style.strokeDashoffset = dashOffset;
    
    // Update color based on score
    const scoreElement = elements.overallScore;
    if (score >= 3) {
        scoreElement.style.color = '#00ff88';
    } else if (score <= -3) {
        scoreElement.style.color = '#ff0055';
    } else {
        scoreElement.style.color = '#88ff00';
    }
    
    // Update meta info
    elements.confidenceValue.textContent = `${confidence.toFixed(0)}%`;
    elements.topicValue.textContent = data.topic;
    elements.itemsValue.textContent = data.content_analyzed;
}

function displayAgentReport(agentType, report) {
    if (!report) return;
    
    const score = report.sentiment_score || 0;
    const confidence = report.confidence || 0;
    const findings = report.key_findings || [];
    
    // Update score
    const scoreEl = elements[`${agentType}Score`];
    scoreEl.textContent = score.toFixed(1);
    
    // Color code score
    if (score >= 3) {
        scoreEl.style.color = '#00ff88';
    } else if (score <= -3) {
        scoreEl.style.color = '#ff0055';
    } else {
        scoreEl.style.color = '#88ff00';
    }
    
    // Update confidence bar
    const confidenceBar = elements[`${agentType}Confidence`];
    confidenceBar.style.width = `${confidence}%`;
    
    const confidenceValue = elements[`${agentType}ConfidenceValue`];
    confidenceValue.textContent = `${confidence.toFixed(0)}%`;
    
    // Update findings
    const findingsList = elements[`${agentType}Findings`];
    findingsList.innerHTML = '';
    
    if (findings.length > 0) {
        findings.forEach(finding => {
            const li = document.createElement('li');
            li.textContent = finding;
            findingsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No specific findings available';
        findingsList.appendChild(li);
    }
    
    // For fusion agent, add synthesis text
    if (agentType === 'fusion' && report.raw_output) {
        const insights = document.createElement('p');
        insights.textContent = extractSynthesis(report.raw_output);
        elements.fusionInsights.innerHTML = '';
        elements.fusionInsights.appendChild(insights);
    }
}

function extractSynthesis(text) {
    // Try to extract a meaningful summary from the raw output
    const lines = text.split('\n');
    const relevantLines = lines.filter(line => 
        line.length > 50 && 
        !line.startsWith('#') && 
        !line.startsWith('-') &&
        !line.includes('score:')
    );
    
    if (relevantLines.length > 0) {
        return relevantLines.slice(0, 3).join(' ').substring(0, 500) + '...';
    }
    
    return text.substring(0, 500) + '...';
}

function getSentimentLabel(score) {
    if (score >= 7) return 'Very Positive';
    if (score >= 3) return 'Positive';
    if (score >= -3) return 'Neutral';
    if (score >= -7) return 'Negative';
    return 'Very Negative';
}

// =============================================
// Utility Functions
// =============================================
function toggleJSON() {
    elements.jsonContent.classList.toggle('hidden');
    elements.jsonToggle.classList.toggle('active');
}

function copyJSONToClipboard() {
    if (!currentAnalysis) return;
    
    const jsonText = JSON.stringify(currentAnalysis, null, 2);
    
    navigator.clipboard.writeText(jsonText).then(() => {
        showToast('JSON copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy JSON', 'error');
    });
}

function showToast(message, type = 'success') {
    elements.toastMessage.textContent = message;
    
    const toastIcon = elements.toast.querySelector('.toast-icon');
    
    if (type === 'error') {
        elements.toast.style.borderColor = 'var(--accent-danger)';
        toastIcon.style.color = 'var(--accent-danger)';
    } else {
        elements.toast.style.borderColor = 'var(--accent-success)';
        toastIcon.style.color = 'var(--accent-success)';
    }
    
    elements.toast.classList.remove('hidden');
    
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

// =============================================
// Particle Animation Background
// =============================================
function initializeParticles() {
    const canvas = elements.particleCanvas;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(Math.floor(canvas.width / 20), 50);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// =============================================
// Export for debugging
// =============================================
if (typeof window !== 'undefined') {
    window.SentiCore = {
        currentAnalysis,
        performAnalysis,
        displayResults,
        resetForm
    };
}
