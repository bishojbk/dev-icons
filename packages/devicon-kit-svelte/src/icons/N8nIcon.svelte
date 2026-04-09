<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#EA4B71';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M21.474 5.684a2.53 2.53 0 0 0-2.447 1.895H16.13a2.526 2.526 0 0 0-2.492 2.11l-.103.624a1.26 1.26 0 0 1-1.246 1.055h-1.001a2.527 2.527 0 0 0-4.893 0H4.973a2.527 2.527 0 1 0 0 1.264h1.422a2.527 2.527 0 0 0 4.894 0h1a1.26 1.26 0 0 1 1.247 1.055l.103.623a2.526 2.526 0 0 0 2.492 2.111h.37a2.527 2.527 0 1 0 0-1.263h-.37a1.26 1.26 0 0 1-1.246-1.056l-.103-.623A2.52 2.52 0 0 0 13.96 12a2.52 2.52 0 0 0 .82-1.48l.104-.622a1.26 1.26 0 0 1 1.246-1.056h2.896a2.527 2.527 0 1 0 2.447-3.158m0 1.263a1.263 1.263 0 0 1 1.263 1.263 1.263 1.263 0 0 1-1.263 1.264A1.263 1.263 0 0 1 20.21 8.21a1.263 1.263 0 0 1 1.264-1.263m-18.948 3.79A1.263 1.263 0 0 1 3.79 12a1.263 1.263 0 0 1-1.264 1.263A1.263 1.263 0 0 1 1.263 12a1.263 1.263 0 0 1 1.263-1.263m6.316 0A1.263 1.263 0 0 1 10.105 12a1.263 1.263 0 0 1-1.263 1.263A1.263 1.263 0 0 1 7.58 12a1.263 1.263 0 0 1 1.263-1.263m10.106 3.79a1.263 1.263 0 0 1 1.263 1.263 1.263 1.263 0 0 1-1.263 1.263 1.263 1.263 0 0 1-1.264-1.263 1.263 1.263 0 0 1 1.263-1.264"/></g>`,
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
