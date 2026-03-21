<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#FF282D';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M13.919 3.036V1.3h.632V0H9.377v1.3h.631v1.749a10.57 10.57 0 0 0-8.575 10.384C1.433 19.275 6.17 24 12 24c5.842 0 10.567-4.737 10.567-10.567 0-5.186-3.729-9.486-8.648-10.397m-1.628 15.826v-.607h-.619v.607c-2.757-.158-4.955-2.38-5.101-5.137h.607v-.62h-.607a5.436 5.436 0 0 1 5.101-5.089v.607h.62v-.607a5.435 5.435 0 0 1 5.137 5.114h-.607v.619h.607a5.444 5.444 0 0 1-5.138 5.113m2.26-7.712-.39-.389-1.979 1.725a.9.9 0 0 0-.316-.06.986.986 0 0 0-.971.995c0 .547.437.996.971.996.535 0 .972-.45.972-.996a.8.8 0 0 0-.049-.304Z"/></g>`,
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
