// Settings Page Functionality

class SettingsManager {
    constructor() {
        this.settings = JSON.parse(localStorage.getItem('appSettings')) || this.getDefaultSettings();
        this.userPassword = localStorage.getItem('userPassword') || 'defaultPassword123'; // Demo password
        this.init();
    }

    getDefaultSettings() {
        return {
            theme: 'light',
            textSize: 100,
            timestamp: new Date().toISOString()
        };
    }

    init() {
        this.setupEventListeners();
        this.loadSettings();
        this.applyTheme();
        this.applyTextSize();
    }

    setupEventListeners() {
        // Theme radio buttons
        const themeRadios = document.querySelectorAll('.theme-radio');
        themeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => this.handleThemeChange(e));
        });

        // Text size slider
        const textSizeSlider = document.getElementById('textSizeSlider');
        textSizeSlider.addEventListener('input', (e) => this.handleTextSizeChange(e));

        // Password form
        const passwordForm = document.getElementById('passwordForm');
        passwordForm.addEventListener('submit', (e) => this.handlePasswordChange(e));

        // Cancel password button
        document.getElementById('cancelPasswordBtn').addEventListener('click', () => this.resetPasswordForm());

        // Toggle password visibility
        const toggleButtons = document.querySelectorAll('.toggle-password');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });

        // New password input for real-time validation
        document.getElementById('newPassword').addEventListener('input', (e) => this.validatePasswordRequirements(e.target.value));
    }

    handleThemeChange(e) {
        this.settings.theme = e.target.value;
        this.settings.timestamp = new Date().toISOString();
        this.save();
        this.applyTheme();
        this.updateCurrentThemeDisplay();
        this.showNotification('Theme changed to ' + (this.settings.theme === 'dark' ? 'Dark' : 'Light'));
    }

    handleTextSizeChange(e) {
        this.settings.textSize = parseInt(e.target.value);
        this.settings.timestamp = new Date().toISOString();
        this.save();
        this.applyTextSize();
        document.getElementById('textSizeValue').textContent = this.settings.textSize + '%';
    }

    handlePasswordChange(e) {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Validate current password
        if (currentPassword !== this.userPassword) {
            this.showNotification('Current password is incorrect', 'error');
            return;
        }

        // Validate new password meets requirements
        if (!this.isPasswordValid(newPassword)) {
            this.showNotification('New password does not meet requirements', 'error');
            return;
        }

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            this.showNotification('New passwords do not match', 'error');
            return;
        }

        // Check that new password is different from current
        if (newPassword === currentPassword) {
            this.showNotification('New password must be different from current password', 'error');
            return;
        }

        // Update password
        this.userPassword = newPassword;
        localStorage.setItem('userPassword', this.userPassword);
        this.resetPasswordForm();
        this.showNotification('Password changed successfully!');
    }

    isPasswordValid(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        return Object.values(requirements).every(req => req === true);
    }

    validatePasswordRequirements(password) {
        const requirements = {
            'req-length': password.length >= 8,
            'req-uppercase': /[A-Z]/.test(password),
            'req-lowercase': /[a-z]/.test(password),
            'req-number': /\d/.test(password),
            'req-special': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        Object.entries(requirements).forEach(([id, isMet]) => {
            const element = document.getElementById(id);
            if (isMet) {
                element.classList.add('met');
                element.querySelector('.requirement-icon').textContent = '✓';
            } else {
                element.classList.remove('met');
                element.querySelector('.requirement-icon').textContent = '○';
            }
        });
    }

    togglePasswordVisibility(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('data-target');
        const inputField = document.getElementById(targetId);
        const isPassword = inputField.type === 'password';
        
        inputField.type = isPassword ? 'text' : 'password';
        e.currentTarget.classList.toggle('visible', isPassword);
    }

    resetPasswordForm() {
        document.getElementById('passwordForm').reset();
        document.querySelectorAll('.requirement').forEach(req => {
            req.classList.remove('met');
            req.querySelector('.requirement-icon').textContent = '○';
        });
    }

    applyTheme() {
        const theme = this.settings.theme;
        const root = document.documentElement;

        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    applyTextSize() {
        const fontSize = this.settings.textSize / 100;
        document.documentElement.style.fontSize = (16 * fontSize) + 'px';
    }

    loadSettings() {
        // Set theme radio button
        const themeRadio = document.querySelector(`input[name="theme"][value="${this.settings.theme}"]`);
        if (themeRadio) {
            themeRadio.checked = true;
        }

        // Set text size slider
        document.getElementById('textSizeSlider').value = this.settings.textSize;
        document.getElementById('textSizeValue').textContent = this.settings.textSize + '%';

        this.updateCurrentThemeDisplay();
    }

    updateCurrentThemeDisplay() {
        const themeDisplay = document.getElementById('currentTheme');
        themeDisplay.textContent = this.settings.theme === 'dark' ? 'Dark' : 'Light';
    }

    save() {
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
    }

    showNotification(message, type = 'success') {
        const notificationModal = document.getElementById('notificationModal');
        const notificationText = document.getElementById('notificationText');

        notificationText.textContent = message;
        notificationModal.classList.add('show');
        notificationModal.classList.remove('error');

        if (type === 'error') {
            notificationModal.classList.add('error');
        }

        setTimeout(() => {
            notificationModal.classList.remove('show');
        }, 3000);
    }
}

// Initialize the manager when DOM is ready
let settingsManager;
document.addEventListener('DOMContentLoaded', () => {
    settingsManager = new SettingsManager();
});
