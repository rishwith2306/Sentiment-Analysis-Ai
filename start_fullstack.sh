#!/bin/bash

# Full Stack Startup Script for Sentiment-AI
# Starts both Python backend and React frontend

echo "🚀 Starting Sentiment-AI Full Stack Application"
echo "==============================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Python backend is running
BACKEND_RUNNING=$(lsof -ti:8000)
if [ ! -z "$BACKEND_RUNNING" ]; then
    echo -e "${YELLOW}⚠ Backend already running on port 8000${NC}"
    echo "   PID: $BACKEND_RUNNING"
    read -p "   Kill and restart? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill $BACKEND_RUNNING
        sleep 2
    fi
fi

# Check if frontend is running
FRONTEND_RUNNING=$(lsof -ti:3000)
if [ ! -z "$FRONTEND_RUNNING" ]; then
    echo -e "${YELLOW}⚠ Frontend already running on port 3000${NC}"
    echo "   PID: $FRONTEND_RUNNING"
    read -p "   Kill and restart? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill $FRONTEND_RUNNING
        sleep 2
    fi
fi

# Start Python backend in background
echo -e "${BLUE}📡 Starting Python Backend (FastAPI)...${NC}"
cd "$(dirname "$0")"

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Start backend
python3 -m uvicorn crewgooglegemini.endpoints:app --host 0.0.0.0 --port 8000 --reload > backend.log 2>&1 &
BACKEND_PID=$!

echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo "   Logs: backend.log"
echo "   API: http://localhost:8000"
echo "   Docs: http://localhost:8000/docs"
echo ""

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend is ready!${NC}"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo -e "${YELLOW}⚠ Backend taking longer than expected${NC}"
    fi
done
echo ""

# Start React frontend
echo -e "${BLUE}🎨 Starting React Frontend (Vite)...${NC}"
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "   Logs: frontend.log"
echo "   URL: http://localhost:3000"
echo ""

echo "==============================================="
echo -e "${GREEN}✨ Application is starting!${NC}"
echo ""
echo "📝 Saved PIDs:"
echo "   Backend PID: $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "🛑 To stop the application:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   or run: ./stop_app.sh"
echo ""
echo "📊 View logs:"
echo "   Backend: tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🌐 Open in browser:"
echo "   http://localhost:3000"
echo ""

# Save PIDs to file for easy stopping
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid

echo "Press Ctrl+C to stop monitoring (apps will continue running)"
echo "==============================================="
echo ""

# Monitor processes
while true; do
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${YELLOW}⚠ Backend stopped unexpectedly${NC}"
        break
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${YELLOW}⚠ Frontend stopped unexpectedly${NC}"
        break
    fi
    sleep 5
done
