# Portfolio — Evren Shah

A modern, animated personal portfolio built with **React** + **Framer Motion**, following the Sora design system.

---

## ✨ Features

- **Smooth page loader** with animated progress bar
- **Custom cursor** with spring-physics lag and hover states
- **Typewriter hero** with cycling role titles
- **Scroll-triggered reveals** on every section (fade up, slide left/right, scale in)
- **Stagger animations** on skill cards and project grids
- **Interactive experience timeline** with animated expand/collapse
- **Animated contact form** with validation and success state
- **Sticky navbar** that blurs on scroll
- **Floating SVG illustration** in hero
- Fully **responsive** — mobile-first breakpoints
- **Reduced motion** support (`prefers-reduced-motion`)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Font | Sora (Google Fonts) |
| Mono font | JetBrains Mono |
| Black | `#000000` |
| Neutral | `#404040` |
| Error/Accent | `#ef4444` |
| Zinc scale | 100 → 900 |
| Border radius | 4px / 6px / 8px / 12px |
| Border weight | 1.5px |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx               # Entry point
    ├── styles/
    │   └── global.css         # CSS variables & reset
    ├── data/
    │   └── index.js           # All content (skills, experience, projects)
    ├── hooks/
    │   └── useScrollReveal.js # Intersection observer hook
    ├── components/
    │   ├── App.jsx            # Root component + loader gate
    │   ├── Navbar.jsx         # Sticky blur navbar
    │   ├── Footer.jsx         # Footer
    │   ├── Cursor.jsx         # Custom cursor with spring lag
    │   ├── Loader.jsx         # Page intro loader
    │   └── Reveal.jsx         # Reusable scroll animation wrappers
    └── sections/
        ├── Hero.jsx           # Hero with typewriter + floating SVG
        ├── About.jsx          # About with tab toggle + stats
        ├── Skills.jsx         # Tech stack icon grid
        ├── Experience.jsx     # Animated timeline + detail panel
        ├── Projects.jsx       # Project card grid
        └── Contact.jsx        # Form with validation + success state
```

---

## 🔧 Customization

All content lives in `src/data/index.js`. Edit:

- `personal` — name, bio, social links, email
- `skills` — tech stack (add/remove entries, mark as `featured`)
- `experience` — work history
- `projects` — portfolio pieces

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `framer-motion` | Animations, transitions, gestures |
| `react-intersection-observer` | Scroll-triggered reveal hooks |
| `react-icons` | (available, extend skill icons) |

---

## 🌐 Deploy

Works out of the box with **Vercel**, **Netlify**, or **GitHub Pages**.

```bash
# Vercel
npx vercel

# Netlify
npm run build && netlify deploy --prod --dir=dist
```

---

## 📝 License

MIT — use freely, credit appreciated.
