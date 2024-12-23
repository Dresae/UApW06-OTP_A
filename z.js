// Initialize EmailJS with your public key
emailjs.init("your_public_key");

let currentOTP = '';
let currentEmail = '';

// Theme toggling
function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
}

// Load saved theme
document.body.dataset.theme = localStorage.getItem('theme') || 'light';

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Handle email submission
async function handleEmailSubmit(event) {
    event.preventDefault();
    currentEmail = document.getElementById('email').value;
    currentOTP = generateOTP();

    try {
        // Send email using EmailJS
        await emailjs.send(
            "your_service_id", // Replace with your service ID from EmailJS
            "your_template_id", // Replace with your template ID from EmailJS
            {
                to_email: currentEmail, // variables used for the OTP template in EmailJS
                otp: currentOTP         // variables used for the OTP template in EmailJS
            }
        );

        showNotification('OTP sent successfully!', 'success');
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    } catch (error) {
        showNotification('Failed to send OTP. Please try again.', 'error');
    }
}

// Handle OTP input navigation
function moveToNext(input, index) {
    if (input.value.length === input.maxLength) {
        if (index < 5) {
            document.getElementsByClassName('otp-inputs')[0].children[index + 1].focus();
        }
    }
}

// Verify OTP
function verifyOTP() {
    const inputs = document.getElementsByClassName('otp-inputs')[0].children;
    const enteredOTP = Array.from(inputs).map(input => input.value).join('');

    if (enteredOTP === currentOTP) {
        showNotification('Authentication successful!', 'success');
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('userEmail', currentEmail);
    } else {
        showNotification('Invalid OTP. Please try again.', 'error');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userEmail');
    location.reload();
}

// Check if user is already authenticated
window.onload = function() {
    if (localStorage.getItem('authenticated') === 'true') {
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        currentEmail = localStorage.getItem('userEmail');
    }
}
