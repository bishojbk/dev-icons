<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#0ABF53';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.647 9.882v2.934c0 .134.109.243.243.243h.463V9.882h1.765v5.15c0 .47-.38.85-.85.85H9.943v-1.235h2.41v-.53h-1.621a.85.85 0 0 1-.85-.849V9.882zm-8.261 0c.469 0 .85.38.85.85v3.386H.85a.85.85 0 0 1-.85-.85v-.948c0-.469.38-.85.85-.85h.915v1.346c0 .134.108.243.242.243h.464v-1.875a.243.243 0 0 0-.243-.243H.06V9.882Zm5.79-1.764v6H5.791a.85.85 0 0 1-.85-.85v-2.536c0-.47.38-.85.85-.85h.915v2.934c0 .134.108.243.243.243h.463V8.118zm9.033 1.764a.85.85 0 0 1 .85.85v.948c0 .47-.38.85-.85.85h-.915v-1.346a.243.243 0 0 0-.243-.243h-.463v1.875c0 .134.109.243.243.243h2.167v1.059h-3.325a.85.85 0 0 1-.85-.85V9.882Zm4.942 0a.85.85 0 0 1 .849.85v3.386h-1.765v-2.934a.243.243 0 0 0-.242-.243h-.464v3.177h-1.764V9.882Z"/></g>`,
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
