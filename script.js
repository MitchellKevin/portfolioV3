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

const floatImages = [
    'img/tools/VMB.png',
    'img/tools/Burp_Suite.png',
    'img/tools/Sony_alpha.png',
    'img/tools/VSC.png',
    'img/tools/nmap.png',
    'img/tools/Metasploit.png',
    'img/tools/git.png',
    'img/tools/DaVinci_Resolve_Studio.png',
    'img/tools/Lightroom.png',
    'img/tools/Linux.png',
    'img/tools/Xcode.png',
    'img/tools/Android_Studio.png',
    'img/tools/Photoshop.png',
    'img/tools/Kali_Linux.png',
    'img/tools/Figma.png',
    'img/tools/IntelliJ.png'
];

function showRandomImages() {
    const container = document.getElementById('project-float-images');
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) { // Show 5 images
        const img = document.createElement('img');
        img.src = floatImages[Math.floor(Math.random() * floatImages.length)];
        img.className = 'project-float-img';
        img.style.top = Math.random() * 80 + 10 + 'vh';
        img.style.left = Math.random() * 80 + 10 + 'vw';
        container.appendChild(img);
    }
}

function hideRandomImages() {
    document.getElementById('project-float-images').innerHTML = '';
}

document.querySelectorAll('.project_item a').forEach(link => {
    link.addEventListener('mouseenter', showRandomImages);
    link.addEventListener('mouseleave', hideRandomImages);
});

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