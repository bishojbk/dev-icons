import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'svgson';
import { slugToComponentName } from './utils/naming';
import { nodeToJsx, extractViewBox } from './utils/svgParser';
import { renderIconComponent } from './utils/templateRenderer';
import type { IconVariant } from '../packages/devicon-kit/src/lib/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OPTIMIZED_DIR = path.join(ROOT, '.optimized');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');
const OUTPUT_DIR = path.join(ROOT, 'packages', 'devicon-kit', 'src', 'icons');

interface IconEntry {
  slug: string;
  name: string;
  category: string;
  variants: IconVariant[];
  hex?: string;
}

async function generateComponents() {
  const data: IconEntry[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;

  for (const icon of data) {
    const componentName = slugToComponentName(icon.slug);
    const variantJsxList: { variant: IconVariant; jsx: string }[] = [];
    let viewBox = '0 0 128 128';

    for (const variant of icon.variants) {
      const svgPath = path.join(OPTIMIZED_DIR, icon.category, icon.slug, `${variant}.svg`);

      if (!fs.existsSync(svgPath)) {
        console.warn(`⚠ Missing optimized SVG: ${svgPath}`);
        continue;
      }

      const svgContent = fs.readFileSync(svgPath, 'utf-8');
      const parsed = await parse(svgContent);

      // Extract viewBox from the first (default) variant
      if (variant === 'default') {
        viewBox = extractViewBox(parsed);
      }

      const jsx = nodeToJsx(parsed, 6);
      variantJsxList.push({ variant, jsx });
    }

    if (variantJsxList.length === 0) {
      console.warn(`⚠ No variants generated for ${icon.slug}, skipping`);
      continue;
    }

    const fileContent = renderIconComponent({
      componentName,
      viewBox,
      variants: variantJsxList,
      // For pure white icons (Sony, Unity), default to dark so they're visible
      defaultColor: icon.hex
        ? (() => {
            const r = parseInt(icon.hex.slice(0, 2), 16);
            const g = parseInt(icon.hex.slice(2, 4), 16);
            const b = parseInt(icon.hex.slice(4, 6), 16);
            return (r > 240 && g > 240 && b > 240) ? '#0f172a' : `#${icon.hex}`;
          })()
        : undefined,
    });

    const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    count++;
  }

  console.log(`✅ Generated ${count} icon components`);
}

generateComponents();
