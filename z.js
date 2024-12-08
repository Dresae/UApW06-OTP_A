// Initialize EmailJS with your public key
emailjs.init("J7ZRHQe-3VkihBImj");

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
            "service_znxpxfa",
            "template_mr850l5",
            {
                to_email: currentEmail,
                otp: currentOTP
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
