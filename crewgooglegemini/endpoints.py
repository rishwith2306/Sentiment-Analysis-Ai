from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field
from crewai import Crew, Process
import os
import json
import re
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
from dotenv import load_dotenv

# Load .env file from project root
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Handle both relative and absolute imports
try:
    from crewgooglegemini.tasks import lexicon_task, vision_task, fusion_task
    from crewgooglegemini.agents import lexicon_agent, vision_agent, fusion_agent
except ImportError:
    try:
        from .tasks import lexicon_task, vision_task, fusion_task
        from .agents import lexicon_agent, vision_agent, fusion_agent
    except ImportError:
        from tasks import lexicon_task, vision_task, fusion_task
        from agents import lexicon_agent, vision_agent, fusion_agent

# Initialize FastAPI app
app = FastAPI(
    title="Senti-Core API",
    description="Multimodal AI-powered sentiment analysis for social media content",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
static_path = Path(__file__).parent.parent / "static"
static_path.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_path)), name="static")

# =============================================
# REQUEST/RESPONSE MODELS
# =============================================

class AnalysisRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=200, description="The topic to analyze")
    noofarticles: int = Field(default=3, ge=1, le=5, description="Number of content items to analyze (max 3 for speed)")
    platforms: List[str] = Field(default=["tiktok", "instagram", "twitter"], description="Social media platforms")

class AgentReport(BaseModel):
    agent_name: str
    analysis_type: str
    sentiment_score: float
    confidence: float
    key_findings: List[str]
    timestamp: str
    raw_output: str

class SentiCoreResponse(BaseModel):
    success: bool
    topic: str
    platforms: List[str]
    content_analyzed: int
    timestamp: str
    lexicon_report: Optional[Dict[str, Any]] = None
    vision_report: Optional[Dict[str, Any]] = None
    fusion_report: Optional[Dict[str, Any]] = None
    final_sentiment: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

# =============================================
# HELPER FUNCTIONS
# =============================================

def extract_json_from_text(text: str) -> Dict[str, Any]:
    """
    Attempt to extract structured JSON data from agent output.
    If not found, create structured data from text.
    """
    try:
        # Try to find JSON in the text
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            return json.loads(json_match.group())
    except:
        pass
    
    # Fallback: create structured data from text
    return {
        "raw_analysis": text,
        "extracted": True,
        "format": "text"
    }

def parse_agent_output(output: str, agent_name: str) -> Dict[str, Any]:
    """
    Parse agent output into structured format.
    Extracts sentiment scores, key findings, and confidence levels.
    """
    result = {
        "agent_name": agent_name,
        "timestamp": datetime.now().isoformat(),
        "raw_output": output,
    }
    
    # Extract sentiment score (looking for patterns like "score: 7" or "sentiment: -3")
    score_patterns = [
        r'sentiment[_\s]*score[:\s]+(-?\d+(?:\.\d+)?)',
        r'score[:\s]+(-?\d+(?:\.\d+)?)',
        r'rating[:\s]+(-?\d+(?:\.\d+)?)',
    ]
    
    for pattern in score_patterns:
        match = re.search(pattern, output, re.IGNORECASE)
        if match:
            result["sentiment_score"] = float(match.group(1))
            break
    
    if "sentiment_score" not in result:
        # Fallback sentiment detection
        positive_words = ['positive', 'good', 'excellent', 'great', 'optimistic']
        negative_words = ['negative', 'bad', 'poor', 'pessimistic', 'concerning']
        
        output_lower = output.lower()
        pos_count = sum(word in output_lower for word in positive_words)
        neg_count = sum(word in output_lower for word in negative_words)
        
        if pos_count > neg_count:
            result["sentiment_score"] = 5.0
        elif neg_count > pos_count:
            result["sentiment_score"] = -5.0
        else:
            result["sentiment_score"] = 0.0
    
    # Extract confidence (looking for patterns like "confidence: 85%")
    confidence_match = re.search(r'confidence[:\s]+(\d+(?:\.\d+)?)\s*%?', output, re.IGNORECASE)
    if confidence_match:
        result["confidence"] = float(confidence_match.group(1))
    else:
        result["confidence"] = 75.0  # Default confidence
    
    # Extract key findings (bullet points or numbered lists)
    findings = []
    lines = output.split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith(('-', '•', '*', '→')) or (len(line) > 0 and line[0].isdigit() and '.' in line[:3]):
            finding = re.sub(r'^[-•*→\d.)\s]+', '', line).strip()
            if finding and len(finding) > 10:
                findings.append(finding)
    
    result["key_findings"] = findings[:5] if findings else ["Analysis completed"]
    
    return result

def analyze_sentiment_multimodal(topic: str, noofarticles: int, platforms: List[str]) -> Dict[str, Any]:
    """
    Perform multimodal sentiment analysis using the Senti-Core agent system.
    Returns structured JSON with all agent reports.
    """
    try:
        timestamp = datetime.now().isoformat()
        
        # Create the crew with all three agents - optimized for speed
        crew = Crew(
            agents=[lexicon_agent, vision_agent, fusion_agent],
            tasks=[lexicon_task, vision_task, fusion_task],
            process=Process.sequential,
            verbose=True,
            max_rpm=10,  # Rate limiting for Gemini API
            memory=False  # Disable memory for faster execution
        )
        
        # Execute the analysis
        result = crew.kickoff(inputs={
            'topic': topic,
            'noofarticles': str(noofarticles)
        })
        
        # Parse the result
        result_text = str(result)
        
        # Try to read the output file if it exists
        output_file = "senti-core-analysis.json"
        fusion_output = result_text
        
        if os.path.exists(output_file):
            try:
                with open(output_file, 'r', encoding='utf-8') as f:
                    fusion_output = f.read()
            except:
                pass
        
        # Parse each agent's contribution
        # Note: In sequential process, each task builds on the previous
        # We'll extract insights from the final output
        
        lexicon_report = {
            "agent_name": "LexiconAgent",
            "analysis_type": "text_sentiment",
            "status": "completed",
            "summary": "Text-based sentiment analysis completed",
            "sentiment_score": 0.0,
            "confidence": 0.0,
            "key_findings": []
        }
        
        vision_report = {
            "agent_name": "VisionAgent",
            "analysis_type": "visual_sentiment",
            "status": "completed",
            "summary": "Visual content analysis completed",
            "sentiment_score": 0.0,
            "confidence": 0.0,
            "key_findings": []
        }
        
        fusion_report = parse_agent_output(fusion_output, "FusionAgent")
        fusion_report["analysis_type"] = "multimodal_fusion"
        
        # Try to extract individual agent insights from the fusion output
        # Look for sections mentioning each agent
        if "lexicon" in fusion_output.lower() or "text" in fusion_output.lower():
            text_section = fusion_output
            lexicon_report = parse_agent_output(text_section, "LexiconAgent")
            lexicon_report["analysis_type"] = "text_sentiment"
        
        if "vision" in fusion_output.lower() or "visual" in fusion_output.lower():
            visual_section = fusion_output
            vision_report = parse_agent_output(visual_section, "VisionAgent")
            vision_report["analysis_type"] = "visual_sentiment"
        
        # Create final sentiment summary
        final_sentiment = {
            "overall_score": fusion_report.get("sentiment_score", 0.0),
            "confidence": fusion_report.get("confidence", 75.0),
            "sentiment_label": get_sentiment_label(fusion_report.get("sentiment_score", 0.0)),
            "analysis_quality": "high" if fusion_report.get("confidence", 0) > 70 else "moderate",
            "timestamp": timestamp
        }
        
        return {
            "success": True,
            "topic": topic,
            "platforms": platforms,
            "content_analyzed": noofarticles,
            "timestamp": timestamp,
            "lexicon_report": lexicon_report,
            "vision_report": vision_report,
            "fusion_report": fusion_report,
            "final_sentiment": final_sentiment
        }
            
    except Exception as e:
        return {
            "success": False,
            "topic": topic,
            "platforms": platforms,
            "content_analyzed": 0,
            "timestamp": datetime.now().isoformat(),
            "error": str(e)
        }

def get_sentiment_label(score: float) -> str:
    """Convert sentiment score to label"""
    if score >= 7:
        return "Very Positive"
    elif score >= 3:
        return "Positive"
    elif score >= -3:
        return "Neutral"
    elif score >= -7:
        return "Negative"
    else:
        return "Very Negative"

# =============================================
# API ENDPOINTS
# =============================================

# Root endpoint - serve the frontend
@app.get("/", response_class=HTMLResponse)
async def read_root():
    """Serve the main HTML page"""
    html_file = static_path / "index.html"
    if html_file.exists():
        with open(html_file, 'r', encoding='utf-8') as f:
            return f.read()
    return """
    <html>
        <head><title>Senti-Core</title></head>
        <body>
            <h1>Senti-Core - Multimodal Sentiment Analysis</h1>
            <p>Frontend files not found. Please create static/index.html</p>
        </body>
    </html>
    """

# Main sentiment analysis endpoint
@app.post("/api/analyze", response_model=SentiCoreResponse)
async def analyze_sentiment_endpoint(request: AnalysisRequest):
    """
    Perform multimodal sentiment analysis using the Senti-Core agent system.
    Returns complete JSON receipt with all agent reports.
    """
    try:
        result = analyze_sentiment_multimodal(
            topic=request.topic,
            noofarticles=request.noofarticles,
            platforms=request.platforms
        )
        
        return SentiCoreResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Check if the API is running"""
    return {
        "status": "healthy",
        "message": "Senti-Core API is running",
        "version": "2.0.0",
        "agents": ["LexiconAgent", "VisionAgent", "FusionAgent"]
    }

# Legacy endpoint for backward compatibility
@app.post("/process_input/")
async def process_input(request: AnalysisRequest):
    """Legacy endpoint - use /api/analyze instead"""
    result = analyze_sentiment_multimodal(
        topic=request.topic,
        noofarticles=request.noofarticles,
        platforms=request.platforms
    )
    return result

