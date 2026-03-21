import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'icons');
const OUTPUT_DIR = path.join(ROOT, '.optimized');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');

interface IconEntry {
  slug: string;
  category: string;
  variants: string[];
}

function optimizeSvgs() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;

  for (const icon of data) {
    const outDir = path.join(OUTPUT_DIR, icon.category, icon.slug);
    fs.mkdirSync(outDir, { recursive: true });

    for (const variant of icon.variants) {
      const inputPath = path.join(ICONS_DIR, icon.category, icon.slug, `${variant}.svg`);
      const outputPath = path.join(outDir, `${variant}.svg`);

      if (!fs.existsSync(inputPath)) continue;

      const input = fs.readFileSync(inputPath, 'utf-8');

      const result = optimize(input, {
        path: inputPath,
        multipass: true,
        plugins: [
          'removeDoctype',
          'removeXMLProcInst',
          'removeComments',
          'removeMetadata',
          'removeEditorsNSData',
          'cleanupAttrs',
          'mergeStyles',
          'inlineStyles',
          'cleanupNumericValues',
          'convertColors',
          'removeUselessStrokeAndFill',
          'cleanupIds',
          'removeUselessDefs',
          'removeDimensions',
          {
            name: 'prefixIds',
            params: {
              prefix: `di-${icon.slug}-${variant}`,
            },
          },
          'convertPathData',
          'mergePaths',
          'removeEmptyContainers',
          'sortAttrs',
        ],
      });

      fs.writeFileSync(outputPath, result.data, 'utf-8');
      count++;
    }
  }

  console.log(`✅ Optimized ${count} SVG files`);
}

optimizeSvgs();
