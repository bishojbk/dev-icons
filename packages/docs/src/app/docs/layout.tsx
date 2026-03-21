'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/docs/usage', label: 'Usage Guide' },
  { href: '/docs/api', label: 'API Reference' },
  { href: '/docs/accessibility', label: 'Accessibility' },
  { href: '/docs/contributing', label: 'Contributing' },
  { href: '/docs/changelog', label: 'Changelog' },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <h3
              className="mb-3 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Documentation
            </h3>
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`sidebar-link block rounded-lg px-3 py-2 text-sm font-medium transition-colors`}
                style={{
                  backgroundColor:
                    pathname === link.href ? 'var(--accent-bg)' : 'transparent',
                  color:
                    pathname === link.href
                      ? 'var(--accent)'
                      : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Content */}
        <article
          className="prose max-w-none"
          style={{ color: 'var(--text-primary)' }}
        >
          {children}
        </article>
      </div>
    </div>
  );
}
