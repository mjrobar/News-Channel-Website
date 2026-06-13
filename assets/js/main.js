document.addEventListener('DOMContentLoaded', () => {
    console.log('News Channel Website Initialized.');
    
    // Ticker pause on hover
    const ticker = document.querySelector('.ticker-news');
    if (ticker) {
        ticker.addEventListener('mouseover', () => {
            ticker.style.animationPlayState = 'paused';
        });
        ticker.addEventListener('mouseout', () => {
            ticker.style.animationPlayState = 'running';
        });
    }

    // Sidebar stacked cards news sliders (supporting multiple sliders with smooth translateX transition)
    const sliders = document.querySelectorAll('.stacked-slider-wrap');
    sliders.forEach((slider) => {
        const track = slider.querySelector('.stacked-slider-track');
        const slides = slider.querySelectorAll('.sidebar-stacked-card');
        const prevBtn = slider.querySelector('.slider-arrow.prev');
        const nextBtn = slider.querySelector('.slider-arrow.next');
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 20000; // 20 seconds auto-scroll interval

        function showSlide(index) {
            currentIndex = index;
            // Shift the track left/right
            const translateX = -currentIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;

            // Keep track of active class
            slides.forEach((slide, i) => {
                if (i === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startAutoplay() {
            stopAutoplay();
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function stopAutoplay() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }

        // Arrow Click Event Handlers
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
                startAutoplay(); // Reset autoplay timer on click
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                startAutoplay(); // Reset autoplay timer on click
            });
        }

        // Hover events: pause autoplay on hover to let the user read comfortably
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Initialize individual slider
        showSlide(currentIndex);
        startAutoplay();
    });

    // Countdown Timer for "বিশ্বকাপের অপেক্ষা" (June 11, 2026)
    const countdownElement = document.getElementById('wc-countdown');
    if (countdownElement) {
        // Target Date: June 11, 2026 00:00:00 (Local Time)
        const targetDate = new Date('June 11, 2026 00:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                countdownElement.innerHTML = `<span class="wc-countdown-ended">বিশ্বকাপ শুরু হয়েছে!</span>`;
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Translate numbers to Bengali format
            const toBengaliNumber = (num) => {
                const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
                return num.toString().split('').map(digit => bengaliDigits[digit] || digit).join('');
            };

            countdownElement.innerHTML = `
                <div class="wc-countdown-item"><span class="wc-countdown-val">${toBengaliNumber(days)}</span><span class="wc-countdown-lbl">দিন</span></div>
                <div class="wc-countdown-item"><span class="wc-countdown-val">${toBengaliNumber(hours)}</span><span class="wc-countdown-lbl">ঘণ্টা</span></div>
                <div class="wc-countdown-item"><span class="wc-countdown-val">${toBengaliNumber(minutes)}</span><span class="wc-countdown-lbl">মিনিট</span></div>
                <div class="wc-countdown-item"><span class="wc-countdown-val">${toBengaliNumber(seconds)}</span><span class="wc-countdown-lbl">সেকেন্ড</span></div>
            `;
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Ticker Heading Swapper (Alternates every 10s: Headline -> Date -> Time -> Headline)
    const tickerHeadline = document.getElementById('ticker-heading-headline');
    const tickerDate = document.getElementById('ticker-heading-date');
    const tickerDateText = document.getElementById('ticker-date-text');
    const tickerTime = document.getElementById('ticker-heading-time');
    const tickerTimeText = document.getElementById('ticker-time-text');

    if (tickerHeadline && tickerDate && tickerDateText && tickerTime && tickerTimeText) {
        const getBengaliDate = () => {
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            const formatted = new Intl.DateTimeFormat('bn-BD', options).format(new Date());
            return formatted.replace(',', '').trim();
        };

        const getFormattedTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const formattedHours = String(hours).padStart(2, '0');
            return `${ampm} ${formattedHours}:${minutes}:${seconds}`;
        };

        tickerDateText.textContent = getBengaliDate();
        tickerTimeText.textContent = getFormattedTime();

        // Keep time ticking live every second
        setInterval(() => {
            tickerTimeText.textContent = getFormattedTime();
        }, 1000);

        // State machine: 0 = Headline, 1 = Date, 2 = Time
        let currentState = 0;
        const elements = [tickerHeadline, tickerDate, tickerTime];

        setInterval(() => {
            const currentElement = elements[currentState];
            
            currentState = (currentState + 1) % 3;
            const nextElement = elements[currentState];

            // Refresh date if transitioning to Date state
            if (currentState === 1) {
                tickerDateText.textContent = getBengaliDate();
            }

            // Slide out current, slide in next
            currentElement.className = 'ticker-heading-content slide-above';
            nextElement.className = 'ticker-heading-content active';

            // Move exited element back to bottom after animation completes (600ms)
            const resetElement = currentElement;
            setTimeout(() => {
                if (!resetElement.classList.contains('active')) {
                    resetElement.className = 'ticker-heading-content slide-below';
                }
            }, 600);

        }, 10000);
    }

    // Latest News Category Filtering
    const latestLinks = document.querySelectorAll('.latest-nav-link');
    const latestCards = document.querySelectorAll('.latest-news-card');

    if (latestLinks.length > 0 && latestCards.length > 0) {
        latestLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Toggle active class on links
                latestLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                
                const selectedCategory = link.getAttribute('data-category');
                
                latestCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.style.display = 'flex';
                        // Quick animation trigger
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 20);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Latest News Arrow Navigation
    const latestPrevBtn = document.querySelector('.latest-arrow-btn.prev');
    const latestNextBtn = document.querySelector('.latest-arrow-btn.next');

    if (latestPrevBtn && latestNextBtn && latestLinks.length > 0) {
        const getActiveIndex = () => {
            let activeIdx = 0;
            latestLinks.forEach((link, idx) => {
                if (link.classList.contains('active')) {
                    activeIdx = idx;
                }
            });
            return activeIdx;
        };

        latestNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentActiveIdx = getActiveIndex();
            const nextIdx = (currentActiveIdx + 1) % latestLinks.length;
            latestLinks[nextIdx].click();
            
            // Scroll selected link into view on mobile views
            const headerCenter = document.querySelector('.latest-header-center');
            if (headerCenter && window.innerWidth < 992) {
                const targetLink = latestLinks[nextIdx];
                const menu = document.querySelector('.latest-nav-menu');
                if (menu) {
                    menu.scrollLeft = targetLink.offsetLeft - (menu.clientWidth / 2) + (targetLink.clientWidth / 2);
                }
            }
        });

        latestPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentActiveIdx = getActiveIndex();
            const prevIdx = (currentActiveIdx - 1 + latestLinks.length) % latestLinks.length;
            latestLinks[prevIdx].click();
            
            // Scroll selected link into view on mobile views
            const headerCenter = document.querySelector('.latest-header-center');
            if (headerCenter && window.innerWidth < 992) {
                const targetLink = latestLinks[prevIdx];
                const menu = document.querySelector('.latest-nav-menu');
                if (menu) {
                    menu.scrollLeft = targetLink.offsetLeft - (menu.clientWidth / 2) + (targetLink.clientWidth / 2);
                }
            }
        });
    }

    // Video Gallery Main Slider
    const mainVideoSlider = document.querySelector('.main-video-slider');
    if (mainVideoSlider) {
        const track = mainVideoSlider.querySelector('.main-video-track');
        const slides = mainVideoSlider.querySelectorAll('.main-video-slide');
        let currentSlideIdx = 0;
        let sliderInterval;
        let isVideoPlaying = false;

        const showSlide = (index) => {
            if (isVideoPlaying) return;
            currentSlideIdx = index;
            const translateX = -currentSlideIdx * (100 / slides.length);
            track.style.transform = `translateX(${translateX}%)`;
        };

        const nextSlide = () => {
            if (isVideoPlaying) return;
            const nextIdx = (currentSlideIdx + 1) % slides.length;
            showSlide(nextIdx);
        };

        const startAutoplay = () => {
            stopAutoplay();
            if (!isVideoPlaying) {
                sliderInterval = setInterval(nextSlide, 10000); // 10 seconds interval
            }
        };

        const stopAutoplay = () => {
            if (sliderInterval) {
                clearInterval(sliderInterval);
            }
        };

        // Initialize slider
        startAutoplay();

        // Handle play button clicks
        slides.forEach((slide) => {
            const playBtn = slide.querySelector('.play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    isVideoPlaying = true;
                    stopAutoplay();

                    const videoId = slide.getAttribute('data-video-id');
                    
                    // Create an iframe to embed YouTube video player
                    const iframeContainer = document.createElement('div');
                    iframeContainer.className = 'video-iframe-container';
                    
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                    iframe.setAttribute('allowfullscreen', 'true');
                    
                    iframeContainer.appendChild(iframe);
                    slide.appendChild(iframeContainer);
                    
                    // Hide play button and overlay inside this slide
                    playBtn.style.display = 'none';
                    const leadOverlay = slide.querySelector('.lead-overlay');
                    if (leadOverlay) {
                        leadOverlay.style.display = 'none';
                    }
                });
            }
        });
    }

    // Local News Filtering Widget
    const divisionSelect = document.getElementById('division-select');
    const districtSelect = document.getElementById('district-select');
    const upazilaSelect = document.getElementById('upazila-select');
    const localSearchBtn = document.getElementById('local-news-search-btn');
    const localClearBtn = document.getElementById('local-news-clear-btn');
    const localNewsCards = document.querySelectorAll('.local-news-grid .latest-news-card');
    const localNewsNoResults = document.querySelector('.local-news-no-results');

    const localData = {
        dhaka: {
            name: "ঢাকা",
            districts: {
                dhaka: {
                    name: "ঢাকা",
                    upazilas: ["মিরপুর", "ধানমন্ডি", "গুলশান", "উত্তরা"]
                },
                gazipur: {
                    name: "গাজীপুর",
                    upazilas: ["গাজীপুর সদর", "শ্রীপুর", "কালিয়াকৈর"]
                }
            }
        },
        chattogram: {
            name: "চট্টগ্রাম",
            districts: {
                chattogram: {
                    name: "চট্টগ্রাম",
                    upazilas: ["হাটহাজারী", "পটিয়া", "সন্দ্বীপ", "রাউজান"]
                },
                coxsbazar: {
                    name: "কক্সবাজার",
                    upazilas: ["উখিয়া", "টেকনাফ", "চকোরিয়া"]
                }
            }
        },
        sylhet: {
            name: "সিলেট",
            districts: {
                sylhet: {
                    name: "সিলেট",
                    upazilas: ["জৈন্তাপুর", "বিয়ানীবাজার", "গোলাপগঞ্জ"]
                },
                moulvibazar: {
                    name: "মৌলভীবাজার",
                    upazilas: ["শ্রীমঙ্গল", "কুলাউড়া", "কমলগঞ্জ"]
                }
            }
        },
        rajshahi: {
            name: "রাজশাহী",
            districts: {
                bogura: {
                    name: "বগুড়া",
                    upazilas: ["শেরপুর", "বগুড়া সদর", "শিবগঞ্জ"]
                },
                rajshahi: {
                    name: "রাজশাহী",
                    upazilas: ["বাঘা", "চারঘাট", "পুঠিয়া"]
                }
            }
        }
    };

    if (divisionSelect && districtSelect && upazilaSelect && localSearchBtn) {
        divisionSelect.addEventListener('change', () => {
            const divisionVal = divisionSelect.value;
            districtSelect.innerHTML = '<option value="">জেলা</option>';
            upazilaSelect.innerHTML = '<option value="">উপজেলা</option>';
            upazilaSelect.disabled = true;

            if (divisionVal && localData[divisionVal]) {
                const districts = localData[divisionVal].districts;
                for (const distKey in districts) {
                    const option = document.createElement('option');
                    option.value = distKey;
                    option.textContent = districts[distKey].name;
                    districtSelect.appendChild(option);
                }
                districtSelect.disabled = false;
            } else {
                districtSelect.disabled = true;
            }
        });

        districtSelect.addEventListener('change', () => {
            const divisionVal = divisionSelect.value;
            const districtVal = districtSelect.value;
            upazilaSelect.innerHTML = '<option value="">উপজেলা</option>';

            if (divisionVal && districtVal && localData[divisionVal] && localData[divisionVal].districts[districtVal]) {
                const upazilas = localData[divisionVal].districts[districtVal].upazilas;
                upazilas.forEach(upazilaName => {
                    const option = document.createElement('option');
                    option.value = upazilaName;
                    option.textContent = upazilaName;
                    upazilaSelect.appendChild(option);
                });
                upazilaSelect.disabled = false;
            } else {
                upazilaSelect.disabled = true;
            }
        });

        localSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedDiv = divisionSelect.value;
            const selectedDist = districtSelect.value;
            const selectedUpz = upazilaSelect.value;

            let visibleCount = 0;

            localNewsCards.forEach(card => {
                const cardDiv = card.getAttribute('data-division');
                const cardDist = card.getAttribute('data-district');
                const cardUpz = card.getAttribute('data-upazila');

                let matches = true;

                if (selectedDiv && cardDiv !== selectedDiv) matches = false;
                if (selectedDist && cardDist !== selectedDist) matches = false;
                if (selectedUpz && cardUpz !== selectedUpz) matches = false;

                if (matches) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                if (localNewsNoResults) {
                    localNewsNoResults.style.display = 'block';
                }
            } else {
                if (localNewsNoResults) {
                    localNewsNoResults.style.display = 'none';
                }
            }

            // Show clear button after search is clicked
            if (localClearBtn) {
                localClearBtn.style.display = 'inline-flex';
            }
        });

        if (localClearBtn) {
            localClearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Reset select values
                divisionSelect.value = '';
                districtSelect.innerHTML = '<option value="">জেলা</option>';
                districtSelect.disabled = true;
                upazilaSelect.innerHTML = '<option value="">উপজেলা</option>';
                upazilaSelect.disabled = true;

                // Show all cards
                localNewsCards.forEach(card => {
                    card.style.display = 'flex';
                });

                // Hide empty state
                if (localNewsNoResults) {
                    localNewsNoResults.style.display = 'none';
                }

                // Hide clear button
                localClearBtn.style.display = 'none';
            });
        }
    }

    // ==========================================================================
    // News Details Page Navigation
    // ==========================================================================
    const initNewsDetailsNavigation = () => {
        const cards = document.querySelectorAll('.news-card, .economy-featured-card, .economy-small-card');

        cards.forEach(card => {
            // Change cursor to pointer for clickable cards
            card.style.cursor = 'pointer';

            card.addEventListener('click', (e) => {
                // If they clicked a link that goes somewhere else, let it proceed
                if (e.target.tagName === 'A' && e.target.getAttribute('href') !== '#') {
                    return;
                }
                e.preventDefault();

                // Get headline
                let headline = card.getAttribute('data-headline');
                if (!headline) {
                    const headlineEl = card.querySelector('.card-title, .economy-featured-title, .economy-small-title');
                    headline = headlineEl ? headlineEl.textContent.trim() : 'নিউজ হেডলাইন';
                }

                // Get image
                let imgUrl = card.getAttribute('data-image');
                if (!imgUrl) {
                    const imgEl = card.querySelector('img');
                    imgUrl = imgEl ? imgEl.getAttribute('src') : '';
                }

                // Get category
                let category = card.getAttribute('data-category');
                if (!category) {
                    const catEl = card.querySelector('.category-badge');
                    category = catEl ? catEl.textContent.trim() : 'অর্থনীতি';
                }

                // Get publisher
                let publisher = card.getAttribute('data-publisher') || 'নিজস্ব প্রতিবেদক';

                // Get publish date
                let publishDate = card.getAttribute('data-publish-date') || '১১:১৪, মঙ্গলবার, ০২ জুন, ২০২৬';
                let updateDate = card.getAttribute('data-update-date') || '১১:১৮, মঙ্গলবার, ০২ জুন, ২০২৬';

                // Get tags
                let tags = card.getAttribute('data-tags') || 'অর্থনীতি, বাংলাদেশ, বাণিজ্য, প্রবৃদ্ধি';

                // Redirect to news-details.html with parameters
                const params = new URLSearchParams({
                    headline,
                    image: imgUrl,
                    category,
                    publisher,
                    publishDate,
                    updateDate,
                    tags
                });
                
                window.location.href = `news-details.html?${params.toString()}`;
            });
        });
    };

    // Auto Image Slider for Hero Featured Card (changes image every 10 seconds with smooth slide transition)
    const initHeroImageSlider = () => {
        const container = document.querySelector('.hero-featured-img-container');
        if (!container) return;
        const track = container.querySelector('.hero-featured-img-track');
        const slides = container.querySelectorAll('.hero-slide');
        if (slides.length <= 1 || !track) return;

        let currentIndex = 0;
        const intervalTime = 10000; // 10 seconds

        const showSlide = (index) => {
            currentIndex = index;
            // Shift the track left/right
            const translateX = -currentIndex * (100 / slides.length);
            track.style.transform = `translateX(${translateX}%)`;

            // Keep track of active class
            slides.forEach((slide, i) => {
                if (i === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        };

        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        };

        // Initialize individual slider
        showSlide(currentIndex);

        setInterval(nextSlide, intervalTime);
    };

    // Initialize Mobile Navigation Drawer dynamically
    const initMobileDrawer = () => {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (!mobileToggle) return;

        // Create Drawer and Overlay elements if they don't exist already
        if (document.getElementById('nav-drawer')) return;

        const drawer = document.createElement('div');
        drawer.className = 'nav-drawer';
        drawer.id = 'nav-drawer';

        const overlay = document.createElement('div');
        overlay.className = 'drawer-overlay';
        overlay.id = 'drawer-overlay';

        // Get Logo, Nav Links, and Social Links
        const desktopLogo = document.querySelector('.navbar-left .logo');
        const logoHtml = desktopLogo ? desktopLogo.outerHTML : '';
        
        const desktopLinks = document.querySelector('.navbar-left .nav-links');
        let linksHtml = '';
        if (desktopLinks) {
            const clonedLinks = desktopLinks.cloneNode(true);
            clonedLinks.className = 'drawer-links';
            
            // Clean inline styles and make sure it has drawer menu item class structure
            clonedLinks.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.removeAttribute('style'); // Clear inline styles
            });
            linksHtml = clonedLinks.outerHTML;
        }

        const desktopSocial = document.querySelector('.navbar-right .nav-social-links');
        let socialHtml = '';
        if (desktopSocial) {
            const clonedSocial = desktopSocial.cloneNode(true);
            clonedSocial.className = 'drawer-social-links';
            socialHtml = clonedSocial.outerHTML;
        }

        drawer.innerHTML = `
            <div class="drawer-header">
                ${logoHtml}
                <button class="drawer-close" id="drawer-close-btn" aria-label="Close Menu">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="drawer-body">
                ${linksHtml}
                <div class="drawer-divider"></div>
                <div class="drawer-social-box">
                    <span class="drawer-social-title">আমাদের সাথে যুক্ত থাকুন</span>
                    ${socialHtml}
                </div>
            </div>
        `;

        document.body.appendChild(drawer);
        document.body.appendChild(overlay);

        const closeBtn = document.getElementById('drawer-close-btn');

        const openDrawer = () => {
            drawer.classList.add('open');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Lock page scroll
        };

        const closeDrawer = () => {
            drawer.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = ''; // Release page scroll
        };

        mobileToggle.addEventListener('click', openDrawer);
        closeBtn.addEventListener('click', closeDrawer);
        overlay.addEventListener('click', closeDrawer);

        // Handle Dropdowns in Drawer (Accordion Style)
        const drawerDropdowns = drawer.querySelectorAll('.drawer-links .dropdown');
        drawerDropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (trigger && menu) {
                // Toggle sub-menu height dynamically on click
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all other dropdowns in the drawer for accordion effect
                    drawerDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.style.maxHeight = '0';
                            }
                        }
                    });

                    if (isActive) {
                        dropdown.classList.remove('active');
                        menu.style.maxHeight = '0';
                    } else {
                        dropdown.classList.add('active');
                        menu.style.maxHeight = menu.scrollHeight + 'px';
                    }
                });
            }
        });
    };

    // Banner Auto Slider (slides every 10 seconds right to left)
    const initBannerSlider = () => {
        const bannerTrack = document.querySelector('.wc-banner-slider-track');
        if (!bannerTrack) return;
        let currentIdx = 0;
        setInterval(() => {
            currentIdx = (currentIdx + 1) % 2;
            bannerTrack.style.transform = `translateX(-${currentIdx * 50}%)`;
        }, 10000);
    };

    initHeroImageSlider();
    initNewsDetailsNavigation();
    initMobileDrawer();
    initBannerSlider();
});

