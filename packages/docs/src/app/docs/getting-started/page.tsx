export default function GettingStartedPage() {
  return (
    <div>
      <h1
        className="text-3xl font-bold tracking-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        Getting Started
      </h1>
      <p className="mt-4 text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
        DevIcon Kit works with every major framework. Pick your stack.
      </p>

      {/* Package picker */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <th className="py-2 pr-4 text-left font-medium">Package</th>
              <th className="py-2 pr-4 text-left font-medium">Framework</th>
              <th className="py-2 text-left font-medium">Install</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>devicon-kit</code></td>
              <td className="py-2 pr-4">React</td>
              <td className="py-2"><code>npm i devicon-kit</code></td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>devicon-kit-vue</code></td>
              <td className="py-2 pr-4">Vue 3</td>
              <td className="py-2"><code>npm i devicon-kit-vue</code></td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>devicon-kit-svelte</code></td>
              <td className="py-2 pr-4">Svelte</td>
              <td className="py-2"><code>npm i devicon-kit-svelte</code></td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>devicon-kit-web</code></td>
              <td className="py-2 pr-4">Web Components (Angular, vanilla JS, any framework)</td>
              <td className="py-2"><code>npm i devicon-kit-web</code></td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>devicon-kit-svg</code></td>
              <td className="py-2 pr-4">Framework-agnostic (raw SVG strings)</td>
              <td className="py-2"><code>npm i devicon-kit-svg</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        React
      </h2>
      <pre className="mt-4"><code>{`import { ReactIcon, PythonIcon, DockerIcon } from 'devicon-kit';

function App() {
  return (
    <div>
      <ReactIcon size="lg" />
      <PythonIcon size={32} color="#3776AB" />
      <DockerIcon animate="pulse" />
    </div>
  );
}`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Vue 3
      </h2>
      <pre className="mt-4"><code>{`<script setup>
import { ReactIcon, PythonIcon, DockerIcon } from 'devicon-kit-vue';
</script>

<template>
  <ReactIcon size="lg" />
  <PythonIcon :size="32" color="#3776AB" />
  <DockerIcon animate="pulse" />
</template>`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Svelte
      </h2>
      <pre className="mt-4"><code>{`<script>
  import { ReactIcon, PythonIcon, DockerIcon } from 'devicon-kit-svelte';
</script>

<ReactIcon size="lg" />
<PythonIcon size={32} color="#3776AB" />
<DockerIcon animate="pulse" />`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Web Components (Angular, vanilla JS, etc.)
      </h2>
      <pre className="mt-4"><code>{`// Register all icons (or individual ones)
import { registerAll } from 'devicon-kit-web';
registerAll();

// Or register individually
import { registerReactIcon } from 'devicon-kit-web';
registerReactIcon();`}</code></pre>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Then use as HTML custom elements anywhere:
      </p>
      <pre className="mt-4"><code>{`<!-- HTML / Angular / any template -->
<devicon-react size="lg"></devicon-react>
<devicon-python size="32" color="#3776AB"></devicon-python>
<devicon-docker animate="pulse"></devicon-docker>`}</code></pre>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        In Angular templates:
      </p>
      <pre className="mt-4"><code>{`// app.component.ts
import { registerAll } from 'devicon-kit-web';
registerAll();

// app.module.ts — add CUSTOM_ELEMENTS_SCHEMA
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Framework-Agnostic (SVG Strings)
      </h2>
      <pre className="mt-4"><code>{`import { getSvg, getSvgWithColor, icons } from 'devicon-kit-svg';

// Get raw SVG string
const svg = getSvg('react');
document.getElementById('icon').innerHTML = svg;

// With custom color
const coloredSvg = getSvgWithColor('react', '#ff0000');

// Get all available slugs
import { listIcons } from 'devicon-kit-svg';
console.log(listIcons()); // ['react', 'typescript', ...]

// Individual SVG string imports
import { ReactSvg, PythonSvg } from 'devicon-kit-svg';`}</code></pre>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Props (All Frameworks)
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Every icon across all frameworks supports the same props:
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
              <td className="py-2">Icon dimensions</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>color</code></td>
              <td className="py-2 pr-4"><code>string</code></td>
              <td className="py-2 pr-4">Brand color</td>
              <td className="py-2">SVG fill color</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>variant</code></td>
              <td className="py-2 pr-4"><code>{`'default' | 'light' | 'dark'`}</code></td>
              <td className="py-2 pr-4"><code>{`'default'`}</code></td>
              <td className="py-2">Visual variant</td>
            </tr>
            <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-2 pr-4"><code>animate</code></td>
              <td className="py-2 pr-4"><code>{`'none' | 'spin' | 'pulse' | 'bounce'`}</code></td>
              <td className="py-2 pr-4"><code>{`'none'`}</code></td>
              <td className="py-2">CSS animation</td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>title</code></td>
              <td className="py-2 pr-4"><code>string</code></td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Accessible label for screen readers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        React-Only Features
      </h2>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
        The React package has additional features:
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <li><code>DevIconProvider</code> — Context API for global defaults</li>
        <li><code>ref</code> forwarding to the SVG element</li>
        <li><code>alt</code> prop for aria-label</li>
        <li>Per-icon deep imports (<code>devicon-kit/icons/ReactIcon</code>)</li>
        <li>Dynamic import map (<code>devicon-kit/dynamic</code>)</li>
      </ul>
      <pre className="mt-4"><code>{`import { DevIconProvider, ReactIcon, TypescriptIcon } from 'devicon-kit';

<DevIconProvider size="xl" color="#333">
  <ReactIcon />
  <TypescriptIcon />
</DevIconProvider>`}</code></pre>
    </div>
  );
}
