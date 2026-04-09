<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#6492FE';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M22.767 3.589c0 1.209-.543 2.283-1.37 2.934l-8.034 7.174c-.149.128-.343-.078-.235-.25l2.946-5.9c.083-.165-.024-.368-.194-.368H4.452c-1.77 0-3.219-1.615-3.219-3.59C1.233 1.616 2.682 0 4.452 0h15.096c1.77-.001 3.219 1.614 3.219 3.589M4.452 24h15.096c1.77 0 3.219-1.616 3.219-3.59s-1.449-3.59-3.219-3.59H8.12c-.17 0-.277-.202-.194-.367l2.946-5.9c.108-.172-.086-.378-.235-.25l-8.033 7.173c-.828.65-1.37 1.725-1.37 2.934 0 1.974 1.448 3.59 3.218 3.59"/></g>`,
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
