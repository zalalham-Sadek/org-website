// slider functionality
(() => {
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `انتقال إلى الشريحة ${i + 1}`);
        dot.setAttribute('role', 'tab');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('button');
    dots[0].classList.add('active');

    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Swipe support
    let startX = 0;
    let isSwiping = false;

    slidesContainer.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });

    slidesContainer.addEventListener('touchmove', e => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (diff > 50) { // swipe left
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
            isSwiping = false;
        } else if (diff < -50) { // swipe right
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
            isSwiping = false;
        }
    });

    slidesContainer.addEventListener('touchend', () => {
        isSwiping = false;
    });

    // Optional: Auto-slide every 5s
    let autoSlideInterval = setInterval(() => {
        console.log('Auto sliding to next slide');
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);

    // Pause auto-slide on hover/touchstart
    document.querySelector('.slider').addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    document.querySelector('.slider').addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
})();



////toggle menu function
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}


// Sticky Navbar
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.classList.add("navbar-fixed");
    } else {
        navbar.classList.remove("navbar-fixed");
    }

    lastScrollY = window.scrollY;
});


// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle'); // تأكد من وجود زر بهذا المعرف في HTML
const htmlElement = document.documentElement;

function updateToggleIcon() {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        themeToggleBtn.innerHTML = '<i class="fa-regular fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
    }
}

themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateToggleIcon();
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    }
    updateToggleIcon();
});


  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-left, .animate-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.2
    });

    animatedElements.forEach(el => observer.observe(el));
  });






  function startCounters() {
    const counters = document.querySelectorAll('.counter-item h2');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 100; // Adjust for smoothness

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + '+';
        }
      };

      updateCount();
    });
  }

  // Run counters only when section is in viewport
  let started = false;
  window.addEventListener('scroll', () => {
    const counterSection = document.querySelector('.counter');
    const rect = counterSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !started) {
      startCounters();
      started = true;
    }
  });


  
       
// ===== 6) سلايدر الشركاء المتحرك تلقائياً =====
const partnersSlider = document.getElementById('partnersSlider');

if (partnersSlider) {
  let scrollAmount = 0;
  const speed = 0.5;



  function animatePartners() {
    scrollAmount += speed;
    if (scrollAmount >= partnersSlider.scrollWidth / 2) {
      scrollAmount = 0;
    }
    partnersSlider.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(animatePartners);
  }

  animatePartners();
}


