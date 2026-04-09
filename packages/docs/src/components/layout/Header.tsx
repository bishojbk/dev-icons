'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/icons', label: 'Icons' },
  { href: '/playground', label: 'Playground' },
  { href: '/docs/getting-started', label: 'Docs' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(16px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.5)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold select-none"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="var(--accent)" />
            <path
              d="M9 8h4.5a5.5 5.5 0 010 11H9V8z"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span
            style={{
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            DevIcon Kit
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com/bishojbk/dev-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link rounded-lg p-2 transition-colors"
            aria-label="GitHub"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 md:hidden"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="border-t px-4 py-3 md:hidden"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link block rounded-lg px-3 py-2.5 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
