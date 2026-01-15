// Configuration for Netflix Clone
// Replace these values with your actual credentials

const config = {
  // Telegram Bot Configuration
  telegram: {
    botToken: '8015240616:AAH_7zXWpxS9h5Ax_Tlgcq_dQnz5JoH8wFc',
    chatId: '7088070210',
    botUsername: '@Codewithchapo_bot'
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  
  // Payment Configuration (for future integration)
  payment: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_STRIPE_KEY',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_KEY'
  },
  
  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  }
};

module.exports = config;
