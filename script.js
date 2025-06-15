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