/**
 * Generates icon components for Vue, Svelte, Web Components, and framework-agnostic SVG strings.
 * All from the same optimized SVG source + data/icons.json registry.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OPTIMIZED_DIR = path.join(ROOT, '.optimized');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');

interface IconEntry {
  slug: string;
  name: string;
  category: string;
  variants: string[];
  hex: string;
}

function slugToComponentName(slug: string): string {
  return slug.split(/[-._]/).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('') + 'Icon';
}

function readSvgInner(category: string, slug: string, variant: string): string | null {
  const svgPath = path.join(OPTIMIZED_DIR, category, slug, `${variant}.svg`);
  if (!fs.existsSync(svgPath)) return null;
  const content = fs.readFileSync(svgPath, 'utf-8');
  // Extract inner content between <svg> tags
  const match = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return match ? match[1].trim() : null;
}

function getDefaultColor(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r > 240 && g > 240 && b > 240) ? '#0f172a' : `#${hex}`;
}

// ─── SVG Package (framework-agnostic) ───
function generateSvgPackage(data: IconEntry[]) {
  const outDir = path.join(ROOT, 'packages', 'devicon-kit-svg', 'src');

  const svgMap: Record<string, { svg: string; variants: Record<string, string>; hex: string; name: string; category: string }> = {};

  for (const icon of data) {
    const defaultSvg = readSvgInner(icon.category, icon.slug, 'default');
    if (!defaultSvg) continue;

    const variants: Record<string, string> = {};
    for (const v of icon.variants) {
      const inner = readSvgInner(icon.category, icon.slug, v);
      if (inner) {
        variants[v] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">${inner}</svg>`;
      }
    }

    svgMap[icon.slug] = {
      svg: variants['default'],
      variants,
      hex: icon.hex,
      name: icon.name,
      category: icon.category,
    };
  }

  // Generate individual exports
  const exports: string[] = [];
  for (const icon of data) {
    if (!svgMap[icon.slug]) continue;
    const name = slugToComponentName(icon.slug).replace('Icon', 'Svg');
    const svgData = svgMap[icon.slug];
    exports.push(`export const ${name} = ${JSON.stringify(svgData.svg)};`);
  }

  // Main index with getSvg helper
  const indexContent = `// Auto-generated — do not edit. Run "pnpm icons:generate-frameworks" to regenerate.

export interface DevIconSvgData {
  svg: string;
  variants: Record<string, string>;
  hex: string;
  name: string;
  category: string;
}

/** All icon SVG data indexed by slug */
export const icons: Record<string, DevIconSvgData> = ${JSON.stringify(svgMap, null, 2)};

/** Get SVG string for an icon by slug */
export function getSvg(slug: string, variant: string = 'default'): string | null {
  const icon = icons[slug];
  if (!icon) return null;
  return icon.variants[variant] || icon.variants['default'] || null;
}

/** Get SVG string with custom color applied */
export function getSvgWithColor(slug: string, color: string, variant: string = 'default'): string | null {
  const svg = getSvg(slug, variant);
  if (!svg) return null;
  return svg.replace(/fill="currentColor"/g, \`fill="\${color}"\`);
}

/** List all available icon slugs */
export function listIcons(): string[] {
  return Object.keys(icons);
}

/** Get icon metadata */
export function getIconMeta(slug: string): Omit<DevIconSvgData, 'svg' | 'variants'> | null {
  const icon = icons[slug];
  if (!icon) return null;
  return { hex: icon.hex, name: icon.name, category: icon.category };
}

// Individual SVG string exports
${exports.join('\n')}
`;

  fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent);
  console.log(`✅ SVG package: ${data.length} icons`);
}

// ─── Vue Package ───
function generateVuePackage(data: IconEntry[]) {
  const iconsDir = path.join(ROOT, 'packages', 'devicon-kit-vue', 'src', 'icons');
  const libDir = path.join(ROOT, 'packages', 'devicon-kit-vue', 'src', 'lib');
  fs.mkdirSync(iconsDir, { recursive: true });
  fs.mkdirSync(libDir, { recursive: true });

  // Types
  fs.writeFileSync(path.join(libDir, 'types.ts'), `
export type IconSize = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconVariant = 'default' | 'light' | 'dark';
export type IconAnimation = 'spin' | 'pulse' | 'bounce' | 'none';

export interface DevIconProps {
  size?: IconSize;
  color?: string;
  variant?: IconVariant;
  animate?: IconAnimation;
  title?: string;
}

export const SIZE_MAP: Record<string, number> = {
  xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64,
};
`);

  // Generate each Vue component
  const componentNames: string[] = [];
  for (const icon of data) {
    const defaultInner = readSvgInner(icon.category, icon.slug, 'default');
    if (!defaultInner) continue;

    const compName = slugToComponentName(icon.slug);
    componentNames.push(compName);
    const defaultColor = getDefaultColor(icon.hex);

    // Collect variants
    const variantMap: Record<string, string> = {};
    for (const v of icon.variants) {
      const inner = readSvgInner(icon.category, icon.slug, v);
      if (inner) variantMap[v] = inner;
    }

    const variantKeys = Object.keys(variantMap);
    const variantConditionals = variantKeys.map((v, i) => {
      const inner = variantMap[v].replace(/"/g, "'").replace(/\n/g, '');
      if (i === 0) return `      ${v === 'default' ? 'default' : `'${v}'`}: \`${inner}\``;
      return `      '${v}': \`${inner}\``;
    }).join(',\n');

    const content = `import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ${compName} = defineComponent({
  name: '${compName}',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '${defaultColor}' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
${variantConditionals},
    };

    const innerHTML = computed(() => {
      const titleTag = props.title ? \`<title>\${props.title}</title>\` : '';
      const svgInner = variants[props.variant] || variants['default'] || '';
      return titleTag + svgInner;
    });

    const animStyle = computed(() => {
      if (props.animate === 'spin') return 'animation: devicon-spin 1s linear infinite';
      if (props.animate === 'pulse') return 'animation: devicon-pulse 2s ease-in-out infinite';
      if (props.animate === 'bounce') return 'animation: devicon-bounce 1s ease infinite';
      return '';
    });

    return () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: resolvedSize.value,
      height: resolvedSize.value,
      viewBox: '0 0 128 128',
      fill: props.color,
      style: \`color: \${props.color}; \${animStyle.value}\`,
      role: props.title ? 'img' : 'presentation',
      'aria-hidden': !props.title,
      innerHTML: innerHTML.value,
    });
  },
});
`;

    fs.writeFileSync(path.join(iconsDir, `${compName}.ts`), content);
  }

  // Index
  const indexLines = componentNames.map(n => `export { ${n} } from './icons/${n}';`);
  indexLines.push(`export type { DevIconProps, IconSize, IconVariant, IconAnimation } from './lib/types';`);
  fs.writeFileSync(
    path.join(ROOT, 'packages', 'devicon-kit-vue', 'src', 'index.ts'),
    `// Auto-generated — do not edit.\n${indexLines.join('\n')}\n`
  );

  console.log(`✅ Vue package: ${componentNames.length} components`);
}

// ─── Svelte Package ───
function generateSveltePackage(data: IconEntry[]) {
  const iconsDir = path.join(ROOT, 'packages', 'devicon-kit-svelte', 'src', 'icons');
  fs.mkdirSync(iconsDir, { recursive: true });

  const componentNames: string[] = [];
  for (const icon of data) {
    const defaultInner = readSvgInner(icon.category, icon.slug, 'default');
    if (!defaultInner) continue;

    const compName = slugToComponentName(icon.slug);
    componentNames.push(compName);
    const defaultColor = getDefaultColor(icon.hex);

    // Collect variants
    const variantMap: Record<string, string> = {};
    for (const v of icon.variants) {
      const inner = readSvgInner(icon.category, icon.slug, v);
      if (inner) variantMap[v] = inner;
    }

    const variantEntries = Object.entries(variantMap).map(
      ([k, v]) => `  '${k}': \`${v.replace(/`/g, '\\`')}\``
    ).join(',\n');

    const content = `<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '${defaultColor}';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
${variantEntries},
  };

  $: resolvedSize = typeof size === 'number' ? size : (SIZE_MAP[size] ?? 24);
  $: svgInner = variants[variant] || variants['default'] || '';
  $: titleTag = title ? \`<title>\${title}</title>\` : '';
  $: animStyle = ANIM_MAP[animate] || '';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={resolvedSize}
  height={resolvedSize}
  viewBox="0 0 128 128"
  fill={color}
  style="color: {color}; {animStyle}"
  role={title ? 'img' : 'presentation'}
  aria-hidden={!title}
  {...$$restProps}
>
  {@html titleTag + svgInner}
</svg>
`;

    fs.writeFileSync(path.join(iconsDir, `${compName}.svelte`), content);
  }

  // Index.ts with re-exports
  const indexLines = componentNames.map(n =>
    `export { default as ${n} } from './icons/${n}.svelte';`
  );
  fs.writeFileSync(
    path.join(ROOT, 'packages', 'devicon-kit-svelte', 'src', 'index.ts'),
    `// Auto-generated — do not edit.\n${indexLines.join('\n')}\n`
  );

  console.log(`✅ Svelte package: ${componentNames.length} components`);
}

// ─── Web Components Package ───
function generateWebComponentsPackage(data: IconEntry[]) {
  const iconsDir = path.join(ROOT, 'packages', 'devicon-kit-web', 'src', 'icons');
  fs.mkdirSync(iconsDir, { recursive: true });

  const componentNames: string[] = [];
  const tagNames: string[] = [];

  for (const icon of data) {
    const defaultInner = readSvgInner(icon.category, icon.slug, 'default');
    if (!defaultInner) continue;

    const compName = slugToComponentName(icon.slug);
    componentNames.push(compName);
    const tagName = `devicon-${icon.slug}`;
    tagNames.push(tagName);
    const defaultColor = getDefaultColor(icon.hex);

    const variantMap: Record<string, string> = {};
    for (const v of icon.variants) {
      const inner = readSvgInner(icon.category, icon.slug, v);
      if (inner) variantMap[v] = inner;
    }

    const variantEntries = Object.entries(variantMap).map(
      ([k, v]) => `      '${k}': \`${v.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\``
    ).join(',\n');

    const content = `const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class ${compName}Element extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
${variantEntries},
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '${defaultColor}';
    const variant = this.getAttribute('variant') || 'default';
    const animate = this.getAttribute('animate') || 'none';
    const titleText = this.getAttribute('title');

    const resolvedSize = /^\\d+$/.test(size) ? Number(size) : (SIZE_MAP[size] ?? 24);
    const inner = this._variants[variant] || this._variants['default'] || '';
    const titleTag = titleText ? \`<title>\${titleText}</title>\` : '';

    let animStyle = '';
    if (animate === 'spin') animStyle = 'animation: devicon-spin 1s linear infinite;';
    else if (animate === 'pulse') animStyle = 'animation: devicon-pulse 2s ease-in-out infinite;';
    else if (animate === 'bounce') animStyle = 'animation: devicon-bounce 1s ease infinite;';

    this.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${resolvedSize}" height="\${resolvedSize}" viewBox="0 0 128 128" fill="\${color}" style="color: \${color}; \${animStyle}" role="\${titleText ? 'img' : 'presentation'}" aria-hidden="\${!titleText}">\${titleTag}\${inner}</svg>\`;
  }
}

export function register${compName}(name = '${tagName}') {
  if (!customElements.get(name)) {
    customElements.define(name, ${compName}Element);
  }
}
`;

    fs.writeFileSync(path.join(iconsDir, `${compName}.ts`), content);
  }

  // Index with registerAll
  const indexLines = componentNames.map((n, i) =>
    `export { ${n}Element, register${n} } from './icons/${n}';`
  );
  indexLines.push('');
  indexLines.push('/** Register all icon custom elements at once */');
  indexLines.push('export function registerAll() {');
  componentNames.forEach(n => indexLines.push(`  register${n}();`));
  indexLines.push('}');

  fs.writeFileSync(
    path.join(ROOT, 'packages', 'devicon-kit-web', 'src', 'index.ts'),
    `// Auto-generated — do not edit.\n${indexLines.join('\n')}\n`
  );

  console.log(`✅ Web Components package: ${componentNames.length} custom elements`);
}

// ─── Run all ───
function run() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`Generating framework packages for ${data.length} icons...\n`);

  generateSvgPackage(data);
  generateVuePackage(data);
  generateSveltePackage(data);
  generateWebComponentsPackage(data);

  console.log('\nDone!');
}

run();
