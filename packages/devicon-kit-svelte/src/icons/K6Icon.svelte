<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#7D64FF';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M24 23.646H0L7.99 6.603l4.813 3.538L19.08.354Zm-8.8-3.681h.052a2.3 2.3 0 0 0 1.593-.64 2.1 2.1 0 0 0 .685-1.576 1.91 1.91 0 0 0-.66-1.511 2 2 0 0 0-1.37-.59h-.04a.7.7 0 0 0-.199.027l1.267-1.883-1.01-.705-.477.705-1.22 1.864c-.21.31-.386.582-.495.77q-.169.301-.29.625a1.9 1.9 0 0 0-.138.719 2.1 2.1 0 0 0 .676 1.558c.422.411.989.641 1.578.64Zm-5.365-2.027 1.398 1.978h1.496l-1.645-2.295 1.46-2.029-.97-.671-.427.565-1.314 1.853v-3.725l-1.31-1.068v7.37h1.31v-1.98Zm5.367.792a.963.963 0 1 1 0-1.927h.009a.94.94 0 0 1 .679.29.9.9 0 0 1 .29.668.98.98 0 0 1-.977.967Z"/></g>`,
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
