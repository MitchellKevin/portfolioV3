const throttle = (callback, limit) => {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

window.PROJECT_SLIDES = window.PROJECT_SLIDES || [];
const SLIDES = window.PROJECT_SLIDES;
SLIDES.push(...[
  // {
  //   name: "FitBot",
  //   description: "Android app that controls a NAO humanoid robot to guide elderly users through exercises and provide companionship. Built with Java, XML, and MQTT for real-time communication.",
  //   url: "project-structure.html?id=fitbot",
  //   color: "#f5f2eb",
  //   image: "project-images/nao.png"
  // },
  {
    name: "Mitchopoly",
    name_nl: "Mitchopoly",
    description: "Introduction to the minor — setting learning goals and building a personal website. Used Three.js to learn how to import and work with 3D models.",
    description_nl: "Kennismaking met de minor, leerdoelen bepalen en een persoonlijke website maken. Heb hier Three.js voor gebruikt en heb leren 3D-modellen te importeren en te gebruiken.",
    url: "https://mitchellkevin.github.io/PersonalInfoSite/",
    color: "#f5f2eb",
    image: "project-images/mitchopoly.png"
  },
  {
    name: "Day-to-Day",
    name_nl: "Day-to-Day",
    description: "Sales website for a software startup. Focused on conversion-driven UX design, clean front-end build, and a clear brand identity to communicate the product value.",
    description_nl: "Verkoopwebsite voor een softwarestartup. Gericht op conversiegedreven UX-design, een strakke front-end en een duidelijke merkidentiteit om de productwaarde te communiceren.",
    url: "https://www.day-to-day.nl/",
    color: "#f5f2eb",
    image: "project-images/d2d.png"
  },
  {
    name: "Hackathon-2nd-place",
    name_nl: "Hackathon — 2e plaats",
    description: "Collaborating under time pressure, from concept to working prototype. My biggest contributions were a 3D globe animation/parallax built with Three.js and a 3D satellite component explainer.",
    description_nl: "Samenwerken onder tijdsdruk, van concept tot werkend prototype. De grootste dingen die ik in dit project gemaakt heb zijn de 3D-globe animatie/parallax met Three.js en de uitleg van een 3D-sateliet component.",
    url: "https://mitchellkevin.github.io/Space/",
    color: "#f5f2eb",
    image: "project-images/hackathon.png"
  },
  {
    name: "CMD Casino",
    name_nl: "CMD Casino",
    description: "My first full-stack application — a multiplayer casino with real-time WebSocket games, the Mollie payments API, and a MongoDB database. Read the full case study.",
    description_nl: "Voor het eerst een volledige full-stack applicatie gemaakt — een multiplayer casino met realtime WebSocket-spellen, Mollie API voor payments en een MongoDB database. Lees de volledige case study.",
    url: "cmd-casino.html",
    color: "#f5f2eb",
    image: "project-images/CMD-casino.png"
  },
  {
    name: "HCD — VoiceReader",
    name_nl: "HCD — VoiceReader",
    description: "Designing for a single user — a Chrome extension that gives a screen reader emotional, genre-aware voices, built hand-in-hand with a blind user. Read the full case study.",
    description_nl: "Ontwerpen vanuit één gebruiker — een Chrome-extensie die een screenreader emotionele, genrebewuste stemmen geeft, gebouwd samen met een blinde gebruiker. Lees de volledige case study.",
    url: "hcd.html",
    color: "#f5f2eb",
    image: "project-images/HCD.png"
  },
  {
    name: "Datavisualization Visdeurbel.nl",
    name_nl: "Datavisualisatie Visdeurbel.nl",
    description: "A scrolling data visualization of the Visdeurbel (fish doorbell) visitor data — built in React + D3 on a Python pipeline that crunches a 288 MB event log down to 40 KB. Read the full case study.",
    description_nl: "Een scrollende datavisualisatie van de bezoekersdata van de Visdeurbel — gebouwd in React + D3 op een Python-pijplijn die een eventlog van 288 MB terugbrengt tot 40 KB. Lees de volledige case study.",
    url: "visdeurbel.html",
    color: "#f5f2eb",
    image: "project-images/visdeurbel.png"
  },
  //   {
  //   name: "WasteLess",
  //   description: "Ontwerpen om voedselverspilling tegen te gaan, door een app te maken die gebruikers helpt bij het plannen van maaltijden en het beheren van hun voorraad.",
  //   url: "https://wasteless-pppv.onrender.com/",
  //   color: "#f5f2eb",
  //   image: "projects-img/HCD.png"
  // }
]);

const AUTOPLAY_DELAY = 4000;

class Slider {
  constructor() {
    this.current = 0;
    this.animating = false;
    this.total = SLIDES.length;
    this.el = document.querySelector(".slider");
    this.titleEl = document.querySelector(".slider__title");
    this.subtitleEl = document.querySelector(".slider__subtitle");
    this.ctaEl = document.querySelector(".slider__cta");
    this.imagesEl = document.querySelector(".slider__images");
    this.slideEls = [];
    this.currentLine = null;
    this.autoPlayId = null;
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.preload();
    this.setTitle(this.slideName(0));
    if (this.subtitleEl) this.subtitleEl.textContent = this.slideDesc(0);
    if (this.ctaEl) this.ctaEl.href = SLIDES[0].url;
    this.buildCarousel();
    this.bind();
    this.startAutoPlay();
  }

  currentLang() {
    return (window.I18N && window.I18N.current) || 'en';
  }
  slideName(idx) {
    const s = SLIDES[idx];
    return (this.currentLang() === 'nl' && s.name_nl) ? s.name_nl : s.name;
  }
  slideDesc(idx) {
    const s = SLIDES[idx];
    return (this.currentLang() === 'nl' && s.description_nl) ? s.description_nl : s.description;
  }

  preload() {
    SLIDES.forEach((s) => {
      new Image().src = s.image;
    });
  }

  mod(n) {
    return ((n % this.total) + this.total) % this.total;
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayId = setInterval(() => {
      if (!this.animating) this.go("next");
    }, AUTOPLAY_DELAY);
  }

  stopAutoPlay() {
    if (this.autoPlayId) {
      clearInterval(this.autoPlayId);
      this.autoPlayId = null;
    }
  }

  setTitle(text) {
    this.titleEl.innerHTML = "";
    const line = document.createElement("div");
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? " " : ch;
      line.appendChild(span);
    });
    this.titleEl.appendChild(line);
    this.currentLine = line;
  }

  animateTitle(newText, direction) {
    const h = this.titleEl.offsetHeight;
    const dir = direction === "next" ? 1 : -1;
    const oldLine = this.currentLine;
    const oldChars = [...oldLine.querySelectorAll("span")];

    this.titleEl.style.height = h + "px";
    oldLine.style.cssText = "position:absolute;top:0;left:0;width:100%";

    const newLine = document.createElement("div");
    newLine.style.cssText = "position:absolute;top:0;left:0;width:100%";
    [...newText].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? " " : ch;
      newLine.appendChild(span);
    });
    this.titleEl.appendChild(newLine);

    const newChars = [...newLine.querySelectorAll("span")];
    gsap.set(newChars, { y: h * dir });

    const duration = this.reducedMotion ? 0.01 : 1;
    const stagger = this.reducedMotion ? 0 : 0.04;

    const tl = gsap.timeline({
      onComplete: () => {
        oldLine.remove();
        newLine.style.cssText = "";
        gsap.set(newChars, { clearProps: "all" });
        this.titleEl.style.height = "";
        this.currentLine = newLine;
      }
    });

    tl.to(
      oldChars,
      {
        y: -h * dir,
        stagger: stagger,
        duration: duration,
        ease: "expo.inOut"
      },
      0
    );

    tl.to(
      newChars,
      {
        y: 0,
        stagger: stagger,
        duration: duration,
        ease: "expo.inOut"
      },
      0
    );

    return tl;
  }

  animateSubtitle(newText) {
    if (!this.subtitleEl) return gsap.timeline();
    const duration = this.reducedMotion ? 0.01 : 0.4;
    const tl = gsap.timeline();
    tl.to(this.subtitleEl, { opacity: 0, y: 6, duration: duration, ease: "power2.in" });
    tl.call(() => { this.subtitleEl.textContent = newText; });
    tl.to(this.subtitleEl, { opacity: 1, y: 0, duration: duration, ease: "power2.out" });
    return tl;
  }

  makeSlide(idx) {
    const div = document.createElement("div");
    div.className = "slider__slide";
    const img = document.createElement("img");
    img.src = SLIDES[idx].image;
    img.alt = SLIDES[idx].name;
    img.width = 600;
    img.height = 420;
    div.appendChild(img);
    return div;
  }

  getSlideProps(step) {
    const h = this.imagesEl.offsetHeight;
    const absStep = Math.abs(step);
    const positions = [
      { x: -0.35, y: -0.95, rot: -30, s: 1.35, b: 16, o: 0 },
      { x: -0.18, y: -0.5, rot: -15, s: 1.15, b: 8, o: 0.55 },
      { x: 0, y: 0, rot: 0, s: 1, b: 0, o: 1 },
      { x: -0.06, y: 0.5, rot: 15, s: 0.75, b: 6, o: 0.55 },
      { x: -0.12, y: 0.95, rot: 30, s: 0.55, b: 14, o: 0 }
    ];
    const idx = Math.max(0, Math.min(4, step + 2));
    const p = positions[idx];

    return {
      x: p.x * h,
      y: p.y * h,
      rotation: p.rot,
      scale: p.s,
      blur: p.b,
      opacity: p.o,
      zIndex: absStep === 0 ? 3 : absStep === 1 ? 2 : 1
    };
  }

  positionSlide(slide, step) {
    const props = this.getSlideProps(step);
    gsap.set(slide, {
      xPercent: -50,
      yPercent: -50,
      x: props.x,
      y: props.y,
      rotation: props.rotation,
      scale: props.scale,
      opacity: props.opacity,
      filter: "blur(" + props.blur + "px)",
      zIndex: props.zIndex
    });
  }

  buildCarousel() {
    if (!this.imagesEl || this.imagesEl.offsetHeight === 0) return;
    this.imagesEl.innerHTML = "";
    this.slideEls = [];

    for (let step = -1; step <= 1; step++) {
      const idx = this.mod(this.current + step);
      const slide = this.makeSlide(idx);
      this.imagesEl.appendChild(slide);
      this.positionSlide(slide, step);
      this.slideEls.push({ el: slide, step: step });
    }
  }

  animateCarousel(direction) {
    if (!this.imagesEl || this.imagesEl.offsetHeight === 0)
      return gsap.timeline();

    const shift = direction === "next" ? -1 : 1;
    const enterStep = direction === "next" ? 2 : -2;
    const newIdx =
      direction === "next"
        ? this.mod(this.current + 2)
        : this.mod(this.current - 2);

    const newSlide = this.makeSlide(newIdx);
    this.imagesEl.appendChild(newSlide);
    this.positionSlide(newSlide, enterStep);
    this.slideEls.push({ el: newSlide, step: enterStep });

    this.slideEls.forEach((s) => {
      s.step += shift;
    });

    const duration = this.reducedMotion ? 0.01 : 1.2;

    const tl = gsap.timeline({
      onComplete: () => {
        this.slideEls = this.slideEls.filter((s) => {
          if (Math.abs(s.step) >= 2) {
            s.el.remove();
            return false;
          }
          return true;
        });
      }
    });

    this.slideEls.forEach((s) => {
      const props = this.getSlideProps(s.step);
      s.el.style.zIndex = props.zIndex;

      tl.to(
        s.el,
        {
          x: props.x,
          y: props.y,
          rotation: props.rotation,
          scale: props.scale,
          opacity: props.opacity,
          filter: "blur(" + props.blur + "px)",
          duration: duration,
          ease: "power3.inOut"
        },
        0
      );
    });

    return tl;
  }

  go(direction) {
    if (this.animating) return;
    this.animating = true;
    this.startAutoPlay();

    const nextIdx =
      direction === "next"
        ? this.mod(this.current + 1)
        : this.mod(this.current - 1);

    const master = gsap.timeline({
      onComplete: () => {
        this.current = nextIdx;
        this.animating = false;
      }
    });

    master.add(this.animateTitle(this.slideName(nextIdx), direction), 0);
    master.add(this.animateSubtitle(this.slideDesc(nextIdx)), 0);
    master.add(this.animateCarousel(direction), 0);
    if (this.ctaEl) this.ctaEl.href = SLIDES[nextIdx].url;
  }

  /* Called when language toggle fires — re-render current slide text without animation */
  refreshLang() {
    this.setTitle(this.slideName(this.current));
    if (this.subtitleEl) this.subtitleEl.textContent = this.slideDesc(this.current);
  }

  bind() {
    const onWheel = throttle((e) => {
      if (this.animating) return;
      this.go(e.deltaY > 0 ? "next" : "prev");
    }, 1800);
    this.el.addEventListener("wheel", onWheel, { passive: true });

    let touchStartY = 0;
    this.el.addEventListener(
      "touchstart",
      (e) => {
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    const onTouchEnd = throttle((e) => {
      if (this.animating) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      this.go(diff > 0 ? "next" : "prev");
    }, 1800);
    this.el.addEventListener("touchend", onTouchEnd, { passive: true });

    window.addEventListener("keydown", (e) => {
      if (this.animating) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") this.go("next");
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") this.go("prev");
    });

    const onResize = debounce(() => {
      if (!this.animating && this.imagesEl.offsetHeight > 0) {
        this.slideEls.forEach((s) => {
          this.positionSlide(s.el, s.step);
        });
      }
    }, 300);
    window.addEventListener("resize", onResize, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.animating = false;
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Slider();
  window['__projectSlider'] = slider;
  document.addEventListener('langchange', () => {
    if (slider && typeof slider.refreshLang === 'function') slider.refreshLang();
  });
});
