<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#123F6D';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m19.881 10.095 2.563-4.45A11.93 11.93 0 0 1 24 11.555c0 2.88-1.017 5.523-2.71 7.594h-6.62l2.04-3.541h-2.696l3.176-5.513zm-2.32-5.243L9.333 19.14l.003.009H2.709A11.95 11.95 0 0 1 0 11.555c0-2.152.57-4.17 1.561-5.918L5.855 13.1 10.6 4.852z"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="m19.881 10.095 2.563-4.45A11.93 11.93 0 0 1 24 11.555c0 2.88-1.017 5.523-2.71 7.594h-6.62l2.04-3.541h-2.696l3.176-5.513zm-2.32-5.243L9.333 19.14l.003.009H2.709A11.95 11.95 0 0 1 0 11.555c0-2.152.57-4.17 1.561-5.918L5.855 13.1 10.6 4.852z"/></g>`,
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
