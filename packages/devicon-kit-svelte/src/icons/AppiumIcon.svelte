<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#EE376D';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.923 0C5.937 0 .976 4.384.07 10.115a11.94 11.94 0 0 1 7.645-2.754 11.98 11.98 0 0 1 9.43 4.58 11.94 11.94 0 0 0 1.015-8.769 12 12 0 0 0-.626-1.772l-.003-.008A12 12 0 0 0 11.923 0m7.721 2.754A12 12 0 0 1 9.398 16.521a12.08 12.08 0 0 0 9.02 5.617c.24-.119.766-.51 1.224-.89A11.97 11.97 0 0 0 23.995 12a11.98 11.98 0 0 0-4.35-9.247zM9.33 7.557a12 12 0 0 0-2.647.401A11.94 11.94 0 0 0 .01 12.595l-.005.006q.032.641.131 1.275C1.037 19.61 6 24 11.991 24c1.45 0 2.887-.26 4.243-.773a12 12 0 0 1-6.905-15.67z"/></g>`,
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
