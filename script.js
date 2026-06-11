/* ================================================
   ANTIQUE DEPOT — JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== SCROLL PROGRESS ====================
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ==================== MOBILE MENU ====================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ==================== OPEN/CLOSED STATUS ====================
    function updateStatus() {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const time = hour + minute / 60;
        // Open daily 10AM-6PM
        const isOpen = time >= 10 && time < 18;

        if (isOpen) {
            statusDot.classList.add('open');
            statusDot.classList.remove('closed');
            statusText.textContent = 'Open Now';
        } else {
            statusDot.classList.add('closed');
            statusDot.classList.remove('open');
            statusText.textContent = 'Closed';
        }
    }
    updateStatus();
    setInterval(updateStatus, 60000);

    // ==================== VENDOR FILTERS ====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vendorCards = document.querySelectorAll('.vendor-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            vendorCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==================== DEALER CAROUSEL ====================
    const dealerCards = document.querySelectorAll('.dealer-card');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevDealer');
    const nextBtn = document.getElementById('nextDealer');
    let currentDealer = 0;

    dealerCards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToDealer(i));
        dotsContainer.appendChild(dot);
    });

    function goToDealer(index) {
        dealerCards[currentDealer].classList.remove('active');
        dotsContainer.children[currentDealer].classList.remove('active');
        currentDealer = index;
        dealerCards[currentDealer].classList.add('active');
        dotsContainer.children[currentDealer].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        goToDealer((currentDealer - 1 + dealerCards.length) % dealerCards.length);
    });

    nextBtn.addEventListener('click', () => {
        goToDealer((currentDealer + 1) % dealerCards.length);
    });

    // Auto-advance
    setInterval(() => {
        goToDealer((currentDealer + 1) % dealerCards.length);
    }, 6000);

    // ==================== SCROLL REVEAL ====================
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // ==================== BACK TO TOP ====================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== FORM VALIDATION ====================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                valid = false;
            } else {
                nameInput.classList.remove('error');
            }

            const emailInput = document.getElementById('email');
            if (emailInput.value && !emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                emailInput.classList.add('error');
                valid = false;
            } else {
                emailInput.classList.remove('error');
            }

            if (valid) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        });
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});