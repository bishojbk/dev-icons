'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  // Row 1 - Major languages & runtimes
  ReactIcon,
  TypescriptIcon,
  JavascriptIcon,
  PythonIcon,
  GoIcon,
  RustIcon,
  SwiftIcon,
  KotlinIcon,
  DartIcon,
  ElixirIcon,
  CplusplusIcon,
  CIcon,
  RubyIcon,
  ScalaIcon,
  HaskellIcon,
  ClojureIcon,
  // Row 2 - Frameworks & meta-frameworks
  NextjsIcon,
  AngularIcon,
  VuejsIcon,
  SvelteIcon,
  AstroIcon,
  NestjsIcon,
  DjangoIcon,
  LaravelIcon,
  FlutterIcon,
  ReactnativeIcon,
  TailwindcssIcon,
  BootstrapIcon,
  ExpressIcon,
  FastapiIcon,
  SpringbootIcon,
  RailsIcon,
  // Row 3 - Infra, Cloud & DevOps
  DockerIcon,
  KubernetesIcon,
  NodejsIcon,
  DenoIcon,
  BunIcon,
  GitIcon,
  GithubIcon,
  GitlabIcon,
  TerraformIcon,
  AnsibleIcon,
  NginxIcon,
  CloudflareIcon,
  VercelIcon,
  NetlifyIcon,
  FirebaseIcon,
  DigitaloceanIcon,
  // Row 4 - Databases, AI & Tools
  PostgresqlIcon,
  MongodbIcon,
  RedisIcon,
  MysqlIcon,
  ElasticsearchIcon,
  SupabaseIcon,
  PrismaIcon,
  GraphqlIcon,
  AnthropicIcon,
  ClaudeIcon,
  GoogleIcon,
  FigmaIcon,
  ViteIcon,
  StripeIcon,
  WebpackIcon,
  EslintIcon,
} from 'devicon-kit';
import {
  iconMetadata,
  categories as allCategories,
  totalIconCount,
} from '@/lib/iconMetadata';

/* ── Feature data ── */
const features = [
  {
    title: 'Context API',
    description:
      'Set global defaults for size, color, and variant via DevIconProvider.',
    icon: '{ }',
  },
  {
    title: 'Variants',
    description:
      'Switch between default, light, and dark variants with a single prop.',
    icon: '~',
  },
  {
    title: 'Animations',
    description:
      'Built-in spin, pulse, and bounce animations — no extra CSS needed.',
    icon: '*',
  },
  {
    title: 'Tree-Shakeable',
    description:
      'Import only the icons you use. Per-icon imports keep your bundle minimal.',
    icon: '#',
  },
  {
    title: 'Accessible',
    description:
      'Proper ARIA attributes, screen reader support, and semantic SVG roles built-in.',
    icon: 'A',
  },
  {
    title: 'TypeScript-First',
    description:
      'Full type definitions for every icon, prop, and context value.',
    icon: 'T',
  },
];

/* ── Code examples ── */
const codeExamples: Record<string, string> = {
  react: `import { ReactIcon, DockerIcon } from 'devicon-kit';

<ReactIcon size="lg" />
<DockerIcon animate="spin" color="#2496ED" />`,
  vue: `import { ReactIcon, DockerIcon } from 'devicon-kit-vue';

<ReactIcon size="lg" />
<DockerIcon animate="spin" color="#2496ED" />`,
  more: `// Svelte
import { ReactIcon } from 'devicon-kit-svelte';
<ReactIcon size="lg" />

// Web Components (Angular, vanilla JS, etc.)
import { registerAll } from 'devicon-kit-web';
registerAll();
<devicon-react size="lg"></devicon-react>

// Raw SVG strings (any environment)
import { getSvg } from 'devicon-kit-svg';
const svg = getSvg('react');`,
};

const tabLabels: Record<string, string> = {
  react: 'React',
  vue: 'Vue',
  more: 'Svelte / Web / Raw',
};

/* ── Category styling ── */
const CATEGORY_LABELS: Record<string, string> = {
  'ai-ml': 'AI & ML',
  os: 'OS',
  devops: 'DevOps',
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

/* ── Copy button ── */
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
        color: copied ? 'white' : '#0a0a0c',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ── Page ── */
export default function HomePage() {
  const [codeTab, setCodeTab] = useState('react');

  return (
    <div>
      {/* ──────── Hero ──────── */}
      <section className="relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="dot-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        {/* Radial amber glow */}
        <div
          className="hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:py-44">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div
              className="animate-in mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--accent-bg)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: 'var(--accent)',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>
                {totalIconCount}+ icons and growing
              </span>
            </div>

            {/* Title */}
            <h1
              className="animate-in animate-delay-1 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Developer Icons.
              <br />
              <span className="text-gradient">One Import Away.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-in animate-delay-2 mx-auto mt-8 max-w-xl text-lg leading-relaxed sm:text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Developer icons for React, Vue, Svelte, Angular, and vanilla JS.
              Tree-shakeable, accessible, with variants and animations.
            </p>

            {/* Terminal install */}
            <div className="animate-in animate-delay-3 mx-auto mt-12 max-w-lg">
              <div className="code-window">
                <div className="code-window-bar">
                  <div className="code-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="code-window-title">Terminal</span>
                  <div style={{ width: 42 }} />
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="select-none text-sm font-medium"
                      style={{ color: 'var(--accent)' }}
                    >
                      $
                    </span>
                    <code
                      className="text-sm"
                      style={{
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      npm install devicon-kit
                    </code>
                  </div>
                  <CopyButton text="npm install devicon-kit" />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="animate-in animate-delay-4 mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/icons"
                className="btn-primary rounded-xl px-7 py-3.5 text-sm font-semibold transition-all"
              >
                Browse Icons
              </Link>
              <Link
                href="/docs/getting-started"
                className="btn-outline rounded-xl border px-7 py-3.5 text-sm font-semibold transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Floating icon grid */}
            <div className="animate-in animate-delay-5 mt-16 space-y-5" aria-hidden="true">
              {/* Row 1 — Languages & runtimes */}
              <div className="flex flex-wrap items-center justify-center gap-4 opacity-30 sm:gap-5">
                <ReactIcon size={26} />
                <TypescriptIcon size={26} />
                <JavascriptIcon size={26} />
                <PythonIcon size={26} />
                <GoIcon size={26} />
                <RustIcon size={26} />
                <SwiftIcon size={26} />
                <KotlinIcon size={26} />
                <DartIcon size={26} />
                <ElixirIcon size={26} />
                <CplusplusIcon size={26} />
                <CIcon size={26} />
                <RubyIcon size={26} />
                <ScalaIcon size={26} />
                <HaskellIcon size={26} />
                <ClojureIcon size={26} />
              </div>
              {/* Row 2 — Frameworks */}
              <div className="flex flex-wrap items-center justify-center gap-4 opacity-25 sm:gap-5">
                <NextjsIcon size={24} />
                <AngularIcon size={24} />
                <VuejsIcon size={24} />
                <SvelteIcon size={24} />
                <AstroIcon size={24} />
                <NestjsIcon size={24} />
                <DjangoIcon size={24} />
                <LaravelIcon size={24} />
                <FlutterIcon size={24} />
                <ReactnativeIcon size={24} />
                <TailwindcssIcon size={24} />
                <BootstrapIcon size={24} />
                <ExpressIcon size={24} />
                <FastapiIcon size={24} />
                <SpringbootIcon size={24} />
                <RailsIcon size={24} />
              </div>
              {/* Row 3 — Infra & DevOps */}
              <div className="flex flex-wrap items-center justify-center gap-4 opacity-[0.18] sm:gap-5">
                <DockerIcon size={22} />
                <KubernetesIcon size={22} />
                <NodejsIcon size={22} />
                <DenoIcon size={22} />
                <BunIcon size={22} />
                <GitIcon size={22} />
                <GithubIcon size={22} />
                <GitlabIcon size={22} />
                <TerraformIcon size={22} />
                <AnsibleIcon size={22} />
                <NginxIcon size={22} />
                <CloudflareIcon size={22} />
                <VercelIcon size={22} />
                <NetlifyIcon size={22} />
                <FirebaseIcon size={22} />
                <DigitaloceanIcon size={22} />
              </div>
              {/* Row 4 — Databases, AI & Tools */}
              <div className="flex flex-wrap items-center justify-center gap-4 opacity-[0.12] sm:gap-5">
                <PostgresqlIcon size={20} />
                <MongodbIcon size={20} />
                <RedisIcon size={20} />
                <MysqlIcon size={20} />
                <ElasticsearchIcon size={20} />
                <SupabaseIcon size={20} />
                <PrismaIcon size={20} />
                <GraphqlIcon size={20} />
                <AnthropicIcon size={20} />
                <ClaudeIcon size={20} />
                <GoogleIcon size={20} />
                <FigmaIcon size={20} />
                <ViteIcon size={20} />
                <StripeIcon size={20} />
                <WebpackIcon size={20} />
                <EslintIcon size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Features ──────── */}
      <section className="border-t py-24" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
              }}
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

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card rounded-2xl border p-6 transition-all"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold"
                  style={{
                    backgroundColor: 'var(--accent-bg)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="mt-4 text-lg font-semibold"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
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

      {/* ──────── Code Examples ──────── */}
      <section className="border-t py-24" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                }}
              >
                Simple, Powerful API
              </h2>
              <p
                className="mt-4 text-lg leading-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Works with every framework. Same props, same icons, same API.
              </p>

              {/* Framework icon strip */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ReactIcon size="md" />
                <VuejsIcon size="md" />
                <SvelteIcon size="md" />
                <AngularIcon size="md" />
                <NextjsIcon size="md" />
                <AstroIcon size="md" />
                <TypescriptIcon size="md" />
                <NodejsIcon size="md" />
                <PythonIcon size="md" />
                <GoIcon size="md" />
                <RustIcon size="md" />
                <SwiftIcon size="md" />
              </div>
            </div>

            {/* Tabbed code window */}
            <div className="code-window">
              <div className="code-tabs">
                {Object.keys(codeExamples).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCodeTab(tab)}
                    className={`code-tab${codeTab === tab ? ' active' : ''}`}
                  >
                    {tabLabels[tab]}
                  </button>
                ))}
              </div>
              <pre className="!m-0 !rounded-t-none !border-0 !bg-transparent">
                <code>{codeExamples[codeTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Categories ──────── */}
      <section className="border-t py-24" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
              }}
            >
              Icons for Every Stack
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              {allCategories.length} categories covering the entire developer
              ecosystem.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {allCategories
              .map((cat) => {
                const count = iconMetadata.filter(
                  (i) => i.category === cat,
                ).length;
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
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          CATEGORY_COLORS[slug] || '#64748B',
                      }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {CATEGORY_LABELS[slug] ||
                        slug
                          .replace(/-/g, ' ')
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-medium"
                    style={{
                      color: 'var(--text-tertiary)',
                      backgroundColor: 'var(--bg-elevated)',
                    }}
                  >
                    {count}
                  </span>
                </Link>
              ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/icons"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              View all icons
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
