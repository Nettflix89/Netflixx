// Movie Loading System
class MovieLoader {
    constructor() {
        this.heroMovie = null;
        this.init();
    }

    init() {
        this.loadHeroMovie();
        this.loadMovieRows();
    }

    loadHeroMovie() {
        this.heroMovie = getRandomHeroMovie();
        this.updateHeroSection();
    }

    updateHeroSection() {
        if (!this.heroMovie) return;

        document.getElementById('hero-image').src = this.heroMovie.backdrop;
        document.getElementById('hero-title').textContent = this.heroMovie.title;
        document.getElementById('hero-match').textContent = `${this.heroMovie.match}% Match`;
        document.getElementById('hero-year').textContent = this.heroMovie.year;
        document.getElementById('hero-rating').textContent = this.heroMovie.rating;
        document.getElementById('hero-duration').textContent = this.heroMovie.duration;
        document.getElementById('hero-description').textContent = this.heroMovie.description;
    }

    loadMovieRows() {
        const categories = [
            { id: 'trending-row', movies: getMoviesByCategory('trending') },
            { id: 'newreleases-row', movies: getMoviesByCategory('newReleases') },
            { id: 'action-row', movies: getMoviesByCategory('action') },
            { id: 'comedy-row', movies: getMoviesByCategory('comedy') }
        ];

        categories.forEach(category => {
            this.renderMovieRow(category.id, category.movies);
        });
    }

    renderMovieRow(rowId, movies) {
        const row = document.getElementById(rowId);
        if (!row) return;

        row.innerHTML = movies.map(movie => `
            <div class="movie-card" onclick="selectMovie(${movie.id})">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
                <div class="movie-overlay">
                    <button class="play-overlay" onclick="playMovie(${movie.id}); event.stopPropagation();">▶</button>
                    <div class="movie-info">
                        <span class="movie-title">${movie.title}</span>
                        <span class="movie-meta">${movie.genre} • ${movie.year}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Global movie functions
function selectMovie(movieId) {
    const movie = getMovieById(movieId);
    if (movie) {
        showNotification(`Selected "${movie.title}" - Redirecting to payment...`);
        setTimeout(() => {
            window.location.href = `antibot.html?plan=${encodeURIComponent(movie.genre)}&price=${movie.price}`;
        }, 1000);
    }
}

function playMovie(movieId) {
    const movie = getMovieById(movieId);
    if (movie) {
        showNotification(`Playing "${movie.title}"...`);
        console.log('Playing movie:', movie);
    }
}

function playHeroMovie() {
    if (window.movieLoader && window.movieLoader.heroMovie) {
        const movie = window.movieLoader.heroMovie;
        showNotification(`Playing "${movie.title}"...`);
        console.log('Playing hero movie:', movie);
    }
}

function showHeroDetails() {
    if (window.movieLoader && window.movieLoader.heroMovie) {
        const movie = window.movieLoader.heroMovie;
        showNotification(`Loading details for "${movie.title}"...`);
        console.log('Showing hero movie details:', movie);
    }
}

// Initialize movie loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.movieLoader = new MovieLoader();
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    searchInput.focus();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

function performSearch(query) {
    if (query.trim()) {
        console.log('Searching for:', query);
        // In a real app, this would filter the movie data
        showNotification(`Searching for "${query}"...`);
    }
}

// Settings section functionality
document.addEventListener('DOMContentLoaded', () => {
    // Profile management
    const editProfileBtns = document.querySelectorAll('.edit-profile-btn');
    const addProfileBtn = document.querySelector('.add-profile-btn');
    const profileItems = document.querySelectorAll('.profile-item');

    editProfileBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const profileItem = btn.closest('.profile-item');
            const profileName = profileItem.querySelector('h4').textContent;
            showNotification(`Editing profile: ${profileName}`);
        });
    });

    if (addProfileBtn) {
        addProfileBtn.addEventListener('click', () => {
            showNotification('Opening profile creation...');
        });
    }

    profileItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            profileItems.forEach(p => p.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            const profileName = item.querySelector('h4').textContent;
            showNotification(`Switched to ${profileName} profile`);
        });
    });

    // Settings controls
    const checkboxes = document.querySelectorAll('.setting-item input[type="checkbox"]');
    const selects = document.querySelectorAll('.setting-item select');
    const configureBtns = document.querySelectorAll('.configure-btn');
    const viewHistoryBtn = document.querySelector('.view-history-btn');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.closest('.setting-item').querySelector('label').textContent;
            const status = e.target.checked ? 'enabled' : 'disabled';
            showNotification(`${label} ${status}`);
        });
    });

    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            const label = e.target.closest('.setting-item').querySelector('label').textContent;
            const value = e.target.options[e.target.selectedIndex].text;
            showNotification(`${label} set to ${value}`);
        });
    });

    configureBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const label = btn.closest('.setting-item').querySelector('label').textContent;
            showNotification(`Configuring ${label}...`);
        });
    });

    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', () => {
            showNotification('Opening viewing history...');
        });
    }

    // Analytics interactions
    const statCards = document.querySelectorAll('.stat-card');
    const activityItems = document.querySelectorAll('.activity-item');
    const genreFills = document.querySelectorAll('.genre-fill');
    const bars = document.querySelectorAll('.bar');

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                const finalValue = statValue.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                // Animate number counting
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (finalValue.includes('hours')) {
                        statValue.textContent = `${Math.floor(currentValue)} hours`;
                    } else {
                        statValue.textContent = Math.floor(currentValue);
                    }
                }, 30);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statCards.forEach(card => statsObserver.observe(card));

    // Activity item interactions
    activityItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            const episode = item.querySelector('p').textContent;
            showNotification(`Resuming "${title}" - ${episode}`);
        });
    });

    // Animate genre bars on load
    setTimeout(() => {
        genreFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });

        // Animate bar chart
        bars.forEach((bar, index) => {
            const height = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = height;
            }, index * 100);
        });
    }, 500);

    // Navigation smooth scroll to sections
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => scrollObserver.observe(section));
});

// Plan selection function
function selectPlan(planName, price) {
    window.location.href = `payment.html?plan=${encodeURIComponent(planName)}&price=${price}`;
}

// Pricing section functionality
document.addEventListener('DOMContentLoaded', () => {
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    const comparePlansBtn = document.querySelector('.compare-plans-btn');

    pricingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.pricing-card');
            const planName = card.querySelector('h3').textContent;
            const price = card.querySelector('.amount').textContent;
            handlePlanSelection(planName, price);
        });
    });

    if (comparePlansBtn) {
        comparePlansBtn.addEventListener('click', () => {
            showPlanComparison();
        });
    }
});

function handlePlanSelection(planName, price) {
    showNotification(`Selected ${planName} plan at $${price}/month. Redirecting to checkout...`);
    // In a real app, this would redirect to a checkout page
    console.log('Plan selected:', planName, price);
    
    // Simulate redirect after 2 seconds
    setTimeout(() => {
        showNotification('Checkout page would open here');
    }, 2000);
}

function showPlanComparison() {
    showNotification('Opening detailed plan comparison...');
    // In a real app, this would show a modal with detailed comparison
    console.log('Compare plans clicked');
}

// Movie card interactions
document.addEventListener('DOMContentLoaded', () => {
    const movieCards = document.querySelectorAll('.movie-card');
    const playButtons = document.querySelectorAll('.play-overlay');
    const heroPlayBtn = document.querySelector('.btn-primary');
    const heroMoreInfoBtn = document.querySelector('.btn-secondary');

    // Movie card hover effects and play button clicks
    movieCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('play-overlay')) {
                const movieTitle = card.querySelector('.movie-title').textContent;
                showMovieDetails(movieTitle);
            }
        });
    });

    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieCard = e.target.closest('.movie-card');
            const movieTitle = movieCard.querySelector('.movie-title').textContent;
            playMovie(movieTitle);
        });
    });

    // Hero section buttons
    if (heroPlayBtn) {
        heroPlayBtn.addEventListener('click', () => {
            playMovie('Stranger Things');
        });
    }

    if (heroMoreInfoBtn) {
        heroMoreInfoBtn.addEventListener('click', () => {
            showMovieDetails('Stranger Things');
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.textContent;
            handleNavigation(section);
        });
    });

    // User profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            showUserMenu();
        });
    }

    // Initialize lazy loading for images
    initializeLazyLoading();
});

function playMovie(movieTitle) {
    showNotification(`Playing "${movieTitle}"...`);
    // In a real app, this would open a video player
    console.log('Playing movie:', movieTitle);
}

function showMovieDetails(movieTitle) {
    showNotification(`Loading details for "${movieTitle}"...`);
    // In a real app, this would show a modal with movie details
    console.log('Showing movie details:', movieTitle);
}

function handleNavigation(section) {
    showNotification(`Navigating to ${section}...`);
    // In a real app, this would filter content or navigate to different sections
    console.log('Navigating to:', section);
}

function showUserMenu() {
    showNotification('User menu clicked');
    // In a real app, this would show a dropdown menu
    console.log('User menu opened');
}

function showNotification(message) {
    // Create a simple notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(229, 9, 20, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.transition = 'opacity 0.5s ease-in-out';
                    img.style.opacity = '1';
                });
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Press 'Escape' to blur search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.blur();
        searchInput.value = '';
    }
    
    // Arrow key navigation for movie rows
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('movie-card')) {
            const movieCards = Array.from(focusedElement.parentElement.children);
            const currentIndex = movieCards.indexOf(focusedElement);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : movieCards.length - 1;
            } else {
                newIndex = currentIndex < movieCards.length - 1 ? currentIndex + 1 : 0;
            }
            
            movieCards[newIndex].focus();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const movieRows = document.querySelectorAll('.movie-row');
        movieRows.forEach(row => {
            if (diff > 0) {
                // Swipe left - scroll right
                row.scrollBy({ left: 300, behavior: 'smooth' });
            } else {
                // Swipe right - scroll left
                row.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });
    }
}

// Responsive navigation menu for mobile
function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    `;

    navContainer.insertBefore(mobileMenuBtn, navContainer.firstChild);

    mobileMenuBtn.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Show mobile menu button on small screens
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            document.querySelector('.nav-menu').style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.nav-menu').style.display = 'flex';
        }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Initialize mobile menu
createMobileMenu();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event
const debouncedScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add movie to favorites functionality
function toggleFavorite(movieTitle) {
    let favorites = JSON.parse(localStorage.getItem('netflixFavorites') || '[]');
    const index = favorites.indexOf(movieTitle);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification(`Removed "${movieTitle}" from My List`);
    } else {
        favorites.push(movieTitle);
        showNotification(`Added "${movieTitle}" to My List`);
    }
    
    localStorage.setItem('netflixFavorites', JSON.stringify(favorites));
}

// Add favorite button to movie cards
document.addEventListener('DOMContentLoaded', () => {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '+';
        favoriteBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s ease;
        `;
        
        card.appendChild(favoriteBtn);
        
        card.addEventListener('mouseenter', () => {
            favoriteBtn.style.display = 'flex';
        });
        
        card.addEventListener('mouseleave', () => {
            favoriteBtn.style.display = 'none';
        });
        
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieTitle = card.querySelector('.movie-title').textContent;
            toggleFavorite(movieTitle);
        });
    });
});

console.log('Netflix clone loaded successfully!');
