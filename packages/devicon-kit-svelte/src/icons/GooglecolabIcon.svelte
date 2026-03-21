<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#F9AB00';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M16.941 4.976a7.03 7.03 0 0 0-4.93 2.064 7.033 7.033 0 0 0-.124 9.807l2.395-2.395a3.646 3.646 0 0 1 5.15-5.148l2.397-2.399a7.03 7.03 0 0 0-4.888-1.93m-9.871.01a7.03 7.03 0 0 0-4.888 1.931l2.391 2.391a3.643 3.643 0 0 1 5.023.127l1.734-2.973-.1-.08a7.03 7.03 0 0 0-4.16-1.396m15.01 2.172-2.39 2.39a3.646 3.646 0 0 1-5.15 5.15l-2.406 2.407a7.036 7.036 0 0 0 9.945-9.947m-20.148.01a7.033 7.033 0 0 0-.002 9.681l2.397-2.397a3.643 3.643 0 0 1-.004-4.892zm7.664 7.423a3.635 3.635 0 0 1-5.017.113L2.182 17.1a7.03 7.03 0 0 0 9.007.546l.137-.112z"/></g>`,
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
