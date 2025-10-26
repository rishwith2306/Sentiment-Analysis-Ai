#!/bin/bash

# Sentiment AI - Setup Script with Virtual Environment
# This script sets up a virtual environment and installs dependencies

echo "=================================="
echo "  Sentiment AI - Setup"
echo "=================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create virtual environment"
        exit 1
    fi
    
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

# Activate virtual environment
echo ""
echo "🔌 Activating virtual environment..."
source venv/bin/activate

if [ $? -ne 0 ]; then
    echo "❌ Failed to activate virtual environment"
    exit 1
fi

echo "✅ Virtual environment activated"

# Upgrade pip
echo ""
echo "⬆️  Upgrading pip..."
pip install --upgrade pip --quiet

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    deactivate
    exit 1
fi

echo ""
echo "✅ All dependencies installed successfully!"

# Check if .env file exists
echo ""
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "📝 Creating .env file from template..."
    
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file"
        echo ""
        echo "⚠️  IMPORTANT: Please edit .env file with your API keys:"
        echo "  1. GROQ_API_KEY or GOOGLE_API_KEY"
        echo "  2. SERPER_API_KEY"
        echo ""
        echo "You can edit it now or later using:"
        echo "  nano .env"
        echo "  or"
        echo "  code .env"
    fi
else
    echo "✅ .env file exists"
fi

echo ""
echo "=================================="
echo "  ✅ Setup Complete!"
echo "=================================="
echo ""
echo "To start the application, run:"
echo "  ./run.sh"
echo ""
echo "Or manually:"
echo "  source venv/bin/activate"
echo "  cd crewgooglegemini"
echo "  uvicorn endpoints:app --reload --host 0.0.0.0 --port 8000"
echo ""
