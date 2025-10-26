#!/bin/bash

# Test script to verify backend/frontend connection
echo "🧪 Testing Senti-Core Backend Connection..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if backend is running
echo "${YELLOW}Checking if backend is running on port 8000...${NC}"
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "${GREEN}✓ Backend is running!${NC}"
    echo ""
    echo "Health check response:"
    curl -s http://localhost:8000/api/health | python -m json.tool
    echo ""
else
    echo "${RED}✗ Backend is not running${NC}"
    echo "${YELLOW}Start the backend with: python -m uvicorn crewgooglegemini.endpoints:app --reload --port 8000${NC}"
    exit 1
fi

# Check if React dev server is running
echo ""
echo "${YELLOW}Checking if React frontend is running on port 3000...${NC}"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "${GREEN}✓ React frontend is running!${NC}"
else
    echo "${RED}✗ React frontend is not running${NC}"
    echo "${YELLOW}Start the frontend with: npm run dev${NC}"
fi

echo ""
echo "${GREEN}✓ Connection test complete!${NC}"
echo ""
echo "Access the application at: ${CYAN}http://localhost:3000${NC}"
