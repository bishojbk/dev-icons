'use client';

import type { IconMeta } from 'devicon-kit';
import { iconComponents } from '@/lib/iconComponents';

interface IconCardProps {
  icon: IconMeta;
  onClick: () => void;
}

export function IconCard({ icon, onClick }: IconCardProps) {
  const hasMultipleVariants = icon.variants.length > 1;
  const IconComponent = iconComponents[icon.componentName];

  return (
    <button
      onClick={onClick}
      className="icon-card flex flex-col items-center gap-3 rounded-xl border p-4 transition-all"
    >
      <div className="flex h-12 w-12 items-center justify-center">
        {IconComponent ? (
          <IconComponent size="xl" />
        ) : (
          <span
            className="text-lg font-bold"
            style={{ color: 'var(--accent)' }}
          >
            {icon.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {icon.name}
        </span>

        {hasMultipleVariants && (
          <div className="flex gap-1">
            {icon.variants.map((v) => (
              <div
                key={v}
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    v === 'default'
                      ? 'var(--accent)'
                      : v === 'dark'
                      ? '#1e293b'
                      : v === 'light'
                      ? '#e2e8f0'
                      : '#f59e0b',
                }}
                title={v}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
