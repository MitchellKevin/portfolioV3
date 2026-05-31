/* =============================================
   BLOG — data-driven posts (EN / NL), no framework
   - List view by default; single post when ?slug=… is present
   - Re-renders on the global 'langchange' event from i18n.js
   ---------------------------------------------
   ✍️  TO ADD / EDIT A POST: edit the POSTS array below.
       Each post has a unique `slug`, a `date` (YYYY-MM-DD),
       `tags`, optional `cover` image, and bilingual
       `title` / `excerpt` / `body` ({ en, nl }).
       `body` is an HTML string — use <p>, <h2>, <ul>, <code>…
   ============================================= */

const POSTS = [
  {
    slug: "webgl-background",
    date: "2026-02-10",
    cover: "",
    readMins: 6,
    tags: ["WebGL", "Three.js", "Shaders"],
    title: {
      en: "How I built the cinematic WebGL background",
      nl: "Hoe ik de cinematische WebGL-achtergrond bouwde",
    },
    excerpt: {
      en: "A look behind the animated shader canvas, vignette and film-grain that give this site its mood — and the performance tricks that keep it smooth.",
      nl: "Een kijkje achter het geanimeerde shader-canvas, de vignet en de filmkorrel die deze site sfeer geven — plus de prestatietrucs die het soepel houden.",
    },
    body: {
      en: `
        <p>The first thing you notice on this portfolio is the slow, living gradient behind everything. It's a full-screen WebGL canvas driven by a fragment shader, layered with a vignette, a soft spotlight that follows your cursor, scanlines and film grain.</p>
        <h2>Why a shader instead of a video?</h2>
        <p>A looping video would have been simpler, but heavy and impossible to tint per theme. A shader is a few kilobytes, scales to any resolution, and reacts to the mouse and the light/dark toggle in real time.</p>
        <h2>Keeping it smooth</h2>
        <ul>
          <li>Render at a capped device-pixel-ratio so 4K screens don't melt the GPU.</li>
          <li>Pause the loop when the tab is hidden or the user enables <em>Reduce motion</em>.</li>
          <li>Everything decorative is <code>aria-hidden</code> so screen readers skip it.</li>
        </ul>
        <p>The result is a background that feels alive but never gets in the way of the content — or the Lighthouse score.</p>
        <p><em>Draft — rewrite this in your own voice before publishing.</em></p>
      `,
      nl: `
        <p>Het eerste dat opvalt op dit portfolio is het trage, levende verloop achter alles. Het is een schermvullend WebGL-canvas aangedreven door een fragment-shader, met daarboven een vignet, een zachte spotlight die je cursor volgt, scanlijnen en filmkorrel.</p>
        <h2>Waarom een shader in plaats van video?</h2>
        <p>Een loopende video was simpeler geweest, maar zwaar en onmogelijk per thema te kleuren. Een shader is een paar kilobyte, schaalt naar elke resolutie en reageert realtime op de muis en de licht/donker-schakelaar.</p>
        <h2>Soepel houden</h2>
        <ul>
          <li>Renderen op een gelimiteerde device-pixel-ratio zodat 4K-schermen de GPU niet slopen.</li>
          <li>De loop pauzeren als het tabblad verborgen is of de gebruiker <em>Beweging verminderen</em> aanzet.</li>
          <li>Alles decoratiefs is <code>aria-hidden</code> zodat schermlezers het overslaan.</li>
        </ul>
        <p>Het resultaat: een achtergrond die leeft, maar nooit in de weg zit van de content — of de Lighthouse-score.</p>
        <p><em>Concept — herschrijf dit in je eigen woorden voor publicatie.</em></p>
      `,
    },
  },
  {
    slug: "hackathon-space",
    date: "2025-11-22",
    cover: "project-images/hackathon.png",
    readMins: 5,
    tags: ["Three.js", "Hackathon", "Teamwork"],
    title: {
      en: "2nd place at a hackathon: a 3D space globe in 36 hours",
      nl: "2e plaats op een hackathon: een 3D-ruimteglobe in 36 uur",
    },
    excerpt: {
      en: "What I learned shipping an interactive 3D experience under a deadline — scoping ruthlessly, pairing with designers, and demoing without crashing.",
      nl: "Wat ik leerde door onder tijdsdruk een interactieve 3D-ervaring te bouwen — keihard scopen, samenwerken met designers en demonstreren zonder crash.",
    },
    body: {
      en: `
        <p>Over one weekend our team built an interactive 3D globe in Three.js and walked away with second place. The little wireframe globe on my homepage is a nod to it.</p>
        <h2>What worked</h2>
        <ul>
          <li><strong>Scope down, then down again.</strong> We cut half our ideas in hour two and shipped the half that demoed well.</li>
          <li><strong>One source of truth.</strong> A single shared state object kept the 3D scene and the UI in sync.</li>
          <li><strong>Rehearse the demo.</strong> The judges see 3 minutes — we practised those 3 minutes more than we'd like to admit.</li>
        </ul>
        <h2>What I'd do differently</h2>
        <p>Commit more often, and fake the data earlier so the visuals aren't blocked on a flaky API at 3am.</p>
        <p><em>Draft — add the team, the prompt and a screenshot or two.</em></p>
      `,
      nl: `
        <p>In één weekend bouwde ons team een interactieve 3D-globe in Three.js en wonnen we de tweede plaats. De kleine wireframe-globe op mijn homepage is daar een knipoog naar.</p>
        <h2>Wat werkte</h2>
        <ul>
          <li><strong>Scope verkleinen, en nog eens.</strong> We schrapten de helft van onze ideeën in het tweede uur en leverden de helft die goed demonstreerde.</li>
          <li><strong>Eén bron van waarheid.</strong> Eén gedeeld state-object hield de 3D-scène en de UI gelijk.</li>
          <li><strong>Oefen de demo.</strong> De jury ziet 3 minuten — die oefenden we vaker dan we durven toegeven.</li>
        </ul>
        <h2>Wat ik anders zou doen</h2>
        <p>Vaker committen, en de data eerder faken zodat de visuals niet om 3 uur 's nachts vastlopen op een wankele API.</p>
        <p><em>Concept — voeg het team, de opdracht en een paar screenshots toe.</em></p>
      `,
    },
  },
  {
    slug: "accessible-portfolio",
    date: "2025-10-05",
    cover: "",
    readMins: 7,
    tags: ["Accessibility", "UX"],
    title: {
      en: "Designing an accessible portfolio: 11 toggles and why they matter",
      nl: "Een toegankelijk portfolio ontwerpen: 11 schakelaars en waarom ze ertoe doen",
    },
    excerpt: {
      en: "Reduce motion, dyslexia-friendly fonts, high contrast, larger text… why I built a real accessibility panel instead of ticking a box.",
      nl: "Beweging verminderen, dyslexie-vriendelijke fonts, hoog contrast, grotere tekst… waarom ik een echt toegankelijkheidspaneel bouwde in plaats van een vinkje.",
    },
    body: {
      en: `
        <p>A flashy portfolio is useless if people can't read it. So I built an accessibility panel with eleven independent toggles, each saved to <code>localStorage</code> so your choice sticks.</p>
        <h2>A few favourites</h2>
        <ul>
          <li><strong>Reduce motion</strong> — kills parallax, tilt and reveals; also respected automatically via <code>prefers-reduced-motion</code>.</li>
          <li><strong>Dyslexia-friendly font</strong> — swaps to Atkinson Hyperlegible.</li>
          <li><strong>Reduce color</strong> — desaturates the page, which helps with migraines.</li>
        </ul>
        <h2>The lesson</h2>
        <p>Accessibility isn't a checklist you bolt on at the end — it changes how you build. Every animation now has an off switch from day one, and the site is better for everyone because of it.</p>
        <p><em>Draft — link to WCAG, and maybe a before/after.</em></p>
      `,
      nl: `
        <p>Een flitsend portfolio is nutteloos als mensen het niet kunnen lezen. Daarom bouwde ik een toegankelijkheidspaneel met elf losse schakelaars, elk opgeslagen in <code>localStorage</code> zodat je keuze blijft.</p>
        <h2>Een paar favorieten</h2>
        <ul>
          <li><strong>Beweging verminderen</strong> — zet parallax, tilt en reveals uit; wordt ook automatisch gerespecteerd via <code>prefers-reduced-motion</code>.</li>
          <li><strong>Dyslexie-vriendelijk font</strong> — wisselt naar Atkinson Hyperlegible.</li>
          <li><strong>Kleur verminderen</strong> — ontkleurt de pagina, wat helpt bij migraine.</li>
        </ul>
        <h2>De les</h2>
        <p>Toegankelijkheid is geen lijstje dat je achteraf vastschroeft — het verandert hoe je bouwt. Elke animatie heeft nu vanaf dag één een uitknop, en de site is daardoor beter voor iedereen.</p>
        <p><em>Concept — link naar WCAG, en misschien een voor/na.</em></p>
      `,
    },
  },
];

(function () {
  "use strict";

  const listEl = document.getElementById("blog-list");
  const articleEl = document.getElementById("blog-article");
  if (!listEl || !articleEl) return;

  const lang = () => (window.I18N && window.I18N.current) || "en";
  const t = (obj) => (obj && (obj[lang()] || obj.en)) || "";

  const UI = {
    en: { back: "← All posts", read: "Read", min: "min read", empty: "No posts yet — check back soon." },
    nl: { back: "← Alle posts", read: "Lezen", min: "min lezen", empty: "Nog geen posts — kom snel terug." },
  };
  const ui = (k) => (UI[lang()] || UI.en)[k];

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(lang() === "nl" ? "nl-NL" : "en-GB", {
      year: "numeric", month: "long", day: "numeric",
    });
  }

  function tagsHTML(tags) {
    return `<div class="blog-tags">${tags.map((x) => `<span class="blog-tag">${x}</span>`).join("")}</div>`;
  }

  function coverHTML(post, big) {
    const cls = big ? "blog-cover blog-cover--lg" : "blog-cover";
    if (post.cover) {
      return `<div class="${cls}"><img src="${post.cover}" alt="" loading="lazy"></div>`;
    }
    // No image → branded gradient placeholder with the post's first tag
    return `<div class="${cls} blog-cover--gradient"><span>${post.tags[0] || ""}</span></div>`;
  }

  function getSlug() {
    return new URLSearchParams(window.location.search).get("slug");
  }

  function renderList() {
    articleEl.hidden = true;
    listEl.hidden = false;

    if (!POSTS.length) {
      listEl.innerHTML = `<p class="blog-empty">${ui("empty")}</p>`;
      return;
    }

    const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
    listEl.innerHTML = sorted
      .map(
        (post) => `
        <article class="blog-card">
          <a class="blog-card-link" href="?slug=${encodeURIComponent(post.slug)}" aria-label="${t(post.title)}" data-cursor="read" data-cursor-nl="lees">
            ${coverHTML(post, false)}
            <div class="blog-card-body">
              <div class="blog-meta">
                <time datetime="${post.date}">${formatDate(post.date)}</time>
                <span class="blog-dot">·</span>
                <span>${post.readMins} ${ui("min")}</span>
              </div>
              <h2 class="blog-card-title">${t(post.title)}</h2>
              <p class="blog-card-excerpt">${t(post.excerpt)}</p>
              ${tagsHTML(post.tags)}
              <span class="blog-readmore">${ui("read")} →</span>
            </div>
          </a>
        </article>`
      )
      .join("");
  }

  function renderArticle(post) {
    listEl.hidden = true;
    articleEl.hidden = false;

    document.title = `${t(post.title)} — Mitchell Scholte`;
    articleEl.innerHTML = `
      <a class="blog-back" href="blog.html" data-cursor="back" data-cursor-nl="terug">${ui("back")}</a>
      <header class="blog-article-head">
        <div class="blog-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span class="blog-dot">·</span>
          <span>${post.readMins} ${ui("min")}</span>
        </div>
        <h1 class="blog-article-title">${t(post.title)}</h1>
        ${tagsHTML(post.tags)}
      </header>
      ${coverHTML(post, true)}
      <div class="blog-article-body">${t(post.body)}</div>
      <a class="blog-back blog-back--bottom" href="blog.html" data-cursor="back" data-cursor-nl="terug">${ui("back")}</a>
    `;
    if (window.scrollTo) window.scrollTo({ top: 0 });
  }

  function route() {
    const slug = getSlug();
    const post = slug ? POSTS.find((p) => p.slug === slug) : null;
    if (post) renderArticle(post);
    else renderList();
  }

  route();
  document.addEventListener("langchange", route);
})();
