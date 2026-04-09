<p align="center">
  <img src="https://raw.githubusercontent.com/bishojbk/dev-icons/main/.github/banner.png" alt="DevIcon Kit" width="100%" />
</p>

<h1 align="center">devicon-kit</h1>

<p align="center">
  <strong>417+ beautifully crafted developer icons as React components.</strong><br />
  Tree-shakeable, accessible, animated, and fully typed.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/devicon-kit"><img src="https://img.shields.io/npm/v/devicon-kit?color=blue&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/devicon-kit"><img src="https://img.shields.io/npm/dm/devicon-kit?color=green" alt="npm downloads" /></a>
  <a href="https://github.com/bishojbk/dev-icons/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/devicon-kit" alt="license" /></a>
  <a href="https://www.npmjs.com/package/devicon-kit"><img src="https://img.shields.io/npm/types/devicon-kit" alt="TypeScript" /></a>
</p>

---

## Install

```bash
npm install devicon-kit
# or
yarn add devicon-kit
# or
pnpm add devicon-kit
```

## Quick Start

```tsx
import { ReactIcon, TypescriptIcon, PythonIcon } from 'devicon-kit';

function App() {
  return (
    <div>
      <ReactIcon />
      <TypescriptIcon size="lg" />
      <PythonIcon size={48} color="#3776AB" />
    </div>
  );
}
```

## Features

- **417+ icons** — Frameworks, languages, tools, platforms, and more
- **Tree-shakeable** — Only import what you use, zero bloat
- **TypeScript** — Full type definitions out of the box
- **Variants** — `default`, `light`, `dark`, and `wordmark` styles
- **Animations** — Built-in `spin`, `pulse`, and `bounce`
- **Accessible** — Proper ARIA attributes, `title` and `alt` props
- **Context API** — Set global defaults with `DevIconProvider`
- **Tiny per-icon** — Each icon is its own module (~1-3 KB)

## Usage

### Sizes

Use named presets or a custom pixel value:

```tsx
<ReactIcon size="xs" />   {/* 12px */}
<ReactIcon size="sm" />   {/* 16px */}
<ReactIcon size="md" />   {/* 24px (default) */}
<ReactIcon size="lg" />   {/* 32px */}
<ReactIcon size="xl" />   {/* 48px */}
<ReactIcon size="2xl" />  {/* 64px */}
<ReactIcon size={100} />  {/* 100px */}
```

### Colors

```tsx
<ReactIcon color="#61DAFB" />
<ReactIcon color="red" />
<ReactIcon color="currentColor" />
```

Each icon uses its official brand color by default.

### Variants

```tsx
<ReactIcon variant="default" />
<ReactIcon variant="light" />
<ReactIcon variant="dark" />
<ReactIcon variant="wordmark" />
```

Not all icons have every variant — missing variants gracefully fall back to `default`.

### Animations

```tsx
<ReactIcon animate="spin" />
<ReactIcon animate="pulse" />
<ReactIcon animate="bounce" />
```

### Accessibility

```tsx
{/* Decorative (hidden from screen readers) */}
<ReactIcon />

{/* Meaningful (announced by screen readers) */}
<ReactIcon title="React" />
<ReactIcon alt="React framework" />
```

### Global Defaults with DevIconProvider

Set defaults for all icons in a subtree:

```tsx
import { DevIconProvider, ReactIcon, TypescriptIcon } from 'devicon-kit';

function App() {
  return (
    <DevIconProvider size="lg" color="#333">
      <ReactIcon />        {/* inherits size="lg" color="#333" */}
      <TypescriptIcon />   {/* inherits size="lg" color="#333" */}
    </DevIconProvider>
  );
}
```

### Per-Icon Imports (Maximum Tree-Shaking)

```tsx
import { ReactIcon } from 'devicon-kit/icons/ReactIcon';
import { DockerIcon } from 'devicon-kit/icons/DockerIcon';
```

### Dynamic Imports (Lazy Loading)

```tsx
import { dynamicIconImports } from 'devicon-kit/dynamic';

// Load icon on demand
const { ReactIcon } = await dynamicIconImports['react']();
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Icon size |
| `color` | `string` | Brand color | SVG fill color |
| `variant` | `'default' \| 'light' \| 'dark' \| 'wordmark'` | `'default'` | Visual variant |
| `animate` | `'none' \| 'spin' \| 'pulse' \| 'bounce'` | `'none'` | CSS animation |
| `title` | `string` | — | Accessible title for screen readers |
| `alt` | `string` | — | Aria-label for the SVG |
| `className` | `string` | — | CSS class names |
| `style` | `CSSProperties` | — | Inline styles |

All standard SVG attributes are also supported.

## Available Icons

<details>
<summary>View all 417+ icons</summary>

Includes icons for: React, TypeScript, JavaScript, Python, Go, Rust, Docker, Kubernetes, AWS, Azure, GCP, Firebase, Git, GitHub, VS Code, Node.js, Deno, Bun, Next.js, Nuxt, Svelte, Vue, Angular, Tailwind CSS, PostgreSQL, MongoDB, Redis, GraphQL, Figma, Linux, Android, Apple, and hundreds more.

Every icon follows the naming convention: `{Name}Icon` — for example `ReactIcon`, `DockerIcon`, `TypescriptIcon`.

</details>

## Also Available

| Package | Framework |
|---------|-----------|
| [devicon-kit](https://www.npmjs.com/package/devicon-kit) | React |
| [devicon-kit-vue](https://www.npmjs.com/package/devicon-kit-vue) | Vue 3 |

## Requirements

- React >= 18.0.0

## License

[MIT](https://github.com/bishojbk/dev-icons/blob/main/LICENSE)
