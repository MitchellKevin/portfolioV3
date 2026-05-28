/* ============================================
   TERMINAL — interactive text-adventure
   Mitchell Scholte · Portfolio
   Bilingual (EN/NL) — follows the site language via window.I18N
   ============================================ */

(function () {
    'use strict';

    const win      = document.getElementById('terminal-window');
    const output   = document.getElementById('terminal-output');
    const inputLine = document.getElementById('terminal-input-line');
    const input    = document.getElementById('terminal-input');
    const typed    = document.getElementById('terminal-typed');

    if (!win || !output || !input) return;

    const history = [];
    let histIndex = -1;
    let busy = false; // true while boot / typed output runs

    /* ---------- language ---------- */
    function lang() {
        try { return (window.I18N && window.I18N.current) === 'nl' ? 'nl' : 'en'; }
        catch (e) { return 'en'; }
    }
    // pick a localized value: t('english', 'dutch')
    function t(en, nl) { return lang() === 'nl' ? nl : en; }

    /* ---------- helpers ---------- */

    function scrollDown() { win.scrollTop = win.scrollHeight; }

    // Append a raw HTML line (trusted, internal strings only)
    function print(html = '', cls = '') {
        const el = document.createElement('div');
        el.className = 'term-line' + (cls ? ' ' + cls : '');
        el.innerHTML = html;
        output.appendChild(el);
        scrollDown();
        return el;
    }

    function spacer() {
        const el = document.createElement('div');
        el.className = 'term-spacer';
        output.appendChild(el);
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"]/g, c => (
            { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
        ));
    }

    function echoCommand(cmd) {
        print(
            '<span class="echo-prompt">mitchell@portfolio</span>' +
            '<span class="term-dim">:</span>' +
            '<span class="echo-path">~</span>' +
            '<span class="term-dim">$</span> ' +
            escapeHtml(cmd),
            'term-cmd-echo'
        );
    }

    // Print an array of HTML lines one after another with a tiny delay (typewriter feel)
    function printLines(lines, done) {
        busy = true;
        inputLine.hidden = true;
        let i = 0;
        (function step() {
            if (i >= lines.length) {
                busy = false;
                showInput();
                if (done) done();
                return;
            }
            const item = lines[i++];
            if (item === '') spacer();
            else if (typeof item === 'string') print(item);
            else print(item.text, item.cls);
            setTimeout(step, 55);
        })();
    }

    function showInput() {
        inputLine.hidden = false;
        scrollDown();
        input.focus();
        syncCaret();
    }

    /* ---------- caret mirror ---------- */

    function syncCaret() {
        typed.textContent = input.value;
    }

    input.addEventListener('input', syncCaret);
    input.addEventListener('focus', () => inputLine.classList.remove('is-typing'));
    input.addEventListener('blur',  () => inputLine.classList.remove('is-typing'));

    // Keep focus on the input when clicking anywhere in the terminal
    document.getElementById('terminal').addEventListener('mousedown', (e) => {
        if (e.target.closest('.term-link')) return;
        if (window.getSelection().toString()) return;
        setTimeout(() => { if (!busy) input.focus(); }, 0);
    });

    /* ---------- small formatting helpers ---------- */
    function b(x)   { return '<span class="term-strong">' + x + '</span>'; }
    function acc(x) { return '<span class="term-accent">' + x + '</span>'; }
    function grn(x) { return '<span class="term-green">' + x + '</span>'; }
    function dim(x) { return '<span class="term-dim">' + x + '</span>'; }
    function link(text, href) {
        const target = href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
        return '<a class="term-link" href="' + href + '"' + target + '>' + text + '</a>';
    }
    function cmdList(pairs) {
        let html = '<dl class="term-cmd-list">';
        pairs.forEach(([k, v]) => { html += '<dt>' + k + '</dt><dd>' + v + '</dd>'; });
        return html + '</dl>';
    }
    function bar(label, pct) {
        const total = 20;
        const filled = Math.round(pct / 100 * total);
        const blocks = '█'.repeat(filled) + '░'.repeat(total - filled);
        const name = (label + '                  ').slice(0, 18);
        return name + '<span class="term-bar-vis">' + blocks + '</span> ' + dim(pct + '%');
    }

    /* ---------- command data ---------- */

    const COMMANDS = {
        help() {
            return [
                { text: t('Available commands:', "Beschikbare commando's:"), cls: 'term-accent' },
                '',
                cmdList([
                    ['about',    t('who am I?', 'wie ben ik?')],
                    ['whoami',   t('a one-line intro', 'korte intro in één regel')],
                    ['skills',   t('what can I do (and how well)?', 'wat kan ik (en hoe goed)?')],
                    ['projects', t('what am I proud of?', 'waar ben ik trots op?')],
                    ['journey',  t('my path so far', 'mijn pad tot nu toe')],
                    ['stack',    t('the tools & languages I use', 'mijn tools & talen')],
                    ['hobbies',  t('what I do outside code', 'wat ik doe buiten code')],
                    ['hire',     t('why work with me?', 'waarom met mij werken?')],
                    ['contact',  t('how to reach me', 'hoe je me bereikt')],
                    ['neofetch', t('system info (about me)', 'systeeminfo (over mij)')],
                    ['ls',       t("what's in here? (try: cat <file>)", 'wat is hier? (probeer: cat <file>)')],
                    ['clear',    t('clear the screen', 'maak het scherm leeg')],
                    ['help',     t('this overview', 'dit overzicht')],
                ]),
                '',
                { text: t('Games: ', 'Games: ') + grn('slots') + ', ' + grn('roll') + ', ' + grn('snake') +
                        t(' — go on, try your luck. 🎰', ' — waag een gokje. 🎰'), cls: 'term-dim' },
                { text: t('Psst… try these too: sudo, coffee, matrix, theme 🥚',
                          'Psst… probeer ook eens: sudo, coffee, matrix, theme 🥚'), cls: 'term-dim' },
            ];
        },

        whoami() {
            return [
                { text: 'Mitchell Scholte', cls: 'term-strong' },
                t('Full-stack developer · pentester-in-training · ex-Technical CS.',
                  'Full-stack developer · pentester in opleiding · ex-Technische Informatica.'),
                t('I build smart systems that connect code, people and purpose.',
                  'Ik bouw slimme systemen die code, mensen en doel verbinden.'),
            ];
        },

        about() {
            return t([
                { text: '// about.md', cls: 'term-dim' },
                '',
                "Hi! I'm " + b('Mitchell Scholte') + ', a ' + acc('full-stack developer') + ' based in',
                'Amsterdam. I build responsive, user-friendly web apps with ' + acc('Java') + ' and',
                acc('JavaScript') + ' — with a soft spot for ' + acc('security') + ' and ' + acc('UX design') + '.',
                '',
                'My background started in ' + b('Technical Computer Science') + ', so next to pixels',
                'on a screen I also love hardware and anything that blinks and beeps.',
                '',
                'What drives me: turning creative ideas into software that actually',
                'works — and feels like an ' + b('experience') + ', a bit like this terminal. 😉',
                '',
                'Type ' + grn('projects') + ', ' + grn('skills') + ' or ' + grn('journey') + ' to dig deeper.',
            ], [
                { text: '// about.md', cls: 'term-dim' },
                '',
                'Hoi! Ik ben ' + b('Mitchell Scholte') + ', een ' + acc('full-stack developer') + ' uit',
                'Amsterdam. Ik bouw responsieve, gebruiksvriendelijke web-apps met ' + acc('Java'),
                'en ' + acc('JavaScript') + ' — met een zwak voor ' + acc('security') + ' en ' + acc('UX-design') + '.',
                '',
                'Ik kom uit de hoek van ' + b('Technische Informatica') + ', dus naast pixels op',
                'een scherm vind ik hardware en alles wat blinkt en piept ook machtig mooi.',
                '',
                'Wat me drijft: creatieve ideeën omzetten in software die écht werkt —',
                'en aanvoelt als een ' + b('ervaring') + ', een beetje zoals deze terminal. 😉',
                '',
                'Type ' + grn('projects') + ', ' + grn('skills') + ' of ' + grn('journey') + ' om verder te graven.',
            ]);
        },

        skills() {
            return [
                { text: 'skills --self-assessment', cls: 'term-dim' },
                '',
                bar('Full-Stack Dev',  85),
                bar('JavaScript',      82),
                bar('Java',            78),
                bar(t('Security/Pentest', 'Security/Pentest'), 72),
                bar(t('UX / Design', 'UX / Design'),     74),
                bar(t('Hardware / TI', 'Hardware / TI'),   70),
                '',
                { text: t('(my own estimate — always a work in progress)',
                          '(eigen inschatting — altijd in beweging)'), cls: 'term-dim' },
            ];
        },

        projects() {
            return t([
                { text: '~/projects $ ls -l', cls: 'term-dim' },
                '',
                grn('01 ') + b('CMD Casino') + ' — my first full-stack app: REST APIs, Mollie',
                '   payments and a MongoDB database behind a casino site.',
                '   ' + link('wdd-api-scholte.onrender.com', 'https://wdd-api-scholte.onrender.com/'),
                '',
                grn('02 ') + b('Day-to-Day') + ' — conversion-driven sales site for a software',
                '   startup, with a clean front-end and clear brand identity.',
                '   ' + link('day-to-day.nl', 'https://www.day-to-day.nl/'),
                '',
                grn('03 ') + b('Hackathon (2nd place)') + ' — concept to working prototype under',
                '   time pressure: a 3D globe + parallax built with Three.js.',
                '   ' + link('mitchellkevin.github.io/Space', 'https://mitchellkevin.github.io/Space/'),
                '',
                grn('04 ') + b('Mitchopoly') + ' — a personal site exploring Three.js and',
                '   importing/using 3D models.',
                '   ' + link('mitchellkevin.github.io/PersonalInfoSite', 'https://mitchellkevin.github.io/PersonalInfoSite/'),
                '',
                grn('05 ') + b('HCD') + ' — human-centered design for one user: a Chrome',
                '   extension using text-to-speech APIs.',
                '   ' + link('mitchellkevin.github.io/HCD', 'https://mitchellkevin.github.io/HCD/'),
                '',
                { text: 'Type ' + grn('contact') + ' if you want to build something together.', cls: 'term-dim' },
            ], [
                { text: '~/projects $ ls -l', cls: 'term-dim' },
                '',
                grn('01 ') + b('CMD Casino') + ' — mijn eerste full-stack app: REST API\'s, Mollie-',
                '   betalingen en een MongoDB-database achter een casino-site.',
                '   ' + link('wdd-api-scholte.onrender.com', 'https://wdd-api-scholte.onrender.com/'),
                '',
                grn('02 ') + b('Day-to-Day') + ' — conversiegerichte sales-site voor een software-',
                '   startup, met een strakke front-end en een duidelijke merkidentiteit.',
                '   ' + link('day-to-day.nl', 'https://www.day-to-day.nl/'),
                '',
                grn('03 ') + b('Hackathon (2e plaats)') + ' — van concept tot werkend prototype',
                '   onder tijdsdruk: een 3D-globe + parallax met Three.js.',
                '   ' + link('mitchellkevin.github.io/Space', 'https://mitchellkevin.github.io/Space/'),
                '',
                grn('04 ') + b('Mitchopoly') + ' — een persoonlijke site waarin ik Three.js en het',
                '   importeren/gebruiken van 3D-modellen heb verkend.',
                '   ' + link('mitchellkevin.github.io/PersonalInfoSite', 'https://mitchellkevin.github.io/PersonalInfoSite/'),
                '',
                grn('05 ') + b('HCD') + ' — human-centered design voor één gebruiker: een Chrome-',
                '   extensie met text-to-speech-API\'s.',
                '   ' + link('mitchellkevin.github.io/HCD', 'https://mitchellkevin.github.io/HCD/'),
                '',
                { text: 'Type ' + grn('contact') + ' als je samen iets wilt bouwen.', cls: 'term-dim' },
            ]);
        },

        journey() {
            const soon = t('soon', 'soon');
            const head = t('My journey — from curiosity to craft',
                           'Mijn reis — van nieuwsgierigheid naar vakmanschap');
            const rows = t([
                'Technical Computer Science · @AUAS',
                'Communication & Multimedia Design · @AUAS',
                'First UX/UI internship · @Ecocharting',
                'Founded a software company · Day-to-Day',
                'Junior Software Developer cert · Amazon',
                'Teaching Assistant, Front-end · @AUAS',
                'Ethical Hacking specialization · IBM',
                'Minor Business Law · @AUAS',
            ], [
                'Technische Informatica · @AUAS',
                'Communication & Multimedia Design · @AUAS',
                'Eerste UX/UI-stage · @Ecocharting',
                'Een softwarebedrijf opgericht · Day-to-Day',
                'Junior Software Developer-certificaat · Amazon',
                'Studentassistent, Front-end · @AUAS',
                'Ethical Hacking-specialisatie · IBM',
                'Minor Ondernemingsrecht · @AUAS',
            ]);
            const years = ['2021', '2022', '2023', '2023', '2024', '2024', '2024', '2025'];
            const lines = [{ text: head, cls: 'term-accent' }, ''];
            rows.forEach((r, i) => lines.push(grn(years[i]) + '  ' + r));
            lines.push(acc(soon) + '  ' + t('Java OOP and Beyond · UC San Diego',
                                            'Java OOP and Beyond · UC San Diego'));
            lines.push('');
            lines.push({ text: t('Currently: ' + b('available for an internship') + '. 🚀',
                                 'Op dit moment: ' + b('beschikbaar voor een stage') + '. 🚀'), cls: 'term-dim' });
            return lines;
        },

        stack() {
            return [
                { text: 'stack --list', cls: 'term-dim' },
                '',
                grn(t('Languages', 'Talen    ')) + '  Java · JavaScript · Python · C · HTML · CSS',
                grn('Backend  ') + '  Node.js · MongoDB · MySQL · REST APIs',
                grn(t('Security ', 'Security ')) + '  Kali Linux · Burp Suite · Nmap · Metasploit',
                grn('Design   ') + '  Figma · Photoshop · UX/UI',
                grn(t('Tools    ', 'Tools    ')) + '  Git · VS Code · IntelliJ · Android Studio',
                '',
                { text: t('See it all in motion on the ', 'Zie het allemaal in actie op de ') +
                        link(t('homepage', 'homepage'), 'index.html#tools') + '.', cls: 'term-dim' },
            ];
        },

        hobbies() {
            return t([
                { text: '// life outside the editor', cls: 'term-dim' },
                '',
                acc('📷 Photography') + ' — I shoot on a ' + b('Sony Alpha') + ' and edit in',
                '   Lightroom. I like chasing light, cities and the odd portrait.',
                '',
                acc('🎬 Video') + ' — color grading and editing in ' + b('DaVinci Resolve') + '.',
                '   Telling a story in a few seconds is its own kind of puzzle.',
                '',
                acc('🎮 Gaming') + ' — a bit competitive by nature. Games are where a lot',
                '   of my interest in interaction and 3D started.',
                '',
                acc('🔧 Hardware') + ' — soldering, tinkering, breaking things to learn how',
                '   they work. My Technical CS roots never really left.',
                '',
                { text: 'Type ' + grn('projects') + ' to see where these worlds collide.', cls: 'term-dim' },
            ], [
                { text: '// het leven buiten de editor', cls: 'term-dim' },
                '',
                acc('📷 Fotografie') + ' — ik schiet op een ' + b('Sony Alpha') + ' en bewerk in',
                '   Lightroom. Ik jaag graag op licht, steden en af en toe een portret.',
                '',
                acc('🎬 Video') + ' — kleurcorrectie en montage in ' + b('DaVinci Resolve') + '.',
                '   Een verhaal vertellen in een paar seconden is een puzzel op zich.',
                '',
                acc('🎮 Gaming') + ' — van nature een beetje competitief. Games zijn waar mijn',
                '   interesse in interactie en 3D ooit begon.',
                '',
                acc('🔧 Hardware') + ' — solderen, sleutelen, dingen slopen om te snappen hoe',
                '   ze werken. Mijn Technische Informatica-roots zijn nooit echt weg.',
                '',
                { text: 'Type ' + grn('projects') + ' om te zien waar die werelden samenkomen.', cls: 'term-dim' },
            ]);
        },

        hire() {
            return t([
                { text: 'hire --why', cls: 'term-dim' },
                '',
                b('Available for an internship') + ' — and genuinely excited about it. 🚀',
                '',
                grn('What I\'m looking for') + ': a team where I can build real products,',
                '  combine ' + acc('full-stack') + ' work with ' + acc('security') + ' or ' + acc('hardware') + ', and keep learning fast.',
                '',
                grn('What I bring') + ':',
                '  • End-to-end builds — front-end, back-end, database, APIs.',
                '  • A security mindset (I think about how things break).',
                '  • A designer\'s eye — it should work ' + b('and') + ' feel good.',
                '  • I show up, ship, and own my work.',
                '',
                'Sounds like a fit? Type ' + grn('contact') + ' or hit ' +
                    link('mitchell.scholte04@gmail.com', 'mailto:mitchell.scholte04@gmail.com') + '.',
            ], [
                { text: 'hire --why', cls: 'term-dim' },
                '',
                b('Beschikbaar voor een stage') + ' — en er oprecht enthousiast over. 🚀',
                '',
                grn('Wat ik zoek') + ': een team waar ik echte producten kan bouwen,',
                '  ' + acc('full-stack') + ' combineer met ' + acc('security') + ' of ' + acc('hardware') + ', en snel blijf leren.',
                '',
                grn('Wat ik meebreng') + ':',
                '  • End-to-end bouwen — front-end, back-end, database, API\'s.',
                '  • Een security-mindset (ik denk na over hoe dingen breken).',
                '  • Een ontwerpersoog — het moet werken ' + b('én') + ' goed voelen.',
                '  • Ik kom opdagen, lever op en neem eigenaarschap.',
                '',
                'Klinkt als een match? Type ' + grn('contact') + ' of mail ' +
                    link('mitchell.scholte04@gmail.com', 'mailto:mitchell.scholte04@gmail.com') + '.',
            ]);
        },

        contact() {
            return [
                { text: 'contact --list', cls: 'term-dim' },
                '',
                'Portfolio  ' + link('mitchellscholte.com', 'https://mitchellscholte.com/'),
                'LinkedIn   ' + link('Mitchell Scholte', 'https://www.linkedin.com/in/mitchell-scholte-a10652238/'),
                'GitHub     ' + link('MitchellKevin', 'https://github.com/MitchellKevin'),
                'E-mail     ' + link('mitchell.scholte04@gmail.com', 'mailto:mitchell.scholte04@gmail.com'),
                '',
                { text: t('Always up for a good chat about web, security or hardware. ✌️',
                          'Altijd in voor een goed gesprek over web, security of hardware. ✌️'), cls: 'term-dim' },
            ];
        },

        neofetch() {
            const L = t({
                role: 'Role', host: 'Host', shell: 'Shell', bg: 'Background',
                up: 'Uptime', loves: 'Loves',
                upv: 'learning something new every day', lovesv: 'web · security · hardware',
            }, {
                role: 'Rol', host: 'Host', shell: 'Shell', bg: 'Achtergrond',
                up: 'Uptime', loves: 'Houdt van',
                upv: 'leert elke dag iets nieuws', lovesv: 'web · security · hardware',
            });
            return [
                { text: "        .--.        " , cls: 'term-accent' },
                { text: "       |o_o |       " + b('mitchell') + dim('@') + acc('portfolio'), cls: 'term-accent' },
                { text: "       |:_/ |       " + dim('-----------------'), cls: 'term-accent' },
                { text: "      //   \\ \\      " + grn(L.role) + ': Full-Stack Developer', cls: 'term-accent' },
                { text: "     (|     | )     " + grn(L.host) + ': Amsterdam, NL', cls: 'term-accent' },
                { text: "    /'\\_   _/`\\     " + grn(L.shell) + ': Java · JavaScript', cls: 'term-accent' },
                { text: "    \\___)=(___/     " + grn(L.bg) + ': Technical Computer Science', cls: 'term-accent' },
                { text: "                    " + grn(L.up) + ': ' + L.upv, cls: 'term-accent' },
                { text: "                    " + grn(L.loves) + ': ' + L.lovesv, cls: 'term-accent' },
            ];
        },

        ls() {
            return [
                acc('about.md') + '      ' + acc('projects/') + '     ' + acc('journey.txt'),
                acc('skills.json') + '   ' + acc('contact.vcf') + '   ' + acc('stack.yml'),
                acc('hobbies.txt'),
                '',
                { text: t('Tip: ', 'Tip: ') + grn('cat about.md') +
                        t(' opens a file. Or just type a command.', ' opent een bestand. Of typ gewoon een commando.'), cls: 'term-dim' },
            ];
        },

        cat(args) {
            const FILES = {
                'about.md':     'about',
                'skills.json':  'skills',
                'journey.txt':  'journey',
                'contact.vcf':  'contact',
                'stack.yml':    'stack',
                'hobbies.txt':  'hobbies',
            };
            const file = (args[0] || '').toLowerCase();
            if (!file) {
                return [{ text: t('usage: cat <file>   (try: cat about.md — see ls)',
                                  'gebruik: cat <bestand>   (probeer: cat about.md — zie ls)'), cls: 'term-dim' }];
            }
            if (file === 'projects/' || file === 'projects') {
                return [
                    { text: 'cat: projects/: ' + t('Is a directory', 'Is een map'), cls: 'term-red' },
                    { text: t('Type ', 'Type ') + grn('projects') + t(' to list them.', ' om ze te tonen.'), cls: 'term-dim' },
                ];
            }
            const cmd = FILES[file];
            if (cmd && COMMANDS[cmd]) return COMMANDS[cmd]();
            return [
                { text: 'cat: ' + escapeHtml(args[0]) + ': ' + t('No such file or directory', 'Bestand of map bestaat niet'), cls: 'term-red' },
                { text: t('Type ', 'Type ') + grn('ls') + t(' to see what exists.', ' om te zien wat er is.'), cls: 'term-dim' },
            ];
        },

        clear() { output.innerHTML = ''; return null; },

        /* ---------- easter eggs ---------- */

        sudo() {
            return [
                { text: 'mitchell is not in the sudoers file.', cls: 'term-red' },
                { text: t('This incident will be reported. 🚨 (just kidding)',
                          'Dit incident wordt gerapporteerd. 🚨 (grapje)'), cls: 'term-dim' },
            ];
        },

        coffee() {
            return [
                { text: '      ( (', cls: 'term-accent' },
                { text: '       ) )', cls: 'term-accent' },
                { text: '    ........', cls: 'term-accent' },
                { text: '    |      |]', cls: 'term-accent' },
                { text: '    \\      /', cls: 'term-accent' },
                { text: "     `----'", cls: 'term-accent' },
                '',
                { text: t('Coffee poured. Productivity +10. ☕',
                          'Koffie ingeschonken. Productiviteit +10. ☕'), cls: 'term-green' },
            ];
        },

        theme() {
            document.documentElement.classList.toggle('term-amber');
            return [{ text: t('Theme switched. (run it again to switch back)',
                              'Thema gewisseld. (nogmaals om terug te schakelen)'), cls: 'term-dim' }];
        },

        matrix() {
            startMatrix();
            return null;
        },

        /* ---------- mini-games ---------- */

        slots() {
            startSlots();
            return null;
        },

        roll(args) {
            rollDice(args);
            return null;
        },

        snake() {
            startSnake();
            return null;
        },

        echo(args) {
            return [args.length ? escapeHtml(args.join(' ')) : ''];
        },
    };

    // aliases
    const ALIASES = {
        cls: 'clear', man: 'help', '?': 'help', info: 'about',
        cv: 'contact', mail: 'contact', email: 'contact', work: 'projects',
        who: 'whoami', timeline: 'journey', tech: 'stack', tools: 'stack',
        projecten: 'projects', doelen: 'journey', reis: 'journey',
        slot: 'slots', casino: 'slots', dice: 'roll', dobbel: 'roll',
        hobby: 'hobbies', interesses: 'hobbies', hobbys: 'hobbies',
        'hire-me': 'hire', hireme: 'hire', stage: 'hire',
    };

    /* ---------- run a command ---------- */
    function run(raw) {
        const trimmed = raw.trim();
        echoCommand(trimmed);

        if (trimmed === '') { showInput(); return; }

        history.push(trimmed);
        histIndex = history.length;

        const parts = trimmed.split(/\s+/);
        let name = parts[0].toLowerCase();
        const args = parts.slice(1);
        if (ALIASES[name]) name = ALIASES[name];

        const fn = COMMANDS[name];
        if (!fn) {
            printLines([
                { text: t('command not found: ', 'commando niet gevonden: ') + escapeHtml(parts[0]), cls: 'term-red' },
                { text: t("Type 'help' for the list of commands.", "Type 'help' voor de lijst met commando's."), cls: 'term-dim' },
            ]);
            return;
        }

        const result = fn(args);
        if (result === null) { showInput(); return; } // command handled its own output
        printLines(result);
    }

    /* ---------- input handling ---------- */
    input.addEventListener('keydown', (e) => {
        if (busy) { e.preventDefault(); return; }

        if (e.key === 'Enter') {
            const val = input.value;
            input.value = '';
            syncCaret();
            inputLine.hidden = true;
            run(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (histIndex > 0) { histIndex--; input.value = history[histIndex]; syncCaret(); moveCaretEnd(); }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIndex < history.length - 1) { histIndex++; input.value = history[histIndex]; }
            else { histIndex = history.length; input.value = ''; }
            syncCaret(); moveCaretEnd();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const frag = input.value.trim().toLowerCase();
            if (!frag) return;
            const all = Object.keys(COMMANDS);
            const matches = all.filter(c => c.startsWith(frag));
            if (matches.length === 1) { input.value = matches[0]; syncCaret(); moveCaretEnd(); }
            else if (matches.length > 1) {
                inputLine.hidden = true;
                printLines([{ text: matches.join('   '), cls: 'term-dim' }], () => { input.focus(); });
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            output.innerHTML = '';
        }
        inputLine.classList.add('is-typing');
    });

    function moveCaretEnd() {
        requestAnimationFrame(() => {
            const len = input.value.length;
            input.setSelectionRange(len, len);
        });
    }

    /* ---------- SLOTS mini-game (nods to CMD Casino) ---------- */
    function startSlots() {
        busy = true;
        inputLine.hidden = true;
        const SYMBOLS = ['🍒', '🍋', '🔔', '💎', '⭐', '🍀'];
        const rnd = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        const finals = [rnd(), rnd(), rnd()];

        print(t('🎰 CMD Casino — spinning the reels…', '🎰 CMD Casino — de rollen draaien…'), 'term-dim');
        const reel = print('', 'term-accent');

        function render(a, b, c) {
            reel.innerHTML = '┃ ' + a + ' ┃ ' + b + ' ┃ ' + c + ' ┃';
            scrollDown();
        }

        const spinFrames = 20;
        let frame = 0;
        (function tick() {
            frame++;
            const a = frame > spinFrames - 8 ? finals[0] : rnd();
            const b = frame > spinFrames - 4 ? finals[1] : rnd();
            const c = frame >= spinFrames ? finals[2] : rnd();
            render(a, b, c);
            if (frame >= spinFrames) { finish(); return; }
            setTimeout(tick, 80);
        })();

        function finish() {
            const [a, b, c] = finals;
            let lines;
            if (a === b && b === c) {
                lines = [
                    { text: t('🎉 JACKPOT! Three of a kind!', '🎉 JACKPOT! Drie gelijk!'), cls: 'term-green' },
                    { text: t('The house does not always win. ', 'Het huis wint niet altijd. ') +
                            t('Built the real thing → ', 'Het echte werk gebouwd → ') +
                            link('CMD Casino', 'https://wdd-api-scholte.onrender.com/'), cls: 'term-dim' },
                ];
            } else if (a === b || b === c || a === c) {
                lines = [
                    { text: t('Two of a kind — almost! Type ', 'Twee gelijk — bijna! Type ') + grn('slots') + t(' to spin again.', ' om opnieuw te draaien.'), cls: 'term-accent' },
                ];
            } else {
                lines = [
                    { text: t('No luck this time. 🎲 Type ', 'Geen geluk. 🎲 Type ') + grn('slots') + t(' to try again.', ' om opnieuw te proberen.'), cls: 'term-red' },
                ];
            }
            printLines(lines);
        }
    }

    /* ---------- ROLL dice ---------- */
    function rollDice(args) {
        busy = true;
        inputLine.hidden = true;
        const FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        let count = parseInt(args && args[0], 10);
        if (!Number.isFinite(count)) count = 2;
        count = Math.max(1, Math.min(5, count));

        const roll = () => Array.from({ length: count }, () => Math.floor(Math.random() * 6));
        const finals = roll();
        const line = print('', 'term-accent');

        let frame = 0;
        (function tick() {
            frame++;
            const vals = frame >= 10 ? finals : roll();
            line.innerHTML = vals.map(v => FACES[v]).join('  ');
            scrollDown();
            if (frame >= 10) { finish(); return; }
            setTimeout(tick, 60);
        })();

        function finish() {
            const total = finals.reduce((s, v) => s + v + 1, 0);
            printLines([
                { text: t('You rolled ', 'Je gooide ') + b(total) +
                        (count > 1 ? t(' (sum of ' + count + ' dice).', ' (som van ' + count + ' dobbelstenen).') : '.'), cls: 'term-green' },
                { text: t('Tip: ', 'Tip: ') + grn('roll 3') + t(' rolls three dice.', ' gooit drie dobbelstenen.'), cls: 'term-dim' },
            ]);
        }
    }

    /* ---------- SNAKE mini-game (text grid, in the terminal) ---------- */
    function startSnake() {
        busy = true;
        inputLine.hidden = true;

        const COLS = 30, ROWS = 16;
        let snake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
        let dir = { x: 1, y: 0 };
        let nextDir = dir;
        let score = 0;
        let food = spawnFood();
        let timer = null;

        const info = print(t('▲▼◀▶ to move · Esc or q to quit', '▲▼◀▶ om te bewegen · Esc of q om te stoppen'), 'term-dim');
        const field = print('', '');
        field.style.whiteSpace = 'pre';
        field.classList.add('term-green');

        function spawnFood() {
            let f;
            do { f = { x: rand(COLS), y: rand(ROWS) }; }
            while (snake && snake.some(s => s.x === f.x && s.y === f.y));
            return f;
        }
        function rand(n) { return Math.floor(Math.random() * n); }

        function draw() {
            const top = '┌' + '─'.repeat(COLS) + '┐';
            const bot = '└' + '─'.repeat(COLS) + '┘';
            let html = top + '\n';
            for (let y = 0; y < ROWS; y++) {
                let row = '│';
                for (let x = 0; x < COLS; x++) {
                    if (snake[0].x === x && snake[0].y === y) row += '◉';
                    else if (snake.some((s, i) => i > 0 && s.x === x && s.y === y)) row += 'o';
                    else if (food.x === x && food.y === y) row += '<span class="term-bar-vis">◆</span>';
                    else row += ' ';
                }
                row += '│';
                html += row + '\n';
            }
            html += bot + '\n' + t('score: ', 'score: ') + score;
            field.innerHTML = html;
            scrollDown();
        }

        function step() {
            dir = nextDir;
            const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
            // wall or self collision (the tail vacates this tick, so exclude it)
            const body = snake.slice(0, -1);
            if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
                body.some(s => s.x === head.x && s.y === head.y)) {
                return gameOver();
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                food = spawnFood();
            } else {
                snake.pop();
            }
            draw();
        }

        function onKey(e) {
            const k = e.key;
            if (k === 'ArrowUp' && dir.y === 0)         nextDir = { x: 0, y: -1 };
            else if (k === 'ArrowDown' && dir.y === 0)  nextDir = { x: 0, y: 1 };
            else if (k === 'ArrowLeft' && dir.x === 0)  nextDir = { x: -1, y: 0 };
            else if (k === 'ArrowRight' && dir.x === 0) nextDir = { x: 1, y: 0 };
            else if (k === 'Escape' || k === 'q')       return gameOver();
            else return;
            e.preventDefault();
        }

        function gameOver() {
            clearInterval(timer);
            document.removeEventListener('keydown', onKey, true);
            printLines([
                { text: t('Game over — score: ', 'Game over — score: ') + b(score), cls: 'term-accent' },
                { text: t('Type ', 'Type ') + grn('snake') + t(' to play again.', ' om opnieuw te spelen.'), cls: 'term-dim' },
            ]);
        }

        document.addEventListener('keydown', onKey, true);
        draw();
        timer = setInterval(step, 130);
    }

    /* ---------- MATRIX easter egg ---------- */
    function startMatrix() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-canvas';
        const exit = document.createElement('div');
        exit.className = 'matrix-exit';
        exit.textContent = t('// click or press any key to stop',
                             '// klik of druk op een toets om te stoppen');
        document.body.appendChild(canvas);
        document.body.appendChild(exit);

        const ctx = canvas.getContext('2d');
        let w, h, cols, drops;
        const chars = 'アイウエオカキクケコ01MITCHELLSCHOLTE</>{}'.split('');
        const fontSize = 16;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            cols = Math.floor(w / fontSize);
            drops = Array(cols).fill(1);
        }
        resize();
        window.addEventListener('resize', resize);

        let raf;
        function draw() {
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#9ecb6e';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            raf = requestAnimationFrame(draw);
        }
        draw();

        function stop() {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            canvas.remove();
            exit.remove();
            document.removeEventListener('keydown', stop);
            document.removeEventListener('click', stop);
            showInput();
        }
        setTimeout(() => {
            document.addEventListener('keydown', stop);
            document.addEventListener('click', stop);
        }, 100);
    }

    /* ---------- BOOT SEQUENCE ---------- */
    const BANNER = [
        ' __  __ _ _       _          _ _ ',
        '|  \\/  (_) |_ ___| |__   ___| | |',
        "| |\\/| | | __/ __| '_ \\ / _ \\ | |",
        '| |  | | | || (__| | | |  __/ | |',
        '|_|  |_|_|\\__\\___|_| |_|\\___|_|_|',
    ];

    function boot() {
        const lines = [];
        BANNER.forEach(l => lines.push({ text: l, cls: 'term-banner' }));
        lines.push('');
        lines.push({ text: 'portfolio terminal · v1.0 · Mitchell Scholte', cls: 'term-dim' });
        lines.push({ text: t('Last login: ', 'Laatste login: ') +
            new Date().toLocaleDateString(t('en-GB', 'nl-NL'),
                { weekday: 'long', day: 'numeric', month: 'long' }), cls: 'term-dim' });
        lines.push('');
        lines.push({ text: t('Welcome! 👋 This is an interactive mini-portfolio.',
                             'Welkom! 👋 Dit is een interactieve mini-portfolio.'), cls: 'term-fg' });
        lines.push(t('Type ', 'Type ') + grn('help') +
                   t(' to begin or ', ' om te beginnen of ') + grn('about') +
                   t(' to get to know me.', ' om me te leren kennen.'));
        lines.push('');
        printLines(lines);
    }

    // Re-render in the new language when the site language changes
    document.addEventListener('langchange', () => {
        if (!document.body.classList.contains('terminal-ready')) return;
        if (busy) return; // don't reboot mid-animation / mid-game
        output.innerHTML = '';
        history.length = 0;
        histIndex = -1;
        boot();
    });

    // Start the terminal once the page loader is gone (script.js adds .done to #page-loader)
    function reveal() {
        document.body.classList.add('terminal-ready');
        setTimeout(boot, 350);
    }

    function waitForLoad() {
        const loader = document.getElementById('page-loader');
        if (!loader || loader.classList.contains('done') ||
            getComputedStyle(loader).display === 'none') {
            reveal();
        } else {
            requestAnimationFrame(waitForLoad);
        }
    }
    waitForLoad();

})();
