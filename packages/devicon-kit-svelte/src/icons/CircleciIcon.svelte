<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#343434';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M8.963 12a2.854 2.854 0 0 1 2.855-2.855A2.863 2.863 0 0 1 14.674 12a2.863 2.863 0 0 1-2.856 2.856A2.863 2.863 0 0 1 8.963 12m2.855-12C6.215 0 1.522 3.84.19 9.025c-.01.036-.01.07-.01.12 0 .313.252.576.575.576H5.59c.23 0 .433-.13.517-.333.997-2.16 3.18-3.672 5.712-3.672a6.293 6.293 0 0 1 6.286 6.287c0 3.47-2.82 6.29-6.29 6.29a6.28 6.28 0 0 1-5.71-3.673.59.59 0 0 0-.517-.336H.755a.576.576 0 0 0-.575.576c0 .037.014.072.014.12C1.514 20.16 6.214 24 11.818 24c6.624 0 12-5.375 12-12 0-6.623-5.376-12-12-12"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M8.963 12a2.854 2.854 0 0 1 2.855-2.855A2.863 2.863 0 0 1 14.674 12a2.863 2.863 0 0 1-2.856 2.856A2.863 2.863 0 0 1 8.963 12m2.855-12C6.215 0 1.522 3.84.19 9.025c-.01.036-.01.07-.01.12 0 .313.252.576.575.576H5.59c.23 0 .433-.13.517-.333.997-2.16 3.18-3.672 5.712-3.672a6.293 6.293 0 0 1 6.286 6.287c0 3.47-2.82 6.29-6.29 6.29a6.28 6.28 0 0 1-5.71-3.673.59.59 0 0 0-.517-.336H.755a.576.576 0 0 0-.575.576c0 .037.014.072.014.12C1.514 20.16 6.214 24 11.818 24c6.624 0 12-5.375 12-12 0-6.623-5.376-12-12-12"/></g>`,
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
