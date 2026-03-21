export default function ApiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        API Reference
      </h1>
      <p className="mt-4 text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
        Complete reference for all exports from the devicon-kit package.
      </p>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        DevIconProps
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        The props interface accepted by every icon component:
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <th className="py-2 pr-4 text-left font-medium">Prop</th>
              <th className="py-2 pr-4 text-left font-medium">Type</th>
              <th className="py-2 pr-4 text-left font-medium">Default</th>
              <th className="py-2 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>size</code></td>
              <td className="py-2 pr-4"><code>{`number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`}</code></td>
              <td className="py-2 pr-4"><code>{`'md'`}</code></td>
              <td className="py-2">Icon dimensions in pixels or named preset</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>color</code></td>
              <td className="py-2 pr-4"><code>string</code></td>
              <td className="py-2 pr-4"><code>{`'currentColor'`}</code></td>
              <td className="py-2">Fill color of the SVG</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>variant</code></td>
              <td className="py-2 pr-4"><code>{`'default' | 'light' | 'dark' | 'wordmark'`}</code></td>
              <td className="py-2 pr-4"><code>{`'default'`}</code></td>
              <td className="py-2">Visual variant. Falls back to default if unavailable.</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>animate</code></td>
              <td className="py-2 pr-4"><code>{`'none' | 'spin' | 'pulse' | 'bounce'`}</code></td>
              <td className="py-2 pr-4"><code>{`'none'`}</code></td>
              <td className="py-2">CSS animation applied to the icon</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>title</code></td>
              <td className="py-2 pr-4"><code>string</code></td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Accessible title rendered inside SVG</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>alt</code></td>
              <td className="py-2 pr-4"><code>string</code></td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Sets aria-label on the SVG element</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>className</code></td>
              <td className="py-2 pr-4"><code>string</code></td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">CSS class names</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>style</code></td>
              <td className="py-2 pr-4"><code>CSSProperties</code></td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Inline styles</td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>...rest</code></td>
              <td className="py-2 pr-4"><code>{`SVGProps<SVGSVGElement>`}</code></td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Any standard SVG attribute (onClick, opacity, etc.)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        DevIconProvider
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Context provider to set global defaults for all icons in the tree.
      </p>
      <pre className="mt-4"><code>{`import { DevIconProvider } from 'devicon-kit';
// or: import { DevIconProvider } from 'devicon-kit/context';

<DevIconProvider
  size="lg"       // default size for all children
  color="#333"    // default color
  variant="dark"  // default variant
  animate="none"  // default animation
  className=""    // merged with each icon's className
  style={{}}      // merged with each icon's style
>
  {children}
</DevIconProvider>`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        dynamicIconImports
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        A map of icon slugs to dynamic import functions for lazy loading:
      </p>
      <pre className="mt-4"><code>{`import { dynamicIconImports } from 'devicon-kit/dynamic';

// Type: Record<string, () => Promise<Record<string, any>>>
const loadReact = dynamicIconImports['react'];
// Returns: () => import('./icons/ReactIcon')`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        TypeScript Types
      </h2>
      <pre className="mt-4"><code>{`import type {
  DevIconProps,        // Props for icon components
  DevIconContextValue, // Context provider value type
  IconSize,            // number | IconSizePreset
  IconSizePreset,      // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  IconVariant,         // 'default' | 'light' | 'dark' | 'wordmark'
  IconAnimation,       // 'none' | 'spin' | 'pulse' | 'bounce'
  IconMeta,            // Icon metadata (for search/filtering)
} from 'devicon-kit';`}</code></pre>
    </div>
  );
}
