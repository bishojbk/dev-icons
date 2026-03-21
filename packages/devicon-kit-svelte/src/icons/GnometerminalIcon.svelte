<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#241F31';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M1.846 0A1.84 1.84 0 0 0 0 1.846v18.463c0 1.022.823 1.845 1.846 1.845h20.308A1.84 1.84 0 0 0 24 20.31V1.846A1.84 1.84 0 0 0 22.154 0zm0 .924h20.308c.512 0 .922.41.922.922v18.463c0 .511-.41.921-.922.921H1.846a.92.92 0 0 1-.922-.921V1.846c0-.512.41-.922.922-.922m0 .922v18.463h20.308V1.846zm1.845 2.14 3.235 1.758v.836L3.69 8.477V7.385l2.243-1.207v-.033L3.69 5.076zM7.846 9.23h3.693v.924H7.846zM0 21.736v.418C0 23.177.823 24 1.846 24h20.308A1.84 1.84 0 0 0 24 22.154v-.418a2.33 2.33 0 0 1-1.846.918H1.846A2.33 2.33 0 0 1 0 21.736"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M1.846 0A1.84 1.84 0 0 0 0 1.846v18.463c0 1.022.823 1.845 1.846 1.845h20.308A1.84 1.84 0 0 0 24 20.31V1.846A1.84 1.84 0 0 0 22.154 0zm0 .924h20.308c.512 0 .922.41.922.922v18.463c0 .511-.41.921-.922.921H1.846a.92.92 0 0 1-.922-.921V1.846c0-.512.41-.922.922-.922m0 .922v18.463h20.308V1.846zm1.845 2.14 3.235 1.758v.836L3.69 8.477V7.385l2.243-1.207v-.033L3.69 5.076zM7.846 9.23h3.693v.924H7.846zM0 21.736v.418C0 23.177.823 24 1.846 24h20.308A1.84 1.84 0 0 0 24 22.154v-.418a2.33 2.33 0 0 1-1.846.918H1.846A2.33 2.33 0 0 1 0 21.736"/></g>`,
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
