<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#0B100F';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M23.55 5.067a2.177 2.177 0 0 0-2.18 2.177v4.867a1.77 1.77 0 0 1-1.76 1.76 1.82 1.82 0 0 1-1.472-.766l-4.971-7.1a2.2 2.2 0 0 0-1.81-.942c-1.134 0-2.154.964-2.154 2.153v4.896c0 .972-.797 1.76-1.76 1.76-.57 0-1.136-.287-1.472-.766L.408 5.16A.224.224 0 0 0 0 5.288v4.245c0 .215.066.423.188.6l5.475 7.818c.324.462.8.805 1.351.93a2.164 2.164 0 0 0 2.645-2.098V11.89c0-.972.787-1.76 1.76-1.76h.002a1.8 1.8 0 0 1 1.472.766l4.972 7.1a2.172 2.172 0 0 0 3.96-1.212v-4.895a1.76 1.76 0 0 1 1.76-1.76h.195a.22.22 0 0 0 .22-.22V5.287a.22.22 0 0 0-.22-.22Z"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M23.55 5.067a2.177 2.177 0 0 0-2.18 2.177v4.867a1.77 1.77 0 0 1-1.76 1.76 1.82 1.82 0 0 1-1.472-.766l-4.971-7.1a2.2 2.2 0 0 0-1.81-.942c-1.134 0-2.154.964-2.154 2.153v4.896c0 .972-.797 1.76-1.76 1.76-.57 0-1.136-.287-1.472-.766L.408 5.16A.224.224 0 0 0 0 5.288v4.245c0 .215.066.423.188.6l5.475 7.818c.324.462.8.805 1.351.93a2.164 2.164 0 0 0 2.645-2.098V11.89c0-.972.787-1.76 1.76-1.76h.002a1.8 1.8 0 0 1 1.472.766l4.972 7.1a2.172 2.172 0 0 0 3.96-1.212v-4.895a1.76 1.76 0 0 1 1.76-1.76h.195a.22.22 0 0 0 .22-.22V5.287a.22.22 0 0 0-.22-.22Z"/></g>`,
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
