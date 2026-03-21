import type { IconVariant } from '../../packages/devicon-kit/src/lib/types';

interface VariantJsx {
  variant: IconVariant;
  jsx: string;
}

interface IconTemplateData {
  componentName: string;
  viewBox: string;
  variants: VariantJsx[];
  defaultColor?: string;
}

/**
 * Render a generated icon component file from template data.
 */
export function renderIconComponent(data: IconTemplateData): string {
  const { componentName, viewBox, variants, defaultColor } = data;

  const variantEntries = variants
    .map(({ variant, jsx }) => {
      return `        ${variant === 'default' ? 'default' : `'${variant}'`}: (\n          <>\n${jsx}\n          </>\n        )`;
    })
    .join(',\n');

  const defaultColorProp = defaultColor ? `\n      defaultColor="${defaultColor}"` : '';

  return `import { forwardRef } from 'react';
import { IconBase } from '../lib/IconBase';
import type { DevIconProps } from '../lib/types';

export const ${componentName} = forwardRef<SVGSVGElement, DevIconProps>(
  (props, ref) => (
    <IconBase
      ref={ref}
      viewBox="${viewBox}"${defaultColorProp}
      variants={{
${variantEntries},
      }}
      {...props}
    />
  )
);

${componentName}.displayName = '${componentName}';
`;
}
