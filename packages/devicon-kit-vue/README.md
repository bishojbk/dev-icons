<p align="center">
  <img src="https://raw.githubusercontent.com/bishojbk/dev-icons/main/.github/banner.png" alt="DevIcon Kit" width="100%" />
</p>

<h1 align="center">devicon-kit-vue</h1>

<p align="center">
  <strong>417+ beautifully crafted developer icons as Vue 3 components.</strong><br />
  Tree-shakeable, accessible, animated, and fully typed.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/devicon-kit-vue"><img src="https://img.shields.io/npm/v/devicon-kit-vue?color=blue&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/devicon-kit-vue"><img src="https://img.shields.io/npm/dm/devicon-kit-vue?color=green" alt="npm downloads" /></a>
  <a href="https://github.com/bishojbk/dev-icons/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/devicon-kit-vue" alt="license" /></a>
  <a href="https://www.npmjs.com/package/devicon-kit-vue"><img src="https://img.shields.io/npm/types/devicon-kit-vue" alt="TypeScript" /></a>
</p>

---

## Install

```bash
npm install devicon-kit-vue
# or
yarn add devicon-kit-vue
# or
pnpm add devicon-kit-vue
```

## Quick Start

```vue
<script setup>
import { ReactIcon, TypescriptIcon, PythonIcon } from 'devicon-kit-vue';
</script>

<template>
  <ReactIcon />
  <TypescriptIcon size="lg" />
  <PythonIcon :size="48" color="#3776AB" />
</template>
```

## Features

- **417+ icons** — Frameworks, languages, tools, platforms, and more
- **Tree-shakeable** — Only import what you use, zero bloat
- **TypeScript** — Full type definitions out of the box
- **Variants** — `default`, `light`, `dark`, and `wordmark` styles
- **Animations** — Built-in `spin`, `pulse`, and `bounce`
- **Accessible** — Proper ARIA attributes and `title` prop

## Usage

### Sizes

Use named presets or a custom pixel value:

```vue
<ReactIcon size="xs" />   <!-- 12px -->
<ReactIcon size="sm" />   <!-- 16px -->
<ReactIcon size="md" />   <!-- 24px (default) -->
<ReactIcon size="lg" />   <!-- 32px -->
<ReactIcon size="xl" />   <!-- 48px -->
<ReactIcon size="2xl" />  <!-- 64px -->
<ReactIcon :size="100" /> <!-- 100px -->
```

### Colors

```vue
<ReactIcon color="#61DAFB" />
<ReactIcon color="red" />
```

Each icon uses its official brand color by default.

### Variants

```vue
<ReactIcon variant="default" />
<ReactIcon variant="light" />
<ReactIcon variant="dark" />
<ReactIcon variant="wordmark" />
```

Not all icons have every variant — missing variants gracefully fall back to `default`.

### Animations

```vue
<ReactIcon animate="spin" />
<ReactIcon animate="pulse" />
<ReactIcon animate="bounce" />
```

### Accessibility

```vue
<!-- Decorative (hidden from screen readers) -->
<ReactIcon />

<!-- Meaningful (announced by screen readers) -->
<ReactIcon title="React" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Icon size |
| `color` | `string` | Brand color | SVG fill color |
| `variant` | `'default' \| 'light' \| 'dark' \| 'wordmark'` | `'default'` | Visual variant |
| `animate` | `'none' \| 'spin' \| 'pulse' \| 'bounce'` | `'none'` | CSS animation |
| `title` | `string` | — | Accessible title for screen readers |

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

- Vue >= 3.3.0

## License

[MIT](https://github.com/bishojbk/dev-icons/blob/main/LICENSE)
