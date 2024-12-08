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
document.body.dataset.theme = localStorage.getItem('theme') || 'light';git 