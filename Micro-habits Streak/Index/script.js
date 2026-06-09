const burgerIcon = document.querySelector('.burger-icon');
const verticalNavbar = document.querySelector('.vertical-navbar');
const navLinks = document.querySelectorAll('.vertical-navbar-link');
const pageContent = document.getElementById('page-content');

burgerIcon.addEventListener('click', () => {
    verticalNavbar.classList.toggle('open');
});

const routes = {
    home: '../Home/home.html',
    activity: '../Activity/activity.html',
    subscriptions: '../Subscription/subscription.html',
    you: '../You/you.html',
    workarounds: '../Workarounds/workarounds.html',
    settings: '../Settings/settings.html',
    help: '../Help/help.html',
    logout: '../Login/login.html',
};

navLinks.forEach(link => {
    link.addEventListener('click', async (event) => {
        event.preventDefault();
        const page = link.getAttribute('data-page');
        if (page === 'logout') {
            localStorage.removeItem('isLoggedIn');
            window.location.href = routes[page];
            return;
        }

    loadPage(page);
    verticalNavbar.classList.remove('open');
    burgerIcon.classList.remove('open');
    });
});

    async function loadPage(page) {
        try {
            const response = await fetch(routes[page]);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            pageContent.innerHTML = html;
            if (page === 'activity') initActivityPage();
        } catch (error) {
            pageContent.innerHTML = `<h1>Error loading page</h1><p>${error.message}</p>`;
        }
    }

// Load home page on startup
loadPage('home');