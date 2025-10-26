#!/bin/bash

# Senti-Core React Startup Script
echo "🚀 Starting Senti-Core React Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "${CYAN}📦 Installing dependencies...${NC}"
    npm install
    echo ""
fi

# Start backend in background
echo "${GREEN}🔧 Starting FastAPI backend on port 8000...${NC}"
cd crewgooglegemini
../venv/bin/python -m uvicorn endpoints:app --reload --port 8000 &
BACKEND_PID=$!
cd ..
echo "Backend PID: $BACKEND_PID"
echo ""

# Wait for backend to start
sleep 3

# Start React frontend
echo "${GREEN}⚛️  Starting React frontend on port 3000...${NC}"
echo ""
npm run dev

# Cleanup on exit
trap "echo '\n${CYAN}Shutting down...${NC}'; kill $BACKEND_PID 2>/dev/null" EXIT
