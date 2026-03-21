import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { slugToComponentName } from './utils/naming';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');
const OUTPUT_FILE = path.join(ROOT, 'packages', 'devicon-kit', 'src', 'index.ts');

interface IconEntry {
  slug: string;
}

function generateBarrel() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  const iconExports = data
    .map((icon) => {
      const name = slugToComponentName(icon.slug);
      return `export { ${name} } from './icons/${name}';`;
    })
    .join('\n');

  const content = `// Auto-generated barrel file — do not edit manually.
// Run "pnpm icons:generate" to regenerate.

// Icon components
${iconExports}

// Context
export { DevIconProvider, useDevIconContext } from './lib/IconContext';

// Types
export type {
  DevIconProps,
  DevIconContextValue,
  IconSize,
  IconSizePreset,
  IconVariant,
  IconAnimation,
  IconMeta,
} from './lib/types';
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
  console.log(`✅ Generated barrel with ${data.length} icon exports`);
}

generateBarrel();
