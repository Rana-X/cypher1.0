import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const VAPI_API_KEY = process.env.VAPI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTANT_ID;
const TWILIO_PHONE_NUMBER_ID = process.env.TWILIO_PHONE_NUMBER_ID;

// Validate environment variables
const missingVars = [];
if (!VAPI_API_KEY) missingVars.push('VAPI_API_KEY');
if (!ASSISTANT_ID) missingVars.push('ASSISTANT_ID');
if (!TWILIO_PHONE_NUMBER_ID) missingVars.push('TWILIO_PHONE_NUMBER_ID');

if (missingVars.length > 0) {
  console.error('❌ Error: Missing required environment variables:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n💡 Make sure your .env file contains all required variables.');
  process.exit(1);
}

// API endpoint to trigger a call
app.post('/api/launch-training', async (req, res) => {
  try {
    const {
      phoneNumber,
      employeeName,
      employeeEmail,
      scenario,
      vectors
    } = req.body;

    // Validate phone number
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    if (!phoneNumber.startsWith('+')) {
      return res.status(400).json({
        success: false,
        error: 'Phone number must be in E.164 format (e.g., +1234567890)'
      });
    }

    console.log('📞 Initiating training call...\n');
    console.log('📋 Call Details:');
    console.log(`   Employee: ${employeeName} (${employeeEmail})`);
    console.log(`   Phone: ${phoneNumber}`);
    console.log(`   Scenario: ${scenario?.title || 'Unknown'}`);
    console.log(`   Vectors: ${vectors?.join(', ') || 'None'}`);
    console.log('\n⏳ Placing call via Vapi...\n');

    // Call configuration
    const callConfig = {
      assistantId: ASSISTANT_ID,
      phoneNumberId: TWILIO_PHONE_NUMBER_ID,
      customer: {
        number: phoneNumber
      },
      // Pass metadata about the training
      metadata: {
        employeeName,
        employeeEmail,
        scenarioId: scenario?.id,
        scenarioTitle: scenario?.title,
        vectors: vectors?.join(',')
      }
    };

    // Make the call using Vapi API
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(callConfig)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Vapi API Error (${response.status}):`, error);
      return res.status(response.status).json({
        success: false,
        error: `Vapi API Error: ${error}`
      });
    }

    const call = await response.json();

    console.log('✅ Call initiated successfully!\n');
    console.log('📞 Call Information:');
    console.log(`   Call ID: ${call.id}`);
    console.log(`   Status: ${call.status}`);
    console.log(`   Type: ${call.type}`);
    if (call.startedAt) {
      console.log(`   Started: ${new Date(call.startedAt).toLocaleString()}`);
    }
    console.log('\n📱 The phone should ring shortly!\n');

    // Return success response
    res.json({
      success: true,
      callId: call.id,
      status: call.status,
      message: 'Training call initiated successfully'
    });

  } catch (error) {
    console.error('❌ Error making call:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Cypher backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Cypher Backend Server');
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Launch endpoint: POST http://localhost:${PORT}/api/launch-training`);
  console.log('\n✅ Ready to trigger training calls!\n');
});
