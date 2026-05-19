/* =============================================
   I18N — EN / NL site translations
   - Reads data-i18n="key" → textContent
   - Reads data-i18n-html="key" → innerHTML (preserves child markup)
   - Reads data-i18n-attr="attrName:key" → attribute
   - Dispatches 'langchange' so dynamic components (carousel, radar) re-render
   ============================================= */

(function () {
    'use strict';

    const STORAGE_KEY = 'site-lang-v1';

    const T = {
        en: {
            /* Skip link / a11y aria */
            'skip.link': 'Skip to content',
            'menu.aria': 'Menu',
            'theme.aria': 'Toggle dark and light mode',
            'lang.aria': 'Switch language',

            /* Header nav */
            'nav.home': 'Home',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.timeline': 'Timeline',
            'nav.certs': 'Certs',
            'nav.contact': 'Contact',

            /* Hero */
            'hero.badge': 'Available for Internship',
            'hero.line1': 'Full-Stack',
            'hero.line2': 'Engineer',
            'hero.desc': "Hi, I'm Mitchell. I build smart systems that connect code, people and purpose. Java · Javascript · Hardware · Pentesting. I turn creative ideas into functional software.",
            'hero.btn.contact': 'Contact Me',
            'hero.btn.projects': 'Projects',

            /* Skills */
            'skills.title': 'What I Bring to the Table',
            'skills.subtitle': 'From concept to execution — I blend creativity with technical depth to build things that actually work.',
            'skills.tab.hard': 'Hard Skills',
            'skills.tab.soft': 'Soft Skills',

            'hard.1.title': 'Full-Stack Development',
            'hard.1.desc': 'I build modern, scalable websites and apps — from clean front-ends to complete back-end systems with databases and APIs.',
            'hard.2.title': 'Embedded Systems Engineering',
            'hard.2.desc': 'I design hardware-meets-software systems — bridging actuators, sensors, and real-time firmware to bring the physical and digital worlds together.',
            'hard.3.title': 'Design & Prototyping',
            'hard.3.desc': 'I turn rough ideas into polished, interactive prototypes — bridging the gap between concept and working product.',

            'soft.1.title': 'Problem Solving',
            'soft.1.desc': 'I break down complex challenges from multiple angles and build practical solutions that move things forward — not just workarounds.',
            'soft.1.pill1': 'Critical Thinking',
            'soft.1.pill2': 'Analytical',
            'soft.1.pill3': 'Creative',
            'soft.2.title': 'Work Ethic',
            'soft.2.desc': 'I show up, stay consistent, and deliver — reliable on deadlines, organized under pressure, and committed to doing quality work.',
            'soft.2.pill1': 'Reliable',
            'soft.2.pill2': 'Organized',
            'soft.2.pill3': 'Deadline-Driven',
            'soft.3.title': 'Collaboration',
            'soft.3.desc': "I work openly with teams, share knowledge freely, and adapt my communication style to whoever I'm building with.",
            'soft.3.pill1': 'Team Player',
            'soft.3.pill2': 'Communication',
            'soft.3.pill3': 'Adaptable',

            /* Skill graph */
            'sg.title': 'Skill Proficiency',
            'sg.subtitle': 'A snapshot of where I stand across code, design, and collaboration.',

            /* Projects */
            'projects.label': 'Projects',
            'projects.cta': 'View project →',

            /* Timeline */
            'timeline.title': 'My Journey',
            'timeline.subtitle': 'From curiosity to craft — each step shaped who I am as a developer.',
            'tl.1.text': 'Technical Computer Science',
            'tl.2.text': 'Communication & Multimedia Design',
            'tl.3.text': 'First UX/UI Internship',
            'tl.4.text': 'Founded a Software Company',
            'tl.5.text': 'Junior Software Developer Certification',
            'tl.6.text': 'Teaching Assistant — Front-end Development',
            'tl.7.text': 'Ethical Hacking with Open Source Tools',
            'tl.8.text': 'Minor Business Law',
            'tl.9.text': 'Minor Web Design & Development',

            /* Certs */
            'cert.cta': 'View Certificate ↗',
            'cert.prev': 'Previous',
            'cert.next': 'Next',

            /* Contact */
            'contact.title': "Let's Work Together",
            'contact.subtitle': 'Available for internships and freelance projects.',
            'form.name': 'Name',
            'form.email': 'Email',
            'form.message': 'Message',
            'form.placeholder.name': 'Your name',
            'form.placeholder.message': 'Tell me about your project...',
            'form.submit': 'Send Message',

            /* Footer */
            'footer.copyright': '© 2025 Mitchell Scholte. All rights reserved.',

            /* A11y panel */
            'a11y.title': 'Accessibility',
            'a11y.close': 'Close accessibility settings',
            'a11y.open': 'Open accessibility settings',
            'a11y.reduceMotion': 'Reduce motion',
            'a11y.reduceMotion.desc': 'Disables parallax, tilt, and reveal animations',
            'a11y.highContrast': 'High contrast',
            'a11y.highContrast.desc': 'Stronger borders and text contrast',
            'a11y.largeText': 'Larger text',
            'a11y.largeText.desc': 'Increases base font size by 15%',
            'a11y.noCursor': 'Disable custom cursor',
            'a11y.noCursor.desc': 'Use the system cursor instead',
            'a11y.underlineLinks': 'Underline links',
            'a11y.underlineLinks.desc': 'Always show link underlines',
            'a11y.dyslexiaFont': 'Dyslexia-friendly font',
            'a11y.dyslexiaFont.desc': 'Switch to Atkinson Hyperlegible for easier reading',
            'a11y.spacing': 'Wider spacing',
            'a11y.spacing.desc': 'Increase line height and letter spacing',
            'a11y.grayscale': 'Reduce color',
            'a11y.grayscale.desc': 'Desaturate the page (helpful for migraines)',
            'a11y.strongFocus': 'Strong focus indicator',
            'a11y.strongFocus.desc': 'Larger, high-contrast focus outlines',
            'a11y.highlightLinks': 'Highlight links',
            'a11y.highlightLinks.desc': 'Yellow background behind every link',
            'a11y.pauseAnim': 'Pause animations',
            'a11y.pauseAnim.desc': 'Stop all looping animations (twinkles, carousels)',
            'a11y.reset': 'Reset to defaults',
            'lang.switched': 'Language switched to English',
        },

        nl: {
            'skip.link': 'Spring naar inhoud',
            'menu.aria': 'Menu',
            'theme.aria': 'Schakel tussen donkere en lichte modus',
            'lang.aria': 'Wissel taal',

            'nav.home': 'Home',
            'nav.skills': 'Skills',
            'nav.projects': 'Projecten',
            'nav.timeline': 'Tijdlijn',
            'nav.certs': 'Certs',
            'nav.contact': 'Contact',

            'hero.badge': 'Beschikbaar voor Stage',
            'hero.line1': 'Full-Stack',
            'hero.line2': 'Engineer',
            'hero.desc': 'Hoi, ik ben Mitchell. Ik bouw slimme systemen die code, mensen en doel verbinden. Java · Javascript · Hardware · Pentesting. Ik vertaal creatieve ideeën naar functionele software.',
            'hero.btn.contact': 'Neem Contact Op',
            'hero.btn.projects': 'Projecten',

            'skills.title': 'Wat ik te bieden heb',
            'skills.subtitle': 'Van concept tot uitvoering — ik combineer creativiteit met technische diepgang om dingen te bouwen die echt werken.',
            'skills.tab.hard': 'Harde Skills',
            'skills.tab.soft': 'Sociale Skills',

            'hard.1.title': 'Full-Stack Development',
            'hard.1.desc': "Ik bouw moderne, schaalbare websites en apps — van een strakke front-end tot complete back-end systemen met databases en API's.",
            'hard.2.title': 'Embedded Systems Engineering',
            'hard.2.desc': 'Ik ontwerp systemen waar hardware en software samenkomen — actuatoren, sensoren en real-time firmware die de fysieke en digitale wereld verbinden.',
            'hard.3.title': 'Design & Prototyping',
            'hard.3.desc': 'Ik vertaal ruwe ideeën naar verfijnde, interactieve prototypes — de brug tussen concept en werkend product.',

            'soft.1.title': 'Probleemoplossing',
            'soft.1.desc': 'Ik splits complexe uitdagingen op vanuit meerdere invalshoeken en bouw praktische oplossingen die verder helpen — geen workarounds.',
            'soft.1.pill1': 'Kritisch Denken',
            'soft.1.pill2': 'Analytisch',
            'soft.1.pill3': 'Creatief',
            'soft.2.title': 'Werkethos',
            'soft.2.desc': 'Ik ben er, blijf consistent en lever — betrouwbaar op deadlines, georganiseerd onder druk, en toegewijd aan kwaliteit.',
            'soft.2.pill1': 'Betrouwbaar',
            'soft.2.pill2': 'Georganiseerd',
            'soft.2.pill3': 'Deadline-gedreven',
            'soft.3.title': 'Samenwerking',
            'soft.3.desc': 'Ik werk open met teams, deel kennis vrijuit en pas mijn communicatiestijl aan op de mensen waar ik mee bouw.',
            'soft.3.pill1': 'Team Speler',
            'soft.3.pill2': 'Communicatie',
            'soft.3.pill3': 'Flexibel',

            'sg.title': 'Vaardigheidsniveau',
            'sg.subtitle': 'Een momentopname van waar ik sta op het gebied van code, design en samenwerking.',

            'projects.label': 'Projecten',
            'projects.cta': 'Bekijk project →',

            'timeline.title': 'Mijn Reis',
            'timeline.subtitle': 'Van nieuwsgierigheid naar vakmanschap — elke stap heeft mij gevormd als ontwikkelaar.',
            'tl.1.text': 'Technische Informatica',
            'tl.2.text': 'Communication & Multimedia Design',
            'tl.3.text': 'Eerste UX/UI Stage',
            'tl.4.text': 'Een Softwarebedrijf Opgericht',
            'tl.5.text': 'Junior Software Developer Certificering',
            'tl.6.text': 'Studentassistent — Front-end Development',
            'tl.7.text': 'Ethical Hacking met Open Source Tools',
            'tl.8.text': 'Minor Ondernemingsrecht',
            'tl.9.text': 'Minor Web Design & Development',

            'cert.cta': 'Bekijk Certificaat ↗',
            'cert.prev': 'Vorige',
            'cert.next': 'Volgende',

            'contact.title': 'Laten we samenwerken',
            'contact.subtitle': 'Beschikbaar voor stages en freelance projecten.',
            'form.name': 'Naam',
            'form.email': 'E-mail',
            'form.message': 'Bericht',
            'form.placeholder.name': 'Je naam',
            'form.placeholder.message': 'Vertel me over je project...',
            'form.submit': 'Verstuur Bericht',

            'footer.copyright': '© 2025 Mitchell Scholte. Alle rechten voorbehouden.',

            'a11y.title': 'Toegankelijkheid',
            'a11y.close': 'Toegankelijkheidsinstellingen sluiten',
            'a11y.open': 'Toegankelijkheidsinstellingen openen',
            'a11y.reduceMotion': 'Minder beweging',
            'a11y.reduceMotion.desc': 'Schakelt parallax, kanteling en reveal-animaties uit',
            'a11y.highContrast': 'Hoog contrast',
            'a11y.highContrast.desc': 'Sterkere randen en tekstcontrast',
            'a11y.largeText': 'Grotere tekst',
            'a11y.largeText.desc': 'Vergroot de basistekst met 15%',
            'a11y.noCursor': 'Custom cursor uitschakelen',
            'a11y.noCursor.desc': 'Gebruik in plaats daarvan de systeemcursor',
            'a11y.underlineLinks': 'Links onderstrepen',
            'a11y.underlineLinks.desc': 'Toon altijd link-onderstrepingen',
            'a11y.dyslexiaFont': 'Dyslexie-vriendelijk lettertype',
            'a11y.dyslexiaFont.desc': 'Wissel naar Atkinson Hyperlegible voor makkelijker lezen',
            'a11y.spacing': 'Bredere afstand',
            'a11y.spacing.desc': 'Vergroot regelhoogte en letterafstand',
            'a11y.grayscale': 'Minder kleur',
            'a11y.grayscale.desc': 'Desatureer de pagina (helpt bij migraine)',
            'a11y.strongFocus': 'Sterke focus-indicator',
            'a11y.strongFocus.desc': 'Grotere, contrastrijke focus-outlines',
            'a11y.highlightLinks': 'Links markeren',
            'a11y.highlightLinks.desc': 'Gele achtergrond achter elke link',
            'a11y.pauseAnim': 'Animaties pauzeren',
            'a11y.pauseAnim.desc': 'Stop alle herhalende animaties (sterren, carrousels)',
            'a11y.reset': 'Standaardinstellingen herstellen',
            'lang.switched': 'Taal gewijzigd naar Nederlands',
        }
    };

    function getLang() {
        try {
            return localStorage.getItem(STORAGE_KEY) || 'en';
        } catch (e) { return 'en'; }
    }
    function saveLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    function translate(lang) {
        const dict = T[lang] || T.en;

        document.documentElement.lang = lang;

        /* Plain text content */
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = dict[key];
            if (val != null) el.textContent = val;
        });

        /* innerHTML — when value may contain markup */
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const val = dict[key];
            if (val != null) el.innerHTML = val;
        });

        /* Attributes: data-i18n-attr="attr:key,attr:key" */
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const pairs = el.getAttribute('data-i18n-attr').split(',');
            pairs.forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s.trim());
                if (!attr || !key) return;
                const val = dict[key];
                if (val != null) el.setAttribute(attr, val);
            });
        });

        /* Update toggle button visual */
        const btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.classList.toggle('is-nl', lang === 'nl');
            btn.querySelectorAll('.lang-pill-opt').forEach(opt => {
                opt.classList.toggle('is-active', opt.dataset.lang === lang);
            });
            btn.setAttribute('aria-label',
                lang === 'en' ? 'Schakel naar Nederlands' : 'Switch to English');
        }

        /* Announce to screen readers */
        const announcer = document.getElementById('a11y-announce');
        if (announcer && dict['lang.switched']) {
            /* Clear first so the same string still re-announces */
            announcer.textContent = '';
            setTimeout(() => { announcer.textContent = dict['lang.switched']; }, 30);
        }

        /* Dispatch event so dynamic components re-render */
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    function setLang(lang) {
        if (!T[lang]) lang = 'en';
        saveLang(lang);
        translate(lang);
    }

    /* Expose */
    window.I18N = {
        get current() { return getLang(); },
        T,
        setLang,
        translate,
    };

    /* Boot — run before DOMContentLoaded if possible, otherwise on it */
    function boot() {
        const initial = getLang();
        translate(initial);

        const toggle = document.getElementById('lang-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                const target = e.target.closest('.lang-pill-opt');
                if (target && target.dataset.lang) {
                    setLang(target.dataset.lang);
                } else {
                    /* Click on the pill background — flip */
                    setLang(getLang() === 'en' ? 'nl' : 'en');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
