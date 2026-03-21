/**
 * Convert a kebab-case slug to PascalCase component name.
 * e.g., "next-js" → "NextJs", "c-sharp" → "CSharp"
 */
export function slugToPascalCase(slug: string): string {
  return slug
    .split(/[-._]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/**
 * Generate the icon component name from a slug.
 * e.g., "react" → "ReactIcon", "next-js" → "NextJsIcon"
 */
export function slugToComponentName(slug: string): string {
  return slugToPascalCase(slug) + 'Icon';
}

/**
 * Convert an SVG attribute name to its JSX equivalent.
 * e.g., "fill-rule" → "fillRule", "stroke-width" → "strokeWidth"
 */
export function svgAttrToJsx(attr: string): string {
  // Special cases
  const specialMap: Record<string, string> = {
    class: 'className',
    'clip-path': 'clipPath',
    'clip-rule': 'clipRule',
    'fill-opacity': 'fillOpacity',
    'fill-rule': 'fillRule',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'letter-spacing': 'letterSpacing',
    'paint-order': 'paintOrder',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-opacity': 'strokeOpacity',
    'stroke-width': 'strokeWidth',
    'text-anchor': 'textAnchor',
    'text-decoration': 'textDecoration',
    'dominant-baseline': 'dominantBaseline',
    'alignment-baseline': 'alignmentBaseline',
    'xlink:href': 'xlinkHref',
    'xml:space': 'xmlSpace',
  };

  if (specialMap[attr]) return specialMap[attr];

  // Generic kebab-case to camelCase
  return attr.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert a CSS inline style string to a React style object string.
 * e.g., "fill:#fff;stroke-width:2" → '{ fill: "#fff", strokeWidth: "2" }'
 */
export function cssToStyleObject(css: string): string {
  const pairs = css
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const colonIdx = pair.indexOf(':');
      if (colonIdx === -1) return null;
      const prop = pair.slice(0, colonIdx).trim();
      const value = pair.slice(colonIdx + 1).trim();
      const jsxProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      return `${jsxProp}: "${value}"`;
    })
    .filter(Boolean);

  return `{ ${pairs.join(', ')} }`;
}
