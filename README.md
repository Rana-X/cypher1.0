# Vapi Voice Agent - Backend Only

A Node.js backend script that creates a Vapi AI voice agent and makes outbound calls. The agent pretends to be Sarah from Y Combinator calling about a VibeCon hackathon registration issue.

## Features

- MiniMax "sweet_girl" voice for natural conversation
- GPT-4o-mini for fast, low-latency responses
- Deepgram Nova-2 for accurate transcription
- Office background noise for authenticity
- Low latency response (0.4s)
- Natural conversation flow with end call detection

## Prerequisites

- Node.js (v18 or higher)
- Vapi account with API key
- Twilio phone number configured in Vapi
- Target phone number to call

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd cypher1.0

# Install dependencies
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your credentials:

```env
# Get this from your Vapi dashboard: https://dashboard.vapi.ai
VAPI_API_KEY=your_vapi_api_key_here

# This will be generated when you run create-agent.js
ASSISTANT_ID=your_assistant_id_here

# Get this from Vapi > Phone Numbers section
TWILIO_PHONE_NUMBER_ID=your_twilio_phone_number_id_here

# Your phone number in E.164 format (+1234567890)
TARGET_PHONE_NUMBER=+1234567890
```

### Getting Your Credentials

**VAPI_API_KEY:**
1. Go to [Vapi Dashboard](https://dashboard.vapi.ai)
2. Navigate to Settings → API Keys
3. Create a new API key or copy existing one

**TWILIO_PHONE_NUMBER_ID:**
1. In Vapi Dashboard, go to Phone Numbers
2. Add a phone number if you haven't already
3. Copy the Phone Number ID (not the actual phone number)

**TARGET_PHONE_NUMBER:**
- Your phone number in E.164 format
- Must start with `+` followed by country code
- Example: `+14155551234` (US number)

## Usage

### Step 1: Create the Assistant

Run this command to create the Vapi assistant:

```bash
node create-agent.js
```

This will:
- Create a new assistant named "Sarah - YC Support Agent"
- Configure the voice, LLM, and transcriber
- Return an `ASSISTANT_ID`

**Important:** Copy the `ASSISTANT_ID` from the output and add it to your `.env` file:

```env
ASSISTANT_ID=abc123xyz...
```

### Step 2: Make the Call

Once you have the `ASSISTANT_ID` in your `.env` file, run:

```bash
node make-call.js
```

This will:
- Initiate an outbound call to your target phone number
- The agent (Sarah) will say: "Hey, is this Rana?"
- Have a conversation about the VibeCon registration issue

## Agent Behavior

**Voice Agent:** Sarah from Y Combinator

**Scenario:** Calling about a VibeCon hackathon registration issue

**Conversation Flow:**
1. Greets and verifies it's Rana
2. Explains there was a technical issue with the registration
3. Informs that a new registration link will be sent via email
4. Answers any questions briefly (1-2 sentences max)
5. Ends the call naturally

**End Call Phrases:**
The call automatically ends when Sarah says:
- "have a great day"
- "take care"
- "goodbye"

## Technical Configuration

### Voice Settings
- **Provider:** MiniMax
- **Voice ID:** sweet_girl
- **Background:** Office noise

### LLM Settings
- **Model:** GPT-4o-mini
- **Temperature:** 0.7
- **Max Tokens:** 150
- **Response Delay:** 0.4 seconds

### Transcriber
- **Provider:** Deepgram
- **Model:** Nova-2
- **Language:** English

### Call Settings
- **Max Duration:** 180 seconds (3 minutes)
- **Silence Timeout:** 30 seconds
- **Backchanneling:** Enabled
- **Background Denoising:** Enabled

## Troubleshooting

### Error: VAPI_API_KEY is not set
- Make sure you created a `.env` file (not `.env.example`)
- Verify the API key is correctly copied from Vapi dashboard

### Error: Missing required environment variables
- Run `node create-agent.js` first to get the `ASSISTANT_ID`
- Check that all variables in `.env` are filled in

### Error: Phone number format
- Phone number must be in E.164 format
- Must start with `+` followed by country code
- Example: `+14155551234` (not `4155551234` or `14155551234`)

### Call not connecting
- Verify your Twilio phone number is active in Vapi
- Check that `TWILIO_PHONE_NUMBER_ID` matches the ID in Vapi dashboard
- Ensure target phone number is correct and can receive calls

### API Error 401
- Your `VAPI_API_KEY` is invalid or expired
- Generate a new API key from Vapi dashboard

### API Error 404
- `ASSISTANT_ID` or `TWILIO_PHONE_NUMBER_ID` is incorrect
- Re-run `create-agent.js` to get a new assistant ID
- Verify phone number ID in Vapi dashboard

## Scripts

```bash
# Create the assistant
npm run create-agent

# Make an outbound call
npm run make-call
```

## API Endpoints Used

- **Create Assistant:** `POST https://api.vapi.ai/assistant`
- **Make Call:** `POST https://api.vapi.ai/call/phone`

## License

ISC

## Support

For issues or questions:
- Check the [Vapi Documentation](https://docs.vapi.ai)
- Visit [Vapi Discord](https://discord.gg/vapi)
