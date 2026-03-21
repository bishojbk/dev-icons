<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#0E1128';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0 23.52A11.52 11.52 0 1 1 23.52 12 11.52 11.52 0 0 1 12 23.52m7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.34 7.34 0 0 1-5.804-2.978 3 3 0 0 0 .65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 0 0-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.3 7.3 0 0 1 2.528-5.597 7.4 7.4 0 0 1 3.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.2 1.2 0 0 0 .148.256 1.08 1.08 0 0 0 .88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a6 6 0 0 1 .387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0 23.52A11.52 11.52 0 1 1 23.52 12 11.52 11.52 0 0 1 12 23.52m7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.34 7.34 0 0 1-5.804-2.978 3 3 0 0 0 .65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 0 0-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.3 7.3 0 0 1 2.528-5.597 7.4 7.4 0 0 1 3.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.2 1.2 0 0 0 .148.256 1.08 1.08 0 0 0 .88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a6 6 0 0 1 .387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></g>`,
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
