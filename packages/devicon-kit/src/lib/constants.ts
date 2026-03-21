import type { IconSizePreset, IconAnimation } from './types';

/** Pixel values for named size presets */
export const SIZE_MAP: Record<IconSizePreset, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
};

/** CSS animation values for each animation type */
export const ANIMATION_MAP: Record<Exclude<IconAnimation, 'none'>, string> = {
  spin: 'devicon-spin 1s linear infinite',
  pulse: 'devicon-pulse 2s ease-in-out infinite',
  bounce: 'devicon-bounce 1s ease infinite',
};

/** CSS keyframes injected once into the document */
export const ANIMATION_KEYFRAMES = `
@keyframes devicon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes devicon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes devicon-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25%); }
}
`;
