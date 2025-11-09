# Vapi Voice Agent Tuning Guide

**Last Updated:** November 8th, 2025
**Created with:** Claude Code
**Purpose:** Comprehensive guide for tuning Vapi voice agent parameters

> **IMPORTANT:** This is a living document. When you discover new tuning parameters, optimization techniques, or find better configurations, **UPDATE THIS DOCUMENT** immediately. Add your findings with dates and explanations.

---

## Table of Contents
1. [Agent Components Overview](#agent-components-overview)
2. [Model Configuration](#model-configuration)
3. [Voice Configuration](#voice-configuration)
4. [Transcriber Configuration](#transcriber-configuration)
5. [Interruption Handling](#interruption-handling)
6. [Latency Optimization](#latency-optimization)
7. [Background Sound](#background-sound)
8. [System Prompt Engineering](#system-prompt-engineering)
9. [Troubleshooting](#troubleshooting)
10. [Performance Benchmarks](#performance-benchmarks)

---

## Agent Components Overview

A Vapi voice agent consists of 4 main components:

1. **Model (LLM)** - The brain that generates responses
2. **Voice (TTS)** - Converts text to speech
3. **Transcriber (STT)** - Converts speech to text
4. **Orchestration** - Manages conversation flow and timing

### Component Interaction Flow
```
User speaks → Transcriber → Model → Voice → User hears
              ↓
         Orchestration (manages timing, interruptions, flow)
```

---

## Model Configuration

### Model Selection

#### GPT-5 (Recommended for Production)
```javascript
model: {
  provider: "openai",
  model: "gpt-5",  // Full model, best quality
  temperature: 0.7,
  maxTokens: 150,
  emotionRecognitionEnabled: true
}
```

**When to use:**
- Production environment requiring best quality
- Complex conversations with nuanced understanding
- When latency is acceptable (550-800ms)

**Pros:**
- Best reasoning and context understanding
- More natural conversation flow
- Better at handling edge cases

**Cons:**
- Higher cost
- Slightly higher latency than mini models

#### GPT-5 Mini
```javascript
model: "gpt-5-mini"
```

**When to use:**
- Cost-sensitive applications
- Simple, predictable conversations
- Need faster responses

**Pros:**
- Lower cost (60% cheaper than GPT-5)
- Faster response time
- Still very capable for structured tasks

**Cons:**
- Less nuanced understanding
- May struggle with complex context

#### GPT-5 Nano
```javascript
model: "gpt-5-nano"
```

**When to use:**
- Extremely simple use cases
- Maximum speed required
- Highly structured conversations only

### Model Parameters

#### Temperature (0.0 - 2.0)
```javascript
temperature: 0.7  // Default: balanced creativity
```

**Tuning Guide:**
- `0.0 - 0.3`: Consistent, predictable responses (customer service, FAQs)
- `0.4 - 0.8`: Balanced (general conversation, support)
- `0.9 - 1.5`: Creative, varied responses (sales, engagement)
- `1.6 - 2.0`: Highly random (avoid for voice agents)

**Recommendation:** Use 0.6-0.8 for natural variation without unpredictability.

#### Max Tokens (50 - 500)
```javascript
maxTokens: 150  // Recommended for voice
```

**Tuning Guide:**
- `50-100`: Very brief, direct answers (simple Q&A)
- `100-200`: Normal conversation (most use cases) ⭐
- `200-300`: Detailed explanations (technical support)
- `300+`: Avoid - too long for voice, causes latency

**Impact on Latency:** Higher tokens = longer response generation time.

---

## Voice Configuration

### Voice Provider Comparison (2025)

| Provider | Latency | Quality | Natural | Cost | Use Case |
|----------|---------|---------|---------|------|----------|
| **PlayHT** | 200ms | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $$ | General purpose, reliable |
| **ElevenLabs** | 245ms | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $$$ | High quality, emotional |
| **Rhyme AI** | 87ms | ⭐⭐⭐ | ⭐⭐⭐ | $$ | Speed critical |
| **Azure** | 150ms | ⭐⭐⭐⭐ | ⭐⭐⭐ | $ | Multilingual, cost-effective |
| **MiniMax** | Unknown | ⭐⭐⭐ | ⭐⭐⭐⭐ | $$ | Asian languages, casual tone |

### Current Configuration (PlayHT Jennifer)
```javascript
voice: {
  provider: "playht",
  voiceId: "jennifer",
  speed: 1.05,        // Slightly faster than normal
  temperature: 0.8    // More variation in delivery
}
```

### Voice Parameters

#### Speed (0.5 - 2.0)
```javascript
speed: 1.05
```

**Tuning Guide:**
- `0.7 - 0.9`: Slower, clearer (elderly, accessibility)
- `1.0`: Natural pace (default)
- `1.05 - 1.15`: Energetic, engaging ⭐
- `1.2 - 1.5`: Fast-paced (time-sensitive calls)
- `1.5+`: Too fast, avoid

#### Temperature (0.0 - 1.0)
```javascript
temperature: 0.8
```

**Tuning Guide:**
- `0.0 - 0.3`: Monotone, consistent
- `0.4 - 0.6`: Slight variation
- `0.7 - 0.9`: Natural, expressive ⭐
- `0.9 - 1.0`: Highly varied

**Note:** Voice temperature is different from model temperature!

---

## Transcriber Configuration

### Transcriber Comparison

| Provider | Latency | Accuracy | Languages | Interruption |
|----------|---------|----------|-----------|--------------|
| **Deepgram Nova-2** | 50-100ms | ⭐⭐⭐⭐⭐ | 100+ | Excellent ⭐ |
| **Assembly AI** | 100-200ms | ⭐⭐⭐⭐ | 50+ | Good |
| **Whisper** | 200-500ms | ⭐⭐⭐⭐⭐ | 90+ | Poor |

### Current Configuration
```javascript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en"
}
```

**Why Deepgram Nova-2:**
- Fastest response time (50-100ms)
- Best for interruption detection
- Excellent accuracy
- Lowest latency for real-time conversation

---

## Interruption Handling

### Stop Speaking Plan

This is **THE MOST CRITICAL** parameter for natural conversation flow.

```javascript
stopSpeakingPlan: {
  numWords: 3,              // Require 3+ words to interrupt
  voiceSeconds: 0.3,        // Voice activity threshold
  backoffSeconds: 0.6,      // Recovery time after interruption
  acknowledgementPhrases: [
    "yes", "yeah", "yep", "okay", "ok",
    "right", "uh-huh", "mm-hmm", "mhmm",
    "sure", "got it", "I see", "alright"
  ]
}
```

### Parameter Details

#### numWords (0 - 10)
**What it does:** Minimum words user must speak before AI stops.

**Tuning Guide:**
- `0`: Voice Activity Detection only - VERY sensitive, stops on any sound
- `1-2`: Stops on single words like "what?" or "wait" - may be too sensitive
- `3-4`: **RECOMMENDED** - Ignores backchannels, catches real interruptions ⭐
- `5-7`: Less sensitive - good for long explanations
- `8+`: Too high - frustrating user experience

**Current Setting:** `3` - Perfect balance for our use case.

#### voiceSeconds (0.0 - 0.5)
**What it does:** How long voice activity must be detected (when numWords = 0).

**Tuning Guide:**
- `0.0 - 0.1`: Hyper-sensitive (stutters, coughs trigger)
- `0.2 - 0.3`: **RECOMMENDED** for most use cases ⭐
- `0.4 - 0.5`: Less sensitive (user must speak clearly)

**Note:** Only matters when `numWords = 0`.

#### backoffSeconds (0.0 - 10.0)
**What it does:** Silence period after interruption before AI can speak again.

**Tuning Guide:**
- `0.0 - 0.3`: Immediate response - may overlap with user
- `0.4 - 0.8`: **RECOMMENDED** - natural pause ⭐
- `0.9 - 1.5`: Longer pause (formal conversations)
- `2.0+`: Too long - feels unresponsive

**Current Setting:** `0.6` - Quick recovery, feels natural.

#### acknowledgementPhrases (array)
**What it does:** Words/phrases that DON'T trigger interruption.

**Critical:** This is how you prevent AI from stopping when user says "yeah" or "okay"!

**Recommended Phrases:**
```javascript
[
  "yes", "yeah", "yep", "yup",
  "okay", "ok", "kay",
  "right", "correct", "exactly",
  "uh-huh", "mm-hmm", "mhmm",
  "sure", "got it", "I see",
  "alright", "cool", "nice"
]
```

**Testing:** Listen to actual calls and add any backchannels your users say.

---

## Latency Optimization

### Current Configuration (Zero Latency)
```javascript
responseDelaySeconds: 0,       // No artificial delay
llmRequestDelaySeconds: 0,     // Send to LLM immediately
silenceTimeoutSeconds: 30,     // End call after 30s silence
maxDurationSeconds: 180        // 3 minute max call
```

### Response Delay (0.0 - 5.0)
**What it does:** Delay after user stops speaking before AI responds.

**Tuning Guide:**
- `0.0`: Instant - feels responsive ⭐ (current setting)
- `0.1 - 0.4`: Natural pause (default Vapi: 0.4)
- `0.5 - 1.0`: Thoughtful pause (formal settings)
- `1.0+`: Too slow - frustrating

**Trade-off:** Lower = faster but may interrupt natural pauses. Higher = more polite but slower.

**Recommendation:** Use `0.0` for customer service, `0.2-0.4` for sales conversations.

### LLM Request Delay (0.0 - 2.0)
**What it does:** Wait time after user speech before sending to LLM.

**Tuning Guide:**
- `0.0`: Immediate processing ⭐ (current setting)
- `0.05 - 0.1`: Slight buffer for end-of-turn detection
- `0.2+`: Only if you need to batch requests

**Recommendation:** Keep at `0.0` unless you have a specific reason.

### Total Latency Breakdown

```
User finishes speaking
↓
responseDelaySeconds (0s) ←───── CONFIGURABLE
↓
llmRequestDelaySeconds (0s) ←─── CONFIGURABLE
↓
Transcription (50-100ms) ←────── Provider dependent
↓
LLM Processing (200-500ms) ←──── Model dependent
↓
TTS Generation (150-300ms) ←──── Voice provider dependent
↓
AI starts speaking
```

**Current Total:** ~400-900ms (excellent for voice)

---

## Background Sound

### Current Configuration
```javascript
backgroundSound: "https://raw.githubusercontent.com/Rana-X/cypher1.0/main/market-street.mp3",
backgroundDenoisingEnabled: false  // Keep ambient sound
```

### Background Sound Options

1. **Default Vapi Sounds:**
```javascript
backgroundSound: "office"  // Built-in office ambience
```

Options: `"office"`, `"off"`, custom URL

2. **Custom Audio URL:**
```javascript
backgroundSound: "https://your-url.com/audio.mp3"
```

**Requirements:**
- Public URL (not localhost)
- MP3 or WAV format
- Preferably looping/seamless
- File size: Keep under 5MB for reliability

**Hosting Options:**
- GitHub (raw.githubusercontent.com) ⭐
- AWS S3
- CloudFlare R2
- Direct server

### Background Denoising

```javascript
backgroundDenoisingEnabled: false
```

**When to enable (true):**
- User in noisy environment
- Call center with background chatter
- Need clean transcription

**When to disable (false):** ⭐ Current setting
- Want to preserve ambient sound
- Using custom background audio
- Want authentic feel

---

## System Prompt Engineering

### Critical Rules for Voice Prompts

#### 1. Keep Responses Short
```javascript
// GOOD
"Keep EVERY response to 1-2 sentences maximum"

// BAD (too long for voice)
"Provide detailed explanations with context..."
```

**Why:** Voice is linear - users can't scan or skip ahead.

#### 2. No Emotion Tags
```javascript
// BAD - Don't use
[apologetic] "Sorry about that..."
[friendly] "Hey there!"

// GOOD - Use natural language
"Sound apologetic by saying 'My bad on that' or 'Sorry about that'"
```

**Why:** TTS providers don't parse SSML/emotion tags in most cases.

#### 3. Handle Backchannels in Prompt
```javascript
"COMPLETE your full sentence even if user says brief
acknowledgments like 'yes', 'okay', 'uh-huh'

ONLY stop speaking if the user asks a real question"
```

**Why:** Reinforces the stopSpeakingPlan configuration.

#### 4. Natural Conversational Language
```javascript
// GOOD examples in prompt:
"Yeah, so there was a technical glitch..."
"Totally fair question!"
"Should hit your inbox in a couple minutes"

// Avoid corporate speak:
"We apologize for the inconvenience caused..."
"Please be advised that..."
```

### Prompt Structure (Recommended)

```markdown
<task>
Brief, clear objective
</task>

<identity>
Who the AI is, tone, role
</identity>

<conversation_structure>
1. Opening
2. Main content
3. Handle questions
4. Close
</conversation_structure>

<critical_rules>
- Concise responses
- Handle interruptions
- Never mention being AI
</critical_rules>

<examples>
Example 1: [realistic dialogue]
Example 2: [realistic dialogue]
...
</examples>
```

---

## Troubleshooting

### Issue: Background Sound Not Audible

**Possible Causes:**
1. Custom URL not accessible
2. Audio file too quiet
3. Background denoising enabled
4. Phone compression

**Solutions:**
- Test URL in browser first
- Use louder audio source
- Set `backgroundDenoisingEnabled: false`
- Try default `"office"` sound first

### Issue: AI Keeps Getting Interrupted

**Diagnosis:** `numWords` too low or acknowledgementPhrases missing

**Solution:**
```javascript
stopSpeakingPlan: {
  numWords: 4,  // Increase from 3
  acknowledgementPhrases: [
    // Add more phrases you hear in calls
  ]
}
```

### Issue: AI Doesn't Stop When User Interrupts

**Diagnosis:** `numWords` too high

**Solution:**
```javascript
stopSpeakingPlan: {
  numWords: 2,  // Decrease from 3
  voiceSeconds: 0.2  // Lower threshold
}
```

### Issue: High Latency / Slow Responses

**Check:**
1. Model (GPT-5 > GPT-5 mini for speed)
2. Voice provider (Rhyme AI fastest, ElevenLabs slower)
3. Response delays

**Optimize:**
```javascript
responseDelaySeconds: 0,
llmRequestDelaySeconds: 0,
maxTokens: 100,  // Reduce from 150
```

### Issue: Robotic Voice / Lacks Emotion

**Solutions:**
1. Increase voice temperature: `temperature: 0.8 - 0.9`
2. Update system prompt with natural language examples
3. Try different voice (ElevenLabs > PlayHT for emotion)
4. Increase model temperature: `temperature: 0.7 - 0.8`

---

## Performance Benchmarks

### Current Configuration Performance

**Latency (end-to-end):**
- Best case: ~400ms
- Average: ~600ms
- Worst case: ~900ms

**Comparison to Industry:**
- Vapi average: 550-800ms ✓
- Retell: 400-600ms
- Bland AI: 300-500ms
- Industry target: <500ms for "natural"

### Cost Estimates (per minute)

**Model:**
- GPT-5: $0.02 - $0.04 / minute
- GPT-5 mini: $0.01 - $0.02 / minute

**Voice:**
- PlayHT: $0.015 / minute
- ElevenLabs: $0.025 / minute
- Azure: $0.01 / minute

**Transcriber:**
- Deepgram: $0.004 / minute
- Assembly AI: $0.005 / minute

**Total (GPT-5 + PlayHT + Deepgram):**
~$0.04 - $0.06 per minute

---

## New Discoveries & Updates

### Update Template
```markdown
**Date:** YYYY-MM-DD
**Discovered by:** [Name]
**Finding:** [What you discovered]
**Parameter:** [Which parameter]
**Impact:** [How it affects performance]
**Recommendation:** [When to use]

Example configuration:
[code block]
```

---

### 2025-11-08 - Initial Documentation
**Created by:** Claude Code
**Finding:** Documented all current parameters and best practices
**Status:** Baseline configuration established

---

## Quick Reference Card

```javascript
// Optimal Configuration (November 2025)
{
  // MODEL
  model: "gpt-5",              // Best quality
  temperature: 0.7,            // Natural variation
  maxTokens: 150,              // Brief responses

  // VOICE
  provider: "playht",          // Reliable, good quality
  voiceId: "jennifer",         // Natural female voice
  speed: 1.05,                 // Slightly energetic
  temperature: 0.8,            // Expressive

  // TRANSCRIBER
  provider: "deepgram",        // Fastest, best accuracy
  model: "nova-2",

  // INTERRUPTION
  numWords: 3,                 // Sweet spot
  voiceSeconds: 0.3,
  backoffSeconds: 0.6,
  acknowledgementPhrases: [...],  // See full list above

  // LATENCY
  responseDelaySeconds: 0,     // Zero delay
  llmRequestDelaySeconds: 0,

  // BACKGROUND
  backgroundSound: "[custom URL or 'office']",
  backgroundDenoisingEnabled: false
}
```

---

## Resources

- [Vapi Official Docs](https://docs.vapi.ai)
- [Vapi API Reference](https://docs.vapi.ai/api-reference)
- [Community Forum](https://vapi.ai/community)
- [This Repository](https://github.com/Rana-X/cypher1.0)

---

**Remember:** Every call is an opportunity to learn. Listen to recordings, analyze what works, and **update this document** with your findings!
