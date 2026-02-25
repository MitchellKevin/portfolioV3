const featureSection = document.getElementById('Features');
const featureCards = document.querySelectorAll('.feature_card');
if (featureSection && featureCards.length) {
    const featureObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    featureCards.forEach(card => card.classList.add('animate'));
                } else {
                    featureCards.forEach(card => card.classList.remove('animate'));
                }
            });
        },
        { threshold: 0.5 }
    );
    featureObserver.observe(featureSection);
}

// const floatImages = [
//     'img/tools/VMB.png',
//     'img/tools/Burp_Suite.png',
//     'img/tools/Sony_alpha.png',
//     'img/tools/VSC.png',
//     'img/tools/nmap.png',
//     'img/tools/Metasploit.png',
//     'img/tools/git.png',
//     'img/tools/DaVinci_Resolve_Studio.png',
//     'img/tools/Lightroom.png',
//     'img/tools/Linux.png',
//     'img/tools/Xcode.png',
//     'img/tools/Android_Studio.png',
//     'img/tools/Photoshop.png',
//     'img/tools/Kali_Linux.png',
//     'img/tools/Figma.png',
//     'img/tools/IntelliJ.png'
// ];

// function showRandomImages() {
//     const container = document.getElementById('project-float-images');
//     container.innerHTML = '';
//     for (let i = 0; i < 5; i++) { // Show 5 images
//         const img = document.createElement('img');
//         img.src = floatImages[Math.floor(Math.random() * floatImages.length)];
//         img.className = 'project-float-img';
//         img.style.top = Math.random() * 80 + 10 + 'vh';
//         img.style.left = Math.random() * 80 + 10 + 'vw';
//         container.appendChild(img);
//     }
// }

// function hideRandomImages() {
//     document.getElementById('project-float-images').innerHTML = '';
// }

// document.querySelectorAll('.project_item a').forEach(link => {
//     link.addEventListener('mouseenter', showRandomImages);
//     link.addEventListener('mouseleave', hideRandomImages);
// });

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.cert-slide');
  const left = document.querySelector('.cert-arrow-left');
  const right = document.querySelector('.cert-arrow-right');
  const dotsContainer = document.querySelector('.cert-dots');
  let current = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'cert-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.cert-dot');

  function showSlide(idx) {
    slides.forEach(slide => slide.className = 'cert-slide');
    dots.forEach(dot => dot.className = 'cert-dot');

    current = (idx + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // Previous slide
    const prev = (current - 1 + slides.length) % slides.length;
    slides[prev].classList.add('prev');

    // Next slide
    const next = (current + 1) % slides.length;
    slides[next].classList.add('next');
  }

  left.addEventListener('click', () => showSlide(current - 1));
  right.addEventListener('click', () => showSlide(current + 1));

  // Show the first slide initially
  showSlide(0);

  // Dark mode toggle image swap
  const toggle = document.getElementById('light-dark-mode-toggle');
  const body = document.body;
  let darkMode = body.classList.contains('dark-mode');

  function updateToggleImg() {
    toggle.src = darkMode ? 'img/DtoW.png' : 'img/WtoD.png';
    toggle.alt = darkMode ? 'Switch to light mode' : 'Switch to dark mode';
  }

  if (toggle) {
    toggle.addEventListener('click', function() {
      darkMode = !darkMode;
      body.classList.toggle('dark-mode', darkMode);
      updateToggleImg();
    });
    updateToggleImg();
  }
});

const certs = [
  {
    img: "Certificates/Cybersecurity_101.png",
    title: "Cyber Security 101",
    org: "TryHackMe"
  },
  {
    img: "Certificates/Web_Fundamentals.png",
    title: "Web Fundamentals",
    org: "TryHackMe"
  },
  {
    img: "Certificates/Jr_Penetration_Tester.png",
    title: "Jr Penetration Tester",
    org: "TryHackMe"
  },
  {
    img: "Certificates/amazon_Junior_software_developer.png",
    title: "Professional Certification in Junior Software Developer",
    org: "Amazon"
  },
  {
    img: "Certificates/ethicalHacking.png",
    title: "Ethical Hacking with Open Source Tools Specialization",
    org: "IBM"
  },
    {
    img: "Certificates/londen_fullstack.png",
    title: "Full-Stack Web Development",
    org: "University of Londen"
  },
  {
    img: "Foundational_Csharp.png",
    title: "Foundational C#",
    org: "Microsoft"
  }
];

let i = 0;

function renderCarousel() {
  const left = document.getElementById('cert-left');
  const center = document.getElementById('cert-center');
  const right = document.getElementById('cert-right');

  // Helper for circular indexing
  const mod = (n, m) => ((n % m) + m) % m;

  // Fill placeholders
  [left, center, right].forEach(el => el.innerHTML = '');

  // Left
  const leftIdx = mod(i - 1, certs.length);
  left.innerHTML = `
    <img src="${certs[leftIdx].img}" alt="${certs[leftIdx].title}">
    <div class="cert-info">
      <h4>${certs[leftIdx].title}</h4>
      <span>${certs[leftIdx].org}</span>
    </div>
  `;

  // Center
  center.innerHTML = `
    <img src="${certs[i].img}" alt="${certs[i].title}">
    <div class="cert-info">
      <h4>${certs[i].title}</h4>
      <span>${certs[i].org}</span>
    </div>
  `;

  // Right
  const rightIdx = mod(i + 1, certs.length);
  right.innerHTML = `
    <img src="${certs[rightIdx].img}" alt="${certs[rightIdx].title}">
    <div class="cert-info">
      <h4>${certs[rightIdx].title}</h4>
      <span>${certs[rightIdx].org}</span>
    </div>
  `;

  // Dots
  const dotsContainer = document.querySelector('.cert-dots');
  dotsContainer.innerHTML = '';
  certs.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'cert-dot' + (idx === i ? ' active' : '');
    dot.onclick = () => { i = idx; renderCarousel(); };
    dotsContainer.appendChild(dot);
  });
}

document.querySelector('.cert-arrow-left').onclick = () => {
  i = (i - 1 + certs.length) % certs.length;
  renderCarousel();
};
document.querySelector('.cert-arrow-right').onclick = () => {
  i = (i + 1) % certs.length;
  renderCarousel();
};

renderCarousel();


// Example only; adjust selectors as needed
window.addEventListener('scroll', () => {
  const timeline = document.querySelector('.timeline-container');
  const fill = document.querySelector('.timeline-fill');
  const dot = document.querySelector('.timeline-dot');
  if (!timeline || !fill || !dot) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollPercent = Math.min(1, Math.max(0, (windowHeight - rect.top) / (rect.height)-1));
  fill.style.height = `${scrollPercent * 150}%`;
  dot.style.top = `${scrollPercent * 150}%`;
});

document.addEventListener('DOMContentLoaded', function() {
  const heroImg = document.querySelector('.hero-img img');
  const heroImgContainer = document.querySelector('.hero-img');

  function parallax(e) {
    const rect = heroImgContainer.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width - 0.5;
    const y = ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) / rect.height - 0.5;
    const rotateX = y * 20;
    const rotateY = x * 20;
    heroImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
  }

  function resetParallax() {
    heroImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  }

  if (heroImg && heroImgContainer) {
    heroImgContainer.addEventListener('mousemove', parallax);
    heroImgContainer.addEventListener('mouseleave', resetParallax);
    heroImgContainer.addEventListener('touchmove', parallax);
    heroImgContainer.addEventListener('touchend', resetParallax);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // --- Project image preview on hover ---
  const projects = [
    {
      id: "project1",
      img: "project-images/nao.png"
    },
    {
      id: "project2",
      img: "project-images/mario.png"
    },
    {
      id: "project3",
      img: "project-images/daytoday.png"
    },
    {
      id: "project4",
      img: "project-images/McLaren.png"
    },
    {
      id: "project5",
      img: "project-images/GardenCMD.png"
    },
    {
      id: "project6",
      img: "project-images/UnderConstruction.png"
    }
    // Add more as needed
  ];

  // Create preview element
  const preview = document.createElement('img');
  preview.style.position = 'fixed';
  preview.style.top = '20%';
  preview.style.left = '60%';
  preview.style.maxWidth = '320px';
  preview.style.maxHeight = '320px';
  preview.style.borderRadius = '1em';
  preview.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
  preview.style.zIndex = '1000';
  preview.style.pointerEvents = 'none';
  preview.style.display = 'none';
  document.body.appendChild(preview);

  projects.forEach(project => {
    const titleEl = document.getElementById(project.id);
    if (titleEl) {
      titleEl.addEventListener('mouseenter', () => {
        preview.src = project.img;
        preview.style.display = 'block';
      });
      titleEl.addEventListener('mousemove', (e) => {
        preview.style.top = (e.clientY + 20) + 'px';
        preview.style.left = (e.clientX + 30) + 'px';
      });
      titleEl.addEventListener('mouseleave', () => {
        preview.style.display = 'none';
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  const notification = document.getElementById('notification');
  if (!form || !notification) return;

  form.addEventListener('submit', function(e) {
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(field => {
      if (field.hasAttribute('required') && !field.value.trim()) {
        valid = false;
        field.classList.add('input-error');
        field.classList.remove('input-success');
      } else {
        field.classList.remove('input-error');
        field.classList.add('input-success');
      }
    });
    if (!valid) {
      e.preventDefault();
      return;
    }

    // Show notification with confetti
    notification.textContent = "Form sent successfully!";
    notification.style.display = "block";
    notification.style.position = "fixed";
    notification.style.top = "2em";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.background = "#22c55e";
    notification.style.color = "#fff";
    notification.style.padding = "1em 2em";
    notification.style.borderRadius = "1em";
    notification.style.fontWeight = "bold";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)";
    showConfetti();

    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  });

  // Confetti animation
  function showConfetti() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let i = 0; i < 80; i++) { // More confetti for full screen
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * width + 'px';
      confetti.style.top = '-40px';
      confetti.style.width = '12px';
      confetti.style.height = '12px';
      confetti.style.background = `hsl(${Math.random()*360},80%,60%)`;
      confetti.style.borderRadius = '50%';
      confetti.style.zIndex = '10000';
      confetti.style.pointerEvents = 'none';
      confetti.style.opacity = '0.85';
      confetti.style.boxShadow = `0 2px 8px rgba(0,0,0,0.10)`;
      document.body.appendChild(confetti);

      // Animate confetti to fall and scatter
      const x = (Math.random() - 0.5) * width * 0.7;
      const y = height + 80 + Math.random() * 200;
      const rotate = Math.random() * 720;
      confetti.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 0.85 },
        { transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg)`, opacity: 0 }
      ], {
        duration: 1800 + Math.random() * 1200,
        easing: 'cubic-bezier(.22,1,.36,1)'
      });

      setTimeout(() => confetti.remove(), 2500);
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const hardBtn = document.getElementById('hard-skills-btn');
  const softBtn = document.getElementById('soft-skills-btn');
  const hardSkills = document.getElementById('hard-skills');
  const softSkills = document.getElementById('soft-skills');

  if (hardBtn && softBtn && hardSkills && softSkills) {
    hardBtn.addEventListener('click', function() {
      hardBtn.classList.add('active');
      softBtn.classList.remove('active');
      hardSkills.style.display = 'grid';
      softSkills.style.display = 'none';
    });
    softBtn.addEventListener('click', function() {
      softBtn.classList.add('active');
      hardBtn.classList.remove('active');
      softSkills.style.display = 'grid';
      hardSkills.style.display = 'none';
    });
  }
});