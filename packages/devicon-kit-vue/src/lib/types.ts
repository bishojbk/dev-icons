
export type IconSize = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconVariant = 'default' | 'light' | 'dark';
export type IconAnimation = 'spin' | 'pulse' | 'bounce' | 'none';

export interface DevIconProps {
  size?: IconSize;
  color?: string;
  variant?: IconVariant;
  animate?: IconAnimation;
  title?: string;
}

export const SIZE_MAP: Record<string, number> = {
  xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64,
};
