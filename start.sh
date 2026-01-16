#!/bin/bash

# Netflix Clone - Render Start Script
echo "🎬 Starting Netflix Clone Backend..."

# Set production environment
export NODE_ENV=production

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci --only=production
fi

# Start the server
echo "🚀 Starting server on port $PORT..."
node server.js
