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


 const projects = [
    {
      title: "مشروع تمكين المرأة",
      description: "يهدف هذا المشروع إلى تعزيز دور المرأة في المجتمع من خلال توفير التدريب والموارد اللازمة.",
      image: "images/female1.jpg",
      category: "female"
    },
    {
      title: "مشروع تمكين المرأة",
      description: "يسعى هذا المشروع إلى تمكين المرأة من خلال توفير التدريب والموارد اللازمة لتحقيق الاستقلال المالي.",
      image: "images/female-2.png",
      category: "female"
    },
    {
      title: "مشروع التعليم ",
      description: "يركز هذا المشروع على تحسين جودة التعليم في المناطق الريفية من خلال توفير الموارد التعليمية والتدريب للمعلمين.",
      image: "images/edu-1.png",
      category: "education"
    },
    {
      title: "مشروع البيئة والمناخ",
      description: "يركز هذا المشروع على تعزيز الوعي البيئي ومكافحة التغير المناخي عبر مبادرات مستدامة.",
      image: "images/env-1.jpg",
      category: "environment"
    },
    {
      title: "مبادرة مدارس خضراء",
      description: "تهدف هذه المبادرة إلى تشجيع المدارس على استخدام مصادر الطاقة المتجددة والحفاظ على البيئة.",
      image: "images/env-2.jpg",
      category: "environment"
    },
    {
      title: " مشروع تمكين المرأة",
        description: "يهدف هذا المشروع إلى تعزيز دور المرأة في المجتمع من خلال توفير التدريب والموارد اللازمة.",
      image: "images/female-3.jpg",
      category: "female"
    },
    {
      title: "مبادرة مدارس خضراء",
      description: "تهدف هذه المبادرة إلى تشجيع المدارس على استخدام مصادر الطاقة المتجددة والحفاظ على البيئة.",
      image: "images/env-3.jpg",
      category: "environment"
    },
    {
        title: "مشروع مهارات رقمية",
        description: "تهدف هذه المبادرة إلى تشجيع المدارس على استخدام مصادر الطاقة المتجددة والحفاظ على البيئة.",
        image: "images/edu-3.jpg",
        category: "education"
    },
    {
        title:"مشروع دعم المعلمين",
        description: "يهدف هذا المشروع إلى توفير دورات تدريبية للمعلمين في مجالات التكنولوجيا الحديثة.",
        image: "images/edu-4.jpg",   
        category: "education"
    },
    {
      title: "حملة توعية مناخية",
      description: "تهدف هذه المبادرة إلى تشجيع المدارس على استخدام مصادر الطاقة المتجددة والحفاظ على البيئة.",
      image: "images/env-4.jpg",
      category: "environment"
    },
    {
        title: "مشروع رائدات الأعمال",
        description: "يهدف هذا المشروع إلى دعم النساء في تأسيس وإدارة مشاريعهن الصغيرة.",
        image: "images/female-3.jpg",
        category: "female"
    },
    {
        title: "مشروع تعليم البرمجة للأطفال",
        description: "يهدف هذا المشروع إلى تعليم الأطفال أساسيات البرمجة وتطوير مهاراتهم الرقمية.",
        image: "images/edu-6.jpg",
    }
  ];

  const cardsContainer = document.getElementById('cardsContainer');
  const paginationContainer = document.getElementById('paginationContainer');
  const projectFilter = document.getElementById('project-type');

  const perPage = 8;
  let currentPage = 1;
  let filteredProjects = [...projects];

  function renderCards() {
    cardsContainer.innerHTML = '';
    const start = (currentPage - 1) * perPage;
    const paginatedItems = filteredProjects.slice(start, start + perPage);

    paginatedItems.forEach(project => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" width="300">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      cardsContainer.appendChild(card);
    });

    renderPagination();
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredProjects.length / perPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentPage = i;
        renderCards();
      });
      paginationContainer.appendChild(btn);
    }
  }

  function applyFilter() {
    const selected = projectFilter.value;
    currentPage = 1;
    filteredProjects = selected === 'all' ? [...projects] : projects.filter(p => p.category === selected);
    renderCards();
  }

  // Initial render
  projectFilter.addEventListener('change', applyFilter);
  renderCards();




   document.addEventListener('DOMContentLoaded', function () {
            // Initialize the map
            const map = L.map('map').setView([13.5832, 44.0165], 13); // Replace with your coordinates

            // Add the tile layer (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; مؤسسة قدرات'
            }).addTo(map);

            // Add a marker
            L.marker([13.5832, 44.0165])  // Replace with your location
                .addTo(map)
                .bindPopup('موقع المشروع')
                .openPopup();
        });
  
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const form = e.target;
            const name = form.name;
            const email = form.email;
            const message = form.message;
            let valid = true;

            // Reset previous errors
            form.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Name validation
            if (!name.value.trim()) {
                name.nextElementSibling.textContent = 'الرجاء إدخال الاسم الكامل.';
                valid = false;
            }
            else if (!isNaN(name.value)) {
                name.nextElementSibling.textContent = 'الاسم لا يجب أن يكون رقمًا فقط.';
                valid = false;
            }


            // Email validation
            if (!email.value.trim()) {
                email.nextElementSibling.textContent = 'الرجاء إدخال البريد الإلكتروني.';
                valid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                email.nextElementSibling.textContent = 'صيغة البريد الإلكتروني غير صحيحة.';
                valid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                message.nextElementSibling.textContent = 'الرجاء كتابة الرسالة.';
                valid = false;
            }

            // Show success notification
            if (valid) {
                document.getElementById('successNotification').style.display = 'block';
                showSuccessMessage('✅ تم إرسال النموذج بنجاح!');
                // Optional: reset form
                form.reset();

                // Hide after 5 seconds
                // setTimeout(() => {
                //   document.getElementById('successNotification').style.display = 'none';
                // }, 5000);
            }
        });

        function showSuccessMessage(message) {
            const notification = document.getElementById('success-notification');
            notification.textContent = message;
            notification.classList.remove('hidden');
            notification.classList.add('show');

            setTimeout(() => {
                // notification.classList.remove('show');   // start hiding animation
                setTimeout(() => {
                    notification.classList.add('hidden');  // hide completely
                }, 4000);
            }, 5000);
        }
