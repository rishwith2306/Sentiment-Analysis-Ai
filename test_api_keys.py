#!/usr/bin/env python3
"""
Test script to verify API keys and connection
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("🔍 Checking API Keys Configuration...")
print("=" * 50)

# Check GROQ API Key
groq_key = os.getenv("GROQ_API_KEY")
if groq_key:
    print(f"✓ GROQ_API_KEY found: {groq_key[:10]}...{groq_key[-4:]}")
    
    # Test Groq connection
    try:
        from groq import Groq
        client = Groq(api_key=groq_key)
        
        # Try a simple API call
        completion = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {"role": "user", "content": "Say 'API key is valid' if you can read this."}
            ],
            max_tokens=20
        )
        
        response = completion.choices[0].message.content
        print(f"✓ GROQ API Test: {response}")
        print("✓ GROQ connection is working!")
        
    except Exception as e:
        print(f"✗ GROQ API Error: {e}")
        print("\n⚠️  Your GROQ API key appears to be invalid or expired.")
        print("   Get a new key from: https://console.groq.com/keys")
else:
    print("✗ GROQ_API_KEY not found")

print()

# Check SERPER API Key
serper_key = os.getenv("SERPER_API_KEY")
if serper_key:
    print(f"✓ SERPER_API_KEY found: {serper_key[:10]}...{serper_key[-4:]}")
else:
    print("✗ SERPER_API_KEY not found")

print()

# Check GOOGLE API Key
google_key = os.getenv("GOOGLE_API_KEY")
if google_key:
    print(f"✓ GOOGLE_API_KEY found: {google_key[:10]}...{google_key[-4:]}")
else:
    print("⚠  GOOGLE_API_KEY not configured (optional)")

print()
print("=" * 50)
print("\n📝 Instructions:")
print("1. If GROQ key is invalid, get a new one from: https://console.groq.com/keys")
print("2. Update your .env file with the new key")
print("3. Restart the backend server")
print("\n💡 Alternative: Use Google Gemini instead:")
print("   - Get key from: https://makersuite.google.com/app/apikey")
print("   - Update .env with GOOGLE_API_KEY")
print("   - Uncomment Google Gemini code in agents.py")
