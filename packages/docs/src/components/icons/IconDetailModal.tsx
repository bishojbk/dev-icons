'use client';

import { useState, useEffect, useCallback } from 'react';
import type { IconMeta, IconVariant } from 'devicon-kit';
import { iconComponents } from '@/lib/iconComponents';
import { iconSvgData } from '@/lib/iconSvgData';

interface IconDetailModalProps {
  icon: IconMeta;
  onClose: () => void;
}

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="btn-copy flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all"
      style={{
        backgroundColor: copied ? '#10b981' : 'var(--bg-surface)',
        borderColor: copied ? '#10b981' : 'var(--border)',
        color: copied ? 'white' : 'var(--text-primary)',
      }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
      {copied ? 'Copied!' : label}
    </button>
  );
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const sizePixels = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export function IconDetailModal({ icon, onClose }: IconDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState(icon.variants[0]);
  const [selectedSize, setSelectedSize] = useState<(typeof sizes)[number]>('xl');
  const [color, setColor] = useState('#f59e0b');

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const importStatement = `import { ${icon.componentName} } from 'devicon-kit';`;
  const usageCode = `<${icon.componentName} size="${selectedSize}" color="${color}"${
    selectedVariant !== 'default' ? ` variant="${selectedVariant}"` : ''
  } />`;

  const IconComp = iconComponents[icon.componentName];

  // SVG data for download/copy
  const svgContent = iconSvgData[icon.slug]?.[selectedVariant] || iconSvgData[icon.slug]?.['default'] || '';

  const handleDownloadSvg = useCallback(() => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon.slug}${selectedVariant !== 'default' ? `-${selectedVariant}` : ''}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [svgContent, icon.slug, selectedVariant]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="modal-backdrop absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--card-shadow-hover)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center" style={{ minWidth: 48, minHeight: 48 }}>
            {IconComp ? (
              <IconComp size={selectedSize} color={color} variant={selectedVariant as IconVariant} />
            ) : (
              <span className="text-2xl font-bold" style={{ color }}>{icon.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {icon.name}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {({'ai-ml':'AI & ML','os':'OS','devops':'DevOps'} as Record<string,string>)[icon.category] || icon.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </p>
          </div>
        </div>

        {/* Variant selector */}
        {icon.variants.length > 1 && (
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Variant
            </label>
            <div className="flex flex-wrap gap-2">
              {icon.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className="option-pill rounded-lg border px-3 py-1.5 text-sm font-medium capitalize transition-all"
                  style={{
                    backgroundColor: selectedVariant === v ? 'var(--accent)' : 'transparent',
                    borderColor: selectedVariant === v ? 'var(--accent)' : 'var(--border)',
                    color: selectedVariant === v ? '#0a0a0c' : 'var(--text-secondary)',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        <div className="mt-5">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className="option-pill rounded-lg border px-3 py-1.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedSize === s ? 'var(--accent)' : 'transparent',
                  borderColor: selectedSize === s ? 'var(--accent)' : 'var(--border)',
                  color: selectedSize === s ? '#0a0a0c' : 'var(--text-secondary)',
                }}
              >
                {s} ({sizePixels[s]}px)
              </button>
            ))}
          </div>
        </div>

        {/* Color picker */}
        <div className="mt-5">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-9 w-9 rounded border-0 p-0.5"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="search-input rounded-lg border px-3 py-1.5 text-sm outline-none"
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {icon.tags.map((tag) => (
            <span key={tag} className="tag-badge rounded-md px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Code */}
        <div
          className="mt-5 rounded-lg border p-3"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          <pre className="!border-0 !bg-transparent !p-0 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            <code style={{ color: 'var(--text-primary)' }}>
              {importStatement}
              {'\n\n'}
              {usageCode}
            </code>
          </pre>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2">
          <CopyBtn text={importStatement} label="Copy Import" />
          <CopyBtn text={usageCode} label="Copy Usage" />
          {svgContent && <CopyBtn text={svgContent} label="Copy SVG" />}
          {svgContent && (
            <button
              onClick={handleDownloadSvg}
              className="btn-copy flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download SVG
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
