export default function AccessibilityPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        Accessibility
      </h1>
      <p className="mt-4 text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
        How to use DevIcon Kit icons accessibly in your applications.
      </p>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Decorative vs Informative Icons
      </h2>
      <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
        By default, icons render with <code>aria-hidden=&quot;true&quot;</code> and{' '}
        <code>role=&quot;presentation&quot;</code>, meaning screen readers skip them. This is
        correct for <strong>decorative</strong> icons that appear alongside text.
      </p>
      <pre className="mt-4"><code>{`{/* Decorative — screen readers skip the icon, read the text */}
<button>
  <ReactIcon size="sm" />
  <span>React</span>
</button>`}</code></pre>

      <p className="mt-6 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
        When an icon conveys meaning <strong>without</strong> accompanying text, provide
        a <code>title</code> or <code>alt</code> prop. This switches the icon to{' '}
        <code>role=&quot;img&quot;</code> and makes it visible to screen readers.
      </p>
      <pre className="mt-4"><code>{`{/* Informative — the icon IS the label */}
<button>
  <ReactIcon title="React" />
</button>

{/* Or using alt (sets aria-label) */}
<button>
  <ReactIcon alt="React" />
</button>`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        title vs alt
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <th className="py-2 pr-4 text-left font-medium">Prop</th>
              <th className="py-2 pr-4 text-left font-medium">Renders</th>
              <th className="py-2 text-left font-medium">Best for</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>title</code></td>
              <td className="py-2 pr-4">{`<title> inside SVG + aria-labelledby`}</td>
              <td className="py-2">Tooltip behavior + screen reader label</td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>alt</code></td>
              <td className="py-2 pr-4">aria-label on SVG</td>
              <td className="py-2">Screen reader label without visible tooltip</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Color Contrast
      </h2>
      <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
        When icons convey information, ensure at least <strong>3:1 contrast ratio</strong> against
        the background (WCAG 2.1 Level AA for non-text elements). For interactive icons,
        aim for <strong>4.5:1</strong>.
      </p>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Touch Target Size
      </h2>
      <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
        If an icon is interactive (clickable), ensure the touch target is at least{' '}
        <strong>44x44 pixels</strong> (WCAG 2.5.5). You can achieve this with padding:
      </p>
      <pre className="mt-4"><code>{`<button className="p-3"> {/* 24px icon + 12px padding each side = 48px */}
  <ReactIcon size="md" alt="View React docs" />
</button>`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Reduced Motion
      </h2>
      <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
        The built-in animations (spin, pulse, bounce) automatically respect the{' '}
        <code>prefers-reduced-motion</code> media query. You can also conditionally
        apply animations:
      </p>
      <pre className="mt-4"><code>{`const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<ReactIcon animate={prefersReducedMotion ? 'none' : 'spin'} />`}</code></pre>
    </div>
  );
}
