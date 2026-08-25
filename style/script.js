/* 
   SK Safety Nets - JavaScript Logic
   WhatsApp Integration, Gallery Modal & Interactive Navigation
*/

document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_PHONE = '917717702142';

    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Keep every internal link aligned with the fixed header.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', link.getAttribute('href'));

            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // 2. Dynamic WhatsApp Service Quote Trigger
    window.openServiceQuote = function (serviceName) {
        const cleanServiceName = String(serviceName).trim();
        const message = `Hello SK Safety Nets,\nI am interested in ${cleanServiceName}.\nPlease share the price and installation details.`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
        window.open(waUrl, '_blank');
    };

    // 3. Contact Form WhatsApp Submission
    const contactForm = document.getElementById('whatsappEnquiryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('custName').value.trim();
            const phone = document.getElementById('custPhone').value.trim();
            const service = document.getElementById('custService').value;
            const message = document.getElementById('custMessage').value.trim();

            if (!name || !phone || !service) {
                alert('Please fill out all required fields.');
                return;
            }

            let waMessage = `Hello SK Safety Nets,\n`;
            waMessage += `New Website Enquiry:\n`;
            waMessage += `- Name: ${name}\n`;
            waMessage += `- Phone: ${phone}\n`;
            waMessage += `- Service Required: ${service}\n`;

            if (message) {
                waMessage += `- Details: ${message}\n`;
            }

            waMessage += `Please contact me with price quote & installation schedule.`;

            const encodedMessage = encodeURIComponent(waMessage);
            const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
            window.open(waUrl, '_blank');

            contactForm.reset();
        });
    }

    // 4. Image Lightbox Modal for Our Work / Gallery
    const modalLightbox = document.getElementById('modalLightbox');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    if (modalLightbox && modalImg && modalClose) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-title')?.innerText || '';
                if (img) {
                    modalImg.src = img.src;
                    modalCaption.innerText = title;
                    modalLightbox.classList.add('active');
                }
            });
        });

        modalClose.addEventListener('click', () => {
            modalLightbox.classList.remove('active');
        });

        modalLightbox.addEventListener('click', (e) => {
            if (e.target === modalLightbox) {
                modalLightbox.classList.remove('active');
            }
        });
    }

    // 5. Gallery Horizontal Scroll & Auto-Play Controls
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryPrevBtn = document.getElementById('galleryPrevBtn');
    const galleryNextBtn = document.getElementById('galleryNextBtn');

    if (gallerySlider) {
        const scrollAmount = 370;

        if (galleryNextBtn) {
            galleryNextBtn.addEventListener('click', () => {
                gallerySlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        if (galleryPrevBtn) {
            galleryPrevBtn.addEventListener('click', () => {
                gallerySlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        // Auto Scroll Ticker
        let autoScrollInterval = setInterval(() => {
            if (gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth - 10) {
                gallerySlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                gallerySlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3500);

        // Pause auto-scroll on hover
        gallerySlider.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        gallerySlider.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                if (gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth - 10) {
                    gallerySlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    gallerySlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3500);
        });
    }

    // Periodic enquiry popup for visitors who need a quick quote.
    const enquiryPopup = document.createElement('aside');
    enquiryPopup.className = 'enquiry-popup';
    enquiryPopup.setAttribute('aria-live', 'polite');
    enquiryPopup.innerHTML = `
        <button class="enquiry-popup-close" type="button" aria-label="Close enquiry popup">&times;</button>
        <div class="enquiry-popup-icon"><i class="fa-solid fa-comments"></i></div>
        <div class="enquiry-popup-content">
            <strong>Need a Safety Net Quote?</strong>
            <span>Share your requirement with our team today.</span>
            <div class="enquiry-popup-actions">
                <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hello%20SK%20Safety%20Nets%2C%20I%20need%20a%20quote."
                    target="_blank" class="btn btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                <a href="tel:7717702142" class="btn btn-primary"><i class="fa-solid fa-phone"></i> Call</a>
            </div>
        </div>`;
    document.body.appendChild(enquiryPopup);

    const showEnquiryPopup = () => enquiryPopup.classList.add('active');
    const closeEnquiryPopup = () => enquiryPopup.classList.remove('active');
    enquiryPopup.querySelector('.enquiry-popup-close').addEventListener('click', closeEnquiryPopup);

    window.setTimeout(showEnquiryPopup, 12000);
    window.setInterval(showEnquiryPopup, 35000);

    // 6. Active Nav Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});