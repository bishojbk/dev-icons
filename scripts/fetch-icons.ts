/**
 * Fetches accurate SVG icons from simple-icons and writes them to icons/ directory.
 * Creates default, dark, and light variants.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'icons');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');

// Map our slugs to simple-icons export keys (si{Name})
const SI_KEY_MAP: Record<string, string> = {
  'react': 'siReact',
  'typescript': 'siTypescript',
  'javascript': 'siJavascript',
  'python': 'siPython',
  'nextjs': 'siNextdotjs',
  'vuejs': 'siVuedotjs',
  'nodejs': 'siNodedotjs',
  'docker': 'siDocker',
  'tailwindcss': 'siTailwindcss',
  'postgresql': 'siPostgresql',
  'git': 'siGit',
  'github': 'siGithub',
  'rust': 'siRust',
  'go': 'siGo',
  'figma': 'siFigma',
  'mongodb': 'siMongodb',
  'kubernetes': 'siKubernetes',
  // vscode, aws, openai — not in simple-icons, handled manually
};

interface IconEntry {
  slug: string;
  name: string;
  category: string;
  variants: string[];
}

function extractPath(svg: string): string {
  // Extract everything between <svg> tags except <title>
  const inner = svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').replace(/<title>[^<]*<\/title>/, '').trim();
  return inner;
}

function buildSvg(innerContent: string, color: string): string {
  // Wrap the 24x24 simple-icons content into 128x128 with proper scaling
  // Scale factor: 128 / 24 = 5.333, with 8px padding → usable area 112px → scale = 112/24 = 4.667
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <g transform="translate(8, 8) scale(4.667)" fill="${color}">
    ${innerContent}
  </g>
</svg>`;
}

function fetchIcons() {
  const si = require('simple-icons');
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  let success = 0;
  let skipped = 0;

  for (const icon of data) {
    const siKey = SI_KEY_MAP[icon.slug];
    if (!siKey) {
      console.log(`⏭  ${icon.slug} — no simple-icons mapping, skipping (manual SVG)`);
      skipped++;
      continue;
    }

    const siIcon = si[siKey];
    if (!siIcon) {
      console.warn(`⚠ Key ${siKey} not found in simple-icons for: ${icon.slug}`);
      skipped++;
      continue;
    }

    const outDir = path.join(ICONS_DIR, icon.category, icon.slug);
    fs.mkdirSync(outDir, { recursive: true });

    const brandColor = `#${siIcon.hex}`;
    const inner = extractPath(siIcon.svg);

    // Default variant — brand color
    if (icon.variants.includes('default')) {
      fs.writeFileSync(path.join(outDir, 'default.svg'), buildSvg(inner, brandColor), 'utf-8');
    }

    // Dark variant — very dark color for light backgrounds
    if (icon.variants.includes('dark')) {
      fs.writeFileSync(path.join(outDir, 'dark.svg'), buildSvg(inner, '#0f172a'), 'utf-8');
    }

    // Light variant — white for dark backgrounds
    if (icon.variants.includes('light')) {
      fs.writeFileSync(path.join(outDir, 'light.svg'), buildSvg(inner, '#f8fafc'), 'utf-8');
    }

    // Wordmark — same as default for now (proper wordmarks require custom SVGs)
    if (icon.variants.includes('wordmark')) {
      fs.writeFileSync(path.join(outDir, 'wordmark.svg'), buildSvg(inner, brandColor), 'utf-8');
    }

    console.log(`✅ ${icon.slug.padEnd(15)} ${siIcon.title.padEnd(20)} ${brandColor}`);
    success++;
  }

  console.log(`\nDone: ${success} fetched, ${skipped} skipped (manual)`);
}

fetchIcons();
