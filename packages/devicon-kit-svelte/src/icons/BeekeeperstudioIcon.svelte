<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#FAD83B';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M21.01 4.624 13.853.504a3.72 3.72 0 0 0-3.741 0l-1.87 1.085v10.42a3.755 3.755 0 0 0 3.742 3.758 3.64 3.64 0 0 0 1.87-.509 3.74 3.74 0 0 0 1.871-3.249 3.755 3.755 0 0 0-3.741-3.758V5.904c.64 0 1.296.164 1.87.508l2.035 1.182a3.74 3.74 0 0 1 1.871 3.25v2.346a3.76 3.76 0 0 1-1.87 3.249l-2.036 1.182c-.574.328-1.23.508-1.87.508s-1.297-.164-1.871-.509l-2.035-1.18a3.74 3.74 0 0 1-1.87-3.25V2.754l-3.234 1.87a3.74 3.74 0 0 0-1.87 3.25v8.254c0 1.33.705 2.577 1.87 3.25l7.155 4.118a3.72 3.72 0 0 0 3.742 0l7.155-4.119a3.74 3.74 0 0 0 1.87-3.249V7.873a3.82 3.82 0 0 0-1.887-3.25M9.685 9.054a3.5 3.5 0 0 0-.558.542V6.97l.558-.328zm1.428-.689c-.197.05-.378.099-.558.18V6.184c.18-.082.377-.132.558-.18z"/></g>`,
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
