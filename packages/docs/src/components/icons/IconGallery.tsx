'use client';

import { useState, useMemo, useCallback } from 'react';
import type { IconMeta } from 'devicon-kit';
import { IconSearch } from './IconSearch';
import { CategoryFilter } from './CategoryFilter';
import { IconCard } from './IconCard';
import { IconDetailModal } from './IconDetailModal';
import { searchIcons } from '@/lib/fuseSearch';

interface IconGalleryProps {
  icons: IconMeta[];
  categories: string[];
  initialCategory?: string;
}

export function IconGallery({ icons, categories, initialCategory = 'all' }: IconGalleryProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedIcon, setSelectedIcon] = useState<IconMeta | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const icon of icons) {
      counts[icon.category] = (counts[icon.category] || 0) + 1;
    }
    return counts;
  }, [icons]);

  const filteredIcons = useMemo(
    () => searchIcons(icons, query, selectedCategory),
    [icons, query, selectedCategory]
  );

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div>
      {/* Search */}
      <IconSearch
        value={query}
        onChange={handleSearch}
        resultCount={filteredIcons.length}
      />

      {/* Category Filter */}
      <div className="mt-4">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
          counts={categoryCounts}
        />
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {filteredIcons.map((icon) => (
          <IconCard
            key={icon.slug}
            icon={icon}
            onClick={() => setSelectedIcon(icon)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredIcons.length === 0 && (
        <div
          className="mt-16 text-center"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <svg
            className="mx-auto mb-4"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p className="text-lg font-medium">No icons found</p>
          <p className="mt-1 text-sm">
            Try a different search term or category.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedIcon && (
        <IconDetailModal
          icon={selectedIcon}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </div>
  );
}
