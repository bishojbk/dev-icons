'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ReactIcon,
  TypescriptIcon,
  PythonIcon,
  DockerIcon,
  GoIcon,
  RustIcon,
  NextjsIcon,
  NodejsIcon,
  PostgresqlIcon,
  KubernetesIcon,
  GoogleIcon,
  AnthropicIcon,
} from 'devicon-kit';
import { iconMetadata, categories as allCategories, totalIconCount } from '@/lib/iconMetadata';

const features = [
  {
    title: 'Context API',
    description: 'Set global defaults for size, color, and variant via DevIconProvider.',
    icon: '{ }',
  },
  {
    title: 'Variants',
    description: 'Switch between default, light, and dark variants with a single prop.',
    icon: '~',
  },
  {
    title: 'Animations',
    description: 'Built-in spin, pulse, and bounce animations — no extra CSS needed.',
    icon: '*',
  },
  {
    title: 'Tree-Shakeable',
    description: 'Import only the icons you use. Per-icon imports keep your bundle minimal.',
    icon: '#',
  },
  {
    title: 'Accessible',
    description: 'Proper ARIA attributes, screen reader support, and semantic SVG roles built-in.',
    icon: 'A',
  },
  {
    title: 'TypeScript-First',
    description: 'Full type definitions for every icon, prop, and context value.',
    icon: 'T',
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  'ai-ml': 'AI & ML',
  'os': 'OS',
  'devops': 'DevOps',
};
const CATEGORY_COLORS: Record<string, string> = {
  languages: '#3178C6',
  frontend: '#61DAFB',
  backend: '#68A063',
  'ai-ml': '#FF6F00',
  devops: '#2496ED',
  databases: '#336791',
  tools: '#F7B93E',
  social: '#E4405F',
  brands: '#4285F4',
  cloud: '#FF9900',
  crypto: '#F7931A',
  design: '#F24E1E',
  gaming: '#000000',
  os: '#FCC624',
  testing: '#C21325',
  mobile: '#61DAFB',
  productivity: '#0B5CFF',
  browsers: '#4285F4',
  hardware: '#00878F',
  misc: '#64748B',
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="btn-copy rounded-md px-3 py-1.5 text-xs font-medium transition-all"
      style={{
        backgroundColor: copied ? '#10b981' : 'var(--accent)',
        color: 'white',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Floating icons background */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
          aria-hidden="true"
        >
          <div className="grid grid-cols-4 gap-8 sm:grid-cols-6">
            <ReactIcon size="2xl" />
            <TypescriptIcon size="2xl" />
            <PythonIcon size="2xl" />
            <DockerIcon size="2xl" />
            <GoIcon size="2xl" />
            <RustIcon size="2xl" />
            <NextjsIcon size="2xl" />
            <NodejsIcon size="2xl" />
            <PostgresqlIcon size="2xl" />
            <KubernetesIcon size="2xl" />
            <GoogleIcon size="2xl" />
            <AnthropicIcon size="2xl" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative mx-auto max-w-3xl text-center">
            <div
              className="mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--accent)',
                backgroundColor: 'var(--accent-bg)',
              }}
            >
              {totalIconCount}+ icons and growing
            </div>

            <h1
              className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Developer Icons.{' '}
              <span style={{ color: 'var(--accent)' }}>One Import Away.</span>
            </h1>

            <p
              className="mt-6 text-lg leading-8 sm:text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Developer icons for React, Vue, Svelte, Angular, and vanilla JS.
              Tree-shakeable, accessible, with variants and animations.
            </p>

            {/* Install command */}
            <div
              className="mx-auto mt-10 flex max-w-md items-center justify-between rounded-xl border p-2"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border)',
              }}
            >
              <code
                className="px-3 text-sm"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                npm install devicon-kit
              </code>
              <CopyButton text="npm install devicon-kit" />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/icons"
                className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold transition-all"
              >
                Browse Icons
              </Link>
              <Link
                href="/docs/getting-started"
                className="btn-outline rounded-xl border px-6 py-3 text-sm font-semibold transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="border-t py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Built for Developer Experience
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Everything you need from an icon library, and more.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card rounded-2xl border p-6 transition-all"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold"
                  style={{
                    backgroundColor: 'var(--accent-bg)',
                    color: 'var(--accent)',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="mt-4 text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section
        className="border-t py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Simple, Powerful API
              </h2>
              <p
                className="mt-4 text-lg leading-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Works with every framework. Same props, same icons, same API.
              </p>
            </div>
            <div className="space-y-4">
              <div
                className="rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>React</p>
                <pre className="!border-0 !bg-transparent !p-0">
                  <code>{`import { ReactIcon, DockerIcon } from 'devicon-kit';

<ReactIcon size="lg" />
<DockerIcon animate="spin" color="#2496ED" />`}</code>
                </pre>
              </div>
              <div
                className="rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Vue</p>
                <pre className="!border-0 !bg-transparent !p-0">
                  <code>{`import { ReactIcon, DockerIcon } from 'devicon-kit-vue';

<ReactIcon size="lg" />
<DockerIcon animate="spin" color="#2496ED" />`}</code>
                </pre>
              </div>
              <div
                className="rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Svelte / Web Components / Vanilla JS</p>
                <pre className="!border-0 !bg-transparent !p-0">
                  <code>{`// Svelte
import { ReactIcon } from 'devicon-kit-svelte';
<ReactIcon size="lg" />

// Web Components (Angular, vanilla JS, etc.)
import { registerAll } from 'devicon-kit-web';
registerAll();
<devicon-react size="lg"></devicon-react>

// Raw SVG strings (any environment)
import { getSvg } from 'devicon-kit-svg';
const svg = getSvg('react');`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="border-t py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Icons for Every Stack
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              {allCategories.length} categories covering the entire developer ecosystem.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allCategories
              .map((cat) => {
                const count = iconMetadata.filter((i) => i.category === cat).length;
                return { slug: cat, count };
              })
              .sort((a, b) => b.count - a.count)
              .map(({ slug, count }) => (
              <Link
                key={slug}
                href={`/icons?category=${slug}`}
                className="category-card flex items-center justify-between rounded-xl border p-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[slug] || '#64748B' }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {CATEGORY_LABELS[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {count}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/icons"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              View all categories &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
