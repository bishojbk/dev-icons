<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#5A0FC8';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M20.597 7.482 24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0 1.772 5.84 2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237-1.72 5.237H7.404L6.17 14.402l1.214-3.742 1.342 2.661 1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358.285-.323.284-.873 0-.546-.323-.871-.324-.326-1.103-.326"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M20.597 7.482 24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0 1.772 5.84 2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237-1.72 5.237H7.404L6.17 14.402l1.214-3.742 1.342 2.661 1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358.285-.323.284-.873 0-.546-.323-.871-.324-.326-1.103-.326"/></g>`,
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
