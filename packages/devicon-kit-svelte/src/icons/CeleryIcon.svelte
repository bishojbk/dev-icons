<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#37814A';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M2.303 0A2.3 2.3 0 0 0 0 2.303v19.394A2.3 2.3 0 0 0 2.303 24h19.394A2.3 2.3 0 0 0 24 21.697V2.303A2.3 2.3 0 0 0 21.697 0zm8.177 3.072c4.098 0 7.028 1.438 7.68 1.764l-1.194 2.55c-2.442-1.057-4.993-1.41-5.672-1.41-1.574 0-2.17.922-2.17 1.763v8.494c0 .869.596 1.791 2.17 1.791.679 0 3.23-.38 5.672-1.41l1.194 2.496c-.435.271-3.637 1.818-7.68 1.818-1.112 0-4.64-.244-4.64-4.64V7.713c0-4.397 3.528-4.64 4.64-4.64z"/></g>`,
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
