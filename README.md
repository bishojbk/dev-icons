# DevIcon Kit

> 496 beautifully crafted developer icons as React components with variants, animations, and accessibility built-in.

## Features

- **496 Icons** — Programming languages, frameworks, tools, cloud, AI/ML, and more
- **Variants** — Switch between default, light, dark, and wordmark with a single prop
- **Size Presets** — xs (12px), sm (16px), md (24px), lg (32px), xl (48px), 2xl (64px), or custom pixels
- **Animations** — Built-in spin, pulse, and bounce — no extra CSS needed
- **Context API** — Set global defaults via `DevIconProvider`
- **Accessible** — Proper ARIA attributes, `title`/`alt` props, screen reader support
- **TypeScript-First** — Full type definitions for every icon and prop
- **Tree-Shakeable** — Import only what you use, per-icon imports available
- **Dynamic Imports** — Lazy load icons with the dynamic import map
- **Dual ESM/CJS** — Works everywhere

## Installation

```bash
npm install devicon-kit
```

## Quick Start

```tsx
import { ReactIcon, TypeScriptIcon, PythonIcon } from 'devicon-kit';

function App() {
  return (
    <div>
      <ReactIcon size="lg" />
      <TypeScriptIcon size={32} color="#3178C6" />
      <PythonIcon variant="wordmark" />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Icon size |
| `color` | `string` | `'currentColor'` | SVG fill color |
| `variant` | `'default' \| 'light' \| 'dark' \| 'wordmark'` | `'default'` | Visual variant |
| `animate` | `'none' \| 'spin' \| 'pulse' \| 'bounce'` | `'none'` | CSS animation |
| `title` | `string` | - | Accessible title (screen readers + tooltip) |
| `alt` | `string` | - | Accessible label (aria-label) |
| `className` | `string` | - | CSS classes |
| `style` | `CSSProperties` | - | Inline styles |
| `...rest` | `SVGProps` | - | Any SVG attribute |

## Context Provider

Set global defaults for all icons in a tree:

```tsx
import { DevIconProvider, ReactIcon, TypeScriptIcon } from 'devicon-kit';

<DevIconProvider size="xl" color="#333" variant="dark">
  <ReactIcon />      {/* inherits xl, #333, dark */}
  <TypeScriptIcon />  {/* inherits xl, #333, dark */}
  <ReactIcon size="sm" /> {/* overrides to sm */}
</DevIconProvider>
```

## Per-Icon Imports

For maximum tree-shaking:

```tsx
import { ReactIcon } from 'devicon-kit/icons/ReactIcon';
```

## Dynamic Imports

Lazy load icons on demand:

```tsx
import { lazy, Suspense } from 'react';
import { dynamicIconImports } from 'devicon-kit/dynamic';

const LazyIcon = lazy(() =>
  dynamicIconImports['react']().then(mod => ({ default: mod.ReactIcon }))
);

<Suspense fallback={<div />}>
  <LazyIcon size="lg" />
</Suspense>
```

## Icon Categories

| Category | Examples |
|----------|---------|
| Languages | Python, JavaScript, TypeScript, Rust, Go, Java, Kotlin, Swift |
| Frontend | React, Vue, Angular, Svelte, Next.js, Tailwind, Astro |
| Backend | Node.js, Express, Django, FastAPI, Spring, NestJS |
| Databases | PostgreSQL, MongoDB, Redis, Supabase, Prisma |
| DevOps | Docker, Kubernetes, Terraform, GitHub Actions |
| Cloud | AWS, GCP, Azure, Vercel, Cloudflare |
| AI/ML | OpenAI, PyTorch, TensorFlow, Hugging Face |
| Tools | VS Code, Git, GitHub, Figma, Postman |
| And more... | Testing, Design, Browsers, OS, Social |

## Accessibility

Icons are hidden from screen readers by default (`aria-hidden`). To make them accessible:

```tsx
// Decorative (with text) — default behavior
<button><ReactIcon /> React</button>

// Informative (icon-only) — add title or alt
<button><ReactIcon title="React" /></button>
```

## Credits

The SVG icon paths are sourced from [**simple-icons**](https://github.com/simple-icons/simple-icons), licensed under [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/). Huge thanks to the simple-icons community for maintaining the original icon set. This package wraps those SVGs as React / Vue / Svelte / web components with variants, animations, and accessibility props.

## License

MIT — see [LICENSE](./LICENSE)

**Note:** The MIT license covers the source code in this repository. The underlying SVG paths are CC0-1.0 (simple-icons). All brand trademarks belong to their respective owners. See [DISCLAIMER.md](./DISCLAIMER.md).
