'use client';

import { useSearchParams } from 'next/navigation';
import { IconGallery } from '@/components/icons/IconGallery';
import { iconMetadata, categories } from '@/lib/iconMetadata';

export default function IconsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Icon Gallery
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Browse, search, and copy icons for your project.
        </p>
      </div>

      <IconGallery
        icons={iconMetadata}
        categories={categories}
        initialCategory={initialCategory}
      />
    </div>
  );
}
