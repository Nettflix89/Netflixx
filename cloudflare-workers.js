// Cloudflare Workers for Netflix Clone Anti-Bot Protection
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Bot detection logic
  const isBot = await detectBot(request)
  
  if (isBot) {
    return new Response(JSON.stringify({
      error: 'Access Denied - Bot Detected',
      message: 'Please complete human verification'
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP')
  const rateLimitResult = await checkRateLimit(clientIP)
  
  if (!rateLimitResult.allowed) {
    return new Response(JSON.stringify({
      error: 'Rate Limit Exceeded',
      message: 'Too many requests. Please try again later.'
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }

  // Forward legitimate requests to backend
  const backendUrl = 'https://netflix-backend.onrender.com' + url.pathname + url.search
  
  try {
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    
    // Add security headers
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('X-Frame-Options', 'DENY')
    newResponse.headers.set('X-XSS-Protection', '1; mode=block')
    newResponse.headers.set('X-Content-Type-Options', 'nosniff')
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return newResponse
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Service Unavailable',
      message: 'Backend service is temporarily unavailable'
    }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

// Advanced bot detection
async function detectBot(request) {
  const headers = request.headers
  const userAgent = headers.get('User-Agent') || ''
  const clientIP = headers.get('CF-Connecting-IP')
  
  // Check for known bot patterns
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /java/i,
    /node/i, /php/i, /ruby/i, /go/i
  ]
  
  // User agent analysis
  const isBotUA = botPatterns.some(pattern => pattern.test(userAgent))
  
  // Cloudflare bot score
  const cfBotScore = headers.get('CF-Bot-Score')
  const isCloudflareBot = cfBotScore && parseInt(cfBotScore) < 30
  
  // IP reputation check
  const isSuspiciousIP = await checkIPReputation(clientIP)
  
  // Request pattern analysis
  const requestPattern = analyzeRequestPattern(request)
  
  return isBotUA || isCloudflareBot || isSuspiciousIP || requestPattern.isBot
}

// Rate limiting implementation
async function checkRateLimit(clientIP) {
  // Simple rate limiting - in production, use Redis or similar
  const rateLimit = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100 // limit each IP to 100 requests per windowMs
  }
  
  // In production, implement actual rate limiting storage
  return { allowed: true, remaining: 99, resetTime: Date.now() + rateLimit.windowMs }
}

// IP reputation check
async function checkIPReputation(clientIP) {
  // Check against known malicious IP ranges
  const maliciousRanges = [
    // Add known malicious IP ranges here
  ]
  
  return false // In production, implement actual IP checking
}

// Request pattern analysis
function analyzeRequestPattern(request) {
  const headers = request.headers
  const url = new URL(request.url)
  
  // Check for suspicious patterns
  const suspiciousPatterns = {
    noReferer: !headers.get('Referer'),
    noAccept: !headers.get('Accept'),
    weirdAccept: headers.get('Accept')?.includes('*/*'),
    quickRequest: Date.now() - parseInt(headers.get('X-Request-Time') || '0') < 100
  }
  
  const botScore = Object.values(suspiciousPatterns).filter(Boolean).length
  
  return {
    isBot: botScore >= 2,
    score: botScore,
    patterns: suspiciousPatterns
  }
}

// Export for testing
export default {
  handleRequest,
  detectBot,
  checkRateLimit
}
