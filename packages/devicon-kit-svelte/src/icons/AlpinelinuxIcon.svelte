<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#0D597F';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M5.998 1.607 0 12l5.998 10.393h12.004L24 12 18.002 1.607zM9.965 7.12 12.66 9.9l1.598 1.595.002-.002 2.41 2.363q-.299.208-.563.344a4 4 0 0 1-.496.217 3 3 0 0 1-.425.111q-.196.034-.358.034-.194-.002-.338-.034a1.3 1.3 0 0 1-.24-.072 1 1 0 0 1-.2-.113l-1.062-1.092-3.039-3.041-1.1 1.053-3.07 3.072a1 1 0 0 1-.2.111 1.3 1.3 0 0 1-.237.073 1.7 1.7 0 0 1-.338.033q-.162.001-.358-.031a3 3 0 0 1-.425-.114 4 4 0 0 1-.496-.217 5 5 0 0 1-.563-.343zm4.72.785 4.579 4.598 1.382 1.353a5 5 0 0 1-.564.344 4 4 0 0 1-.494.217 3 3 0 0 1-.426.111q-.196.034-.36.034-.193-.002-.337-.034a1.3 1.3 0 0 1-.385-.146.2.2 0 0 1-.053-.04l-1.232-1.218-2.111-2.111-.334.334L12.79 9.8l1.896-1.897zm-5.966 4.12v2.529a2 2 0 0 1-.356-.035 3 3 0 0 1-.422-.116 4 4 0 0 1-.488-.214 5 5 0 0 1-.555-.34l1.82-1.825Z"/></g>`,
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
