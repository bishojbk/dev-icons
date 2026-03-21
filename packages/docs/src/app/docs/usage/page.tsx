export default function UsagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        Usage Guide
      </h1>
      <p className="mt-4 text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
        Learn how to use all the features of DevIcon Kit.
      </p>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Size
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Icons support named size presets or pixel numbers:
      </p>
      <pre className="mt-4"><code>{`// Named presets
<ReactIcon size="xs" />  {/* 12px */}
<ReactIcon size="sm" />  {/* 16px */}
<ReactIcon size="md" />  {/* 24px (default) */}
<ReactIcon size="lg" />  {/* 32px */}
<ReactIcon size="xl" />  {/* 48px */}
<ReactIcon size="2xl" /> {/* 64px */}

// Custom pixel size
<ReactIcon size={96} />`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Color
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Override the icon color with any CSS color value. Defaults to <code>currentColor</code>.
      </p>
      <pre className="mt-4"><code>{`<ReactIcon color="#61DAFB" />
<ReactIcon color="rgb(97, 218, 251)" />
<ReactIcon color="currentColor" />  {/* inherits parent color */}`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Variants
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Many icons come with multiple visual variants. Use the <code>variant</code> prop to switch:
      </p>
      <pre className="mt-4"><code>{`<ReactIcon variant="default" />   {/* standard version */}
<ReactIcon variant="dark" />      {/* for light backgrounds */}
<ReactIcon variant="light" />     {/* for dark backgrounds */}
<ReactIcon variant="wordmark" />  {/* includes text label */}`}</code></pre>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Not all icons have all variants. If a requested variant doesn't exist,
        the icon falls back to the default variant.
      </p>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Animations
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Add built-in CSS animations — no extra configuration needed:
      </p>
      <pre className="mt-4"><code>{`<ReactIcon animate="spin" />    {/* continuous rotation */}
<ReactIcon animate="pulse" />   {/* fade in/out */}
<ReactIcon animate="bounce" />  {/* vertical bounce */}`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Styling
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        All standard SVG and HTML attributes are supported:
      </p>
      <pre className="mt-4"><code>{`<ReactIcon
  className="my-icon hover:opacity-80"
  style={{ marginRight: 8 }}
  onClick={() => console.log('clicked')}
  opacity={0.8}
/>`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Ref Forwarding
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        All icons forward refs to the underlying SVG element:
      </p>
      <pre className="mt-4"><code>{`const ref = useRef<SVGSVGElement>(null);
<ReactIcon ref={ref} />`}</code></pre>
    </div>
  );
}
