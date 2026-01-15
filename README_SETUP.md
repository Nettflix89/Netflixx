# Netflix Payment System Setup Guide

## 🚀 Quick Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Telegram Bot

#### Create a Telegram Bot:
1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the **BOT TOKEN** (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

#### Get Your Chat ID:
1. Search for **@userinfobot** in Telegram
2. Send any message to it
3. Copy your **Chat ID** (looks like: `123456789`)

### 3. Environment Configuration
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` file with your credentials:
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
PORT=3000
```

### 4. Start the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

### 5. Test the System
1. Open your browser to: `http://localhost:3000`
2. Click on any pricing plan "Get Started" button
3. Fill out the payment form with test data:
   - Email: `test@example.com`
   - Card: `4242 4242 4242 4242` (Visa test card)
   - Expiry: `12/25`
   - CVV: `123`
   - ZIP: `12345`

### 6. Test Telegram Notifications
Open browser console and run:
```javascript
testTelegramConnection()
```

## 📱 Telegram Notifications You'll Receive

### Payment Success:
```
🎉 NETFLIX SUBSCRIPTION PAYMENT RECEIVED 🎉

📧 Email: test@example.com
📺 Plan: Standard
💰 Amount: $15.49 USD
💳 Card: Visa ****4242
📅 Date: 1/7/2026, 12:00:00 PM
🆔 Payment ID: pay_1234567890_abc123
🔄 Subscription ID: sub_1234567890
⏰ Next Billing: 2/6/2026

✅ Status: ACTIVE
🎬 Enjoy your Netflix subscription!
```

### Test Message:
```
🧪 TELEGRAM TEST MESSAGE 🧪

✅ Bot connection successful!
📱 Netflix Payment System Ready
⏰ Test time: 1/7/2026, 12:00:00 PM
```

## 🔧 Features Included

### Backend:
- ✅ Express.js server with REST API
- ✅ Payment processing simulation
- ✅ Telegram bot integration
- ✅ Subscription management
- ✅ Payment history tracking
- ✅ Real-time notifications

### Frontend:
- ✅ Secure payment form
- ✅ Card validation
- ✅ Real-time error handling
- ✅ Loading states
- ✅ Success notifications
- ✅ Mobile responsive design

### Security:
- ✅ Input validation
- ✅ Card number formatting
- ✅ Expiry date validation
- ✅ CVV protection
- ✅ Error handling

## 🌐 Deployment Options

### Local Development:
```bash
npm run dev
```

### Production (Heroku):
```bash
# Install Heroku CLI
heroku create your-netflix-app
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHAT_ID=your_chat_id
git push heroku main
```

### Production (Vercel):
```bash
# Install Vercel CLI
vercel
# Follow prompts to deploy
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/create-payment-intent` | Create new payment |
| POST | `/api/process-payment` | Process payment |
| GET | `/api/subscription/:userId` | Get subscription status |
| GET | `/api/payments/:userId` | Get payment history |
| POST | `/api/test-telegram` | Test Telegram connection |
| GET | `/api/health` | Server health check |

## 🎯 Test Cards for Development

| Card Number | Brand | Result |
|-------------|-------|--------|
| `4242 4242 4242 4242` | Visa | Success |
| `5555 5555 5555 4444` | Mastercard | Success |
| `3782 822463 10005` | American Express | Success |
| `4000 0000 0000 0002` | Visa | Declined |
| `4000 0000 0000 9995` | Visa | Insufficient Funds |

## 🐛 Troubleshooting

### Telegram Not Working:
1. Verify BOT TOKEN is correct
2. Verify CHAT ID is correct
3. Make sure bot is started (send `/start` to your bot)
4. Check if bot can send messages to you

### Server Not Starting:
1. Check if port 3000 is available
2. Run `npm install` to install dependencies
3. Check Node.js version (requires 14+)

### Payment Form Issues:
1. Check browser console for errors
2. Verify server is running
3. Check network tab for failed requests

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Verify your `.env` configuration
3. Test Telegram connection separately
4. Check server health at `http://localhost:3000/api/health`

---

**🎬 Your Netflix Payment System is now ready!**
