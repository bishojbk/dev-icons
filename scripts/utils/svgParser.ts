import { svgAttrToJsx, cssToStyleObject } from './naming';

interface SvgNode {
  name: string;
  type: string;
  value: string;
  attributes: Record<string, string>;
  children: SvgNode[];
}

/**
 * Convert a parsed SVG AST node (from svgson) to a JSX string.
 */
export function nodeToJsx(node: SvgNode, indent: number = 3): string {
  const pad = '  '.repeat(indent);

  if (node.type === 'text') {
    return node.value.trim() ? `${pad}${node.value.trim()}` : '';
  }

  // Skip the root <svg> tag — we only want children
  if (node.name === 'svg') {
    return node.children
      .map((child) => nodeToJsx(child, indent))
      .filter(Boolean)
      .join('\n');
  }

  // Build attribute string
  const attrs = Object.entries(node.attributes)
    .filter(([key]) => key !== 'xmlns' && key !== 'xmlns:xlink')
    .map(([key, value]) => {
      const jsxKey = svgAttrToJsx(key);

      // Convert inline style to object
      if (jsxKey === 'style' && typeof value === 'string') {
        return `style={${cssToStyleObject(value)}}`;
      }

      // Numeric values
      if (/^-?\d+(\.\d+)?$/.test(value) && jsxKey !== 'd' && jsxKey !== 'id') {
        return `${jsxKey}={${value}}`;
      }

      return `${jsxKey}="${value}"`;
    })
    .join(' ');

  const attrStr = attrs ? ` ${attrs}` : '';

  // Self-closing if no children
  if (node.children.length === 0) {
    return `${pad}<${node.name}${attrStr} />`;
  }

  const childrenStr = node.children
    .map((child) => nodeToJsx(child, indent + 1))
    .filter(Boolean)
    .join('\n');

  return `${pad}<${node.name}${attrStr}>\n${childrenStr}\n${pad}</${node.name}>`;
}

/**
 * Extract the viewBox from a parsed SVG root node.
 */
export function extractViewBox(svgNode: SvgNode): string {
  return svgNode.attributes?.viewBox || '0 0 128 128';
}
