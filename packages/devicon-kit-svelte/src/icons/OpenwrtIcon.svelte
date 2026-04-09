<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#00B5E2';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0A14.12 14.12 0 0 0 1.994 4.154L3.689 5.85A11.72 11.72 0 0 1 12 2.41a11.72 11.72 0 0 1 8.311 3.44l1.696-1.696A14.12 14.12 0 0 0 12 0m0 4.32a9.8 9.8 0 0 0-6.947 2.893l1.695 1.695A7.4 7.4 0 0 1 12 6.73c2.043 0 3.905.832 5.252 2.178l1.695-1.695A9.8 9.8 0 0 0 12 4.32M4.272 8.076A9.76 9.76 0 0 0 2.16 14.16C2.16 19.58 6.582 24 12 24s9.84-4.42 9.84-9.84a9.86 9.86 0 0 0-2.111-6.084L18.016 9.79a7.4 7.4 0 0 1 1.43 4.371c0 4.105-3.34 7.448-7.446 7.448s-7.447-3.342-7.447-7.448c0-1.628.531-3.141 1.43-4.37zM12 8.643a5.56 5.56 0 0 0-3.906 1.613l1.695 1.695a3.13 3.13 0 0 1 4.422 0l1.695-1.695A5.5 5.5 0 0 0 12 8.643m0 3.888a1.629 1.629 0 1 0 0 3.258 1.629 1.629 0 0 0 0-3.258"/></g>`,
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
