'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IconGallery } from '@/components/icons/IconGallery';
import { iconMetadata, categories } from '@/lib/iconMetadata';

function IconsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  return (
    <IconGallery
      icons={iconMetadata}
      categories={categories}
      initialCategory={initialCategory}
    />
  );
}

export default function IconsPage() {
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

      <Suspense fallback={<div style={{ color: 'var(--text-tertiary)' }}>Loading icons...</div>}>
        <IconsContent />
      </Suspense>
    </div>
  );
}
