import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { Resend } from 'resend';

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
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.TO_EMAIL;

// Initialize Resend
let resend = null;
if (RESEND_API_KEY && RESEND_API_KEY !== 're_your_api_key_here') {
  resend = new Resend(RESEND_API_KEY);
  console.log('✉️  Resend email service initialized');
} else {
  console.warn('⚠️  Warning: RESEND_API_KEY not configured. Email notifications will be disabled.');
}

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

// Store call data in memory (in production, use a database)
const activeCalls = new Map();

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

    // Store call data for later use in webhook
    activeCalls.set(call.id, {
      callId: call.id,
      employeeName,
      employeeEmail,
      phoneNumber,
      scenario,
      vectors,
      startedAt: new Date().toISOString()
    });

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

// Function to send email notification
async function sendTrainingCompletionEmail(callData, callResult) {
  if (!resend || !TO_EMAIL) {
    console.warn('⚠️  Skipping email: Resend not configured or TO_EMAIL not set');
    return;
  }

  try {
    const { employeeName, employeeEmail, scenario, vectors, startedAt } = callData;
    const { endedAt, duration, status } = callResult;

    console.log('\n📧 Sending training completion email...');

    const emailHtml = `
      <h2>Training Call Completed</h2>
      <p>A phishing training call has been completed.</p>

      <h3>Employee Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${employeeName}</li>
        <li><strong>Email:</strong> ${employeeEmail}</li>
      </ul>

      <h3>Training Details:</h3>
      <ul>
        <li><strong>Scenario:</strong> ${scenario?.title || 'Unknown'}</li>
        <li><strong>Attack Vectors:</strong> ${vectors?.join(', ') || 'None'}</li>
        <li><strong>Started:</strong> ${new Date(startedAt).toLocaleString()}</li>
        <li><strong>Ended:</strong> ${new Date(endedAt).toLocaleString()}</li>
        <li><strong>Duration:</strong> ${duration ? `${duration} seconds` : 'Unknown'}</li>
        <li><strong>Status:</strong> ${status || 'Completed'}</li>
      </ul>

      <p>Please review the results in the Cypher dashboard.</p>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `Training Call Completed - ${employeeName}`,
      html: emailHtml
    });

    if (error) {
      console.error('❌ Error sending email:', error);
    } else {
      console.log('✅ Email sent successfully!');
      console.log(`   Email ID: ${data.id}`);
      console.log(`   To: ${TO_EMAIL}\n`);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

// Webhook endpoint to receive Vapi call status updates
app.post('/api/webhook/vapi', async (req, res) => {
  try {
    const event = req.body;

    console.log('\n🔔 Webhook received from Vapi:');
    console.log(`   Event Type: ${event.message?.type || 'unknown'}`);

    // Log the call ID if available
    const callId = event.message?.call?.id;
    if (callId) {
      console.log(`   Call ID: ${callId}`);
    }

    // Handle call ended event
    if (event.message?.type === 'end-of-call-report' ||
        event.message?.type === 'call-ended' ||
        event.message?.status === 'ended') {

      const call = event.message?.call;
      const callId = call?.id;

      if (callId && activeCalls.has(callId)) {
        const callData = activeCalls.get(callId);

        console.log(`\n📞 Call ended for ${callData.employeeName}`);
        console.log(`   Duration: ${call?.duration || 'Unknown'} seconds`);

        // Send email notification
        await sendTrainingCompletionEmail(callData, {
          endedAt: call?.endedAt || new Date().toISOString(),
          duration: call?.duration,
          status: call?.status
        });

        // Clean up
        activeCalls.delete(callId);
      }
    }

    // Respond quickly to Vapi
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
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
  console.log(`   Vapi webhook: POST http://localhost:${PORT}/api/webhook/vapi`);
  console.log('\n✅ Ready to trigger training calls!\n');
});
