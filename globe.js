/* =============================================
   3D WIREFRAME GLOBE — Three.js (homepage)
   - Wireframe Earth with an Amsterdam marker + pulse
   - Drag to spin, gentle auto-rotation otherwise
   - Theme-aware color, respects a11y reduce-motion / pause-anim
   - Only renders while the section is on screen
   ============================================= */

(function () {
    'use strict';

    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const wrap = canvas.parentElement;

    // Graceful fallback if Three.js failed to load (e.g. CDN blocked)
    if (typeof THREE === 'undefined') {
        if (wrap) wrap.classList.add('globe-unavailable');
        console.warn('[globe] Three.js not available — showing CSS fallback.');
        return;
    }

    /* ---------- scene ---------- */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const R = 1;

    function cssAccent() {
        const c = getComputedStyle(document.body).getPropertyValue('--accent-color').trim();
        try { return new THREE.Color(c || '#a2c2f3'); } catch (e) { return new THREE.Color('#a2c2f3'); }
    }

    const globe = new THREE.Group();
    globe.rotation.x = -0.35;          // tilt for a pleasant angle
    globe.rotation.y = -1.7;           // start with Europe facing us
    scene.add(globe);

    /* wireframe sphere (lat/long grid) */
    const wireMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.38 });
    const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(R, 36, 24)),
        wireMat
    );
    globe.add(wire);

    /* faint solid core for depth */
    const coreMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.06 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 32, 24), coreMat);
    globe.add(core);

    /* helper: lat/lon -> position on sphere */
    function latLon(lat, lon, r) {
        const phi   = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
             r * Math.cos(phi),
             r * Math.sin(phi) * Math.sin(theta)
        );
    }

    /* a few "city" dots for life */
    const CITIES = [
        [52.37,   4.90],  // Amsterdam (home)
    ];
    const dotMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.7 });
    CITIES.forEach(([la, lo]) => {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 10), dotMat);
        d.position.copy(latLon(la, lo, R * 1.005));
        globe.add(d);
    });

    /* Amsterdam home marker + pulse ring */
    const HOME = latLon(52.37, 4.90, R * 1.02);
    const homeColor = new THREE.Color('#ff5a5a');
    const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 16, 16),
        new THREE.MeshBasicMaterial({ color: homeColor })
    );
    marker.position.copy(HOME);
    globe.add(marker);

    const ringMat = new THREE.MeshBasicMaterial({
        color: homeColor, transparent: true, opacity: 0.6, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.07, 28), ringMat);
    ring.position.copy(HOME);
    ring.lookAt(HOME.clone().multiplyScalar(2)); // face outward
    globe.add(ring);

    /* starfield behind the globe */
    const starGeo = new THREE.BufferGeometry();
    const STAR_N = 260;
    const starPos = new Float32Array(STAR_N * 3);
    for (let i = 0; i < STAR_N; i++) {
        // random point on a sphere (manual — Vector3.randomDirection isn't in three r128)
        const u = Math.random() * 2 - 1;
        const a = Math.random() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        const rad = 4 + Math.random() * 6;
        starPos.set([rad * s * Math.cos(a), rad * s * Math.sin(a), rad * u], i * 3);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.03, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ---------- colour theming ---------- */
    function applyAccent() {
        const a = cssAccent();
        wireMat.color.copy(a);
        coreMat.color.copy(a);
        dotMat.color.copy(a);
        starMat.color.copy(a);
    }
    applyAccent();
    // react to dark/light toggle (body class change)
    new MutationObserver(applyAccent)
        .observe(document.body, { attributes: true, attributeFilter: ['class'] });

    /* ---------- sizing ---------- */
    function resize() {
        const rect = wrap.getBoundingClientRect();
        const w = Math.max(rect.width || wrap.clientWidth || 360, 1);
        const h = Math.max(rect.height || wrap.clientHeight || w, 1);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera); // keep something on screen after a resize
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(wrap);
    window.addEventListener('resize', resize);
    window.addEventListener('load', resize);
    resize();
    // measure again after layout/fonts settle, then draw an initial frame
    requestAnimationFrame(() => { resize(); renderer.render(scene, camera); });

    /* ---------- drag to spin ---------- */
    let dragging = false, lastX = 0, lastY = 0, velY = 0.0025, velX = 0;
    canvas.addEventListener('pointerdown', (e) => {
        dragging = true; lastX = e.clientX; lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        canvas.classList.add('grabbing');
    });
    canvas.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        lastX = e.clientX; lastY = e.clientY;
        globe.rotation.y += dx * 0.006;
        globe.rotation.x += dy * 0.006;
        globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));
        velY = dx * 0.006; velX = dy * 0.006;
    });
    function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        canvas.classList.remove('grabbing');
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    /* ---------- motion preferences ---------- */
    const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    function motionOff() {
        return reducedMQ.matches ||
               document.body.classList.contains('a11y-reduce-motion') ||
               document.body.classList.contains('a11y-pause-anim');
    }

    /* ---------- render loop (only while visible) ---------- */
    let visible = false, running = false;
    const clock = new THREE.Clock();

    function frame() {
        if (!visible) { running = false; return; }
        running = true;
        const t = clock.getElapsedTime();

        if (!dragging) {
            if (!motionOff()) {
                globe.rotation.y += velY;
                // ease residual drag velocity back toward gentle idle spin
                velY += (0.0025 - velY) * 0.02;
                velX *= 0.92;
                globe.rotation.x += velX;
                globe.rotation.x += (-0.35 - globe.rotation.x) * 0.01;
            }
        }

        // pulse ring (skip when motion is off)
        if (!motionOff()) {
            const p = (t % 2) / 2;             // 0..1 every 2s
            const s = 1 + p * 2.2;
            ring.scale.setScalar(s);
            ringMat.opacity = 0.6 * (1 - p);
        } else {
            ring.scale.setScalar(1);
            ringMat.opacity = 0.6;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !running) requestAnimationFrame(frame);
    }, { threshold: 0.05 });
    io.observe(document.getElementById('globe'));
})();
