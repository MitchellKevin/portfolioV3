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

const toggle = document.getElementById('light-dark-mode-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggle.textContent = 'Light Mode';
    } else {
        toggle.textContent = 'Dark Mode';
    }
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}
);

window.addEventListener('scroll', () => {
  const timeline = document.querySelector('.timeline-container');
  const dot = document.getElementById('timeline-dot');
  const fill = document.querySelector('.timeline-fill');
  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const timelineHeight = timeline.offsetHeight;

  let progress = (windowHeight / 2 - rect.top) / timelineHeight;
  progress = Math.max(0, Math.min(1, progress));

  dot.style.top = `${progress * 130}%`;
  fill.style.height = `${progress * 130}%`;
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
});