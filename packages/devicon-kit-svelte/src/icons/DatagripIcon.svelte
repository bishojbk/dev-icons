<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#000000';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003H4.62v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037A2.85 2.85 0 0 0 6.51 5.088M2.208 19.495h9v1.5h-9z"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003H4.62v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037A2.85 2.85 0 0 0 6.51 5.088M2.208 19.495h9v1.5h-9z"/></g>`,
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
