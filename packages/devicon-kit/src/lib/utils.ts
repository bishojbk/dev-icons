import type { IconSize, IconSizePreset } from './types';
import { SIZE_MAP } from './constants';

/** Resolve an IconSize (number or preset name) to a pixel number */
export function resolveSize(size: IconSize): number {
  if (typeof size === 'number') return size;
  return SIZE_MAP[size as IconSizePreset] ?? SIZE_MAP.md;
}

/** Join class names, filtering out falsy values */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
