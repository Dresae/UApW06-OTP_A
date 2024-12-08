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