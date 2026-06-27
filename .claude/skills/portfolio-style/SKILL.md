---
name: portfolio-style
description: Design system and component conventions for Manuel Mazarese's portfolio. Use whenever building, editing, or extending pages/components/sections of THIS portfolio (hero, works list, contact, marquee, effects, theming) so new work matches the established dark, elegant, minimal-editorial style.
---

# Portfolio — stile & convenzioni

Portfolio di **Manuel Mazarese**, sviluppatore web freelance che crea siti per
piccole attività (demo: pizzeria, palestra, centro estetico). Stack:
**Next.js 16 (App Router) · TypeScript · Tailwind CSS v4**. Cartella `src/`.

## Direzione estetica (NON deviare senza chiederlo)

Ispirazione: **Conor O'Hollaren, Gabriel Valdivia, Pablo Sánchez** — portfolio da
designer, non da agenzia/SaaS.

- **Dark, elegante, minimale, editoriale.** Sfondo nero, testo avorio, tanto
  spazio bianco, tipografia grande.
- **Poco testo.** Frasi brevi, prima persona, tono pacato. Niente paragrafi
  marketing, niente liste di feature, niente badge "✅".
- **Accento usato pochissimo** (oro/champagne `#c5a572`): solo dettagli (parola
  ruotante, ✦ del marquee, glow, freccia hover).
- **Lavori senza anteprime/screenshot.** Sono una **lista** sobria (nome + meta)
  che incuriosisce via micro-interazioni all'hover, non via immagini.
- Effetti discreti, mai urlati.

Cose già **rifiutate** dall'utente: card con tag, badge "disponibile"
lampeggiante, accento terracotta acceso, griglia servizi numerata stile SaaS,
anteprime/screenshot dei progetti, layout chiaro "carta". Non reintrodurle.

## Design tokens — `src/app/globals.css` (Tailwind v4 `@theme inline`)

```
--color-bg: #0a0a0a   --color-surface: #161514   --color-fg: #ededeb
--color-muted: #8c887f   --color-line: #ffffff   --color-accent: #c5a572
--font-sans: Inter (var --font-inter)   --font-display: Fraunces (var --font-fraunces)
```

Usare SEMPRE i token semantici: `bg-bg text-fg text-muted text-accent
border-line/15 bg-surface`. `--color-line` è bianco: usarlo con opacità bassa
(`/10`–`/15`) per linee sottili. Titoli/display = `font-display` (Fraunces),
spesso `font-light` + `tracking-tight`. `color-scheme: dark` è impostato.

Keyframes globali disponibili: `animate-glow` (drift del bagliore),
`animate-marquee` (scorrimento). `prefers-reduced-motion` azzera già durate
animazioni/transizioni — non duplicare.

## Componenti (`src/components/`)

- **Container** — wrapper `max-w-6xl` con padding; ogni sezione lo usa.
- **Navbar** — sticky, blur, solo nome + link (`Lavori`, `Contatti`). Minimale.
- **Hero** — eyebrow uppercase tracking-wide, titolo serif grande con
  `WordRotator` sull'ultima parola, sottotitolo breve, glow dorato animato dietro.
- **WordRotator** (`"use client"`) — alterna parole con dissolvenza+blur.
- **Marquee** — fascia `border-y` con servizi scorrevoli + `✦` accent; lista
  duplicata per loop continuo (`animate-marquee`, `w-max`).
- **Projects** + **ProjectCard** — lista di righe (NO immagini): indice `01`,
  titolo serif, categoria+anno a destra, freccia `↗` e descrizione che compaiono
  all'hover (`group-hover` con `max-h`/`opacity`/`translate`).
- **Contact** — eyebrow + `ContactDialog`.
- **ContactDialog** (`"use client"`) — bottone serif `Scrivimi.` che apre un
  **popup** con nome, telefono ed email (da `site.ts`). Chiusura: X, click fuori,
  `Esc`. Apribile anche via deep-link `#scrivimi`. Righe contatto impaginate
  verticali (label sopra, valore sotto) per non spezzare l'email.
- **Footer** — nome, social, copyright.
- **Grain** — overlay fisso con SVG feTurbulence, `mix-blend-soft-light`,
  `opacity-[0.04]`; montato una volta in `page.tsx`.
- **Reveal** (`"use client"`) — entrata allo scroll via IntersectionObserver
  (fade + translate). **Ha un fallback `setTimeout` 1600ms** e fallback se IO
  manca: il contenuto non resta mai invisibile. Avvolgere blocchi con `delay`
  crescenti per effetto a cascata.
- **Services** — NON usato (rimosso dalla pagina). Non reintrodurre senza chiedere.

## Convenzioni

- **Dati centralizzati**: testo personale in `src/data/site.ts` (`site.name`,
  `email`, ecc.), progetti in `src/data/projects.ts`. Modificare i dati lì, non
  hardcodare nei componenti.
- Pagina composta in `src/app/page.tsx`: `Grain → Navbar → main(Hero, Marquee,
  Projects, Contact) → Footer`.
- Sezioni con `id` (`#top #lavori #contatti`) e `scroll-mt-20` per l'ancora.
- Mobile-first, responsive. Componenti riusabili e leggibili.
- Copy in **italiano**.

## Gotcha imparati

- **`position: fixed` dentro un antenato con `transform` non è relativo al
  viewport** ma a quell'antenato. `Reveal` applica `transform` (translate), quindi
  modali/overlay fixed messi dentro una sezione avvolta da `Reveal` finiscono nel
  posto sbagliato. **Soluzione: renderizzare overlay/modali con `createPortal` su
  `document.body`** (vedi `ContactDialog`). Guardare con `mounted` per l'SSR.
- `Reveal` nasconde i figli finché non entra nel viewport: ha un **fallback timer**
  così il contenuto non resta mai invisibile (utile anche per gli screenshot).

## Verifica (workflow di controllo visivo)

Build deve passare e si può catturare uno screenshot reale headless:

```bash
npm run build                       # deve finire senza errori, output statico
npm run dev                         # (in background) avvia su :3000
# Chrome headless — virtual-time-budget per far girare animazioni + Reveal:
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=1440,1700 \
  --virtual-time-budget=4000 --screenshot=out.png http://localhost:3000
```

Nota: budget troppo basso (~3000) cattura a metà animazione (contenuto sbiadito);
usare ~4000+. Ricordarsi di terminare il dev server dopo.
