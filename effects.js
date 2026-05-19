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
        const reduced = effectiveReduceMotion();
        body.classList.toggle('a11y-reduce-motion', reduced);
        body.classList.toggle('a11y-high-contrast', settings.highContrast);
        body.classList.toggle('a11y-large-text', settings.largeText);
        body.classList.toggle('a11y-no-cursor', settings.noCursor);
        body.classList.toggle('a11y-underline-links', settings.underlineLinks);

        /* Mirror reduce-motion onto the projects fallback grid so screen
           readers see the correct content as active. */
        const slider = document.querySelector('#projects .slider');
        const grid   = document.getElementById('projects-grid');
        if (slider && grid) {
            slider.setAttribute('aria-hidden', reduced ? 'true' : 'false');
            grid.setAttribute('aria-hidden',   reduced ? 'false' : 'true');
        }
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
            let hovering = false;

            function update() {
                el.style.transform =
                    `perspective(900px) rotateX(${pendingY}deg) rotateY(${pendingX}deg) scale(${SCALE})`;
                raf = null;
            }

            el.addEventListener('mouseenter', () => {
                if (effectiveReduceMotion()) return;
                hovering = true;
                /* Suppress slow CSS transform-transitions so tilt feels snappy.
                   We preserve other property transitions by listing them explicitly. */
                el.style.transition = 'transform 80ms linear, box-shadow 0.35s ease, border-color 0.25s ease';
            });

            el.addEventListener('mousemove', (e) => {
                if (effectiveReduceMotion() || !hovering) return;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                pendingX = (px - 0.5) * MAX_TILT * 2;
                pendingY = -(py - 0.5) * MAX_TILT * 2;
                if (raf === null) raf = requestAnimationFrame(update);
            });

            el.addEventListener('mouseleave', () => {
                hovering = false;
                if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
                /* Smooth return: give transform a slower ease for the snap-back. */
                el.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.25s ease';
                el.style.transform = '';
                /* After return completes, clear the inline transition so CSS resumes. */
                setTimeout(() => {
                    if (!hovering) el.style.transition = '';
                }, 500);
            });
        });
    })();

    /* =============================================
       STAGGERED SCROLL REVEAL
       (uses IntersectionObserver, no GSAP dependency)
       ============================================= */
    (function initReveals() {
        if (!('IntersectionObserver' in window)) return;

        /* Mark groups for stagger.
           Note: .feature_card already has its own GSAP reveal in script.js
           so we skip it here to avoid conflicting transitions. */
        const groups = [
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

                /* Clear inline transition once reveal completes — otherwise
                   the lingering transform-transition + stagger delay makes
                   downstream effects (tilt, hover) feel laggy on later cards. */
                const cleanup = () => {
                    el.style.transition = '';
                    el.style.transitionDelay = '';
                    el.style.transform = '';
                    el.style.filter = '';
                    el.classList.remove('reveal-stagger');
                    el.removeEventListener('transitionend', onEnd);
                };
                let done = false;
                const onEnd = (e) => {
                    if (done || e.target !== el || e.propertyName !== 'opacity') return;
                    done = true;
                    cleanup();
                };
                el.addEventListener('transitionend', onEnd);
                /* Fallback: also clear after expected duration in case transitionend doesn't fire */
                setTimeout(() => { if (!done) { done = true; cleanup(); } }, 1500);
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

    /* =============================================
       PROJECTS FALLBACK GRID
       Built once from window.PROJECT_SLIDES, shown when reduce-motion is on.
       ============================================= */
    (function buildProjectsGrid() {
        const gridEl = document.getElementById('projects-grid');
        if (!gridEl) return;

        function render() {
            const slides = window.PROJECT_SLIDES || [];
            if (!slides.length) return;
            gridEl.innerHTML = '';
            slides.forEach(s => {
                const a = document.createElement('a');
                a.className = 'project-grid-card';
                a.href = s.url || '#';
                a.target = '_blank';
                a.rel = 'noopener';

                const img = document.createElement('div');
                img.className = 'project-grid-card__img';
                if (s.image) img.style.backgroundImage = `url("${s.image}")`;
                if (s.color) img.style.backgroundColor = s.color;

                const body = document.createElement('div');
                body.className = 'project-grid-card__body';

                const title = document.createElement('h3');
                title.className = 'project-grid-card__title';
                title.textContent = s.name || 'Untitled';

                const desc = document.createElement('p');
                desc.className = 'project-grid-card__desc';
                desc.textContent = s.description || '';

                const cta = document.createElement('span');
                cta.className = 'project-grid-card__cta';
                cta.textContent = 'View project →';

                body.appendChild(title);
                body.appendChild(desc);
                body.appendChild(cta);
                a.appendChild(img);
                a.appendChild(body);
                gridEl.appendChild(a);
            });
        }

        /* SLIDES may not exist yet at script-load order — retry briefly. */
        if (window.PROJECT_SLIDES && window.PROJECT_SLIDES.length) {
            render();
        } else {
            let tries = 0;
            const id = setInterval(() => {
                tries++;
                if ((window.PROJECT_SLIDES && window.PROJECT_SLIDES.length) || tries > 20) {
                    clearInterval(id);
                    render();
                }
            }, 100);
        }

        /* Apply correct aria-hidden state now that grid exists. */
        applySettings();
    })();

    /* =============================================
       PARTICLE HERO INTERACTION
       The third-party ParticleSlider exposes ps.init(true) which dramatically
       re-forms the image. We trigger it on click + on mouseenter (throttled),
       and scope the click reset to the image instead of the whole window.
       ============================================= */
    (function initParticleInteraction() {
        const host = document.getElementById('particle-slider');
        if (!host) return;

        let lastReform = 0;
        const COOLDOWN = 1200; // ms — avoid spamming re-init

        function reform() {
            if (effectiveReduceMotion()) return;
            const now = Date.now();
            if (now - lastReform < COOLDOWN) return;
            const ps = window['__particleSlider'];
            if (ps && typeof ps.init === 'function') {
                try { ps.init(true); lastReform = now; } catch (e) { /* noop */ }
            }
        }

        host.addEventListener('mouseenter', reform);
        host.addEventListener('click', (e) => {
            if (effectiveReduceMotion()) return;
            e.stopPropagation();
            reform();
        });

        /* Keyboard: focus + Enter reforms the particles too. */
        function syncA11yAttrs() {
            if (effectiveReduceMotion()) {
                host.removeAttribute('tabindex');
                host.removeAttribute('role');
                host.removeAttribute('aria-label');
            } else {
                host.setAttribute('tabindex', '0');
                host.setAttribute('role', 'button');
                host.setAttribute('aria-label', 'Reform particle portrait');
            }
        }
        syncA11yAttrs();
        /* Re-sync whenever settings change (panel toggle / OS pref change). */
        const a11yObserver = new MutationObserver(syncA11yAttrs);
        a11yObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        host.addEventListener('keydown', (e) => {
            if (effectiveReduceMotion()) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                reform();
            }
        });
    })();

})();
