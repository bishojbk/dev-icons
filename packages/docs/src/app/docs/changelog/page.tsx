export default function ChangelogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        Changelog
      </h1>
      <p className="mt-4 text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
        All notable changes to DevIcon Kit.
      </p>

      <div className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          v0.1.0 <span className="ml-2 text-sm font-normal" style={{ color: 'var(--text-tertiary)' }}>— March 2026</span>
        </h2>
        <p className="mt-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
          Initial Release
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <li>20 initial developer icons across 8 categories</li>
          <li>Core library with <code>IconBase</code>, <code>DevIconProvider</code>, and full TypeScript types</li>
          <li>Size presets (xs, sm, md, lg, xl, 2xl) and custom pixel sizes</li>
          <li>Variant support (default, light, dark, wordmark)</li>
          <li>Built-in animations (spin, pulse, bounce)</li>
          <li>Full accessibility support (title, alt, ARIA attributes)</li>
          <li>Tree-shakeable ESM and CJS builds</li>
          <li>Dynamic import map for lazy loading</li>
          <li>Documentation site with icon gallery, playground, and full docs</li>
          <li>Trademark disclaimer page</li>
        </ul>
      </div>
    </div>
  );
}
