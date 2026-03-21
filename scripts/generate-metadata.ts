import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { slugToComponentName } from './utils/naming';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');
const OUTPUT_FILE = path.join(ROOT, 'packages', 'docs', 'src', 'lib', 'iconMetadata.ts');

interface IconEntry {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  aliases?: string[];
  variants: string[];
}

function generateMetadata() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  const icons = data.map((icon) => ({
    name: icon.name,
    componentName: slugToComponentName(icon.slug),
    slug: icon.slug,
    category: icon.category,
    tags: icon.tags,
    aliases: icon.aliases || [],
    variants: icon.variants,
  }));

  const categories = [...new Set(data.map((i) => i.category))].sort();

  const content = `// Auto-generated icon metadata — do not edit manually.
// Run "pnpm icons:generate" to regenerate.

import type { IconMeta } from 'devicon-kit';

export const iconMetadata: IconMeta[] = ${JSON.stringify(icons, null, 2)};

export const categories: string[] = ${JSON.stringify(categories)};

export const totalIconCount = ${data.length};
`;

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');

  // Also generate the docs icon component map
  const componentNames = data.map((icon) => slugToComponentName(icon.slug));
  const COMPONENTS_FILE = path.join(ROOT, 'packages', 'docs', 'src', 'lib', 'iconComponents.ts');

  const imports = componentNames.join(',\n  ');
  const entries = componentNames.join(',\n  ');

  const componentsContent = `// Auto-generated icon component map — do not edit manually.
// Run "pnpm icons:generate" to regenerate.

import {
  ${imports},
} from 'devicon-kit';
import type { ComponentType } from 'react';
import type { DevIconProps } from 'devicon-kit';

export const iconComponents: Record<string, ComponentType<DevIconProps>> = {
  ${entries},
};
`;

  fs.writeFileSync(COMPONENTS_FILE, componentsContent, 'utf-8');

  // Generate SVG data map for download feature
  const OPTIMIZED_DIR = path.join(ROOT, '.optimized');
  const SVG_DATA_FILE = path.join(ROOT, 'packages', 'docs', 'src', 'lib', 'iconSvgData.ts');
  const svgMap: Record<string, Record<string, string>> = {};

  for (const icon of data) {
    svgMap[icon.slug] = {};
    for (const variant of icon.variants) {
      const svgPath = path.join(OPTIMIZED_DIR, icon.category, icon.slug, `${variant}.svg`);
      if (fs.existsSync(svgPath)) {
        svgMap[icon.slug][variant] = fs.readFileSync(svgPath, 'utf-8').trim();
      }
    }
  }

  const svgDataContent = `// Auto-generated SVG data for download feature — do not edit manually.
// Run "pnpm icons:generate" to regenerate.

export const iconSvgData: Record<string, Record<string, string>> = ${JSON.stringify(svgMap)};
`;

  fs.writeFileSync(SVG_DATA_FILE, svgDataContent, 'utf-8');

  console.log(`✅ Generated metadata for ${data.length} icons across ${categories.length} categories`);
  console.log(`✅ Generated icon component map with ${componentNames.length} entries`);
  console.log(`✅ Generated SVG data map for ${Object.keys(svgMap).length} icons`);
}

generateMetadata();
