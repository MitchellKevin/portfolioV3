/* =============================================
   CASE STUDIES — bilingual (EN / NL), data-driven
   - One renderer drives every case-study page.
   - Each page is a thin shell with <main id="cs-root" data-case="…">.
   - Content lives in CASE_STUDIES below; code snippets are arrays of
     lines rendered via textContent, so no HTML escaping is needed.
   - Re-renders on the global 'langchange' event from i18n.js.
   ============================================= */

const CS_UI = {
  en: { back: "← Back to projects", more: "More projects", contact: "Get in touch",
        problem: "Problem", solution: "Solution", insights: "Insights",
        decisions: "Design decisions" },
  nl: { back: "← Terug naar projecten", more: "Meer projecten", contact: "Neem contact op",
        problem: "Probleem", solution: "Oplossing", insights: "Inzichten",
        decisions: "Ontwerpbeslissingen" },
};

const CASE_STUDIES = {
  /* ===================================================================
     CMD CASINO
     =================================================================== */
  "cmd-casino": {
    liveUrl: "https://wdd-api-scholte.onrender.com/",
    liveLabel: { en: "View live site ↗", nl: "Bekijk live site ↗" },
    eyebrow: { en: "Case study · Full-stack", nl: "Case study · Full-stack" },
    title: "CMD Casino",
    tagline: {
      en: "A full-stack multiplayer casino platform built for my Communication & Multimedia Design degree. Five playable games, real-time multiplayer over WebSockets, an EC-point economy and real iDEAL payments — my first complete full-stack application.",
      nl: "Een full-stack multiplayer casinoplatform gebouwd voor mijn opleiding Communication & Multimedia Design. Vijf speelbare spellen, realtime multiplayer via WebSockets, een EC-punten-economie en echte iDEAL-betalingen — mijn eerste volledige full-stack applicatie.",
    },
    heroImage: "img-projects/cmd-casino/image.png",
    heroAlt: { en: "CMD Casino lobby with the CMD theme", nl: "CMD Casino-lobby met het CMD-thema" },
    tags: ["Astro (SSR)", "Node.js", "MongoDB", "WebSockets (ws)", "Mollie API", "JWT + bcrypt", "ElevenLabs TTS", "Wikipedia API"],
    meta: [
      { label: { en: "Role", nl: "Rol" }, value: { en: "Solo — full-stack", nl: "Solo — full-stack" } },
      { label: { en: "Timeline", nl: "Tijdlijn" }, value: { en: "5 weeks · 2025", nl: "5 weken · 2025" } },
      { label: { en: "Context", nl: "Context" }, value: { en: "CMD — API project", nl: "CMD — API-project" } },
      { label: { en: "APIs", nl: "API's" }, value: { en: "Mollie · ElevenLabs · Wikipedia", nl: "Mollie · ElevenLabs · Wikipedia" } },
    ],
    sections: [
      { type: "prose",
        heading: { en: "Overview", nl: "Overzicht" },
        lead: { en: "The brief: build something API-driven in Astro with one content API and two web APIs, deployed on Render. I chose a casino — a single platform that grew into five games, an account system, a virtual economy and real payments.",
                nl: "De opdracht: bouw iets API-gedreven in Astro met één content-API en twee web-API's, gedeployed op Render. Ik koos voor een casino — één platform dat uitgroeide tot vijf spellen, een accountsysteem, een virtuele economie en echte betalingen." },
        paragraphs: [
          { en: "What started as a single-player Blackjack MVP turned into a multiplayer platform. Players sign up, earn <strong>EC-points</strong> (a nod to the study-credits theme), spend them across games, climb a leaderboard, and even top up with real iDEAL payments through Mollie.",
            nl: "Wat begon als een single-player Blackjack-MVP werd een multiplayer platform. Spelers registreren, verdienen <strong>EC-punten</strong> (een knipoog naar studiepunten), geven ze uit in de spellen, klimmen op de ranglijst en kunnen zelfs bijladen met echte iDEAL-betalingen via Mollie." },
          { en: "A live, AI-generated dealer voice and Wikipedia-powered rule pages round it off.",
            nl: "Een live, AI-gegenereerde dealerstem en Wikipedia-aangedreven spelregelpagina's maken het af." },
        ],
      },
      { type: "cards",
        heading: { en: "Five games, one platform", nl: "Vijf spellen, één platform" },
        lead: { en: "Two of them are real-time multiplayer, synced across players over WebSockets.",
                nl: "Twee daarvan zijn realtime multiplayer, gesynchroniseerd tussen spelers via WebSockets." },
        cards: [
          { mode: { en: "Solo", nl: "Solo" }, title: { en: "Blackjack", nl: "Blackjack" }, desc: { en: "Classic play against the dealer, with double & split.", nl: "Klassiek spelen tegen de dealer, met doubleren & splitsen." } },
          { mode: { en: "Multiplayer", nl: "Multiplayer" }, title: { en: "Blackjack", nl: "Blackjack" }, desc: { en: "Up to 4 players in a shared room via WebSockets.", nl: "Tot 4 spelers in een gedeelde kamer via WebSockets." } },
          { mode: { en: "Solo", nl: "Solo" }, title: { en: "Roulette", nl: "Roulette" }, desc: { en: "Canvas wheel; bet on numbers and colours.", nl: "Canvas-wiel; wed op nummers en kleuren." } },
          { mode: { en: "Solo", nl: "Solo" }, title: { en: "Mines", nl: "Mines" }, desc: { en: "Reveal safe tiles without hitting a mine. Server-authoritative.", nl: "Onthul veilige tegels zonder een mijn te raken. Server-gestuurd." } },
          { mode: { en: "Multiplayer", nl: "Multiplayer" }, title: { en: "Poker", nl: "Poker" }, desc: { en: "Texas Hold'em with multiple players and full hand evaluation.", nl: "Texas Hold'em met meerdere spelers en volledige handevaluatie." } },
        ],
      },
      { type: "tech",
        heading: { en: "Tech stack", nl: "Tech stack" },
        items: [
          { name: "Astro", desc: { en: "SSR mode via the Node.js adapter — pages + API routes in one app.", nl: "SSR-modus via de Node.js-adapter — pagina's + API-routes in één app." } },
          { name: "Node.js", desc: { en: "Custom HTTP server entrypoint that also hosts the WebSocket server.", nl: "Eigen HTTP-server-entrypoint dat ook de WebSocket-server host." } },
          { name: "MongoDB", desc: { en: "Official driver; users, balances and scores.", nl: "Officiële driver; gebruikers, saldi en scores." } },
          { name: "ws", desc: { en: "WebSocket library powering real-time Blackjack & Poker rooms.", nl: "WebSocket-library achter de realtime Blackjack- & Poker-kamers." } },
          { name: "Mollie", desc: { en: "iDEAL payments with a webhook flow to credit EC-points.", nl: "iDEAL-betalingen met een webhook-flow om EC-punten bij te schrijven." } },
          { name: "JWT + bcrypt", desc: { en: "Stateless auth; hashed passwords.", nl: "Stateless authenticatie; gehashte wachtwoorden." } },
          { name: "ElevenLabs", desc: { en: "Text-to-speech for a live dealer voice.", nl: "Text-to-speech voor een live dealerstem." } },
          { name: "Wikipedia API", desc: { en: "Content API serving the in-game rule pages.", nl: "Content-API voor de in-game spelregelpagina's." } },
        ],
      },
      { type: "highlights",
        heading: { en: "Engineering highlights", nl: "Technische hoogtepunten" },
        lead: { en: "The problems that taught me the most — and how I solved them.", nl: "De problemen waar ik het meest van leerde — en hoe ik ze oploste." },
        items: [
          { title: { en: "Blackjack's shape-shifting ace", nl: "De vormveranderende aas in Blackjack" },
            problem: { en: "An ace is worth 1 or 11 depending on the rest of the hand — and with two aces the total broke.", nl: "Een aas is 1 of 11 waard afhankelijk van de rest van de hand — en bij twee azen klopte het totaal niet." },
            solution: { en: "Count every ace as 11 first, then step each one down to 1 while the hand is still over 21.", nl: "Tel elke aas eerst als 11 en zet ze daarna één voor één terug naar 1 zolang de hand boven 21 is." },
            code: { label: "server/gameManager.js", lines: [
              "function handValue(hand) {",
              "  let total = 0, aceCount = 0;",
              "  for (const card of hand) {",
              "    if (card.rank === 'A') { aceCount++; total += 11; }",
              "    else if (['J','Q','K'].includes(card.rank)) total += 10;",
              "    else total += parseInt(card.rank, 10);",
              "  }",
              "  // each ace drops 11 -> 1 until the hand fits",
              "  while (total > 21 && aceCount > 0) { total -= 10; aceCount--; }",
              "  return total;",
              "}",
            ] } },
          { title: { en: "An anti-cheat Mines engine", nl: "Een anti-cheat Mines-engine" },
            problem: { en: "If the browser knows where the mines are, a player can read them straight from DevTools.", nl: "Als de browser weet waar de mijnen liggen, leest een speler ze zo uit via DevTools." },
            solution: { en: "Mine positions never leave the server. They live in a <code>Map</code> keyed by a random <code>gameId</code>; the browser only ever gets that id, and abandoned sessions self-destruct after 15 minutes.", nl: "Mijnposities verlaten de server nooit. Ze leven in een <code>Map</code> met een willekeurige <code>gameId</code> als sleutel; de browser krijgt alleen die id, en verlaten sessies ruimen zichzelf na 15 minuten op." },
            code: { label: "server/minesState.js", lines: [
              "const sessions = new Map();",
              "",
              "export function createSession(userId, bet, minePositions) {",
              "  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);",
              "  sessions.set(id, { userId, bet, minePositions, revealed: new Set() });",
              "  setTimeout(() => sessions.delete(id), 15 * 60 * 1000); // auto-clean",
              "  return id; // browser only ever receives the gameId",
              "}",
            ] },
            image: { src: "img-projects/cmd-casino/image-8.png",
              alt: { en: "Mines game grid", nl: "Mines-spelraster" },
              caption: { en: "Mines — the grid the player sees; the mines stay on the server.", nl: "Mines — het raster dat de speler ziet; de mijnen blijven op de server." } } },
          { title: { en: "Keeping multiplayer in sync", nl: "Multiplayer synchroon houden" },
            problem: { en: "When one player hits or stands, everyone in the room has to see it immediately — otherwise states drift apart.", nl: "Als één speler een kaart trekt of past, moet iedereen in de kamer dat direct zien — anders lopen de spelstaten uiteen." },
            solution: { en: "Rooms live server-side in a <code>Map</code>. After every action the server broadcasts the full sanitized room state to every open socket in that room.", nl: "Kamers leven server-side in een <code>Map</code>. Na elke actie broadcast de server de volledige, opgeschoonde kamerstatus naar elke open socket in die kamer." },
            code: { label: "server/gameManager.js", lines: [
              "const rooms = new Map();",
              "",
              "function broadcastRoom(roomId) {",
              "  const room = rooms.get(roomId);",
              "  if (!room) return;",
              "  const msg = JSON.stringify({ type: 'ROOM_UPDATE', room: sanitizeRoom(room) });",
              "  for (const [ws, player] of room.players) {",
              "    if (ws.readyState === ws.OPEN) ws.send(msg);",
              "  }",
              "}",
            ] },
            image: { src: "img-projects/cmd-casino/image-6.png",
              alt: { en: "Multiplayer Blackjack table", nl: "Multiplayer Blackjack-tafel" },
              caption: { en: "Multiplayer Blackjack — up to four players in one room.", nl: "Multiplayer Blackjack — tot vier spelers in één kamer." } } },
          { title: { en: "Real payments without a public URL", nl: "Echte betalingen zonder publieke URL" },
            problem: { en: "Mollie confirms a payment by calling a webhook on my server — but <code>localhost</code> isn't reachable from the outside during development.", nl: "Mollie bevestigt een betaling door een webhook op mijn server aan te roepen — maar <code>localhost</code> is tijdens ontwikkeling niet van buitenaf bereikbaar." },
            solution: { en: "Derive the base URL from the request headers, and only attach a <code>webhookUrl</code> when the host isn't local. In production Render provides the public URL automatically.", nl: "Leid de base-URL af uit de request-headers en koppel alleen een <code>webhookUrl</code> als de host niet lokaal is. In productie levert Render de publieke URL automatisch." },
            code: { label: "src/pages/api/create-payment.js", lines: [
              "const proto   = request.headers.get('x-forwarded-proto') || 'http';",
              "const host    = request.headers.get('host');",
              "const baseUrl = `${proto}://${host}`;",
              "const isLocal = host.includes('localhost');",
              "",
              "const payment = await mollie.payments.create({",
              "  amount:      { currency: 'EUR', value: pkg.price },",
              "  redirectUrl: `${baseUrl}/shop?payment=success`,",
              "  ...(!isLocal && { webhookUrl: `${baseUrl}/api/webhook` }),",
              "  metadata:    { packageId, userId: String(user._id) },",
              "});",
            ] },
            image: { src: "img-projects/cmd-casino/image-4.png",
              alt: { en: "Mollie payment page in test mode", nl: "Mollie-betaalpagina in testmodus" },
              caption: { en: "The Mollie iDEAL checkout (test mode).", nl: "De Mollie iDEAL-checkout (testmodus)." } } },
          { title: { en: "A talking dealer — cached", nl: "Een pratende dealer — gecachet" },
            problem: { en: "Calling ElevenLabs for every line the dealer says was slow and burned through API credits.", nl: "ElevenLabs aanroepen voor elke zin van de dealer was traag en verbruikte API-credits." },
            solution: { en: "A small in-memory cache keyed by the spoken text. Repeated phrases (\"Dealer wins\", \"Blackjack!\") replay instantly and never hit the API twice.", nl: "Een kleine in-memory cache met de gesproken tekst als sleutel. Herhaalde zinnen (\"Dealer wint\", \"Blackjack!\") spelen direct af en raken de API nooit twee keer." },
            code: { label: "src/pages/api/tts.js", lines: [
              "const cache = new Map();",
              "",
              "export async function GET({ request }) {",
              "  const text = new URL(request.url).searchParams.get('text');",
              "  if (cache.has(text)) return audio(cache.get(text)); // instant replay",
              "",
              "  const res = await fetch(`${API}/text-to-speech/${voiceId}`, {",
              "    method: 'POST',",
              "    headers: { 'xi-api-key': key, 'Accept': 'audio/mpeg' },",
              "    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2' }),",
              "  });",
              "  const buf = await res.arrayBuffer();",
              "  cache.set(text, buf);",
              "  return audio(buf);",
              "}",
            ] } },
          { title: { en: "Game rules, straight from Wikipedia", nl: "Spelregels, rechtstreeks van Wikipedia" },
            problem: { en: "I needed a genuine content API. Wikipedia articles are huge, full of noise, and I didn't want to hit them on every page view.", nl: "Ik had een echte content-API nodig. Wikipedia-artikelen zijn enorm, vol ruis, en ik wilde ze niet bij elk paginabezoek aanroepen." },
            solution: { en: "Fetch plain text, split it into sections with a back-referencing regex, cache it for an hour, and escape everything before it touches <code>innerHTML</code> to block XSS from a malicious edit.", nl: "Platte tekst ophalen, met een terugverwijzende regex in secties splitsen, een uur cachen, en alles escapen vóór het <code>innerHTML</code> raakt om XSS via een kwaadaardige bewerking te blokkeren." },
            image: { src: "img-projects/cmd-casino/image-10.png",
              alt: { en: "In-game rules page powered by Wikipedia", nl: "In-game spelregelpagina aangedreven door Wikipedia" },
              caption: { en: "Each game's rules, pulled live from the Wikipedia API.", nl: "De regels van elk spel, live opgehaald via de Wikipedia-API." } } },
        ],
      },
      { type: "prose",
        heading: { en: "A few more decisions under the hood", nl: "Nog een paar keuzes onder de motorkap" },
        paragraphs: [
          { en: "<strong>One database connection, not hundreds.</strong> My first version created a new <code>MongoClient</code> on every request and crawled. A singleton that reuses one connection for the server's lifetime fixed it instantly.",
            nl: "<strong>Eén databaseverbinding, geen honderden.</strong> Mijn eerste versie maakte bij elke request een nieuwe <code>MongoClient</code> en kroop. Een singleton die één verbinding hergebruikt voor de hele serverlevensduur loste het direct op." },
          { en: "<strong>Stateless auth.</strong> Login issues a JWT that the browser sends back as a <code>Bearer</code> token <em>or</em> a cookie; the server verifies the signature without a database round-trip.",
            nl: "<strong>Stateless authenticatie.</strong> Inloggen geeft een JWT die de browser terugstuurt als <code>Bearer</code>-token <em>of</em> cookie; de server verifieert de handtekening zonder de database te raadplegen." },
          { en: "<strong>Theming as constraint.</strong> Coins became <em>EC-points</em> and the shop sells <em>study subjects</em> — keeping the whole thing inside the CMD theme instead of a generic casino.",
            nl: "<strong>Thema als constraint.</strong> Coins werden <em>EC-punten</em> en de shop verkoopt <em>studievakken</em> — zo blijft het geheel binnen het CMD-thema in plaats van een generiek casino." },
        ],
      },
      { type: "timeline",
        heading: { en: "The five-week build", nl: "De bouw in vijf weken" },
        items: [
          { week: { en: "Week 1 · Concept", nl: "Week 1 · Concept" },
            title: { en: "Pitching a gambling site", nl: "Een gokwebsite pitchen" },
            text: { en: "The brief allowed any subject as long as it met the tech requirements: Astro, JavaScript, CSS and Render, with one content API and two web APIs. Early feedback: a database doesn't count as a \"web API\", so I had to find another one.",
                    nl: "De opdracht stond elk onderwerp toe zolang het aan de technische eisen voldeed: Astro, JavaScript, CSS en Render, met één content-API en twee web-API's. Vroege feedback: een database telt niet als \"web-API\", dus ik moest een andere vinden." } },
          { week: { en: "Week 2 · MVP", nl: "Week 2 · MVP" },
            title: { en: "Single-player Blackjack", nl: "Single-player Blackjack" },
            text: { en: "Built the UI, game flow and core logic — including the tricky ace handling — and added <code>localStorage</code> so the session and token survive a refresh. Feedback was blunt but right: tidy the layout before chasing complex features.",
                    nl: "UI, spelflow en kernlogica gebouwd — inclusief de lastige aas-logica — en <code>localStorage</code> toegevoegd zodat sessie en token een refresh overleven. De feedback was bot maar terecht: maak de layout netjes voordat je complexe features najaagt." } },
          { week: { en: "Week 3 · Theme & accounts", nl: "Week 3 · Thema & accounts" },
            title: { en: "The CMD identity takes shape", nl: "De CMD-identiteit krijgt vorm" },
            text: { en: "Redesigned the UI around a CMD theme, swapped coins for EC-points, and added a subjects shop where you spend points toward your \"diploma\". MongoDB accounts went in (with the connection-singleton fix) plus JWT auth — and a Doctor Who easter egg: usernames containing \"cyd\" get a special avatar.",
                    nl: "De UI herontworpen rond een CMD-thema, coins vervangen door EC-punten, en een vakkenshop toegevoegd waar je punten uitgeeft voor je \"diploma\". MongoDB-accounts erbij (met de connection-singleton-fix) plus JWT-auth — en een Doctor Who-easter-egg: gebruikersnamen met \"cyd\" krijgen een speciale avatar." },
            images: [
              { src: "img-projects/cmd-casino/image-1.png", alt: { en: "The subjects shop", nl: "De vakkenshop" } },
              { src: "img-projects/cmd-casino/image-2.png", alt: { en: "Doctor Who easter-egg avatar", nl: "Doctor Who-easter-egg-avatar" } },
            ] },
          { week: { en: "Week 4 · Payments & multiplayer", nl: "Week 4 · Betalingen & multiplayer" },
            title: { en: "Real money and real-time play", nl: "Echt geld en realtime spel" },
            text: { en: "Integrated Mollie for iDEAL payments (and solved the localhost webhook problem), finished the leaderboard, and added WebSocket-based multiplayer Blackjack — my first taste of keeping shared state in sync across clients.",
                    nl: "Mollie geïntegreerd voor iDEAL-betalingen (en het localhost-webhookprobleem opgelost), de ranglijst afgemaakt, en WebSocket-multiplayer Blackjack toegevoegd — mijn eerste ervaring met gedeelde staat synchroon houden tussen clients." },
            images: [
              { src: "img-projects/cmd-casino/image-3.png", alt: { en: "Leaderboard", nl: "Ranglijst" } },
              { src: "img-projects/cmd-casino/image-5.png", alt: { en: "Leaderboard with the easter egg", nl: "Ranglijst met de easter egg" } },
            ] },
          { week: { en: "Week 5 · More games & content", nl: "Week 5 · Meer spellen & content" },
            title: { en: "Roulette, Mines, Poker & a voice", nl: "Roulette, Mines, Poker & een stem" },
            text: { en: "Added Roulette and the server-authoritative Mines game, then multiplayer Poker with full Texas Hold'em hand evaluation (the best 5 of 7 cards across all 21 combinations). Integrated ElevenLabs for a live dealer voice, calmed down the too-busy playing background, and finally added the Wikipedia content API for in-game rules.",
                    nl: "Roulette en het server-gestuurde Mines-spel toegevoegd, daarna multiplayer Poker met volledige Texas Hold'em-handevaluatie (de beste 5 van 7 kaarten over alle 21 combinaties). ElevenLabs geïntegreerd voor een live dealerstem, de te drukke spelachtergrond gekalmeerd, en eindelijk de Wikipedia-content-API voor in-game regels toegevoegd." },
            images: [
              { src: "img-projects/cmd-casino/image-7.png", alt: { en: "Roulette wheel", nl: "Roulettewiel" } },
              { src: "img-projects/cmd-casino/image-9.png", alt: { en: "Poker table", nl: "Pokertafel" } },
              { src: "img-projects/cmd-casino/image-11.png", alt: { en: "The earlier, busier background", nl: "De eerdere, drukkere achtergrond" } },
            ] },
        ],
      },
      { type: "checklist",
        heading: { en: "Feedback, addressed", nl: "Feedback, verwerkt" },
        lead: { en: "Every point raised in the weekly reviews made it into the final build.", nl: "Elk punt uit de wekelijkse reviews zit in de uiteindelijke build." },
        items: [
          { en: "Add sound & a content API", nl: "Geluid & een content-API toevoegen" },
          { en: "Tidy the layout, space & focus", nl: "Layout netter, ruimte & focus" },
          { en: "Add multiplayer", nl: "Multiplayer toevoegen" },
          { en: "Apply the CMD style", nl: "CMD-stijl toepassen" },
          { en: "EC-points instead of coins", nl: "EC-punten in plaats van coins" },
          { en: "Subjects page", nl: "Vakkenpagina" },
          { en: "Double & split in Blackjack", nl: "Doubleren & splitsen in Blackjack" },
          { en: "Fix the leaderboard", nl: "Ranglijst fixen" },
          { en: "Add a favicon", nl: "Favicon toevoegen" },
          { en: "Calm the busy game background", nl: "De drukke spelachtergrond kalmeren" },
        ],
      },
      { type: "cta",
        heading: { en: "Want to play a hand?", nl: "Zin in een potje?" },
        text: { en: "The full platform is live on Render.", nl: "Het volledige platform draait live op Render." } },
    ],
  },

  /* ===================================================================
     HCD — VoiceReader
     =================================================================== */
  "hcd": {
    liveUrl: "https://mitchellkevin.github.io/HCD/",
    liveLabel: { en: "View the project ↗", nl: "Bekijk het project ↗" },
    eyebrow: { en: "Case study · Human-Centered Design", nl: "Case study · Human-Centered Design" },
    title: "VoiceReader",
    tagline: {
      en: "A Chrome extension that gives a screen reader emotional depth — adapting the reading voice to the mood and context of a page. Built hand-in-hand with a blind user across four weeks of testing, for my Human-Centered Design course.",
      nl: "Een Chrome-extensie die een screenreader emotionele diepte geeft — de voorleesstem past zich aan de sfeer en context van een pagina aan. Gebouwd samen met een blinde gebruiker over vier weken testen, voor mijn vak Human-Centered Design.",
    },
    heroImage: "img-projects/hcd/voicereader-new.png",
    heroAlt: { en: "VoiceReader's redesigned, accessible interface", nl: "De heron­tworpen, toegankelijke interface van VoiceReader" },
    tags: ["Chrome Extension (MV3)", "ElevenLabs TTS", "Google Gemini", "Anthropic Claude", "Web Audio API", "ARIA / WCAG 2.1 AA", "Vanilla JS"],
    meta: [
      { label: { en: "Role", nl: "Rol" }, value: { en: "Solo — design & build", nl: "Solo — ontwerp & bouw" } },
      { label: { en: "Timeline", nl: "Tijdlijn" }, value: { en: "4 weeks · 2025", nl: "4 weken · 2025" } },
      { label: { en: "Context", nl: "Context" }, value: { en: "CMD — Human-Centered Design", nl: "CMD — Human-Centered Design" } },
      { label: { en: "Tested with", nl: "Getest met" }, value: { en: "A blind primary user + a Philips PM", nl: "Een blinde hoofdgebruiker + een Philips-PM" } },
    ],
    sections: [
      { type: "prose",
        heading: { en: "Overview", nl: "Overzicht" },
        lead: { en: "The brief: design for one real person. My user, Ihab, is blind and relies on a screen reader all day. His biggest frustration wasn't speed — it was that every voice reads in the same flat, neutral tone, no matter the content.",
                nl: "De opdracht: ontwerp voor één echte persoon. Mijn gebruiker, Ihab, is blind en gebruikt de hele dag een screenreader. Zijn grootste frustratie was niet de snelheid — maar dat elke stem voorleest in hetzelfde vlakke, neutrale toontje, ongeacht de inhoud." },
        paragraphs: [
          { en: "VoiceReader detects the genre of a page with AI and reads it back in a matching voice — a tense tone for horror, a businesslike tone for news, an expressive one for fiction. Detection is automatic, but the user always keeps manual control.",
            nl: "VoiceReader detecteert met AI het genre van een pagina en leest die voor in een bijpassende stem — een spannende toon bij horror, een zakelijke bij nieuws, een expressieve bij fictie. De detectie is automatisch, maar de gebruiker houdt altijd handmatige controle." },
          { en: "Over four weeks it grew from a rough Chrome extension into a polished accessibility product — driven entirely by what real users told me in testing.",
            nl: "In vier weken groeide het van een ruwe Chrome-extensie naar een verzorgd toegankelijkheidsproduct — volledig gestuurd door wat echte gebruikers me tijdens het testen vertelden." },
        ],
      },
      { type: "cards",
        heading: { en: "What it does", nl: "Wat het doet" },
        cards: [
          { title: { en: "Genre-aware voices", nl: "Genrebewuste stemmen" }, desc: { en: "Horror, news, tech, fiction, poetry — each gets its own ElevenLabs voice and delivery.", nl: "Horror, nieuws, tech, fictie, poëzie — elk krijgt zijn eigen ElevenLabs-stem en voordracht." } },
          { title: { en: "Automatic genre detection", nl: "Automatische genre-detectie" }, desc: { en: "AI reads the page and picks the mood; a manual override is always available.", nl: "AI leest de pagina en kiest de sfeer; een handmatige override is altijd beschikbaar." } },
          { title: { en: "Spoken AI summary", nl: "Gesproken AI-samenvatting" }, desc: { en: "A 2–3 sentence summary of any page, read aloud.", nl: "Een samenvatting van 2–3 zinnen van elke pagina, hardop voorgelezen." } },
          { title: { en: "Full keyboard control", nl: "Volledige toetsenbordbediening" }, desc: { en: "Alt+Shift+R / P / S to read, pause and stop — no mouse needed.", nl: "Alt+Shift+R / P / S om te lezen, pauzeren en stoppen — geen muis nodig." } },
          { title: { en: "Live highlighting", nl: "Live markering" }, desc: { en: "The sentence being read is highlighted and scrolled into view.", nl: "De zin die wordt voorgelezen wordt gemarkeerd en in beeld gescrold." } },
          { title: { en: "Interest-based styles", nl: "Stemmen op interesse" }, desc: { en: "Voice styles tuned to the user's interests: anime, sports commentary.", nl: "Stemstijlen afgestemd op de interesses van de gebruiker: anime, sportverslaggeving." } },
        ],
      },
      { type: "tech",
        heading: { en: "Tech stack", nl: "Tech stack" },
        items: [
          { name: "Chrome (MV3)", desc: { en: "Manifest V3 — popup, content script and a background service worker.", nl: "Manifest V3 — popup, content script en een background service worker." } },
          { name: "ElevenLabs", desc: { en: "Realistic multilingual TTS, one voice per genre and style.", nl: "Realistische meertalige TTS, één stem per genre en stijl." } },
          { name: "Google Gemini", desc: { en: "Free-tier AI for genre detection & summaries (after Claude's credits ran out).", nl: "Gratis AI voor genre-detectie & samenvattingen (nadat Claudes credits op waren)." } },
          { name: "Anthropic Claude", desc: { en: "The initial AI for context analysis, called directly from the browser.", nl: "De eerste AI voor contextanalyse, direct vanuit de browser aangeroepen." } },
          { name: "Web Audio API", desc: { en: "Decoding and playing the streamed TTS audio.", nl: "Decoderen en afspelen van de gestreamde TTS-audio." } },
          { name: "ARIA / WCAG 2.1 AA", desc: { en: "Accessible popup, focus styles and labelled controls throughout.", nl: "Toegankelijke popup, focus-stijlen en gelabelde knoppen overal." } },
        ],
      },
      { type: "highlights",
        heading: { en: "Engineering highlights", nl: "Technische hoogtepunten" },
        lead: { en: "A browser extension that talks, listens to AI and never trips over itself.", nl: "Een browser-extensie die praat, naar AI luistert en zichzelf nooit in de weg zit." },
        items: [
          { title: { en: "Injecting the reader into any tab", nl: "De reader in elk tabblad injecteren" },
            problem: { en: "The extension didn't load its content script into tabs that were already open before install.", nl: "De extensie laadde haar content script niet in tabbladen die al open stonden vóór de installatie." },
            solution: { en: "Inject the script with <code>chrome.scripting.executeScript</code> on every Play, so it's guaranteed to be present.", nl: "Injecteer het script met <code>chrome.scripting.executeScript</code> bij elke Play, zodat het altijd aanwezig is." },
            code: { label: "popup.js", lines: [
              "chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {",
              "  chrome.scripting.executeScript(",
              "    { target: { tabId: tab.id }, files: ['content.js'] }",
              "  );",
              "});",
            ] } },
          { title: { en: "Pause that actually resumes", nl: "Pauze die echt hervat" },
            problem: { en: "Pausing lost the position, so resuming restarted the whole page.", nl: "Pauzeren verloor de positie, dus hervatten begon de hele pagina opnieuw." },
            solution: { en: "Track the block and sentence index on pause and pass them back into <code>startReading()</code> on resume.", nl: "Hou de blok- en zin-index bij bij pauze en geef ze bij hervatten terug aan <code>startReading()</code>." },
            code: { label: "content.js", lines: [
              "let pausedBlockIndex    = 0;",
              "let pausedSentenceIndex = 0;",
              "",
              "chrome.runtime.onMessage.addListener((msg) => {",
              "  if (msg.type === 'RESUME') {",
              "    // resume exactly where we stopped",
              "    startReading(currentGenre, pausedBlockIndex, pausedSentenceIndex);",
              "  }",
              "});",
            ] } },
          { title: { en: "Killing overlapping audio", nl: "Overlappende audio uitschakelen" },
            problem: { en: "Hitting Play quickly played multiple reading sessions on top of each other.", nl: "Snel op Play klikken speelde meerdere leessessies over elkaar heen." },
            solution: { en: "A <code>readingGeneration</code> counter increments on every stop; any fetch that finishes for an old generation is ignored.", nl: "Een <code>readingGeneration</code>-teller hoogt op bij elke stop; elke fetch die voor een oude generatie terugkomt wordt genegeerd." },
            code: { label: "content.js", lines: [
              "let readingGeneration = 0;",
              "",
              "function stopReading() {",
              "  readingGeneration++; // invalidates every in-flight fetch",
              "  isReading = false;",
              "  if (currentSource) { currentSource.stop(); currentSource = null; }",
              "}",
              "",
              "async function speakSentence(text, genre) {",
              "  const gen = readingGeneration; // capture before the fetch",
              "  const res = await fetchAudio(text, genre);",
              "  if (gen !== readingGeneration) return; // stale session, ignore",
              "  await playBase64Audio(res.base64);",
              "}",
            ] } },
          { title: { en: "Finding a free brain", nl: "Een gratis brein vinden" },
            problem: { en: "Claude is a paid model — a barrier for a free prototype (a point my Philips tester raised) — and its credits ran out mid-project. Gemini's model name also varied across API versions.", nl: "Claude is een betaald model — een drempel voor een gratis prototype (zoals mijn Philips-tester opmerkte) — en de credits raakten halverwege op. Ook varieerde Gemini's modelnaam per API-versie." },
            solution: { en: "Switch to Gemini's free tier and auto-discover the model: fetch the available models and pick the best one.", nl: "Overstappen op Gemini's gratis tier en het model automatisch ontdekken: haal de beschikbare modellen op en kies de beste." },
            code: { label: "background.js", lines: [
              "async function discoverGeminiModel(key) {",
              "  const res  = await fetch(",
              "    `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`",
              "  );",
              "  const data = await res.json();",
              "  const models = (data.models || [])",
              "    .filter(m => m.supportedGenerationMethods?.includes('generateContent'))",
              "    .map(m => m.name.replace('models/', ''));",
              "",
              "  const preferred = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];",
              "  return preferred.find(p => models.includes(p)) || models[0] || null;",
              "}",
            ] } },
          { title: { en: "Showing what's being read", nl: "Tonen wat er wordt voorgelezen" },
            problem: { en: "Sighted helpers (and the user's low-vision peers) had no idea which sentence was being spoken.", nl: "Ziende helpers (en de slechtziende peers van de gebruiker) hadden geen idee welke zin werd uitgesproken." },
            solution: { en: "Add an <code>.hvsr-active</code> class to the current block and smoothly scroll it into view — an accessibility win that doubles as a demo aid.", nl: "Voeg een <code>.hvsr-active</code>-klasse toe aan het huidige blok en scrol het soepel in beeld — een toegankelijkheidswinst die meteen als demo-hulp werkt." },
            code: { label: "content.js", lines: [
              "function setActiveBlock(el) {",
              "  document.querySelectorAll('.hvsr-active')",
              "    .forEach(e => e.classList.remove('hvsr-active'));",
              "  if (el) {",
              "    el.classList.add('hvsr-active');",
              "    el.scrollIntoView({ behavior: 'smooth', block: 'center' });",
              "  }",
              "}",
            ] } },
        ],
      },
      { type: "prose",
        heading: { en: "Two gotchas worth remembering", nl: "Twee valkuilen om te onthouden" },
        paragraphs: [
          { en: "<strong>Calling Claude from the browser</strong> is blocked by CORS until you send the <code>anthropic-dangerous-direct-browser-access: true</code> header.",
            nl: "<strong>Claude vanuit de browser aanroepen</strong> wordt door CORS geblokkeerd totdat je de header <code>anthropic-dangerous-direct-browser-access: true</code> meestuurt." },
          { en: "<strong>Gemini's REST API uses camelCase.</strong> The field is <code>systemInstruction</code>, not <code>system_instruction</code> — the snake_case version silently throws a JSON error.",
            nl: "<strong>Gemini's REST-API gebruikt camelCase.</strong> Het veld heet <code>systemInstruction</code>, niet <code>system_instruction</code> — de snake_case-variant gooit stilletjes een JSON-fout." },
        ],
      },
      { type: "compare",
        heading: { en: "A redesign driven by a stranger", nl: "Een herontwerp door een buitenstaander" },
        lead: { en: "User Test 3 was a Philips Health PM who would never use a screen reader herself. Her verdict: the tool looked too technical — people without a disability would bail before trying it, and a product that looks \"disabled\" undermines trust even for its core users. So I rebuilt the whole UI.",
                nl: "Gebruikerstest 3 was een Philips Health-PM die zelf nooit een screenreader zou gebruiken. Haar oordeel: de tool zag er te technisch uit — mensen zonder beperking haken af voordat ze het proberen, en een product dat er \"gehandicapt\" uitziet ondermijnt het vertrouwen, óók bij de primaire doelgroep. Dus bouwde ik de hele UI opnieuw." },
        before: { src: "img-projects/hcd/voicereader-old.png", label: { en: "Before — bare and technical", nl: "Voor — kaal en technisch" } },
        after: { src: "img-projects/hcd/voicereader-new.png", label: { en: "After — design tokens, waveform, progress and WCAG AA focus", nl: "Na — design tokens, waveform, voortgang en WCAG AA-focus" } },
      },
      { type: "research",
        heading: { en: "Designed with real users", nl: "Ontworpen mét echte gebruikers" },
        lead: { en: "Four rounds of testing shaped every major decision. The most valuable feedback came from people, not code.", nl: "Vier testrondes vormden elke grote beslissing. De waardevolste feedback kwam van mensen, niet van code." },
        items: [
          { person: { en: "Ihab — primary user (blind)", nl: "Ihab — hoofdgebruiker (blind)" },
            meta: { en: "User Test 1 · Week 1", nl: "Gebruikerstest 1 · Week 1" },
            insights: [
              { en: "Buttons <strong>must</strong> be labelled — the single biggest pain point.", nl: "Knoppen <strong>moeten</strong> gelabeld zijn — veruit het grootste pijnpunt." },
              { en: "Keyboard shortcuts are essential; visual interfaces are unusable.", nl: "Sneltoetsen zijn essentieel; visuele interfaces zijn onbruikbaar." },
              { en: "A short page summary is highly wanted, and mood detection must be fast (under 30s).", nl: "Een korte paginasamenvatting is erg gewenst, en sfeerdetectie moet snel zijn (onder 30s)." },
              { en: "The voice's language must match the page's language.", nl: "De taal van de stem moet overeenkomen met die van de pagina." },
            ],
            decisions: [
              { en: "Added Alt+Shift shortcuts for read / pause / stop.", nl: "Alt+Shift-sneltoetsen toegevoegd voor lezen / pauze / stop." },
              { en: "Added an AI summary button and automatic genre detection with manual override.", nl: "Een AI-samenvattingsknop en automatische genre-detectie met handmatige override toegevoegd." },
            ] },
          { person: { en: "User Test 2", nl: "Gebruikerstest 2" },
            meta: { en: "Week 2", nl: "Week 2" },
            insights: [
              { en: "The extension must be fully keyboard-operable, with dynamic speed.", nl: "De extensie moet volledig met toetsenbord bedienbaar zijn, met dynamische snelheid." },
              { en: "Idea: scan and describe images (a social-media use case).", nl: "Idee: afbeeldingen scannen en omschrijven (een social-media-usecase)." },
            ],
            decisions: [
              { en: "Build a standalone HTML prototype so the user can test independently.", nl: "Een losse HTML-prototype bouwen zodat de gebruiker zelfstandig kan testen." },
              { en: "Make the extension itself ARIA-accessible.", nl: "De extensie zelf ARIA-toegankelijk maken." },
            ] },
          { person: { en: "Project Manager — Philips Health", nl: "Project Manager — Philips Health" },
            meta: { en: "User Test 3 · Week 3", nl: "Gebruikerstest 3 · Week 3" },
            insights: [
              { en: "API cost is a barrier — a paid model doesn't fit a free prototype.", nl: "API-kosten zijn een drempel — een betaald model past niet bij een gratis prototype." },
              { en: "Accessible ≠ ugly: a good-looking UI widens adoption and signals quality.", nl: "Toegankelijk ≠ lelijk: een mooie UI verbreedt de adoptie en straalt kwaliteit uit." },
            ],
            decisions: [
              { en: "Switched Claude → Gemini (free tier, 1,500 requests/day).", nl: "Claude → Gemini gewisseld (gratis tier, 1.500 verzoeken/dag)." },
              { en: "Full UI redesign with design tokens, waveform and progress bar.", nl: "Volledige UI-herontwerp met design tokens, waveform en voortgangsbalk." },
            ] },
          { person: { en: "User Test 4", nl: "Gebruikerstest 4" },
            meta: { en: "Week 4", nl: "Week 4" },
            insights: [
              { en: "Pauses between sentences were too long; shortcuts had broken again.", nl: "Pauzes tussen zinnen waren te lang; sneltoetsen waren weer stuk." },
              { en: "Audio overlapped when replaying quickly; the summary couldn't be stopped.", nl: "Audio overlapte bij snel opnieuw afspelen; de samenvatting kon niet gestopt worden." },
            ],
            decisions: [
              { en: "Implemented the <code>readingGeneration</code> fix for overlapping audio.", nl: "De <code>readingGeneration</code>-fix voor overlappende audio doorgevoerd." },
              { en: "Real AI summaries via Gemini, fixed shortcuts, and a stop that also halts the summary.", nl: "Echte AI-samenvattingen via Gemini, sneltoetsen gefixt, en een stop die ook de samenvatting afbreekt." },
            ] },
        ],
      },
      { type: "timeline",
        heading: { en: "The four-week journey", nl: "De reis in vier weken" },
        items: [
          { week: { en: "Week 1 · Build & first test", nl: "Week 1 · Bouwen & eerste test" },
            title: { en: "Concept to working voices", nl: "Van concept tot werkende stemmen" },
            text: { en: "Built the MV3 extension (manifest, popup, content script, background worker) and integrated ElevenLabs for genre voices. The first test with Ihab led to Claude-based detection, pause/resume and speed control.",
                    nl: "De MV3-extensie gebouwd (manifest, popup, content script, background worker) en ElevenLabs geïntegreerd voor genrestemmen. De eerste test met Ihab leidde tot Claude-detectie, pauze/hervat en snelheidsregeling." } },
          { week: { en: "Week 2 · Testing & refining", nl: "Week 2 · Testen & verfijnen" },
            title: { en: "Real testing is hard", nl: "Echt testen is lastig" },
            text: { en: "Tested with Ihab on my own laptop (the extension couldn't be shared remotely) and added a summary and more speed control. Feedback: testing on my machine isn't real — build something Ihab can open himself.",
                    nl: "Met Ihab getest op mijn eigen laptop (de extensie was niet op afstand te delen) en een samenvatting plus meer snelheidsregeling toegevoegd. Feedback: testen op mijn machine is niet echt — bouw iets dat Ihab zelf kan openen." } },
          { week: { en: "Week 3 · Conference & a pivot", nl: "Week 3 · Conferentie & een pivot" },
            title: { en: "Stepping back", nl: "Een stap terug" },
            text: { en: "Away at the Smashing Conference, so no coding. Reviewed the test notes and decided to build a standalone HTML prototype so Ihab could test on his own laptop, without me beside him.",
                    nl: "Op de Smashing Conference, dus geen code. De testnotities doorgenomen en besloten een losse HTML-prototype te bouwen zodat Ihab op zijn eigen laptop kon testen, zonder mij ernaast." } },
          { week: { en: "Week 4 · Redesign & polish", nl: "Week 4 · Herontwerp & afwerking" },
            title: { en: "A real accessibility product", nl: "Een echt toegankelijkheidsproduct" },
            text: { en: "Built the standalone prototype and fully redesigned the UI: design tokens, a waveform animation, a progress bar, ARIA labels and WCAG 2.1 AA focus styles. Added interest-based voice styles (anime, sports), switched to Gemini when Claude's credits ran out, then ported everything back into the extension.",
                    nl: "De losse prototype gebouwd en de UI volledig herontworpen: design tokens, een waveform-animatie, een voortgangsbalk, ARIA-labels en WCAG 2.1 AA-focus-stijlen. Stemstijlen op interesse toegevoegd (anime, sport), naar Gemini overgestapt toen Claudes credits op waren, en alles teruggebracht naar de extensie." } },
        ],
      },
      { type: "cta",
        heading: { en: "Curious how it sounds?", nl: "Benieuwd hoe het klinkt?" },
        text: { en: "VoiceReader is a Chrome extension built around one real user's needs.", nl: "VoiceReader is een Chrome-extensie gebouwd rond de behoeften van één echte gebruiker." } },
    ],
  },
};

/* =============================================================
   RENDERER
   ============================================================= */
(function () {
  const root = document.getElementById("cs-root");
  if (!root) return;
  const data = CASE_STUDIES[root.dataset.case];
  if (!data) { root.innerHTML = "<p style='padding:140px 1.5rem'>Case study not found.</p>"; return; }

  const lang = () => (window.I18N && window.I18N.current) || "en";
  const L = (v) => (v == null ? "" : (typeof v === "string" ? v : (v[lang()] || v.en || "")));
  const UI = (k) => (CS_UI[lang()] || CS_UI.en)[k];

  function h(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function codeBlock(label, lines) {
    const frag = document.createDocumentFragment();
    if (label) { const l = h("span", "cs-code-label"); l.textContent = label; frag.appendChild(l); }
    const pre = h("pre", "cs-code");
    const code = document.createElement("code");
    code.textContent = lines.join("\n");
    pre.appendChild(code);
    frag.appendChild(pre);
    return frag;
  }
  function ps(kind, html) {
    const d = h("div", "cs-ps cs-ps--" + kind);
    const lbl = h("span", "cs-ps-label");
    lbl.textContent = UI(kind);
    d.appendChild(lbl);
    d.appendChild(h("p", null, html));
    return d;
  }
  function figure(src, alt, caption) {
    const fig = h("figure");
    const img = document.createElement("img");
    img.src = src; img.alt = L(alt) || ""; img.loading = "lazy";
    fig.appendChild(img);
    if (caption) { const fc = h("figcaption"); fc.innerHTML = L(caption); fig.appendChild(fc); }
    return fig;
  }

  /* ---- section renderers ---- */
  const R = {
    prose(s) {
      const sec = h("section", "cs-section cs-body");
      sec.appendChild(h("h2", null, L(s.heading)));
      if (s.lead) sec.appendChild(h("p", "cs-section-lead", L(s.lead)));
      (s.paragraphs || []).forEach((p) => sec.appendChild(h("p", null, L(p))));
      return sec;
    },
    cards(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      if (s.lead) sec.appendChild(h("p", "cs-section-lead", L(s.lead)));
      const grid = h("div", "cs-cards");
      s.cards.forEach((c) => {
        const card = h("div", "cs-card");
        if (c.mode) card.appendChild(h("span", "cs-card-mode", L(c.mode)));
        card.appendChild(h("h3", null, L(c.title)));
        card.appendChild(h("p", null, L(c.desc)));
        grid.appendChild(card);
      });
      sec.appendChild(grid);
      return sec;
    },
    tech(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      const grid = h("div", "cs-tech");
      s.items.forEach((it) => {
        const item = h("div", "cs-tech-item");
        item.appendChild(h("strong", null, it.name));
        item.appendChild(h("span", null, L(it.desc)));
        grid.appendChild(item);
      });
      sec.appendChild(grid);
      return sec;
    },
    highlights(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      if (s.lead) sec.appendChild(h("p", "cs-section-lead", L(s.lead)));
      s.items.forEach((it) => {
        const row = h("div", "cs-highlight");
        const c1 = h("div");
        c1.appendChild(h("h3", null, L(it.title)));
        c1.appendChild(ps("problem", L(it.problem)));
        c1.appendChild(ps("solution", L(it.solution)));
        const hasImg = !!it.image;
        if (it.code && hasImg) c1.appendChild(codeBlock(it.code.label, it.code.lines));
        row.appendChild(c1);
        const c2 = h("div");
        if (hasImg) c2.appendChild(figure(it.image.src, it.image.alt, it.image.caption));
        else if (it.code) c2.appendChild(codeBlock(it.code.label, it.code.lines));
        row.appendChild(c2);
        sec.appendChild(row);
      });
      return sec;
    },
    compare(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      if (s.lead) sec.appendChild(h("p", "cs-section-lead", L(s.lead)));
      const grid = h("div", "cs-compare");
      [s.before, s.after].forEach((f) => grid.appendChild(figure(f.src, null, f.label)));
      sec.appendChild(grid);
      return sec;
    },
    research(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      if (s.lead) sec.appendChild(h("p", "cs-section-lead", L(s.lead)));
      const grid = h("div", "cs-research");
      s.items.forEach((it) => {
        const card = h("div", "cs-research-card");
        card.appendChild(h("h3", null, L(it.person)));
        card.appendChild(h("span", "cs-research-meta", L(it.meta)));
        [["insights", it.insights], ["decisions", it.decisions]].forEach(([key, list]) => {
          if (!list || !list.length) return;
          card.appendChild(h("span", "cs-research-label", UI(key)));
          const ul = h("ul", "cs-sublist");
          list.forEach((li) => ul.appendChild(h("li", null, L(li))));
          card.appendChild(ul);
        });
        grid.appendChild(card);
      });
      sec.appendChild(grid);
      return sec;
    },
    timeline(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      const tl = h("div", "cs-timeline");
      s.items.forEach((it) => {
        const item = h("div", "cs-tl");
        item.appendChild(h("span", "cs-tl-week", L(it.week)));
        item.appendChild(h("h3", null, L(it.title)));
        item.appendChild(h("p", null, L(it.text)));
        if (it.images && it.images.length) {
          const wrap = h("div", "cs-tl-imgs");
          it.images.forEach((im) => {
            const img = document.createElement("img");
            img.src = im.src; img.alt = L(im.alt) || ""; img.loading = "lazy";
            wrap.appendChild(img);
          });
          item.appendChild(wrap);
        }
        tl.appendChild(item);
      });
      sec.appendChild(tl);
      return sec;
    },
    checklist(s) {
      const sec = h("section", "cs-section");
      sec.appendChild(h("h2", null, L(s.heading)));
      if (s.lead) sec.appendChild(h("p", "cs-section-lead", L(s.lead)));
      const ul = h("ul", "cs-feedback");
      s.items.forEach((li) => ul.appendChild(h("li", null, L(li))));
      sec.appendChild(ul);
      return sec;
    },
    cta(s) {
      const sec = h("section", "cs-cta");
      sec.appendChild(h("h2", null, L(s.heading)));
      sec.appendChild(h("p", null, L(s.text)));
      const actions = h("div", "cs-hero-actions");
      actions.style.justifyContent = "center";
      const live = h("a", "cs-btn cs-btn--primary", L(data.liveLabel));
      live.href = data.liveUrl; live.target = "_blank"; live.rel = "noopener";
      live.setAttribute("data-cursor", "open"); live.setAttribute("data-cursor-nl", "open");
      const contact = h("a", "cs-btn cs-btn--ghost", UI("contact"));
      contact.href = "index.html#contact";
      contact.setAttribute("data-cursor", "hi"); contact.setAttribute("data-cursor-nl", "hoi");
      actions.appendChild(live); actions.appendChild(contact);
      sec.appendChild(actions);
      return sec;
    },
  };

  function render() {
    const frag = document.createDocumentFragment();

    const back = h("a", "cs-back", UI("back"));
    back.href = "index.html#projects";
    back.setAttribute("data-cursor", "back"); back.setAttribute("data-cursor-nl", "terug");
    frag.appendChild(back);

    /* hero */
    const hero = h("header", "cs-hero");
    hero.appendChild(h("span", "cs-eyebrow", L(data.eyebrow)));
    hero.appendChild(h("h1", null, data.title));
    hero.appendChild(h("p", "cs-tagline", L(data.tagline)));
    const tags = h("div", "cs-tags");
    data.tags.forEach((t) => tags.appendChild(h("span", "cs-tag", t)));
    hero.appendChild(tags);
    const actions = h("div", "cs-hero-actions");
    const live = h("a", "cs-btn cs-btn--primary", L(data.liveLabel));
    live.href = data.liveUrl; live.target = "_blank"; live.rel = "noopener";
    live.setAttribute("data-cursor", "open"); live.setAttribute("data-cursor-nl", "open");
    const more = h("a", "cs-btn cs-btn--ghost", UI("more"));
    more.href = "index.html#projects";
    actions.appendChild(live); actions.appendChild(more);
    hero.appendChild(actions);
    frag.appendChild(hero);

    const heroFig = figure(data.heroImage, data.heroAlt, null);
    heroFig.style.margin = "0 0 3.5rem";
    heroFig.querySelector("img").style.width = "100%";
    heroFig.querySelector("img").style.borderRadius = "16px";
    heroFig.querySelector("img").style.border = "1px solid var(--card-border)";
    frag.appendChild(heroFig);

    /* meta */
    const dl = h("dl", "cs-meta");
    data.meta.forEach((m) => {
      const wrap = h("div");
      wrap.appendChild(h("dt", null, L(m.label)));
      wrap.appendChild(h("dd", null, L(m.value)));
      dl.appendChild(wrap);
    });
    frag.appendChild(dl);

    /* sections */
    data.sections.forEach((s) => { if (R[s.type]) frag.appendChild(R[s.type](s)); });

    root.innerHTML = "";
    root.appendChild(frag);
    document.title = data.title + " — Case study · Mitchell Scholte";
  }

  render();
  document.addEventListener("langchange", render);
})();
