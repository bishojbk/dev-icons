<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#00BC8E';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M21.805 5.477 12.797.215a1.59 1.59 0 0 0-1.6 0L2.19 5.477a1.41 1.41 0 0 0-.697 1.215v10.604a1.44 1.44 0 0 0 .715 1.243l9.023 5.251a1.55 1.55 0 0 0 1.558 0l8.998-5.25a1.44 1.44 0 0 0 .72-1.244V6.692a1.41 1.41 0 0 0-.702-1.215m-2.001 10.428a.28.28 0 0 1-.139.238l-7.527 4.388a.28.28 0 0 1-.282 0l-7.524-4.385a.29.29 0 0 1-.14-.257v-7.8a.28.28 0 0 1 .138-.239l2.732-1.6a.28.28 0 0 1 .279 0 .28.28 0 0 1 .14.242v7.324l2.469-1.432v-7.65a.27.27 0 0 1 .138-.241l1.781-1.04a.28.28 0 0 1 .282 0l1.794 1.042a.28.28 0 0 1 .136.241v7.642l2.455 1.43V6.484a.28.28 0 0 1 .141-.24.28.28 0 0 1 .28 0l2.731 1.603a.28.28 0 0 1 .139.239z"/></g>`,
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
