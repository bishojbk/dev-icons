import type { SVGProps, CSSProperties, ReactNode } from 'react';

/** Named size presets */
export type IconSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Icon size as pixel number or named preset */
export type IconSize = number | IconSizePreset;

/** Visual variant of the icon */
export type IconVariant = 'default' | 'light' | 'dark' | 'wordmark';

/** Built-in CSS animations */
export type IconAnimation = 'spin' | 'pulse' | 'bounce' | 'none';

/** Props accepted by every DevIcon component */
export interface DevIconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Icon size as a number (px) or named preset (xs=12, sm=16, md=24, lg=32, xl=48, 2xl=64) */
  size?: IconSize;
  /** Icon color — applied to fill or stroke depending on the icon. Defaults to 'currentColor'. */
  color?: string;
  /** Visual variant of the icon (default, light, dark, wordmark). Falls back to 'default'. */
  variant?: IconVariant;
  /** CSS animation to apply to the icon */
  animate?: IconAnimation;
  /** Accessible title rendered inside the SVG for screen readers */
  title?: string;
  /** Alternative text — sets aria-label on the SVG */
  alt?: string;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/** Global defaults for all DevIcon components via context */
export interface DevIconContextValue {
  size?: IconSize;
  color?: string;
  variant?: IconVariant;
  animate?: IconAnimation;
  className?: string;
  style?: CSSProperties;
}

/** Internal: props passed to IconBase by generated icon components */
export interface IconBaseProps extends DevIconProps {
  /** Map of variant name to SVG children for that variant */
  variants: Partial<Record<IconVariant, ReactNode>>;
  /** Brand color used as default when no color prop is set */
  defaultColor?: string;
  /** The SVG viewBox attribute from the source icon */
  viewBox?: string;
}

/** Icon metadata entry in the registry (data/icons.json) */
export interface IconEntry {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  aliases?: string[];
  variants: IconVariant[];
  url?: string;
}

/** Icon metadata used by the docs site for search/filtering */
export interface IconMeta {
  name: string;
  componentName: string;
  slug: string;
  category: string;
  tags: string[];
  aliases: string[];
  variants: IconVariant[];
}
