// ========================================
// Login Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setInitialState();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Login toggle buttons
    document.getElementById('toggle-login-btn')?.addEventListener('click', showLoginForm);
    document.getElementById('hide-login-btn')?.addEventListener('click', hideLoginForm);
    document.getElementById('to-login-btn')?.addEventListener('click', switchToLogin);

    // Signup toggle buttons
    document.getElementById('toggle-signup-btn')?.addEventListener('click', showSignupForm);
    document.getElementById('hide-signup-btn')?.addEventListener('click', hideSignupForm);
    document.getElementById('to-signup-btn')?.addEventListener('click', switchToSignup);

    // Form submissions
    document.getElementById('login-form')?.addEventListener('submit', handleLoginSubmit);
    document.getElementById('signup-form')?.addEventListener('submit', handleSignupSubmit);
}

/**
 * Set initial state - show prompts by default
 */
function setInitialState() {
    hideLoginForm();
    hideSignupForm();
}

/**
 * Show login form and hide prompt
 */
function showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginPrompt = document.querySelector('.login-prompt');
    
    if (loginForm && loginPrompt) {
        loginPrompt.style.display = 'none';
        loginForm.classList.remove('hidden');
        loginForm.style.display = 'block';
        document.getElementById('login-email')?.focus();
    }
}

/**
 * Hide login form and show prompt
 */
function hideLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginPrompt = document.querySelector('.login-prompt');
    
    if (loginForm && loginPrompt) {
        loginForm.classList.add('hidden');
        loginForm.style.display = 'none';
        loginPrompt.style.display = 'block';
        clearLoginForm();
    }
}

/**
 * Show signup form and hide prompt
 */
function showSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const signupPrompt = document.querySelector('.signup-prompt');
    
    if (signupForm && signupPrompt) {
        signupPrompt.style.display = 'none';
        signupForm.classList.remove('hidden');
        signupForm.style.display = 'block';
        document.getElementById('first-name')?.focus();
    }
}

/**
 * Hide signup form and show prompt
 */
function hideSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const signupPrompt = document.querySelector('.signup-prompt');
    
    if (signupForm && signupPrompt) {
        signupForm.classList.add('hidden');
        signupForm.style.display = 'none';
        signupPrompt.style.display = 'block';
        clearSignupForm();
    }
}

/**
 * Switch from signup to login form
 */
function switchToLogin() {
    hideSignupForm();
    showLoginForm();
}

/**
 * Switch from login to signup form
 */
function switchToSignup() {
    hideLoginForm();
    showSignupForm();
}

/**
 * Clear login form fields
 */
function clearLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.reset();
    }
}

/**
 * Clear signup form fields
 */
function clearSignupForm() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.reset();
    }
}

/**
 * Handle login form submission with firebase
 */
async function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    // Validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    try {
        // Sign in with Firebase
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        console.log('Login successful:', user.uid);
        showSuccess('Login successful! Redirecting...');
        
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user.uid);
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = '/Index/Index.html';
        }, 1500);
        
    } catch (error) {
        console.error('Login error:', error.message);
        handleAuthError(error);
    }
}


/**
 * Handle signup form submission with firebase
 */
async function handleSignupSubmit(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('first-name')?.value.trim();
    const lastName = document.getElementById('last-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const password = document.getElementById('signup-password')?.value.trim();
    const passwordConfirm = document.getElementById('signup-password-confirm')?.value.trim();

    // Validation
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        showError('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }

    if (password !== passwordConfirm) {
        showError('Passwords do not match');
        return;
    }

    try {
        // Create user with Firebase
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        console.log('Account created:', user.uid);
        
        // Save user profile to Firestore
        await db.collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdDate: new Date().toISOString()
        });
        
        console.log('User profile saved');
        showSuccess('Account created successfully! Redirecting...');
        
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user.uid);

        // Redirect after delay
        setTimeout(() => {
            window.location.href = '/Index/Index.html';
        }, 1500);
        
    } catch (error) {
        console.error('Signup error:', error.message);
        handleAuthError(error);
    }
}

/**
 * Handle Firebase authentication errors
 */
function handleAuthError(error) {
    let message = 'An error occurred. Please try again.';
    
    switch(error.code) {
        case 'auth/email-already-in-use':
            message = 'This email is already registered. Please sign in instead.';
            break;
         case 'auth/invalid-email':
            message = 'Please enter a valid email address.';
            break;
        case 'auth/weak-password':
            message = 'Password must be at least 6 characters long.';
            break;
        case 'auth/user-not-found':
            message = 'No account found with this email. Please sign up.';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password. Please try again.';
            break;
        case 'auth/too-many-requests':
            message = 'Too many failed login attempts. Please try again later.';
            break;
        default:
            message = error.message;
    }
    
    showError(message);
}    

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message
 */
function showError(message) {
    removeExistingAlert();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-error alert-dismissible';
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
        <strong>Error:</strong> ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.insertBefore(alert, loginContainer.firstChild);
        alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

/**
 * Show success message
 */
function showSuccess(message) {
    removeExistingAlert();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `<strong>Success:</strong> ${message}`;
    
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.insertBefore(alert, loginContainer.firstChild);
        alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Remove existing alert messages
 */
function removeExistingAlert() {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
}

/**
 * Handle dark mode toggle if available
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

/**
 * Check for saved dark mode preference
 */
function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode on page load
initializeDarkMode();
