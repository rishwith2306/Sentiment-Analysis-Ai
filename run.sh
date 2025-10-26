#!/bin/bash

# Sentiment AI - Run Script
# This script activates the virtual environment and starts the server

echo "=================================="
echo "  Sentiment AI - Starting Server"
echo "=================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Please run ./setup.sh first"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

if [ $? -ne 0 ]; then
    echo "❌ Failed to activate virtual environment"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create .env file with your API keys"
    echo "See .env.example for reference"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Navigate to the correct directory
cd crewgooglegemini

echo ""
echo "🚀 Starting Sentiment AI server..."
echo ""
echo "📍 The application will be available at:"
echo "   🌐 Web Interface: http://localhost:8000"
echo "   📚 API Docs: http://localhost:8000/docs"
echo "   ❤️  Health Check: http://localhost:8000/api/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
uvicorn endpoints:app --reload --host 0.0.0.0 --port 8000
