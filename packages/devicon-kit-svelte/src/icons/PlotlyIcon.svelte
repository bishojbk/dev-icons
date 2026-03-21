<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#7A76FF';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M1.713.002A1.713 1.713 0 0 0 0 1.715a1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.714-1.713A1.713 1.713 0 0 0 1.713.002m6.861 0a1.713 1.713 0 0 0-1.713 1.713 1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.713-1.713A1.713 1.713 0 0 0 8.574.002m6.857 0a1.713 1.713 0 0 0-1.714 1.713 1.713 1.713 0 0 0 1.714 1.713 1.713 1.713 0 0 0 1.713-1.713A1.713 1.713 0 0 0 15.431.002m6.856 0a1.713 1.713 0 0 0-1.713 1.713 1.713 1.713 0 0 0 1.713 1.713A1.713 1.713 0 0 0 24 1.715 1.713 1.713 0 0 0 22.287.002M1.713 6.859A1.713 1.713 0 0 0 0 8.572a1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.714-1.713A1.713 1.713 0 0 0 1.713 6.86Zm6.861 0a1.71 1.71 0 0 0-1.713 1.713v13.713c0 .947.765 1.713 1.713 1.713s1.713-.766 1.713-1.713V8.572a1.71 1.71 0 0 0-1.713-1.713m6.857 0a1.713 1.713 0 0 0-1.714 1.713 1.713 1.713 0 0 0 1.714 1.713 1.713 1.713 0 0 0 1.713-1.713 1.713 1.713 0 0 0-1.713-1.713m6.856 0c-.947 0-1.713.765-1.713 1.713v13.713c0 .947.766 1.713 1.713 1.713S24 23.232 24 22.285V8.572a1.71 1.71 0 0 0-1.713-1.713M1.713 13.715C.766 13.715 0 14.48 0 15.428v6.857a1.713 1.713 0 1 0 3.427 0v-6.857c0-.948-.766-1.713-1.714-1.713m13.718 0c-.948 0-1.714.765-1.714 1.713v6.857c0 .947.766 1.713 1.714 1.713.947 0 1.713-.766 1.713-1.713v-6.857c0-.948-.766-1.713-1.713-1.713"/></g>`,
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
