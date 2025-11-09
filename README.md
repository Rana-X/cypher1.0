# Cypher - Cybersecurity Training Platform

A full-stack cybersecurity training platform with real-time monitoring, phishing simulation campaigns, and employee training management.

## Project Structure

```
cypher1.0/
├── backend/              # Vapi AI Voice Agent
│   ├── create-agent.js   # Create/update Vapi assistant
│   ├── make-call.js      # Initiate outbound calls
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
│
├── frontend/             # React Dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx        # Main security dashboard
│   │   │   ├── Analytics.tsx        # Metrics & analytics
│   │   │   ├── LiveMonitoring.tsx   # Real-time monitoring
│   │   │   └── ui/                  # 48 Shadcn UI components
│   │   ├── styles/
│   │   │   └── globals.css          # Tailwind CSS theme
│   │   ├── lib/
│   │   │   └── utils.ts             # Utility functions
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # App entry point
│   │   └── index.css                # CSS imports
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.ts               # Vite configuration
│   └── tsconfig.json                # TypeScript config
│
└── README.md                        # This file
```

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **APIs**: Vapi AI, ElevenLabs, OpenAI GPT-4, Deepgram, Twilio

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### Backend (Voice Agent)

```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys

# Create/update the Vapi assistant
node create-agent.js

# Make an outbound call
node make-call.js
```

## Features

### Dashboard
- **Real-time Security Monitoring**: Live attack feed with employee actions
- **Risk Scoring**: Company and individual employee risk assessments
- **Department Analytics**: Vulnerability heatmaps by department
- **Campaign Management**: Active phishing simulation campaigns
- **Training Tracking**: Employee training completion and progress

### Voice Agent (Backend)
- AI-powered voice calls for social engineering training
- Natural conversation with GPT-4
- Advanced interruption handling
- Background audio for realism
- Automatic call transcription

## Development

### Frontend Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

**Backend** (`.env`):
```
VAPI_API_KEY=your_vapi_key
PHONE_NUMBER_ID=your_twilio_number
CUSTOMER_NUMBER=target_phone_number
ASSISTANT_ID=your_assistant_id
```

## Company Branding

This platform is branded for **Cypher**, a cybersecurity training company. The dashboard displays:
- Engineering, Development, DevOps, IT Security departments
- Employee emails with @cypher.com domain
- Generic security training scenarios

## License

MIT
