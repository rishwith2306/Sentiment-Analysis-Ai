#!/bin/bash

# Backend Integration Test Script
# This script tests the Python backend API endpoints

echo "🚀 Testing Sentiment-AI Backend Integration"
echo "==========================================="
echo ""

# Backend URL
BACKEND_URL="http://localhost:8000"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "1️⃣  Testing Health Check Endpoint..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "${BACKEND_URL}/api/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}✗ Health check failed (HTTP $HTTP_CODE)${NC}"
    echo "Response: $BODY"
fi
echo ""

# Test 2: Sentiment Analysis
echo "2️⃣  Testing Sentiment Analysis Endpoint..."
TEST_TEXT="I feel incredibly grateful and happy today. The weather is beautiful and everything seems to be going well in my life."

ANALYSIS_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${BACKEND_URL}/api/analyze" \
    -H "Content-Type: application/json" \
    -d "{
        \"topic\": \"$TEST_TEXT\",
        \"noofarticles\": 5,
        \"platforms\": [\"tiktok\", \"instagram\", \"twitter\"]
    }")

HTTP_CODE=$(echo "$ANALYSIS_RESPONSE" | tail -n1)
BODY=$(echo "$ANALYSIS_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Analysis endpoint working${NC}"
    echo "Response preview:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null | head -n 30
else
    echo -e "${RED}✗ Analysis failed (HTTP $HTTP_CODE)${NC}"
    echo "Response: $BODY"
fi
echo ""

# Test 3: Frontend Integration
echo "3️⃣  Testing Frontend Build..."
if [ -d "dist" ]; then
    echo -e "${GREEN}✓ Frontend build exists${NC}"
else
    echo -e "${YELLOW}⚠ Frontend not built. Run 'npm run build'${NC}"
fi
echo ""

# Summary
echo "==========================================="
echo "✨ Backend Integration Test Complete"
echo ""
echo "📝 Next Steps:"
echo "   1. Ensure Python backend is running: python crewgooglegemini/endpoints.py"
echo "   2. Start React frontend: npm run dev"
echo "   3. Open http://localhost:3000 in browser"
echo ""
echo "🔗 Backend API docs: http://localhost:8000/docs"
echo ""
