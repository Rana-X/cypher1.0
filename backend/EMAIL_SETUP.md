# Email Notification Setup

This guide explains how to set up email notifications when training calls are launched.

## Overview

When you click "Launch Training", the system automatically:
1. Initiates a phone call via Vapi
2. Sends an email notification with training details to your configured email address

The email includes:
- Employee information (name, email)
- Training scenario details
- Call ID for tracking
- Timestamp when the call was initiated
- Attack vectors being tested

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

### 3. Restart the Backend Server

```bash
cd backend
npm start
```

You should see:
```
✉️  Resend email service initialized
🚀 Cypher Backend Server
   Running on http://localhost:3001
```

## How It Works

1. **Click "Launch Training"**: User clicks the button in the dashboard
2. **Call Initiated**: System triggers a Vapi call to the employee's phone
3. **Email Sent**: Immediately after call initiation, an email is sent to `TO_EMAIL`
4. **Confirmation**: User sees success message and receives email notification

## Testing

### Manual Test

1. Open the Cypher dashboard in your browser
2. Select an employee and training scenario
3. Click "Launch Training"
4. Check your email (`TO_EMAIL`) for the notification

### Verify Email Configuration

Check the server logs when launching a call:
```
📞 Initiating training call...
   Employee: John Doe (john@example.com)
   Phone: +1234567890
   Scenario: VibeCon Ticket Scam

✅ Call initiated successfully!
   Call ID: abc-123-def

📧 Sending training initiated email...
✅ Email sent successfully!
   Email ID: xyz-789
   To: ranadaytoday@outlook.com
```

## Troubleshooting

### Email Not Sending

1. **Check Resend API Key**:
   - Make sure it's valid and not the placeholder (`re_your_api_key_here`)
   - Verify it starts with `re_`

2. **Check TO_EMAIL**:
   - Ensure it's set in `.env`
   - Verify the email address is valid

3. **Check Logs**:
   - Look for error messages in the server console
   - Server should show "✉️  Resend email service initialized" on startup

4. **Verify Account**:
   - Make sure your Resend account is active
   - Check you haven't exceeded free tier limits

### Using Custom Domain

To send emails from your own domain (e.g., `noreply@yourdomain.com`):

1. Add your domain in Resend dashboard
2. Add the DNS records to your domain
3. Wait for verification (usually a few minutes)
4. Update `FROM_EMAIL` in `.env`:
   ```bash
   FROM_EMAIL=noreply@yourdomain.com
   ```
5. Restart the backend server

## Free Tier Limits

Resend free tier includes:
- **3,000 emails per month**
- **100 emails per day**
- Custom domains supported
- Email tracking and analytics

This is perfect for development and moderate production use!

## Email Template

The email sent includes:

- **Subject**: "Training Call Initiated - [Employee Name]"
- **Employee Information**: Name and email
- **Training Details**: Call ID, scenario, attack vectors, timestamp
- **Status**: Confirmation that the call is in progress

You can customize the email template in `/backend/server.js` in the `sendTrainingInitiatedEmail()` function.
