<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#3569F3';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M24 2.58a.595.595 0 0 0-.484-.585c-.058-.016-.118-.01-.177-.01-.308.028-4.38.416-8.955 2.457C11.636 5.664 9.509 7.54 8.17 9.818l-.345.15C2.927 12.153 0 16.404 0 21.337v.083c0 .339.279.595.597.595h16.262a.6.6 0 0 0 .375-.139l6.553-5.525a.6.6 0 0 0 .212-.46zm-6.554 17.558V8.382l5.362-4.52v11.756ZM7.368 16.49h8.885v4.333H2.227Zm7.5-10.959A30.7 30.7 0 0 1 21.4 3.489L16.606 7.53a30.4 30.4 0 0 0-6.489 1.528c1.187-1.449 2.787-2.65 4.75-3.526Zm-5.89 5.24a30.8 30.8 0 0 1 7.275-1.995V15.3H7.76a10.5 10.5 0 0 1 1.219-4.527m-1.636.761a11.8 11.8 0 0 0-.789 4.083L1.266 20.08c.4-3.626 2.553-6.659 6.077-8.546"/></g>`,
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
