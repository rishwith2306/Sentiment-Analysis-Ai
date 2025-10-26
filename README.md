# 🧠 Sentiment AI - Intelligent News Sentiment Analysis

> A powerful AI-driven web application for analyzing sentiment in news articles using FastAPI, CrewAI, and advanced language models.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- **AI-Powered Analysis**: Uses CrewAI agents with Groq/Google Gemini models
- **Real-time Web Search**: Searches and analyzes current news articles
- **Sentiment Scoring**: Provides detailed sentiment scores from -10 (very negative) to +10 (very positive)
- **Modern UI/UX**: Beautiful, responsive interface with real-time feedback
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **Customizable**: Analyze 1-10 articles on any topic

## 📋 Prerequisites

- Python 3.8 or higher
- API Keys:
  - `GROQ_API_KEY` or `GOOGLE_API_KEY` (for LLM)
  - `SERPER_API_KEY` (for web search)

## 🚀 Installation

1. **Clone the repository** (if not already done)
   ```bash
   cd /home/namiba/ML/Sentiment-AI-main
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```bash
   # For Groq (recommended for faster processing)
   GROQ_API_KEY=your_groq_api_key_here
   
   # OR for Google Gemini
   GOOGLE_API_KEY=your_google_api_key_here
   
   # Required: Serper API for web search
   SERPER_API_KEY=your_serper_api_key_here
   ```

   **How to get API keys:**
   - Groq API: https://console.groq.com/
   - Google AI: https://makersuite.google.com/app/apikey
   - Serper: https://serper.dev/

## 🎯 Usage

### Running the FastAPI Server

```bash
cd crewgooglegemini
uvicorn endpoints:app --reload --host 0.0.0.0 --port 8000
```

The application will be available at:
- **Web Interface**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/health

### Using the Web Interface

1. Open http://localhost:8000 in your browser
2. Enter a topic (e.g., "Artificial Intelligence", "Climate Change")
3. Select the number of articles to analyze (1-10)
4. Click "Analyze Sentiment"
5. Wait for the AI to process (usually 30-90 seconds)
6. View comprehensive sentiment analysis results

### Using the API

#### Analyze Sentiment (POST)
```bash
curl -X POST "http://localhost:8000/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Artificial Intelligence",
    "noofarticles": 5
  }'
```

#### Health Check (GET)
```bash
curl http://localhost:8000/api/health
```

## 📁 Project Structure

```
Sentiment-AI-main/
├── crewgooglegemini/
│   ├── agents.py         # AI agent definitions
│   ├── tasks.py          # Task configurations
│   ├── tools.py          # Search tools setup
│   ├── crew.py           # Streamlit app (legacy)
│   └── endpoints.py      # FastAPI application
├── static/
│   ├── index.html        # Frontend interface
│   ├── styles.css        # Styling
│   └── script.js         # JavaScript logic
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables (create this)
└── README.md            # This file
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Status**: Loading animations and progress indicators
- **Sentiment Visualization**: Color-coded sentiment scores
- **Copy to Clipboard**: Easy sharing of results
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Submit analysis
  - `Escape`: Reset form

## 🔧 API Endpoints

### `POST /api/analyze`
Analyze sentiment for articles on a topic

**Request Body:**
```json
{
  "topic": "string",
  "noofarticles": 4  // 1-10
}
```

**Response:**
```json
{
  "success": true,
  "topic": "string",
  "articles_analyzed": 4,
  "analysis": "detailed analysis with scores..."
}
```

### `GET /api/health`
Check API status

**Response:**
```json
{
  "status": "healthy",
  "message": "Sentiment AI API is running"
}
```

### `POST /process_input/` (Legacy)
Backward compatible endpoint

## ⚙️ Configuration

### Changing the LLM Model

Edit `crewgooglegemini/agents.py`:

**For Groq:**
```python
llm = ChatGroq(
    groq_api_key=groq_api_key,
    temperature=0.1,
    model_name="groq/openai/gpt-oss-120b",  # Change model here
)
```

**For Google Gemini:**
Uncomment the Gemini section and comment out Groq:
```python
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.5,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)
```

### Adjusting Search Results

Edit `crewgooglegemini/tools.py`:
```python
tool = SerperDevTool(n_results=5)  # Change number of search results
```

## 🐛 Troubleshooting

### Import Errors
```bash
pip install --upgrade -r requirements.txt
```

### API Key Issues
- Ensure `.env` file is in the correct location
- Check that API keys are valid and have credits
- Verify environment variables are loaded: `python -c "from dotenv import load_dotenv; load_dotenv(); import os; print(os.getenv('GROQ_API_KEY'))"`

### Port Already in Use
```bash
uvicorn endpoints:app --reload --port 8001  # Use different port
```

### SQLite Errors
The app uses `pysqlite3-binary` for compatibility. If issues persist:
```bash
pip uninstall pysqlite3-binary
pip install pysqlite3-binary --force-reinstall
```

## 🚀 Production Deployment

For production, update CORS settings in `endpoints.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Run with production server:
```bash
uvicorn endpoints:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 🙏 Acknowledgments

- **CrewAI**: Multi-agent orchestration framework
- **FastAPI**: Modern web framework
- **Groq**: High-performance LLM inference
- **Serper**: Web search API

---

**Made with ❤️ using AI and modern web technologies**
