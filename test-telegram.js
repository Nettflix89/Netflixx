// Test Telegram Bot Connection
const axios = require('axios');

async function testTelegramBot() {
    const botToken = '8015240616:AAH_7zXWpxS9h5Ax_Tlgcq_dQnz5JoH8wFc';
    
    try {
        // Test 1: Get bot info
        console.log('🤖 Testing bot info...');
        const botInfo = await axios.get(`https://api.telegram.org/bot${botToken}/getMe`);
        console.log('✅ Bot info:', botInfo.data.result);
        
        // Test 2: Get updates to find chat ID
        console.log('\n📱 Getting recent updates...');
        const updates = await axios.get(`https://api.telegram.org/bot${botToken}/getUpdates`);
        console.log('📨 Updates:', JSON.stringify(updates.data, null, 2));
        
        if (updates.data.result.length > 0) {
            const chatId = updates.data.result[0].message.chat.id;
            console.log(`\n🎯 Found chat ID: ${chatId}`);
            
            // Test 3: Send test message
            console.log('\n📤 Sending test message...');
            const message = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: '🎬 Netflix Clone Bot Test - Working! 🍿'
            });
            console.log('✅ Message sent successfully!');
        } else {
            console.log('\n❌ No recent messages found. Send a message to your bot first!');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

testTelegramBot();
