/* =============================================
   EFFECTS & ACCESSIBILITY LAYER
   - 3D tilt for cards
   - Parallax scroll for hero + sections
   - Staggered scroll reveal for grids
   - Accessibility panel (reduce motion, contrast, text size, cursor, underline)
   - Skip-link, keyboard focus, localStorage persistence
   ============================================= */

(function () {
    'use strict';

    const body = document.body;
    const root = document.documentElement;
    root.classList.remove('no-js');

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* =============================================
       A11Y SETTINGS — load + persist
       ============================================= */
    const A11Y_KEY = 'a11y-settings-v1';
    const defaults = {
        reduceMotion: false,
        highContrast: false,
        largeText: false,
        noCursor: false,
        underlineLinks: false,
    };

    function loadSettings() {
        try {
            const stored = JSON.parse(localStorage.getItem(A11Y_KEY) || '{}');
            return { ...defaults, ...stored };
        } catch (e) {
            return { ...defaults };
        }
    }
    function saveSettings(s) {
        try { localStorage.setItem(A11Y_KEY, JSON.stringify(s)); } catch (e) {}
    }

    let settings = loadSettings();

    function effectiveReduceMotion() {
        return settings.reduceMotion || prefersReducedMotionMQ.matches;
    }

    function applySettings() {
        body.classList.toggle('a11y-reduce-motion', effectiveReduceMotion());
        body.classList.toggle('a11y-high-contrast', settings.highContrast);
        body.classList.toggle('a11y-large-text', settings.largeText);
        body.classList.toggle('a11y-no-cursor', settings.noCursor);
        body.classList.toggle('a11y-underline-links', settings.underlineLinks);
    }

    applySettings();

    /* React to OS-level reduced-motion changes */
    prefersReducedMotionMQ.addEventListener?.('change', () => {
        applySettings();
    });

    /* =============================================
       A11Y PANEL UI
       ============================================= */
    (function initA11yPanel() {
        const toggleBtn = document.getElementById('a11y-toggle');
        const panel     = document.getElementById('a11y-panel');
        const closeBtn  = document.getElementById('a11y-close');
        const resetBtn  = document.getElementById('a11y-reset');
        if (!toggleBtn || !panel) return;

        const inputs = {
            reduceMotion:   document.getElementById('a11y-reduce-motion'),
            highContrast:   document.getElementById('a11y-high-contrast'),
            largeText:      document.getElementById('a11y-large-text'),
            noCursor:       document.getElementById('a11y-no-cursor'),
            underlineLinks: document.getElementById('a11y-underline-links'),
        };

        function syncInputs() {
            Object.keys(inputs).forEach(key => {
                const el = inputs[key];
                if (el) el.checked = !!settings[key];
            });
        }

        function isOpen() { return panel.classList.contains('is-open'); }

        function open() {
            panel.classList.add('is-open');
            panel.setAttribute('aria-hidden', 'false');
            toggleBtn.setAttribute('aria-expanded', 'true');
            /* Focus first checkbox for keyboard users */
            const firstInput = panel.querySelector('input[type="checkbox"]');
            if (firstInput) firstInput.focus();
        }
        function close() {
            panel.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.focus();
        }

        toggleBtn.addEventListener('click', () => {
            if (isOpen()) close(); else open();
        });
        closeBtn?.addEventListener('click', close);

        /* Close on Esc */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) close();
        });

        /* Close on outside click */
        document.addEventListener('click', (e) => {
            if (!isOpen()) return;
            if (panel.contains(e.target) || toggleBtn.contains(e.target)) return;
            close();
        });

        Object.keys(inputs).forEach(key => {
            const el = inputs[key];
            if (!el) return;
            el.addEventListener('change', () => {
                settings[key] = el.checked;
                saveSettings(settings);
                applySettings();
            });
        });

        resetBtn?.addEventListener('click', () => {
            settings = { ...defaults };
            saveSettings(settings);
            applySettings();
            syncInputs();
        });

        syncInputs();
    })();

    /* =============================================
       3D TILT — feature cards, timeline cards, radar wraps
       ============================================= */
    (function initTilt() {
        if (isCoarse) return;

        const targets = document.querySelectorAll(
            '.feature_card, .tl-card, .sg-radar-wrap, .cert-viewer'
        );
        if (!targets.length) return;

        const MAX_TILT = 8;     /* degrees */
        const SCALE    = 1.015;

        targets.forEach(el => {
            let raf = null;
            let pendingX = 0, pendingY = 0;

            function update() {
                el.style.transform =
                    `perspective(900px) rotateX(${pendingY}deg) rotateY(${pendingX}deg) scale(${SCALE})`;
                raf = null;
            }

            el.addEventListener('mousemove', (e) => {
                if (effectiveReduceMotion()) return;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                pendingX = (px - 0.5) * MAX_TILT * 2;
                pendingY = -(py - 0.5) * MAX_TILT * 2;
                if (raf === null) raf = requestAnimationFrame(update);
            });

            el.addEventListener('mouseleave', () => {
                if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
                el.style.transform = '';
            });
        });
    })();

    /* =============================================
       STAGGERED SCROLL REVEAL
       (uses IntersectionObserver, no GSAP dependency)
       ============================================= */
    (function initReveals() {
        if (!('IntersectionObserver' in window)) return;

        /* Mark groups for stagger */
        const groups = [
            { sel: '.features_grid .feature_card',          stagger: 0.08 },
            { sel: '.carosel .carousel-item',               stagger: 0.02, skip: true /* infinite marquee */ },
            { sel: '.sg-radar-grid .sg-radar-wrap',         stagger: 0.12 },
            { sel: '.timeline-track .tl-item',              stagger: 0.06 },
            { sel: '.hero-stack-pills .pill',               stagger: 0.05 },
            { sel: '.hero-buttons a',                       stagger: 0.08 },
        ];

        groups.forEach(({ sel, stagger, skip }) => {
            if (skip) return;
            const els = document.querySelectorAll(sel);
            els.forEach((el, i) => {
                el.classList.add('reveal-stagger');
                el.style.transition = 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.9s ease';
                el.style.transitionDelay = (i * stagger) + 's';
                el.style.transform = 'translateY(28px)';
                el.style.filter = 'blur(6px)';
            });
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.filter = 'blur(0)';
                io.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal-stagger').forEach(el => io.observe(el));
    })();

    /* =============================================
       PARALLAX — subtle scroll-driven offsets
       ============================================= */
    (function initParallax() {
        const layers = [
            { sel: '.hero-img',           speed: -0.06 },
            { sel: '.hero-text',          speed:  0.03 },
            { sel: '.features_header',    speed: -0.04 },
            { sel: '.timeline-header',    speed: -0.04 },
            { sel: '.sg-header',          speed: -0.04 },
            { sel: '.slider__title',      speed: -0.05 },
        ];

        const tracked = [];
        layers.forEach(({ sel, speed }) => {
            document.querySelectorAll(sel).forEach(el => {
                tracked.push({ el, speed });
            });
        });
        if (!tracked.length) return;

        let lastY = window.scrollY;
        let raf = null;

        function update() {
            const winH = window.innerHeight;
            tracked.forEach(({ el, speed }) => {
                const r = el.getBoundingClientRect();
                /* Only animate when near viewport */
                if (r.bottom < -200 || r.top > winH + 200) return;
                const offset = (r.top + r.height / 2 - winH / 2) * speed;
                el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
            });
            raf = null;
        }

        function onScroll() {
            if (effectiveReduceMotion()) return;
            lastY = window.scrollY;
            if (raf === null) raf = requestAnimationFrame(update);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
    })();

})();
