#!/usr/bin/env python3
"""
Check available Groq models
"""
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

try:
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    # List available models
    models = client.models.list()
    
    print("🤖 Available Groq Models:")
    print("=" * 60)
    
    for model in models.data:
        print(f"\n📦 {model.id}")
        if hasattr(model, 'owned_by'):
            print(f"   Owner: {model.owned_by}")
        if hasattr(model, 'context_window'):
            print(f"   Context: {model.context_window} tokens")
    
    print("\n" + "=" * 60)
    print("\n💡 Recommended models:")
    print("   - llama-3.3-70b-versatile (Latest Llama)")
    print("   - llama-3.1-70b-versatile (Stable)")
    print("   - mixtral-8x7b-32768 (Fast)")
    
except Exception as e:
    print(f"Error: {e}")
