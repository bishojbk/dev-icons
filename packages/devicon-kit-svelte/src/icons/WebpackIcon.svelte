<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#8DD6F9';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M22.199 18.498 12.429 24v-4.285l6.087-3.334zm.668-.603V6.388l-3.575 2.055v7.396zm-21.066.603L11.571 24v-4.285L5.484 16.38zm-.668-.603V6.388l3.575 2.055v7.396zm.418-12.251L11.571 0v4.143L5.152 7.66l-.049.028zm20.898 0L12.429 0v4.143l6.419 3.516.049.028zM11.57 18.74l-6.005-3.287V8.938l6.005 3.453zm.858 0 6.005-3.287V8.938l-6.005 3.453zM5.972 8.185l6.03-3.302 6.028 3.302-6.029 3.466z"/></g>`,
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
