import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'icons');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');

interface IconEntry {
  slug: string;
  name: string;
  category: string;
  variants: string[];
}

const MAX_SIZE = 50 * 1024; // 50KB (SVGO will optimize these down)

function validate() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  let errors = 0;

  for (const icon of data) {
    const categoryDir = path.join(ICONS_DIR, icon.category, icon.slug);

    if (!fs.existsSync(categoryDir)) {
      console.error(`❌ Missing directory: ${categoryDir} (icon: ${icon.slug})`);
      errors++;
      continue;
    }

    for (const variant of icon.variants) {
      const svgFile = path.join(categoryDir, `${variant}.svg`);

      if (!fs.existsSync(svgFile)) {
        console.error(`❌ Missing SVG: ${svgFile} (icon: ${icon.slug}, variant: ${variant})`);
        errors++;
        continue;
      }

      const content = fs.readFileSync(svgFile, 'utf-8');
      const size = Buffer.byteLength(content, 'utf-8');

      // Check file size
      if (size > MAX_SIZE) {
        console.error(`❌ SVG too large (${(size / 1024).toFixed(1)}KB > 20KB): ${svgFile}`);
        errors++;
      }

      // Must have viewBox
      if (!content.includes('viewBox')) {
        console.error(`❌ Missing viewBox: ${svgFile}`);
        errors++;
      }

      // No embedded raster images
      if (content.includes('<image') || content.includes('data:image')) {
        console.error(`❌ Contains embedded raster image: ${svgFile}`);
        errors++;
      }

      // No scripts
      if (content.includes('<script')) {
        console.error(`❌ Contains <script> tag: ${svgFile}`);
        errors++;
      }
    }
  }

  if (errors > 0) {
    console.error(`\n❌ Validation failed with ${errors} error(s)`);
    process.exit(1);
  }

  console.log(`✅ All ${data.length} icons validated successfully`);
}

validate();
