export default function ContributingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        Contributing
      </h1>
      <p className="mt-4 text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
        Thank you for your interest in contributing! Here&apos;s how to add icons and improve the library.
      </p>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Adding a New Icon
      </h2>
      <ol className="mt-4 list-inside list-decimal space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <li>
          <strong style={{ color: 'var(--text-primary)' }}>Prepare the SVG</strong>
          <ul className="ml-6 mt-2 list-inside list-disc space-y-1">
            <li>Source or create an SVG of the technology icon</li>
            <li>Ensure the SVG has a <code>viewBox</code> attribute (preferably <code>0 0 128 128</code>)</li>
            <li>Remove fixed <code>width</code> and <code>height</code> attributes</li>
            <li>Keep the file under 20KB</li>
            <li>No embedded raster images or scripts</li>
          </ul>
        </li>
        <li>
          <strong style={{ color: 'var(--text-primary)' }}>Add the SVG file(s)</strong>
          <p className="mt-1">
            Place your SVG in the appropriate category folder:
          </p>
          <pre className="mt-2"><code>{`icons/<category>/<slug>/default.svg
icons/<category>/<slug>/dark.svg      # optional
icons/<category>/<slug>/light.svg     # optional
icons/<category>/<slug>/wordmark.svg  # optional`}</code></pre>
        </li>
        <li>
          <strong style={{ color: 'var(--text-primary)' }}>Register the icon</strong>
          <p className="mt-1">
            Add an entry to <code>data/icons.json</code>:
          </p>
          <pre className="mt-2"><code>{`{
  "slug": "your-icon",
  "name": "Your Icon",
  "category": "frontend",
  "tags": ["relevant", "keywords"],
  "aliases": ["alt-name"],
  "variants": ["default"],
  "url": "https://official-site.com"
}`}</code></pre>
        </li>
        <li>
          <strong style={{ color: 'var(--text-primary)' }}>Build and test</strong>
          <pre className="mt-2"><code>{`pnpm icons:build   # validate, optimize, generate
pnpm dev:docs      # preview in the docs site`}</code></pre>
        </li>
        <li>
          <strong style={{ color: 'var(--text-primary)' }}>Submit a PR</strong>
          <p className="mt-1">
            Open a pull request with your changes. Include a screenshot
            of the icon rendering in the gallery.
          </p>
        </li>
      </ol>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        SVG Guidelines
      </h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <li>Prefer square viewBox (<code>0 0 128 128</code>) for standard icons</li>
        <li>Use wider viewBox for wordmarks (<code>0 0 256 128</code>)</li>
        <li>Use the brand&apos;s official colors</li>
        <li>Remove unnecessary groups, comments, and metadata</li>
        <li>Ensure the icon is centered within the viewBox</li>
        <li>Test at small sizes (16px, 24px) for readability</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Category List
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Available categories:
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {['languages', 'frontend', 'backend', 'mobile', 'databases', 'devops', 'cloud', 'ai-ml', 'tools', 'design', 'testing', 'browsers', 'social', 'misc'].map((cat) => (
          <span
            key={cat}
            className="rounded-md px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}
          >
            {cat}
          </span>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Development Setup
      </h2>
      <pre className="mt-4"><code>{`git clone https://github.com/bishojbk/dev-icons.git
cd devicon-kit
pnpm install
pnpm icons:build
pnpm dev:docs`}</code></pre>
    </div>
  );
}
