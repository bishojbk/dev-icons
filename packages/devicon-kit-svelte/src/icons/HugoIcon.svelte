<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#FF4088';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.754 0a4 4 0 0 0-2.049.596L3.33 4.532a4.25 4.25 0 0 0-2.017 3.615v8.03a4.13 4.13 0 0 0 2.067 3.574l6.486 3.733a3.88 3.88 0 0 0 3.835.018l7.043-3.966a3.82 3.82 0 0 0 1.943-3.323V7.752a3.57 3.57 0 0 0-1.774-3.084L13.817.541a4 4 0 0 0-2.063-.54zm.022 1.674c.413-.006.828.1 1.2.315l7.095 4.127c.584.34.941.96.94 1.635v8.462c0 .774-.414 1.484-1.089 1.864l-7.042 3.966a2.2 2.2 0 0 1-2.179-.01l-6.485-3.734a2.45 2.45 0 0 1-1.228-2.123v-8.03c0-.893.461-1.72 1.221-2.19l6.376-3.935a2.3 2.3 0 0 1 1.19-.347zm-4.7 3.844V18.37h2.69v-5.62h4.46v5.62h2.696V5.518h-2.696v4.681h-4.46V5.518Z"/></g>`,
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
