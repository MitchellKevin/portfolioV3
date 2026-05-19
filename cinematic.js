/* =============================================
   CINEMATIC LAYER
   - WebGL gradient mesh background (Three.js shader)
   - Spotlight cursor
   - Hero split-text per character
   - Section overlines
   - Premium hover sounds (visual only)
   ============================================= */

(function defaultDarkLuxe() {
    /* Dark is the default for first-time visitors only — respect toggle on revisits */
    if (localStorage.getItem('darkMode') === null) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else if (localStorage.getItem('darkMode') !== 'true') {
        document.body.classList.remove('dark-mode');
    }
})();

/* -------- INJECT OVERLAY DOM (vignette, scanlines, spotlight) -------- */
(function injectOverlays() {
    const ids = ['webgl-bg', 'vignette', 'spotlight', 'scanlines'];
    ids.forEach(id => {
        if (document.getElementById(id)) return;
        const el = document.createElement(id === 'webgl-bg' ? 'canvas' : 'div');
        el.id = id;
        document.body.insertBefore(el, document.body.firstChild);
    });

    document.body.classList.add('spotlight-on');
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mx', e.clientX + 'px');
        document.documentElement.style.setProperty('--my', e.clientY + 'px');
    });
})();

/* -------- ADD OVERLINES TO SECTION HEADERS -------- */
(function addOverlines() {
    const overlines = [
        { sel: '.features_header', text: '01 — Capabilities' },
        { sel: '.sg-header',        text: '02 — Proficiency' },
        { sel: '.timeline-header',  text: '04 — Journey' },
    ];
    overlines.forEach(({ sel, text }) => {
        const el = document.querySelector(sel);
        if (el && !el.dataset.overline) el.dataset.overline = text;
    });
})();

/* -------- WEBGL GRADIENT MESH BACKGROUND (raw WebGL, no library) -------- */
(function initWebGLBackground() {
    const canvas = document.getElementById('webgl-bg');
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) {
        canvas.style.display = 'none';
        return;
    }

    const vertSrc = `
        attribute vec2 a_pos;
        varying vec2 v_uv;
        void main() {
            v_uv = a_pos * 0.5 + 0.5;
            gl_Position = vec4(a_pos, 0.0, 1.0);
        }
    `;

    /* Two-blob animated gradient mesh inspired by Linear/Vercel hero backgrounds.
       Uses simplex-like sin/cos warps for that liquid, premium feel. */
    const fragSrc = `
        precision highp float;
        varying vec2 v_uv;
        uniform float u_time;
        uniform vec2  u_res;
        uniform vec2  u_mouse;
        uniform float u_scroll;

        vec3 palette(float t) {
            // pure void -> soft gray -> bright white
            vec3 a = vec3(0.020, 0.020, 0.022);
            vec3 b = vec3(0.220, 0.220, 0.230);
            vec3 c = vec3(0.900, 0.900, 0.920);
            return mix(mix(a, b, smoothstep(0.0, 0.65, t)), c, smoothstep(0.7, 1.0, t));
        }

        float noise(vec2 p) {
            return sin(p.x * 1.7 + sin(p.y * 2.3 + u_time * 0.25)) *
                   cos(p.y * 1.9 + cos(p.x * 1.3 - u_time * 0.18));
        }

        void main() {
            vec2 uv = v_uv;
            vec2 p  = uv - 0.5;
            p.x *= u_res.x / u_res.y;

            // Slow drift + mouse pull
            vec2 mouse = (u_mouse - 0.5);
            mouse.x *= u_res.x / u_res.y;

            float t = u_time * 0.12;
            float scroll = u_scroll * 0.3;

            // Two soft blobs
            vec2 c1 = vec2(sin(t * 0.7) * 0.5, cos(t * 0.5) * 0.3 - 0.1) + mouse * 0.08;
            vec2 c2 = vec2(cos(t * 0.6 + 1.7) * 0.45, sin(t * 0.8 + 2.1) * 0.35 + 0.2) + mouse * -0.04;
            c2.y += scroll;

            float d1 = length(p - c1);
            float d2 = length(p - c2);

            float blob1 = smoothstep(0.9, 0.0, d1);
            float blob2 = smoothstep(1.0, 0.0, d2);

            float warp = noise(p * 1.4 + t) * 0.05;

            float intensity = (blob1 * 0.55 + blob2 * 0.35) + warp;
            intensity = clamp(intensity, 0.0, 1.0);

            // base ink black
            vec3 col = vec3(0.020, 0.020, 0.022);
            col = mix(col, palette(intensity), pow(intensity, 1.6) * 0.7);

            // subtle vignette
            float v = smoothstep(1.2, 0.4, length(p));
            col *= mix(0.6, 1.0, v);

            // grain via fragment hash
            float g = fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453);
            col += (g - 0.5) * 0.025;

            gl_FragColor = vec4(col, 0.95);
        }
    `;

    function compile(type, src) {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(sh));
            return null;
        }
        return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) { canvas.style.display = 'none'; return; }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        canvas.style.display = 'none';
        return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,  1, -1,  -1, 1,
        -1,  1,  1, -1,   1, 1
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime   = gl.getUniformLocation(program, 'u_time');
    const uRes    = gl.getUniformLocation(program, 'u_res');
    const uMouse  = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');

    let DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    let mx = 0.5, my = 0.5;
    let tx = 0.5, ty = 0.5;

    function resize() {
        DPR = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width  = Math.floor(window.innerWidth  * DPR);
        canvas.height = Math.floor(window.innerHeight * DPR);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        tx = e.clientX / window.innerWidth;
        ty = 1 - (e.clientY / window.innerHeight);
    });

    let scroll = 0;
    function tick(now) {
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;

        const sc = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
        scroll += (sc - scroll) * 0.05;

        gl.uniform1f(uTime, now * 0.001);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mx, my);
        gl.uniform1f(uScroll, scroll);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
})();

/* -------- ENHANCE HERO H1 WITH CHAR SPLIT (for staggered reveal) -------- */
(function splitHeroChars_DISABLED() {
    return;
    document.querySelectorAll('.hero-line-inner').forEach(line => {
        if (line.dataset.split) return;
        const text = line.textContent;
        line.textContent = '';
        [...text].forEach((ch, i) => {
            const s = document.createElement('span');
            s.textContent = ch === ' ' ? ' ' : ch;
            s.style.display = 'inline-block';
            s.style.transitionDelay = (i * 0.02) + 's';
            line.appendChild(s);
        });
        line.dataset.split = 'true';
    });
})();

/* -------- MAGNETIC HOVER FOR FEATURE CARDS, CERT BUTTONS, TIMELINE NODES -------- */
(function magneticElements() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const targets = document.querySelectorAll(
        '.feature_card, .cert-arrow-left, .cert-arrow-right, .cert-open-btn, .slider__cta'
    );

    targets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
            const dy = (e.clientY - (r.top  + r.height / 2)) * 0.12;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
})();

/* Hero tilt removed — was interfering with particle canvas rendering */

/* -------- SECTION ENTRANCE CINEMATIC REVEAL -------- */
(function cinematicReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Big headlines get a luxe slide-in
    document.querySelectorAll(
        '.features_header h2, .sg-header h2, .timeline-header h2, .slider__title, .contact-container h2'
    ).forEach(h => {
        gsap.set(h, { opacity: 0, y: 40, filter: 'blur(12px)' });
        ScrollTrigger.create({
            trigger: h,
            start: 'top 85%',
            once: true,
            onEnter: () => gsap.to(h, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'expo.out'
            })
        });
    });

    // Section corners pulse
    document.querySelectorAll('section .corner').forEach(c => {
        ScrollTrigger.create({
            trigger: c,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo(c,
                    { opacity: 0, scale: 1.6 },
                    { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' }
                );
            }
        });
    });

    // Hero h1 chars stagger
    document.querySelectorAll('.hero-line-inner span').forEach((sp, i) => {
        gsap.set(sp, { opacity: 0, y: 80, rotateX: -45 });
        setTimeout(() => {
            gsap.to(sp, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.1,
                ease: 'expo.out',
                delay: i * 0.025
            });
        }, 700);
    });
})();

/* -------- TIMELINE GLOWING NODE WHEN ACTIVE -------- */
(function timelineNodeGlow() {
    const items = document.querySelectorAll('.tl-item');
    if (!items.length) return;

    function check() {
        const winH = window.innerHeight;
        items.forEach(item => {
            const r = item.getBoundingClientRect();
            const center = r.top + r.height / 2;
            const inBand = center > winH * 0.35 && center < winH * 0.65;
            item.classList.toggle('tl-active', inBand);
        });
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
})();

/* -------- FOOTER BIG TYPE PARALLAX -------- */
(function footerParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    gsap.to(footer, {
        backgroundPosition: '50% 100%',
        scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1
        }
    });
})();

/* -------- ADD ACTIVE TIMELINE NODE STYLE -------- */
(function injectActiveStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .tl-item.tl-active .tl-node {
            background: var(--accent-color);
            box-shadow: 0 0 0 6px rgba(255, 59, 59, 0.15),
                        0 0 30px rgba(255, 59, 59, 0.7);
            transform: scale(1.2);
        }
        .tl-item.tl-active .tl-card {
            border-color: rgba(255, 59, 59, 0.25);
        }
    `;
    document.head.appendChild(style);
})();
