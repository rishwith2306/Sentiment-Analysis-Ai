from crewai import Task

# Handle both relative and absolute imports
try:
    from .tools import tool
    from .agents import lexicon_agent, vision_agent, fusion_agent
except ImportError:
    from tools import tool
    from agents import lexicon_agent, vision_agent, fusion_agent

# =============================================
# SENTI-CORE TASKS - Multimodal Analysis Pipeline
# =============================================

# Task 1: Text Analysis (LexiconAgent)
lexicon_task = Task(
    description=(
        "Analyze the textual content about {topic} from social media sources "
        "(TikTok, Instagram Reels, X/Twitter). Extract and analyze:\n"
        "1. Primary emotional tone (positive, negative, neutral)\n"
        "2. Key themes and topics mentioned\n"
        "3. Language patterns and linguistic features\n"
        "4. Presence of sarcasm, irony, or humor indicators\n"
        "5. Overall text sentiment score (-10 to +10)\n\n"
        "Search for 3 pieces of content ONLY (use max 3 search queries) and provide detailed analysis."
    ),
    expected_output=(
        "A structured JSON-formatted report containing:\n"
        "- agent_name: 'LexiconAgent'\n"
        "- analysis_type: 'text_sentiment'\n"
        "- content_analyzed: number of items\n"
        "- sentiment_score: -10 to +10\n"
        "- confidence: 0 to 100%\n"
        "- key_findings: list of main insights\n"
        "- emotional_breakdown: dict of emotions detected\n"
        "- themes: list of key themes\n"
        "- language_indicators: notable linguistic patterns\n"
        "- sources: list of source URLs"
    ),
    tools=[tool],
    agent=lexicon_agent,
)

# Task 2: Visual Analysis (VisionAgent)
vision_task = Task(
    description=(
        "Analyze the visual elements related to {topic} from social media content. "
        "Focus on:\n"
        "1. Visual mood and atmosphere\n"
        "2. Color psychology and palette\n"
        "3. Imagery themes (based on descriptions and metadata)\n"
        "4. Visual sentiment indicators\n"
        "5. Overall visual sentiment score (-10 to +10)\n\n"
        "Analyze visual elements from the SAME 3 pieces of content. Be concise and quick."
    ),
    expected_output=(
        "A structured JSON-formatted report containing:\n"
        "- agent_name: 'VisionAgent'\n"
        "- analysis_type: 'visual_sentiment'\n"
        "- content_analyzed: number of items\n"
        "- sentiment_score: -10 to +10\n"
        "- confidence: 0 to 100%\n"
        "- visual_themes: list of visual patterns\n"
        "- mood_indicators: visual mood descriptors\n"
        "- color_sentiment: emotional impact of colors\n"
        "- key_observations: main visual insights"
    ),
    tools=[tool],
    agent=vision_agent,
)

# Task 3: Multimodal Fusion (FusionAgent)
fusion_task = Task(
    description=(
        "QUICKLY synthesize the LexiconAgent's text analysis with the VisionAgent's "
        "visual analysis to determine the TRUE sentiment about {topic}.\n\n"
        "Be CONCISE and focus on:\n"
        "1. Final sentiment score (-10 to +10)\n"
        "2. 3-5 key findings only\n"
        "3. Quick contradiction check (if any)\n"
        "4. Confidence level\n\n"
        "Keep analysis brief and actionable. Focus on speed and clarity."
    ),
    expected_output=(
        "A comprehensive JSON-formatted final report containing:\n"
        "- agent_name: 'FusionAgent'\n"
        "- analysis_type: 'multimodal_fusion'\n"
        "- final_sentiment_score: -10 to +10\n"
        "- confidence: 0 to 100%\n"
        "- alignment_status: 'aligned' or 'contradictory'\n"
        "- true_sentiment: final determination\n"
        "- sarcasm_detected: boolean\n"
        "- contradictions: list of identified contradictions\n"
        "- synthesis: detailed explanation of findings\n"
        "- recommendation: actionable insights\n"
        "- text_vs_visual: comparative analysis"
    ),
    tools=[tool],
    agent=fusion_agent,
    async_execution=False,
    output_file="senti-core-analysis.json",
)

# Legacy tasks for backward compatibility
research_task = lexicon_task
write_task = fusion_task
