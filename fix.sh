#!/bin/bash

# Quick Fix Script for LLM Issues

echo "🔧 Fixing LLM configuration issues..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Install missing packages
echo "📦 Installing missing dependencies..."
pip install litellm langchain-community --quiet

echo "✅ Dependencies installed"
echo ""

# Check if .env exists and has GROQ_API_KEY
if [ -f ".env" ]; then
    if grep -q "GROQ_API_KEY=" .env; then
        echo "✅ GROQ_API_KEY found in .env"
    else
        echo "⚠️  GROQ_API_KEY not found in .env"
        echo "Please add: GROQ_API_KEY=your_key_here"
    fi
else
    echo "⚠️  .env file not found!"
    echo "Please create .env file with:"
    echo "  GROQ_API_KEY=your_key_here"
    echo "  SERPER_API_KEY=your_key_here"
fi

echo ""
echo "🚀 Ready to start the server with: ./run.sh"
