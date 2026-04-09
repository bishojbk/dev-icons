'use client';

import { useRef, useEffect, useCallback } from 'react';

const CATEGORY_LABELS: Record<string, string> = {
  'ai-ml': 'AI & ML',
  'os': 'OS',
  'devops': 'DevOps',
  'crypto': 'Crypto',
};

function formatCategory(cat: string): string {
  return CATEGORY_LABELS[cat] || cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  counts,
}: CategoryFilterProps) {
  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Scroll selected pill into view on mount and when selection changes
  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const pill = selectedRef.current;
      const containerRect = container.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();

      // Check if pill is outside visible area
      if (pillRect.left < containerRect.left || pillRect.right > containerRect.right) {
        pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selected]);

  return (
    <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      <button
        ref={selected === 'all' ? selectedRef : undefined}
        onClick={() => onSelect('all')}
        className="category-pill shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all"
        style={{
          backgroundColor: selected === 'all' ? 'var(--accent)' : 'var(--bg-surface)',
          borderColor: selected === 'all' ? 'var(--accent)' : 'var(--border)',
          color: selected === 'all' ? '#0a0a0c' : 'var(--text-secondary)',
        }}
      >
        All ({allCount})
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          ref={selected === cat ? selectedRef : undefined}
          onClick={() => onSelect(cat)}
          className="category-pill shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all"
          style={{
            backgroundColor: selected === cat ? 'var(--accent)' : 'var(--bg-surface)',
            borderColor: selected === cat ? 'var(--accent)' : 'var(--border)',
            color: selected === cat ? '#0a0a0c' : 'var(--text-secondary)',
          }}
        >
          {formatCategory(cat)} ({counts[cat] || 0})
        </button>
      ))}
    </div>
  );
}
