#!/bin/bash

# Stop Script for Sentiment-AI Application

echo "🛑 Stopping Sentiment-AI Application"
echo "====================================="
echo ""

# Kill backend
if [ -f ".backend.pid" ]; then
    BACKEND_PID=$(cat .backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo "Stopping backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        echo "✓ Backend stopped"
    else
        echo "Backend not running"
    fi
    rm .backend.pid
fi

# Kill frontend
if [ -f ".frontend.pid" ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "Stopping frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        echo "✓ Frontend stopped"
    else
        echo "Frontend not running"
    fi
    rm .frontend.pid
fi

# Fallback: kill by port
BACKEND_PORT=$(lsof -ti:8000)
if [ ! -z "$BACKEND_PORT" ]; then
    echo "Stopping process on port 8000..."
    kill $BACKEND_PORT
fi

FRONTEND_PORT=$(lsof -ti:3000)
if [ ! -z "$FRONTEND_PORT" ]; then
    echo "Stopping process on port 3000..."
    kill $FRONTEND_PORT
fi

echo ""
echo "✨ Application stopped"
