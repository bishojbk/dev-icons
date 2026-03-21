import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { slugToComponentName } from './utils/naming';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');
const OUTPUT_FILE = path.join(ROOT, 'packages', 'devicon-kit', 'src', 'dynamic.ts');

interface IconEntry {
  slug: string;
}

function generateDynamicMap() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  const entries = data
    .map((icon) => {
      const name = slugToComponentName(icon.slug);
      return `  '${icon.slug}': () => import('./icons/${name}'),`;
    })
    .join('\n');

  const content = `// Auto-generated dynamic import map — do not edit manually.
// Run "pnpm icons:generate" to regenerate.

export const dynamicIconImports: Record<string, () => Promise<Record<string, any>>> = {
${entries}
};
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
  console.log(`✅ Generated dynamic import map with ${data.length} entries`);
}

generateDynamicMap();
