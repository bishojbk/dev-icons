import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Library
            </h3>
            <ul className="mt-3 space-y-2">
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
          <div>
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Documentation
            </h3>
            <ul className="mt-3 space-y-2">
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
          <div>
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Community
            </h3>
            <ul className="mt-3 space-y-2">
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
            </ul>
          </div>
          <div>
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/disclaimer"
                  className="footer-link text-sm transition-colors"
                >
                  Trademark Disclaimer
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/bishojbk/dev-icons/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-sm transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="mt-10 border-t pt-6 text-center text-sm"
          style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
        >
          <p>
            Built with care. All trademarks belong to their respective owners.
          </p>
          <p className="mt-1">
            DevIcon Kit is open source under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
