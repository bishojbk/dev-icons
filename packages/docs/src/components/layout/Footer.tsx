import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
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
                className="text-base font-bold"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                }}
              >
                DevIcon Kit
              </span>
            </div>
            <p
              className="mt-3 max-w-xs text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              500+ developer icons for every framework. Open source under MIT.
            </p>
          </div>

          {/* Library */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Library
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/icons"
                  className="footer-link text-sm transition-colors"
                >
                  Browse Icons
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  className="footer-link text-sm transition-colors"
                >
                  Playground
                </Link>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/devicon-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-sm transition-colors"
                >
                  npm Package
                </a>
              </li>
            </ul>
          </div>

          {/* Docs */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Documentation
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/docs/getting-started"
                  className="footer-link text-sm transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/usage"
                  className="footer-link text-sm transition-colors"
                >
                  Usage Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api"
                  className="footer-link text-sm transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/accessibility"
                  className="footer-link text-sm transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Community
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com/bishojbk/dev-icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/docs/contributing"
                  className="footer-link text-sm transition-colors"
                >
                  Contributing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/changelog"
                  className="footer-link text-sm transition-colors"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="footer-link text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 text-sm sm:flex-row"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-tertiary)',
          }}
        >
          <p>All trademarks belong to their respective owners.</p>
          <a
            href="https://github.com/bishojbk/dev-icons/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link transition-colors"
          >
            MIT License
          </a>
        </div>
      </div>
    </footer>
  );
}
