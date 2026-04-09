<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#242424';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></g>`,
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
