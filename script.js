/* =============================================
   TEXT SCRAMBLE HELPER
   ============================================= */
function scrambleText(el, finalText, delay) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234&@#!';
    setTimeout(() => {
        let iter = 0;
        const total = finalText.length * 2.5;
        const id = setInterval(() => {
            el.textContent = finalText.split('').map((c, i) => {
                if (c === ' ') return ' ';
                if (i < iter / 2.5) return c;
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            if (iter++ >= total) { el.textContent = finalText; clearInterval(id); }
        }, 30);
    }, delay || 0);
}

/* =============================================
   PAGE LOADER + HERO REVEAL
   ============================================= */
(function initLoader() {
    const loader = document.getElementById('page-loader');
    const count  = document.getElementById('loader-count');

    function revealHero(delay) {
        document.querySelectorAll('.hero-line-inner').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), delay + i * 140);
        });
        const badge  = document.querySelector('.hero-badge');
        const para   = document.querySelector('.hero-text > p');
        const pills  = document.querySelector('.hero-stack-pills');
        const btns   = document.querySelector('.hero-buttons');
        const heroImg = document.querySelector('.hero-img');
        [badge, para, pills, btns, heroImg].forEach((el, i) => {
            if (!el) return;
            setTimeout(() => {
                el.classList.add('is-visible');
                if (el === badge) scrambleText(el, 'Available for Internship', 80);
            }, delay + i * 120);
        });
    }

    if (!loader || !count) { revealHero(200); return; }

    const duration = 1500;
    const start = performance.now();

    (function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2.5);
        count.textContent = Math.floor(eased * 100);
        if (progress < 1) { requestAnimationFrame(tick); return; }
        count.textContent = 100;
        setTimeout(() => {
            loader.classList.add('done');
            loader.addEventListener('transitionend', () => { loader.style.display = 'none'; }, { once: true });
            revealHero(400);
        }, 150);
    })(performance.now());
})();

/* =============================================
   MAGNETIC BUTTONS
   ============================================= */
(function initMagneticBtns() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('#contact-button, #projects-button').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) * 0.32;
            const dy = (e.clientY - (r.top  + r.height / 2)) * 0.32;
            btn.style.transition = 'transform 0.1s ease, box-shadow 0.2s';
            btn.style.transform  = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s';
            btn.style.transform  = 'translate(0, 0)';
        });
    });
})();

/* =============================================
   CUSTOM ANIMATED CURSOR
   ============================================= */
(function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.id  = 'cursor-dot';
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
    });
    (function loop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(loop);
    })();
    document.addEventListener('mousedown', () => ring.classList.add('pressed'));
    document.addEventListener('mouseup',   () => ring.classList.remove('pressed'));
    document.querySelectorAll('a, button, .project_item, .feature_card, .cert-arrow, #light-dark-mode-toggle').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
})();

/* =============================================
   SCROLL REVEAL
   ============================================= */
(function initScrollReveal() {
    const targets = document.querySelectorAll(
        '#tools, #Features, #language, #skill-graph, #projects, #Timeline, #Licenses, #contact, .project_item'
    );
    targets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.07 + 's';
    });
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.08 });
    targets.forEach(el => obs.observe(el));
})();

/* =============================================
   STICKY HEADER ON SCROLL
   ============================================= */
(function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
})();

/* =============================================
   ACTIVE NAV ON SCROLL (IntersectionObserver)
   ============================================= */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    document.querySelectorAll('#hero, #Features, #projects, #Timeline, #Licenses, #contact').forEach(sec => {
        if (sec) obs.observe(sec);
    });
})();

/* =============================================
   MOBILE MENU
   ============================================= */
(function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    if (!btn || !nav || !overlay) return;

    function openMenu() {
        nav.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        nav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();

/* =============================================
   DARK MODE TOGGLE
   ============================================= */
(function initDarkMode() {
    const toggle = document.getElementById('light-dark-mode-toggle');
    const body = document.body;
    let darkMode = localStorage.getItem('darkMode') === 'true';

    function applyMode() {
        body.classList.toggle('dark-mode', darkMode);
        if (toggle) {
            toggle.src = darkMode ? 'img/DtoW.png' : 'img/WtoD.png';
            toggle.alt = darkMode ? 'Switch to light mode' : 'Switch to dark mode';
        }
    }

    applyMode();

    if (toggle) {
        toggle.addEventListener('click', () => {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            applyMode();
        });
    }
})();

/* Register GSAP plugins once */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* =============================================
   FEATURE CARDS ANIMATION (GSAP)
   ============================================= */
(function initFeatureCards() {
    if (typeof gsap === 'undefined') return;
    const grids = ['#hard-skills', '#soft-skills'];
    grids.forEach(selector => {
        const grid = document.querySelector(selector);
        if (!grid) return;
        const cards = grid.querySelectorAll('.feature_card');
        gsap.set(cards, { opacity: 0, y: 28 });
        ScrollTrigger.create({
            trigger: grid,
            start: 'top 82%',
            onEnter:      () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1 }),
            onEnterBack:  () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1 }),
            onLeave:      () => gsap.set(cards, { opacity: 0, y: 28 }),
            onLeaveBack:  () => gsap.set(cards, { opacity: 0, y: 28 }),
        });
    });
})();

/* =============================================
   SKILLS TOGGLE
   ============================================= */
(function initSkillsToggle() {
    const hardBtn  = document.getElementById('hard-skills-btn');
    const softBtn  = document.getElementById('soft-skills-btn');
    const hardGrid = document.getElementById('hard-skills');
    const softGrid = document.getElementById('soft-skills');
    if (!hardBtn || !softBtn || !hardGrid || !softGrid) return;

    function revealCards(grid) {
        const cards = grid.querySelectorAll('.feature_card');
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(cards,
                { opacity: 0, y: 22 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 }
            );
        }
    }

    hardBtn.addEventListener('click', () => {
        hardBtn.classList.add('active');
        softBtn.classList.remove('active');
        hardGrid.style.display = 'grid';
        softGrid.style.display = 'none';
        revealCards(hardGrid);
    });

    softBtn.addEventListener('click', () => {
        softBtn.classList.add('active');
        hardBtn.classList.remove('active');
        softGrid.style.display = 'grid';
        hardGrid.style.display = 'none';
        revealCards(softGrid);
    });
})();

/* =============================================
   HERO IMAGE PARALLAX
   ============================================= */
(function initParallax() {
    const heroImg = document.querySelector('.hero-img img');
    const heroImgContainer = document.querySelector('.hero-img');
    if (!heroImg || !heroImgContainer) return;

    heroImgContainer.addEventListener('mousemove', (e) => {
        const rect = heroImgContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        heroImg.style.transform = `rotateX(${-y * 16}deg) rotateY(${x * 16}deg) scale(1.05)`;
    });

    heroImgContainer.addEventListener('mouseleave', () => {
        heroImg.style.transform = 'rotateX(4deg) rotateY(-10deg) scale(1.03)';
    });
})();


/* =============================================
   PROJECT ROW — number highlight on hover
   ============================================= */
(function initProjectRows() {
    document.querySelectorAll('.project_item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.querySelector('a');
            if (link && link.href && link.href !== '#') window.location.href = link.href;
        });
    });
})();

/* =============================================
   TIMELINE ANIMATION
   ============================================= */
(function initTimeline() {
    const track = document.querySelector('.timeline-track');
    const fill  = document.querySelector('.tl-fill');
    if (!track || !fill) return;

    // Scroll-driven line fill
    window.addEventListener('scroll', () => {
        const rect    = track.getBoundingClientRect();
        const winH    = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (winH - rect.top) / (rect.height + winH * 0.25)));
        fill.style.height = (progress * 100) + '%';
    }, { passive: true });

    // Cards fade in from the side
    const cards = document.querySelectorAll('.tl-card');
    if (!('IntersectionObserver' in window)) {
        cards.forEach(c => c.classList.add('tl-visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('tl-visible', entry.isIntersecting);
        });
    }, { threshold: 0.25 });
    cards.forEach(c => observer.observe(c));
})();

/* =============================================
   SKILL RADAR CHARTS
   ============================================= */
(function initRadarCharts() {
    const NS = 'http://www.w3.org/2000/svg';

    const CHARTS = [
        {
            id: 'radar-coding',
            title: 'Coding',
            skills: [
                { label: 'Java',       value: 75 },
                { label: 'JavaScript', value: 80 },
                { label: 'HTML / CSS', value: 85 },
                { label: 'Node.js',    value: 70 },
                { label: 'Python',     value: 65 },
            ]
        },
        {
            id: 'radar-design',
            title: 'Design',
            skills: [
                { label: 'Figma',      value: 80 },
                { label: 'UX / UI',    value: 82 },
                { label: 'Prototype',  value: 75 },
                { label: 'Photoshop',  value: 60 },
                { label: 'DaVinci',    value: 65 },
            ]
        },
        {
            id: 'radar-soft',
            title: 'Soft Skills',
            skills: [
                { label: 'Solving',    value: 90 },
                { label: 'Work Ethic', value: 95 },
                { label: 'Teamwork',   value: 80 },
                { label: 'Comms',      value: 75 },
                { label: 'Adaptable',  value: 70 },
            ]
        }
    ];

    const W = 320, H = 300, CX = 160, CY = 158, R = 92, LEVELS = 4;

    function svgEl(tag, attrs) {
        const e = document.createElementNS(NS, tag);
        Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
        return e;
    }

    function axisAngle(i, n) {
        return (i / n) * 2 * Math.PI - Math.PI / 2;
    }

    function axisPoint(i, n, pct) {
        const a = axisAngle(i, n);
        return { x: CX + R * pct * Math.cos(a), y: CY + R * pct * Math.sin(a) };
    }

    function polyPoints(skills, pcts) {
        return skills.map((_, i) => {
            const p = axisPoint(i, skills.length, pcts[i] / 100);
            return p.x.toFixed(2) + ',' + p.y.toFixed(2);
        }).join(' ');
    }

    function buildChart(container, title, skills) {
        const n = skills.length;
        const svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: '100%' });

        // Grid rings
        for (let l = LEVELS; l >= 1; l--) {
            const pts = skills.map((_, i) => {
                const p = axisPoint(i, n, l / LEVELS);
                return p.x.toFixed(2) + ',' + p.y.toFixed(2);
            }).join(' ');
            svg.appendChild(svgEl('polygon', {
                points: pts, fill: 'none',
                stroke: 'currentColor', 'stroke-width': '0.8', opacity: '0.12'
            }));
        }

        // Axis lines
        skills.forEach((_, i) => {
            const p = axisPoint(i, n, 1);
            svg.appendChild(svgEl('line', {
                x1: CX, y1: CY, x2: p.x.toFixed(2), y2: p.y.toFixed(2),
                stroke: 'currentColor', 'stroke-width': '0.8', opacity: '0.12'
            }));
        });

        // Data polygon
        const poly = svgEl('polygon', {
            points: polyPoints(skills, skills.map(() => 0)),
            fill: 'var(--accent-color)', 'fill-opacity': '0.2',
            stroke: 'var(--accent-color)', 'stroke-width': '1.8',
            'stroke-linejoin': 'round'
        });
        svg.appendChild(poly);

        // Axis dots
        const dots = skills.map((_, i) => {
            const p = axisPoint(i, n, 0);
            const d = svgEl('circle', { cx: p.x, cy: p.y, r: '3', fill: 'var(--accent-color)' });
            svg.appendChild(d);
            return d;
        });

        // Labels
        const labelR = R + 30;
        skills.forEach((skill, i) => {
            const a = axisAngle(i, n);
            const x = CX + labelR * Math.cos(a);
            const y = CY + labelR * Math.sin(a);
            const t = svgEl('text', {
                x: x.toFixed(2), y: y.toFixed(2),
                'text-anchor': 'middle', 'dominant-baseline': 'middle',
                'font-size': '9.5', 'font-family': 'Outfit, sans-serif',
                fill: 'currentColor', opacity: '0.65'
            });
            t.textContent = skill.label;
            svg.appendChild(t);
        });

        // Title
        const titleEl = svgEl('text', {
            x: CX, y: '14',
            'text-anchor': 'middle', 'dominant-baseline': 'middle',
            'font-size': '10', 'font-weight': '700', 'letter-spacing': '2',
            'font-family': 'Outfit, sans-serif', fill: 'var(--accent-color)'
        });
        titleEl.textContent = title.toUpperCase();
        svg.appendChild(titleEl);

        container.appendChild(svg);
        return { poly, dots, skills };
    }

    function animateChart(poly, dots, skills, duration) {
        let active = true;
        const start = performance.now();
        function tick(now) {
            if (!active) return;
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            const pcts = skills.map(s => s.value * ease);
            poly.setAttribute('points', polyPoints(skills, pcts));
            dots.forEach((d, i) => {
                const p = axisPoint(i, skills.length, pcts[i] / 100);
                d.setAttribute('cx', p.x.toFixed(2));
                d.setAttribute('cy', p.y.toFixed(2));
            });
            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        return () => { active = false; };
    }

    function resetChart(c) {
        c.poly.setAttribute('points', polyPoints(c.skills, c.skills.map(() => 0)));
        c.dots.forEach((d, i) => {
            const p = axisPoint(i, c.skills.length, 0);
            d.setAttribute('cx', p.x.toFixed(2));
            d.setAttribute('cy', p.y.toFixed(2));
        });
    }

    const section = document.getElementById('skill-graph');
    if (!section) return;

    const built = CHARTS.map(c => {
        const container = document.getElementById(c.id);
        if (!container) return null;
        return buildChart(container, c.title, c.skills);
    }).filter(Boolean);

    let cancels = [];
    function cancelAll() {
        cancels.forEach(fn => fn());
        cancels = [];
    }

    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            cancelAll();
            built.forEach((c, i) => {
                let cancelAnim = () => {};
                const timerId = setTimeout(() => {
                    cancelAnim = animateChart(c.poly, c.dots, c.skills, 1100);
                }, 350 + i * 220);
                cancels.push(() => { clearTimeout(timerId); cancelAnim(); });
            });
        } else {
            cancelAll();
            built.forEach(resetChart);
        }
    }, { threshold: 0.2 });
    obs.observe(section);
})();

/* =============================================
   GSAP SCROLL ANIMATIONS
   ============================================= */
(function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Section header reveals
    document.querySelectorAll(
        '.features_header, .certs-header, .timeline-header, .contact-header'
    ).forEach(header => {
        const h2 = header.querySelector('h2');
        const p  = header.querySelector('p');
        const els = [h2, p].filter(Boolean);
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: 32 });
        ScrollTrigger.create({
            trigger: header,
            start: 'top 85%',
            onEnter:     () => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
            onEnterBack: () => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
            onLeave:     () => gsap.set(els, { opacity: 0, y: 32 }),
            onLeaveBack: () => gsap.set(els, { opacity: 0, y: 32 }),
        });
    });

    // Timeline node scale-in
    document.querySelectorAll('.tl-node').forEach(node => {
        gsap.set(node, { scale: 0 });
        ScrollTrigger.create({
            trigger: node,
            start: 'top 80%',
            onEnter:     () => gsap.to(node, { scale: 1, duration: 0.5, ease: 'back.out(2)' }),
            onEnterBack: () => gsap.to(node, { scale: 1, duration: 0.5, ease: 'back.out(2)' }),
            onLeave:     () => gsap.set(node, { scale: 0 }),
            onLeaveBack: () => gsap.set(node, { scale: 0 }),
        });
    });

    // Cert big number entrance
    const certNum = document.getElementById('cert-big-num');
    if (certNum) {
        gsap.set(certNum, { opacity: 0, scale: 0.5 });
        ScrollTrigger.create({
            trigger: certNum,
            start: 'top 85%',
            onEnter:     () => gsap.to(certNum, { opacity: 0.15, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }),
            onEnterBack: () => gsap.to(certNum, { opacity: 0.15, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }),
            onLeave:     () => gsap.set(certNum, { opacity: 0, scale: 0.5 }),
            onLeaveBack: () => gsap.set(certNum, { opacity: 0, scale: 0.5 }),
        });
    }

    // Projects section label
    const sliderHeader = document.querySelector('.slider__header');
    if (sliderHeader) {
        gsap.set(sliderHeader, { opacity: 0, y: -16 });
        ScrollTrigger.create({
            trigger: sliderHeader,
            start: 'top 90%',
            once: true,
            onEnter: () => gsap.to(sliderHeader, {
                opacity: 1, y: 0,
                duration: 0.6,
                ease: 'power3.out'
            })
        });
    }
})();

/* =============================================
   CERTIFICATIONS GRID
   ============================================= */
const certs = [
    { img: 'Certificates/Cybersecurity_101.png',                   title: 'Cyber Security 101',                       org: 'TryHackMe' },
    { img: 'Certificates/Web_Fundamentals.png',                    title: 'Web Fundamentals',                         org: 'TryHackMe' },
    { img: 'Certificates/Jr_Penetration_Tester.png',               title: 'Jr Penetration Tester',                    org: 'TryHackMe' },
    { img: 'Certificates/amazon_Junior_software_developer.png',    title: 'Junior Software Developer',                org: 'Amazon' },
    { img: 'Certificates/Amazon_Introduction.png',                 title: 'Introduction to Cloud Semester 1',         org: 'Amazon' },
    { img: 'Certificates/ethicalHacking.png',                      title: 'Ethical Hacking Specialization',           org: 'IBM' },
    { img: 'Certificates/londen_fullstack.png',                    title: 'Full-Stack Web Development',               org: 'University of London' },
];

(function initCertViewer() {
    const imgEl    = document.getElementById('cert-main-img');
    const numEl    = document.getElementById('cert-big-num');
    const orgEl    = document.getElementById('cert-org-tag');
    const titleEl  = document.getElementById('cert-main-title');
    const linkEl   = document.getElementById('cert-open-btn');
    const dotsEl   = document.querySelector('.cert-dots');
    const btnLeft  = document.querySelector('.cert-arrow-left');
    const btnRight = document.querySelector('.cert-arrow-right');
    if (!imgEl) return;

    let current = 0;
    let busy = false;
    const mod = (n, m) => ((n % m) + m) % m;

    function buildDots() {
        if (!dotsEl) return;
        dotsEl.innerHTML = '';
        certs.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'cert-dot' + (i === current ? ' active' : '');
            dot.addEventListener('click', () => navigate(i));
            dotsEl.appendChild(dot);
        });
    }

    function render() {
        const c = certs[current];
        imgEl.src = c.img;
        imgEl.alt = c.title;
        if (numEl)   numEl.textContent   = String(current + 1).padStart(2, '0');
        if (orgEl)   orgEl.textContent   = c.org;
        if (titleEl) titleEl.textContent = c.title;
        if (linkEl)  linkEl.href         = c.img;
        buildDots();
    }

    function navigate(toIdx) {
        if (busy || toIdx === current) return;
        busy = true;
        const useGsap = typeof gsap !== 'undefined';
        const dir = toIdx > current ? 1 : -1;

        if (useGsap) {
            const tl = gsap.timeline({ onComplete: () => { busy = false; } });
            const textEls = [numEl, orgEl, titleEl].filter(Boolean);
            tl.to(imgEl,    { opacity: 0, x: -30 * dir, duration: 0.3, ease: 'power2.in' }, 0);
            tl.to(textEls,  { opacity: 0, y: -8,         duration: 0.2, ease: 'power2.in', stagger: 0.04 }, 0);
            tl.call(() => { current = toIdx; render(); });
            tl.fromTo(imgEl,   { opacity: 0, x: 30 * dir },  { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
            tl.fromTo(textEls, { opacity: 0, y: 10 },        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.06 }, '<0.05');
            tl.fromTo(numEl,   { scale: 0.7 },               { scale: 1,         duration: 0.4,  ease: 'back.out(1.6)' }, '<');
        } else {
            current = toIdx;
            render();
            busy = false;
        }
    }

    if (btnLeft)  btnLeft.addEventListener('click',  () => navigate(mod(current - 1, certs.length)));
    if (btnRight) btnRight.addEventListener('click', () => navigate(mod(current + 1, certs.length)));

    render();
})();

/* =============================================
   CONTACT FORM VALIDATION & NOTIFICATION
   ============================================= */
(function initContactForm() {
    const form         = document.getElementById('contact-form');
    const notification = document.getElementById('notification');
    if (!form) return;

    form.addEventListener('submit', (e) => {
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

        if (!valid) { e.preventDefault(); return; }

        if (notification) {
            notification.textContent = 'Message sent — I\'ll be in touch!';
            notification.style.display = 'block';
            setTimeout(() => { notification.style.display = 'none'; }, 3500);
        }
        showConfetti();
    });

    function showConfetti() {
        const W = window.innerWidth, H = window.innerHeight;
        for (let i = 0; i < 70; i++) {
            const el = document.createElement('div');
            el.style.cssText = `
                position:fixed; left:${Math.random()*W}px; top:-20px;
                width:10px; height:10px;
                background:hsl(${Math.random()*360},75%,60%);
                border-radius:50%; z-index:10000; pointer-events:none;`;
            document.body.appendChild(el);
            el.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0.9 },
                { transform: `translateX(${(Math.random()-0.5)*W*0.6}px) translateY(${H+60}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], { duration: 1600 + Math.random()*1000, easing: 'cubic-bezier(.22,1,.36,1)' });
            setTimeout(() => el.remove(), 2800);
        }
    }
})();

// PARTICLE SLIDER BACKGROUND
var init = function(){
  var ps = new ParticleSlider({
    ptlGap: 1,        // tweak density
    ptlSize: 0,       // particle size
    width: 1900,
    height: 1900,
    monochrome: false,
    // color: '#008cff',
  });

  // Expose for effects.js so it can re-form particles on interaction.
  window['__particleSlider'] = ps;
};

var initParticleSlider = function(){
  var psScript = document.createElement('script');
  psScript.onload = init;
  psScript.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js';
  document.body.appendChild(psScript);
};



window.addEventListener('load', initParticleSlider);
