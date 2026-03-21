<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#111F68';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M18.25 0a5.523 5.523 0 0 0-5.52 5.523c0 3.842-3.125 6.967-6.972 6.967a6.96 6.96 0 0 1-4.03-1.26 11.9 11.9 0 0 0 4.759 4.67v2.51c0 3.04 2.428 5.56 5.463 5.59 3.07 0 5.58-2.46 5.58-5.52V15.9c3.64-1.96 6.16-5.8 6.23-10.208v-.165C23.76 2.477 21.28 0 18.25 0M5.758 0A5.526 5.526 0 0 0 .24 5.523a5.52 5.52 0 0 0 5.518 5.517 5.517 5.517 0 0 0 5.512-5.517C11.27 2.477 8.802 0 5.758 0"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M18.25 0a5.523 5.523 0 0 0-5.52 5.523c0 3.842-3.125 6.967-6.972 6.967a6.96 6.96 0 0 1-4.03-1.26 11.9 11.9 0 0 0 4.759 4.67v2.51c0 3.04 2.428 5.56 5.463 5.59 3.07 0 5.58-2.46 5.58-5.52V15.9c3.64-1.96 6.16-5.8 6.23-10.208v-.165C23.76 2.477 21.28 0 18.25 0M5.758 0A5.526 5.526 0 0 0 .24 5.523a5.52 5.52 0 0 0 5.518 5.517 5.517 5.517 0 0 0 5.512-5.517C11.27 2.477 8.802 0 5.758 0"/></g>`,
  };

  $: resolvedSize = typeof size === 'number' ? size : (SIZE_MAP[size] ?? 24);
  $: svgInner = variants[variant] || variants['default'] || '';
  $: titleTag = title ? `<title>${title}</title>` : '';
  $: animStyle = ANIM_MAP[animate] || '';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={resolvedSize}
  height={resolvedSize}
  viewBox="0 0 128 128"
  fill={color}
  style="color: {color}; {animStyle}"
  role={title ? 'img' : 'presentation'}
  aria-hidden={!title}
  {...$$restProps}
>
  {@html titleTag + svgInner}
</svg>
