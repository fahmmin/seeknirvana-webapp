# AGENTS.md — Seek Nirvana Webapp

> **Purpose:** This file provides context, conventions, and guidelines for AI agents working on this codebase.

---

## 🎯 Project Overview

**Product:** Seek Nirvana — Affordable smart ring ($99) for lucid dreaming, mindfulness, and longevity tracking.

**Tech Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS + Framer Motion + Reown AppKit (Wagmi) + Resend

**Deployment:** Server Next.js on **Vercel** (Route Handlers for email APIs). GitHub Actions runs **CI** (`pnpm build`, lint, tests) — no GitHub Pages static export.

---

## 📁 Directory Conventions

```
app/                    # Next.js App Router pages
├── api/               # Route Handlers (e.g. Resend signup welcome, cohort application intake)
├── page.tsx           # Homepage (imports section components)
├── layout.tsx         # Root layout with favicon, metadata, Web3 provider
├── globals.css        # Tailwind imports + custom animations
├── privacy/           # Privacy policy page
└── terms/             # Terms of service page

components/
├── Navigation.tsx     # Fixed navbar (used on all pages)
├── animations/        # Reusable animation components
│   ├── FadeIn.tsx     # Scroll-triggered fade animation
│   ├── FloatingElement.tsx
│   ├── GlowEffect.tsx
│   └── BreathingCircle.tsx
└── sections/          # Homepage sections (imported in order)
    ├── Hero.tsx
    ├── Features.tsx
    ├── HowItWorks.tsx
    ├── Benefits.tsx
    ├── QuoteCarousel.tsx
    ├── Newsletter.tsx
    ├── Technology.tsx
    ├── Pricing.tsx
    └── Footer.tsx

public/
├── favicon.svg        # Ring-themed favicon
└── images/            # Static assets
```

---

## 🎨 Design System

### Theme: "Ancient Wisdom × AI"

**Visual Language:**
- Dark cosmic backgrounds (space-like, mystical)
- Glass morphism cards (`backdrop-blur`, `bg-white/5`)
- Gradient accents: Jade (longevity) + Gold (wisdom) + Cyan (technology)
- Sanskrit quotes and spiritual iconography (ॐ)
- Smooth, slow animations (meditative pace)

### Color Tokens (Tailwind Config)

```javascript
colors: {
  nirvana: {
    dark: '#0a0a0f',      // Main background
    darker: '#050508',    // Deeper background
    gold: '#c9a227',      // Wisdom/spiritual
    'gold-light': '#e8d5a3',
    jade: '#00a86b',      // Vitality/nature
    'jade-light': '#4dd4a8',
    cyan: '#00d4ff',      // Technology/AI
    purple: '#7c3aed',    // Dreams/mystery
  }
}
```

### Common CSS Classes

```css
/* Glass card */
.glass-card {
  @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl;
}

/* Gradient text */
.gradient-text {
  @apply bg-gradient-to-r from-nirvana-cyan via-nirvana-gold to-nirvana-jade 
         bg-clip-text text-transparent;
}

/* Mandala pattern overlay */
.mandala-pattern {
  background-image: url("data:image/svg+xml,..."); /* subtle pattern */
}
```

---

## 🔧 Coding Patterns

### Section Component Template

```tsx
'use client'  // Required for Framer Motion

import { motion } from 'framer-motion'
import FadeIn from '../animations/FadeIn'
import { IconName } from 'lucide-react'

export default function SectionName() {
  return (
    <section id="section-id" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <span className="text-nirvana-gold text-sm tracking-widest uppercase">
            Subtitle
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-white">Section </span>
            <span className="gradient-text">Title</span>
          </h2>
        </FadeIn>
        
        {/* Content */}
      </div>
    </section>
  )
}
```

### Animation Patterns

```tsx
// Fade in on scroll
<FadeIn delay={0.2}>
  <Content />
</FadeIn>

// Hover effect
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.3 }}
>
  <Card />
</motion.div>

// Stagger children
{items.map((item, i) => (
  <FadeIn key={item.id} delay={i * 0.1}>
    <Item {...item} />
  </FadeIn>
))}
```

---

## 📄 Page Guidelines

### Adding a New Page

1. Create folder in `app/new-page/`
2. Create `page.tsx` with:
   - `'use client'` if using Framer Motion
   - `Navigation` and `Footer` components
   - Proper metadata (title, description)
3. Update `Navigation.tsx` if adding to nav

### Metadata Pattern

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Name | Nirvana Ring',
  description: 'Page description for SEO',
}
```

---

## 🚀 Deployment

### GitHub Pages Setup

1. Repository Settings → Pages → Source: GitHub Actions
2. Workflow at `.github/workflows/deploy.yml` handles:
   - Install dependencies (pnpm)
   - Build static export (`next.config.js`: `output: 'export'`)
   - Deploy to `gh-pages` branch

### Static Export Config

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
  // basePath: '/repo-name', // If not using custom domain
}
```

---

## 🧪 Development Commands

```bash
# Install dependencies
pnpm install

# Dev server (localhost:3000)
pnpm run dev

# Production build (outputs to dist/)
pnpm run build

# Type checking
npx tsc --noEmit
```

---

## 📝 Content Guidelines

### Writing Style
- Tone: Calm, spiritual, scientific yet accessible
- Use Sanskrit terms with translations
- Emphasize: ancient wisdom + modern technology
- Avoid: aggressive marketing, medical claims

### Pricing Display
- Always show: **$99** (not $99.99)
- Emphasize: One-time payment, no subscription

### Quotes Attribution
- Include author + source when available
- Use proper Sanskrit transliteration

---

## 🔒 Security & Privacy

- No analytics IDs in code (use env vars)
- Privacy policy covers: Name, Email, Wallet, IP, Profile data
- No medical claims (wellness product only)
- GDPR/CCPA compliant language

---

## 🐛 Common Issues

### Hydration Mismatch
- Use `mounted` state in client components with animations
- Wrap problematic content in `{mounted && (...)}`

### Port Conflicts
- Next.js auto-increments port (3000 → 3001 → etc.)
- Kill processes: `lsof -ti:3000-3010 | xargs kill -9`

### Build Errors
- Check for missing `'use client'` directives
- Ensure no server APIs in static export

---

## 📚 Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 🤖 Agent Checklist

Before submitting changes:

- [ ] Code follows TypeScript strict mode
- [ ] No console errors or warnings
- [ ] Responsive on mobile/desktop
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Build succeeds: `pnpm run build`
- [ ] Theme colors used consistently

---

Last Updated: January 29, 2026
