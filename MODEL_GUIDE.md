# 🤖 Model Configuration Guide

## Current Configuration

✅ **Updated to use the largest available model on Groq:**
- Model: `llama-3.3-70b-versatile`
- Parameters: 70B (70 billion)
- Context Window: 128K tokens

## ⚠️ Important Note About "GPT OSS 120B"

There is **no model called "GPT OSS 120B"** available on Groq or most platforms:
- **GPT models** (GPT-3.5, GPT-4) are **proprietary** to OpenAI
- **OSS** means "Open Source Software" - GPT models are NOT open source
- The largest open-source models on Groq are **70B parameters**

## Available Options

### Option 1: Groq (Current - FREE) ✅
```python
Model: groq/llama-3.3-70b-versatile
Parameters: 70B
Speed: Very Fast
Cost: FREE
```

**Pros:**
- ✅ FREE unlimited usage
- ✅ Very fast inference
- ✅ Latest Llama model
- ✅ 128K context window

**Already configured - just restart your server!**

### Option 2: OpenAI GPT-4 (Paid)
```python
Model: gpt-4-turbo-preview
Parameters: ~1.76T (estimated)
Speed: Medium
Cost: Paid ($0.01-0.03 per 1K tokens)
```

**To use GPT-4:**
1. Get API key: https://platform.openai.com/api-keys
2. Add to `.env`: `OPENAI_API_KEY=sk-...`
3. Restart server

**Pros:**
- ✅ Most capable model
- ✅ Better reasoning
- ✅ More accurate

**Cons:**
- ❌ Costs money
- ❌ Slower than Groq

### Option 3: Google Gemini (FREE)
```python
Model: gemini-1.5-flash
Parameters: Unknown
Speed: Fast
Cost: FREE (with limits)
```

**To use Gemini:**
1. Get API key: https://makersuite.google.com/app/apikey
2. Add to `.env`: `GOOGLE_API_KEY=...`
3. Update `agents.py` (uncomment Gemini section)
4. Restart server

## What Changed

### Before:
```python
llm = LLM(
    model="groq/llama-3.1-70b-versatile",  # Old version
    api_key=groq_api_key,
    temperature=0.1
)
```

### After:
```python
llm = LLM(
    model="groq/llama-3.3-70b-versatile",  # Latest version (70B)
    api_key=groq_api_key,
    temperature=0.1
)
```

## Model Comparison

| Model | Parameters | Speed | Cost | Quality |
|-------|-----------|-------|------|---------|
| Llama 3.3 70B (Groq) | 70B | ⚡⚡⚡ | FREE | ⭐⭐⭐⭐ |
| Llama 3.1 70B (Groq) | 70B | ⚡⚡⚡ | FREE | ⭐⭐⭐⭐ |
| GPT-4 Turbo | ~1.76T | ⚡⚡ | $$$ | ⭐⭐⭐⭐⭐ |
| GPT-3.5 Turbo | 175B | ⚡⚡⚡ | $ | ⭐⭐⭐ |
| Gemini 1.5 Flash | ? | ⚡⚡⚡ | FREE | ⭐⭐⭐⭐ |
| Mixtral 8x7B | 47B | ⚡⚡⚡ | FREE | ⭐⭐⭐ |

## Which Model Should You Use?

### For Your Use Case (Sentiment Analysis):

**Recommended: Llama 3.3 70B on Groq** ✅
- Already configured
- FREE and fast
- Plenty powerful for sentiment analysis
- 70B parameters is more than enough

### If You Need Maximum Quality:
**Use GPT-4 Turbo**
- Better reasoning
- More accurate sentiment detection
- Costs money but worth it for production

### If You Want Free Alternative:
**Use Gemini 1.5 Flash**
- Google's latest
- Free with generous limits
- Good quality

## How to Switch Models

### To Use OpenAI GPT-4:
1. **Get API key:**
   ```
   https://platform.openai.com/api-keys
   ```

2. **Add to `.env`:**
   ```bash
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Restart server:**
   ```bash
   ./start_react.sh
   ```

The code will automatically use OpenAI if GROQ fails or you comment out GROQ_API_KEY.

### To Use Google Gemini:
1. **Get API key:**
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **Add to `.env`:**
   ```bash
   GOOGLE_API_KEY=your-key-here
   ```

3. **Update `agents.py`:**
   - Comment out the Groq/OpenAI section (lines 19-41)
   - Uncomment the Gemini section (lines 9-17)

4. **Restart server**

## Testing Your Model

After restarting, check the backend logs:
```bash
✓ Using Groq: llama-3.3-70b-versatile (70B)
```

Or if using OpenAI:
```bash
✓ Using OpenAI: gpt-4-turbo-preview
```

## 🎯 Bottom Line

**You're currently using the best FREE model available:**
- **Llama 3.3 70B** via Groq
- 70 billion parameters
- Super fast inference
- FREE unlimited usage
- Latest and most capable open model

**There is no "GPT OSS 120B"** - GPT models are proprietary to OpenAI and not open source. Llama 3.3 70B is the largest open-source model you can use for free on Groq.

If you want something even more powerful, you'd need to pay for **GPT-4 Turbo** from OpenAI.

---

**Current Status:** ✅ Configured with Llama 3.3 70B (best free option)  
**Next Step:** Restart your server to apply the changes!
