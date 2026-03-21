<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#FF00A0';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m12 6.314 5.714 3.165v-1.27L12 5.054c-.85.47-4.957 2.74-5.714 3.157.703.39 8.085 4.467 12.572 6.946v1.264L12 20.209c-1.71-.943-5.15-2.844-6.858-3.79v-3.788L12 16.42l1.144-.632-9.146-5.05v6.316L12 21.472l8-4.42v-2.526L8.57 8.21Zm-8.002.632v2.528l11.428 6.316-3.428 1.896-5.714-3.165v1.27l5.714 3.156c.85-.47 4.957-2.74 5.714-3.157-.703-.39-8.083-4.467-12.57-6.948V7.578L12 3.789c1.707.945 5.148 2.846 6.858 3.789v3.789L12 7.577l-1.144.633L20 13.263V6.946l-8-4.42c-.791.438-7.416 4.1-8.002 4.42M12 0 1.713 5.685v12.63L12 24l10.287-5.682V5.685Zm9.14 17.683L12 22.736l-9.143-5.053V6.317L12 1.264l9.143 5.053z"/></g>`,
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
