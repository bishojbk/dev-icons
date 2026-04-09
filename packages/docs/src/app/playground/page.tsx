'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { iconMetadata } from '@/lib/iconMetadata';
import { iconComponents } from '@/lib/iconComponents';
import type { IconMeta, IconVariant, IconAnimation } from 'devicon-kit';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const sizePixels = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
const animations = ['none', 'spin', 'pulse', 'bounce'] as const;

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
      className="btn-copy rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
      style={{
        backgroundColor: copied ? '#10b981' : 'var(--accent)',
        color: copied ? 'white' : '#0a0a0c',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function PlaygroundPage() {
  const [selectedSlug, setSelectedSlug] = useState(
    iconMetadata[0]?.slug || '',
  );
  const [size, setSize] = useState<(typeof sizes)[number]>('xl');
  const [useDefaultColor, setUseDefaultColor] = useState(true);
  const [customColor, setCustomColor] = useState('#f59e0b');
  const [variant, setVariant] = useState('default');
  const [animation, setAnimation] =
    useState<(typeof animations)[number]>('none');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((val: string) => {
    setSearchInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchQuery(val), 200);
  }, []);

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const selectedIcon = useMemo(
    () => iconMetadata.find((i) => i.slug === selectedSlug) || iconMetadata[0],
    [selectedSlug],
  );

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return iconMetadata;
    const q = searchQuery.toLowerCase();
    return iconMetadata.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.slug.includes(q) ||
        i.tags.some((t) => t.includes(q)),
    );
  }, [searchQuery]);

  const code = useMemo(() => {
    if (!selectedIcon) return '';
    const props: string[] = [];
    if (size !== 'md') props.push(`size="${size}"`);
    if (!useDefaultColor) props.push(`color="${customColor}"`);
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (animation !== 'none') props.push(`animate="${animation}"`);

    const propsStr = props.length > 0 ? ` ${props.join(' ')}` : '';
    return `import { ${selectedIcon.componentName} } from 'devicon-kit';\n\n<${selectedIcon.componentName}${propsStr} />`;
  }, [selectedIcon, size, useDefaultColor, customColor, variant, animation]);

  const animationStyle = useMemo(() => {
    if (animation === 'spin')
      return { animation: 'devicon-spin 1s linear infinite' };
    if (animation === 'pulse')
      return { animation: 'devicon-pulse 2s ease-in-out infinite' };
    if (animation === 'bounce')
      return { animation: 'devicon-bounce 1s ease infinite' };
    return {};
  }, [animation]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
          }}
        >
          Playground
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Customize icons interactively and copy the generated code.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Controls Panel */}
        <div
          className="space-y-6 rounded-2xl border p-6"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {/* Icon Selector */}
          <div>
            <label
              className="mb-2 block text-xs font-medium uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Icon
            </label>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search icons..."
              className="search-input mb-2 w-full rounded-lg border px-3 py-2 text-sm outline-none"
            />
            <div
              className="max-h-40 overflow-y-auto rounded-lg border"
              style={{ borderColor: 'var(--border)' }}
            >
              {filteredIcons.map((icon) => (
                <button
                  key={icon.slug}
                  onClick={() => {
                    setSelectedSlug(icon.slug);
                    setVariant('default');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors"
                  style={{
                    backgroundColor:
                      icon.slug === selectedSlug
                        ? 'var(--accent-bg)'
                        : 'transparent',
                    color:
                      icon.slug === selectedSlug
                        ? 'var(--accent)'
                        : 'var(--text-primary)',
                  }}
                >
                  {icon.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label
              className="mb-2 block text-xs font-medium uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="option-pill rounded-md border px-2.5 py-1 text-xs font-medium transition-all"
                  style={{
                    backgroundColor:
                      size === s ? 'var(--accent)' : 'transparent',
                    borderColor:
                      size === s ? 'var(--accent)' : 'var(--border)',
                    color: size === s ? '#0a0a0c' : 'var(--text-secondary)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label
              className="mb-2 block text-xs font-medium uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Color
            </label>
            <div className="mb-2 flex gap-1.5">
              <button
                onClick={() => setUseDefaultColor(true)}
                className="option-pill rounded-md border px-2.5 py-1 text-xs font-medium transition-all"
                style={{
                  backgroundColor: useDefaultColor
                    ? 'var(--accent)'
                    : 'transparent',
                  borderColor: useDefaultColor
                    ? 'var(--accent)'
                    : 'var(--border)',
                  color: useDefaultColor
                    ? '#0a0a0c'
                    : 'var(--text-secondary)',
                }}
              >
                Brand Default
              </button>
              <button
                onClick={() => setUseDefaultColor(false)}
                className="option-pill rounded-md border px-2.5 py-1 text-xs font-medium transition-all"
                style={{
                  backgroundColor: !useDefaultColor
                    ? 'var(--accent)'
                    : 'transparent',
                  borderColor: !useDefaultColor
                    ? 'var(--accent)'
                    : 'var(--border)',
                  color: !useDefaultColor
                    ? '#0a0a0c'
                    : 'var(--text-secondary)',
                }}
              >
                Custom
              </button>
            </div>
            {useDefaultColor ? (
              <p
                className="text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Uses the icon&apos;s official brand color. No color prop
                needed.
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border-0"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="search-input flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
            )}
          </div>

          {/* Variant */}
          {selectedIcon && selectedIcon.variants.length > 1 && (
            <div>
              <label
                className="mb-2 block text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Variant
              </label>
              <div className="flex flex-wrap gap-1.5">
                {selectedIcon.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className="rounded-md border px-2.5 py-1 text-xs font-medium capitalize transition-all"
                    style={{
                      backgroundColor:
                        variant === v ? 'var(--accent)' : 'transparent',
                      borderColor:
                        variant === v ? 'var(--accent)' : 'var(--border)',
                      color:
                        variant === v
                          ? '#0a0a0c'
                          : 'var(--text-secondary)',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Animation */}
          <div>
            <label
              className="mb-2 block text-xs font-medium uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Animation
            </label>
            <div className="flex flex-wrap gap-1.5">
              {animations.map((a) => (
                <button
                  key={a}
                  onClick={() => setAnimation(a)}
                  className="rounded-md border px-2.5 py-1 text-xs font-medium capitalize transition-all"
                  style={{
                    backgroundColor:
                      animation === a ? 'var(--accent)' : 'transparent',
                    borderColor:
                      animation === a ? 'var(--accent)' : 'var(--border)',
                    color:
                      animation === a
                        ? '#0a0a0c'
                        : 'var(--text-secondary)',
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview and Code */}
        <div className="space-y-6">
          {/* Preview */}
          <div
            className="dot-grid flex items-center justify-center rounded-2xl border p-16"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border)',
              minHeight: 200,
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {(() => {
              if (!selectedIcon) return null;
              const IconComp = iconComponents[selectedIcon.componentName];
              const colorToPass = useDefaultColor ? undefined : customColor;
              if (!IconComp) {
                return (
                  <div
                    className="flex items-center justify-center text-4xl font-bold"
                    style={{ color: colorToPass, ...animationStyle }}
                  >
                    {selectedIcon.name.charAt(0)}
                  </div>
                );
              }
              return (
                <IconComp
                  size={size}
                  color={colorToPass}
                  variant={variant as IconVariant}
                  animate={animation as IconAnimation}
                />
              );
            })()}
          </div>

          {/* Code Output */}
          <div className="code-window">
            <div
              className="flex items-center justify-between border-b px-5 py-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Generated Code
              </span>
              <CopyButton text={code} />
            </div>
            <pre className="!m-0 !rounded-t-none !border-0 !bg-transparent p-5">
              <code
                className="text-sm"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
