from crewai import Agent, LLM
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Import tools after loading .env - handle both relative and absolute imports
try:
    from .tools import tool
except ImportError:
    from tools import tool

# Load Google Gemini API key
google_api_key = os.environ.get("GOOGLE_API_KEY")

if not google_api_key:
    raise ValueError(
        "GOOGLE_API_KEY not found in environment variables. "
        "Please add it to your .env file"
    )

# Use CrewAI's LLM wrapper for Google Gemini
# Using Gemini 2.5 Pro for better quality and speed
llm = LLM(
    model="gemini/gemini-2.5-pro",
    api_key=google_api_key,
    temperature=0.3,
    max_tokens=2048
)


# =============================================
# SENTI-CORE AGENTS - Multimodal Sentiment Analysis
# =============================================

# LexiconAgent - Text Analysis Specialist
lexicon_agent = Agent(
    role="LexiconAgent - Text Sentiment Analyst",
    goal="Perform deep linguistic and semantic analysis of text content from {topic} on social media platforms",
    verbose=True,
    memory=False,  # Disabled for speed
    backstory=(
        "You are an expert in natural language processing and sentiment analysis. "
        "Your specialty is analyzing text content, detecting emotional tone, "
        "identifying key themes, and recognizing linguistic patterns including "
        "sarcasm, irony, and subtle emotional cues. You provide detailed text-based "
        "sentiment scores and insights. BE CONCISE AND QUICK."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=False,
    max_iter=3,  # Limit iterations for speed
)

# VisionAgent - Visual Content Analyst
vision_agent = Agent(
    role="VisionAgent - Visual Content Analyst",
    goal="Analyze visual elements, imagery, and video content related to {topic} to determine visual sentiment",
    verbose=True,
    memory=False,  # Disabled for speed
    backstory=(
        "You are a visual content analysis expert specializing in interpreting "
        "images, video thumbnails, and visual metadata from social media. "
        "You assess visual mood, color psychology, facial expressions, "
        "composition, and visual themes to determine the emotional impact "
        "and sentiment conveyed through visual elements. BE FAST AND CONCISE."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=False,
    max_iter=2,  # Fewer iterations for speed
)

# FusionAgent (Context Agent) - Multimodal Integration
fusion_agent = Agent(
    role="FusionAgent - Multimodal Context Analyzer",
    goal="Synthesize text and visual analysis to detect true sentiment, including sarcasm and contextual contradictions about {topic}",
    verbose=True,
    memory=False,  # Disabled for speed
    backstory=(
        "You are a master of context and nuance. By comparing text sentiment "
        "with visual sentiment, you can detect sarcasm, irony, and contradictions. "
        "When text says one thing but visuals show another, you identify the true "
        "intent. You provide the final, most accurate sentiment analysis by "
        "understanding the complete multimodal context of social media content. "
        "FOCUS ON SPEED - provide quick, actionable insights."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=False,
    max_iter=2,  # Limit iterations for quick response
)

# Legacy agents for backward compatibility
news_researcher = lexicon_agent
news_analyzer = fusion_agent
