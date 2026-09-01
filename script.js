// ---------- PROJECTS (HARDCODED) ----------
// 👇 EDIT THIS ARRAY: Replace the liveDemo links with your actual deployed URLs!
const projects = [
    {
        name: "Circlet",
        description: "A modern web app built with React and Tailwind. Showcases real-time data and responsive design.",
        language: "JavaScript",
        stars: 12,
        repoUrl: "https://github.com/Froshboi/Circlet",
        liveDemo: "#" // <-- PASTE YOUR LIVE DEMO URL HERE (e.g., https://circlet.vercel.app)
    },
    {
        name: "letsbuildyou",
        description: "This very portfolio! Built with pure HTML, CSS, and JS. Features dark/light mode and a project calculator.",
        language: "HTML",
        stars: 3,
        repoUrl: "https://github.com/Froshboi/letsbuildyou",
        liveDemo: "#" // <-- PASTE YOUR GITHUB PAGES URL HERE (e.g., https://froshboi.github.io/letsbuildyou)
    },
    {
        name: "Project Alpha",
        description: "Full-stack e-commerce platform with Stripe integration and real-time inventory management.",
        language: "Python",
        stars: 8,
        repoUrl: "https://github.com/Froshboi",
        liveDemo: "#"
    },
    {
        name: "Project Beta",
        description: "SaaS dashboard with authentication, analytics charts, and team collaboration features.",
        language: "TypeScript",
        stars: 5,
        repoUrl: "https://github.com/Froshboi",
        liveDemo: "#"
    }
];

// ---------- RENDER PROJECTS ----------
function renderProjects() {
    const grid = document.getElementById('repoGrid');
    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-muted);">No projects to show yet.</p>`;
        return;
    }

    grid.innerHTML = projects.map((proj, i) => `
        <div class="repo-card fade-up delay-${i % 4}">
            <h4>${proj.name}</h4>
            <p>${proj.description || 'No description provided.'}</p>
            <span class="lang-tag">${proj.language || 'Unknown'}</span>
            <span class="stars">⭐ ${proj.stars || 0}</span>
            <div class="links">
                <a href="${proj.repoUrl}" target="_blank" class="link">GitHub ↗</a>
                <a href="${proj.liveDemo}" target="_blank" class="link" style="color:var(--accent);">Live Demo ↗</a>
            </div>
        </div>
    `).join('');

    // Trigger fade-in manually for new elements
    grid.querySelectorAll('.fade-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const getCurrentTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

let currentTheme = getCurrentTheme();
html.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

const toggleTheme = () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
};

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system changes if user hasn't saved a preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
});

// ---------- MOBILE MENU ----------
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
        mobileBtn.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.textContent = '☰';
        });
    });
}

// ---------- JOB CALCULATOR ----------
const projectType = document.getElementById('projectType');
const hoursInput = document.getElementById('hours');
const rateInput = document.getElementById('hourlyRate');
const calcBtn = document.getElementById('calcBtn');

const displayType = document.getElementById('displayType');
const displayHours = document.getElementById('displayHours');
const displayRate = document.getElementById('displayRate');
const displayBase = document.getElementById('displayBase');
const displayTotal = document.getElementById('displayTotal');

const baseCosts = {
    landing: 1500,
    webapp: 3500,
    ecommerce: 5000,
    platform: 7500
};
const typeLabels = {
    landing: 'Landing Page',
    webapp: 'Web App',
    ecommerce: 'E-Commerce',
    platform: 'Complex Platform'
};

function updateCalculator() {
    const type = projectType.value;
    const hours = parseInt(hoursInput.value) || 0;
    const rate = parseInt(rateInput.value) || 0;
    const base = baseCosts[type] || 0;

    const laborCost = hours * rate * 0.6;
    const total = base + laborCost;

    displayType.textContent = typeLabels[type] || type;
    displayHours.textContent = hours;
    displayRate.textContent = rate;
    displayBase.textContent = `$${base.toLocaleString()}`;
    displayTotal.textContent = `$${Math.round(total).toLocaleString()}`;
}

if (calcBtn) {
    calcBtn.addEventListener('click', updateCalculator);
    projectType.addEventListener('change', updateCalculator);
    hoursInput.addEventListener('input', updateCalculator);
    rateInput.addEventListener('input', updateCalculator);
    updateCalculator(); // Initial calculation
}

// ---------- SCROLL ANIMATIONS (Observer) ----------
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

window.addEventListener('load', () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', renderProjects);
