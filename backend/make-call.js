import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const VAPI_API_KEY = process.env.VAPI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTANT_ID;
const TWILIO_PHONE_NUMBER_ID = process.env.TWILIO_PHONE_NUMBER_ID;
const TARGET_PHONE_NUMBER = process.env.TARGET_PHONE_NUMBER;

// Validate environment variables
const missingVars = [];
if (!VAPI_API_KEY) missingVars.push('VAPI_API_KEY');
if (!ASSISTANT_ID) missingVars.push('ASSISTANT_ID');
if (!TWILIO_PHONE_NUMBER_ID) missingVars.push('TWILIO_PHONE_NUMBER_ID');
if (!TARGET_PHONE_NUMBER) missingVars.push('TARGET_PHONE_NUMBER');

if (missingVars.length > 0) {
  console.error('❌ Error: Missing required environment variables:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n💡 Make sure your .env file contains all required variables.');
  process.exit(1);
}

// Validate phone number format
if (!TARGET_PHONE_NUMBER.startsWith('+')) {
  console.error('❌ Error: TARGET_PHONE_NUMBER must be in E.164 format (e.g., +1234567890)');
  process.exit(1);
}

const callConfig = {
  assistantId: ASSISTANT_ID,
  phoneNumberId: TWILIO_PHONE_NUMBER_ID,
  customer: {
    number: TARGET_PHONE_NUMBER
  },
  assistantOverrides: {
    backgroundSound: "https://raw.githubusercontent.com/Rana-X/cypher1.0/main/backend/market-street.mp3",
    backgroundDenoisingEnabled: false
  }
};

async function makeCall() {
  try {
    console.log('📞 Initiating outbound call...\n');
    console.log('📋 Call Details:');
    console.log(`   From: Twilio Number (ID: ${TWILIO_PHONE_NUMBER_ID.substring(0, 10)}...)`);
    console.log(`   To: ${TARGET_PHONE_NUMBER}`);
    console.log(`   Assistant: ${ASSISTANT_ID.substring(0, 20)}...`);
    console.log('\n⏳ Placing call...\n');

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
      throw new Error(`API Error (${response.status}): ${error}`);
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
    console.log('\n📱 The phone should ring shortly!');
    console.log('🎯 Sarah from Y Combinator will speak with you about the VibeCon registration.\n');

    return call;
  } catch (error) {
    console.error('❌ Error making call:', error.message);

    // Provide helpful error messages
    if (error.message.includes('401')) {
      console.error('\n💡 Tip: Check that your VAPI_API_KEY is correct');
    } else if (error.message.includes('404')) {
      console.error('\n💡 Tip: Check that ASSISTANT_ID and TWILIO_PHONE_NUMBER_ID are correct');
    } else if (error.message.includes('400')) {
      console.error('\n💡 Tip: Verify your phone number is in E.164 format (+1234567890)');
    }

    process.exit(1);
  }
}

makeCall();
