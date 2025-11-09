# Email Notification Setup

This guide explains how to set up email notifications when training calls are completed.

## Overview

When a training call ends, the system automatically sends an email notification with:
- Employee information (name, email)
- Training scenario details
- Call duration and status
- Timestamp information

## Setup Steps

### 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the API key (it starts with `re_`)

### 2. Configure Environment Variables

Add these to your `/backend/.env` file:

```bash
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# Email configuration
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=ranadaytoday@outlook.com
```

**Notes:**
- `FROM_EMAIL`: By default, use `onboarding@resend.dev` (Resend's test email)
- To send from your own domain, you'll need to verify it in Resend first
- `TO_EMAIL`: The email address where notifications will be sent

### 3. Configure Vapi Webhook

For the email notifications to work, you need to configure Vapi to send webhooks to your server:

1. Go to your [Vapi Dashboard](https://dashboard.vapi.ai)
2. Navigate to your Assistant settings
3. Find the **Webhook** or **Server URL** section
4. Add your webhook URL:
   - For development: `http://your-server-url:3001/api/webhook/vapi`
   - For production with ngrok: `https://your-ngrok-url/api/webhook/vapi`

#### Using ngrok for Development

Since Vapi needs a public URL to send webhooks, use ngrok:

```bash
# Install ngrok if you haven't
brew install ngrok

# Start ngrok tunnel
ngrok http 3001
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and use it in Vapi:
```
https://abc123.ngrok.io/api/webhook/vapi
```

### 4. Restart the Server

```bash
cd backend
npm start
```

You should see:
```
✉️  Resend email service initialized
🚀 Cypher Backend Server
   Running on http://localhost:3001
   Vapi webhook: POST http://localhost:3001/api/webhook/vapi
```

## How It Works

1. **Call Initiated**: When you click "Launch Training", the system triggers a Vapi call
2. **Call Active**: The call data is stored in memory with call ID, employee info, and scenario details
3. **Call Ends**: Vapi sends a webhook to `/api/webhook/vapi` with the call status
4. **Email Sent**: The system automatically sends an email with the training results to `TO_EMAIL`

## Testing

### Test the Webhook Endpoint

```bash
curl -X POST http://localhost:3001/api/webhook/vapi \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "type": "end-of-call-report",
      "call": {
        "id": "test-call-123",
        "duration": 45,
        "status": "ended"
      }
    }
  }'
```

### Verify Email Configuration

Check the server logs when a call ends:
```
📞 Call ended for Rana
   Duration: 45 seconds

📧 Sending training completion email...
✅ Email sent successfully!
   Email ID: abc-123-def
   To: ranadaytoday@outlook.com
```

## Troubleshooting

### Email Not Sending

1. **Check Resend API Key**: Make sure it's valid and not the placeholder
2. **Check TO_EMAIL**: Ensure it's set in `.env`
3. **Check Logs**: Look for error messages in the server console
4. **Verify Account**: Make sure your Resend account is active

### Webhook Not Received

1. **Check ngrok**: Ensure ngrok is running and the URL is correct
2. **Check Vapi Config**: Verify the webhook URL in Vapi dashboard
3. **Check Server**: Ensure the server is running on port 3001
4. **Test Manually**: Use the curl command above to test

### Using Custom Domain

To send emails from your own domain (e.g., `noreply@yourdomain.com`):

1. Add your domain in Resend dashboard
2. Add the DNS records to your domain
3. Wait for verification
4. Update `FROM_EMAIL` in `.env`:
   ```bash
   FROM_EMAIL=noreply@yourdomain.com
   ```

## Free Tier Limits

Resend free tier includes:
- 3,000 emails per month
- 100 emails per day
- Custom domains supported
- Email tracking and analytics

This is perfect for development and moderate production use!
