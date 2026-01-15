// Antibot Verification System
class AntibotSystem {
    constructor() {
        this.captchaData = null;
        this.selectedAnswer = null;
        this.timeLeft = 60;
        this.timerInterval = null;
        this.verificationAttempts = 0;
        this.maxAttempts = 3;
        this.init();
    }

    init() {
        this.generateCaptcha();
        this.setupEventListeners();
        this.startTimer();
        this.performBotDetection();
    }

    generateCaptcha() {
        const questions = [
            {
                question: "What is 7 + 5?",
                options: ["11", "12", "13", "14"],
                correct: 1
            },
            {
                question: "Which is a fruit?",
                options: ["Car", "Apple", "Chair", "Table"],
                correct: 1
            },
            {
                question: "What color is the sky?",
                options: ["Red", "Green", "Blue", "Yellow"],
                correct: 2
            },
            {
                question: "How many days in a week?",
                options: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "Which animal says 'woof'?",
                options: ["Cat", "Dog", "Bird", "Fish"],
                correct: 1
            }
        ];

        // Select random question
        this.captchaData = questions[Math.floor(Math.random() * questions.length)];
        
        // Display question
        document.getElementById('captcha-question').textContent = this.captchaData.question;
        
        // Generate options
        const optionsContainer = document.getElementById('captcha-options');
        optionsContainer.innerHTML = '';
        
        this.captchaData.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'captcha-option';
            optionDiv.textContent = option;
            optionDiv.dataset.index = index;
            
            optionDiv.addEventListener('click', () => this.selectOption(index));
            optionsContainer.appendChild(optionDiv);
        });
    }

    selectOption(index) {
        // Remove previous selection
        document.querySelectorAll('.captcha-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        this.selectedAnswer = index;
        
        // Enable verify button
        document.getElementById('verify-btn').disabled = false;
        
        // Update progress
        this.updateProgress(50);
    }

    setupEventListeners() {
        const verifyBtn = document.getElementById('verify-btn');
        verifyBtn.addEventListener('click', () => this.verifyAnswer());
    }

    async verifyAnswer() {
        if (this.selectedAnswer === null) {
            this.showError('Please select an answer');
            return;
        }

        this.verificationAttempts++;
        
        const verifyBtn = document.getElementById('verify-btn');
        const loading = document.getElementById('loading');
        
        // Disable button and show loading
        verifyBtn.disabled = true;
        loading.style.display = 'block';
        
        // Simulate verification process
        await this.simulateVerification();
        
        // Check answer
        if (this.selectedAnswer === this.captchaData.correct) {
            // Success
            this.updateProgress(100);
            this.showSuccess('✅ Verification successful! Redirecting to payment...');
            
            // Store verification in session
            sessionStorage.setItem('antibot_verified', 'true');
            sessionStorage.setItem('verification_time', Date.now().toString());
            
            // Redirect to payment after delay
            setTimeout(() => {
                const urlParams = new URLSearchParams(window.location.search);
                const plan = urlParams.get('plan') || 'Standard';
                const price = urlParams.get('price') || '15.49';
                window.location.href = `payment.html?plan=${encodeURIComponent(plan)}&price=${price}`;
            }, 2000);
            
        } else {
            // Failed
            this.showError(`❌ Incorrect answer. Attempt ${this.verificationAttempts}/${this.maxAttempts}`);
            
            if (this.verificationAttempts >= this.maxAttempts) {
                this.blockAccess();
            } else {
                // Generate new captcha
                setTimeout(() => {
                    this.generateCaptcha();
                    this.selectedAnswer = null;
                    verifyBtn.disabled = true;
                    loading.style.display = 'none';
                    this.updateProgress(25);
                }, 1500);
            }
        }
        
        loading.style.display = 'none';
    }

    async simulateVerification() {
        // Simulate server-side verification
        return new Promise(resolve => {
            setTimeout(resolve, 1500);
        });
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = `Time remaining: ${this.timeLeft}s`;
            
            if (this.timeLeft <= 10) {
                document.getElementById('timer').style.color = '#ff6b6b';
            }
            
            if (this.timeLeft <= 0) {
                this.blockAccess();
            }
        }, 1000);
    }

    blockAccess() {
        clearInterval(this.timerInterval);
        
        const container = document.querySelector('.antibot-container');
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2 style="color: #e50914; font-size: 32px; margin-bottom: 20px;">🚫 Access Blocked</h2>
                <p style="color: #ffffff; opacity: 0.8; font-size: 16px; margin-bottom: 20px;">
                    Too many failed attempts or time expired. For security reasons, access has been blocked.
                </p>
                <p style="color: #ffffff; opacity: 0.6; font-size: 14px;">
                    Please try again later or contact support if you believe this is an error.
                </p>
                <button onclick="location.reload()" style="
                    margin-top: 20px;
                    padding: 12px 24px;
                    background: #e50914;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                ">Try Again</button>
            </div>
        `;
        
        // Log security event
        this.logSecurityEvent('ACCESS_BLOCKED', {
            attempts: this.verificationAttempts,
            timeExpired: this.timeLeft <= 0,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
    }

    performBotDetection() {
        // Mouse movement detection
        let mouseMovements = 0;
        let mouseTimer = null;
        
        document.addEventListener('mousemove', () => {
            mouseMovements++;
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(() => {
                if (mouseMovements < 5) {
                    this.suspiciousActivity('Low mouse movement detected');
                }
            }, 5000);
        });
        
        // Keyboard interaction detection
        let keyboardInteractions = 0;
        document.addEventListener('keydown', () => {
            keyboardInteractions++;
        });
        
        // Time-based detection
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            if (timeSpent < 3000) { // Less than 3 seconds
                this.suspiciousActivity('Page left too quickly');
            }
        });
        
        // Tab focus detection
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.suspiciousActivity('Tab lost focus during verification');
            }
        });
        
        // DevTools detection
        let devtools = {open: false, orientation: null};
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.suspiciousActivity('DevTools opened');
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }

    suspiciousActivity(reason) {
        this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
            reason,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            sessionId: sessionStorage.getItem('antibot_session') || 'unknown'
        });
    }

    logSecurityEvent(eventType, data) {
        // Log to console (in production, send to server)
        console.log('SECURITY EVENT:', {
            type: eventType,
            data,
            ip: 'would be captured server-side',
            timestamp: new Date().toISOString()
        });
        
        // In production, send to server
        fetch('/api/log-security-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventType,
                data,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            })
        }).catch(() => {
            // Silently fail for security
        });
    }

    updateProgress(percentage) {
        document.getElementById('progress-fill').style.width = percentage + '%';
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
    }

    showSuccess(message) {
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');
        
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    }
}

// Check if already verified
function checkVerificationStatus() {
    const verified = sessionStorage.getItem('antibot_verified');
    const verificationTime = sessionStorage.getItem('verification_time');
    
    if (verified === 'true' && verificationTime) {
        const timeDiff = Date.now() - parseInt(verificationTime);
        // Verification valid for 10 minutes
        if (timeDiff < 10 * 60 * 1000) {
            const urlParams = new URLSearchParams(window.location.search);
            const plan = urlParams.get('plan') || 'Standard';
            const price = urlParams.get('price') || '15.49';
            window.location.href = `payment.html?plan=${encodeURIComponent(plan)}&price=${price}`;
            return;
        }
    }
    
    // Initialize antibot system
    new AntibotSystem();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', checkVerificationStatus);

// Generate session ID
if (!sessionStorage.getItem('antibot_session')) {
    sessionStorage.setItem('antibot_session', 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
}
