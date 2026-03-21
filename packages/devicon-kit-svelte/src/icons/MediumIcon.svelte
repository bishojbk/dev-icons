<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#000000';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M4.21 0A4.2 4.2 0 0 0 0 4.21v15.58A4.2 4.2 0 0 0 4.21 24h15.58A4.2 4.2 0 0 0 24 19.79v-1.093a5 5 0 0 1-.422.02c-2.577 0-4.027-2.146-4.09-4.832a8 8 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.9 3.9 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023q.151 0 .303.01V4.211A4.2 4.2 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.4 1.4 0 0 0-.342-.047m-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z"/></g>`,
  'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M4.21 0A4.2 4.2 0 0 0 0 4.21v15.58A4.2 4.2 0 0 0 4.21 24h15.58A4.2 4.2 0 0 0 24 19.79v-1.093a5 5 0 0 1-.422.02c-2.577 0-4.027-2.146-4.09-4.832a8 8 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.9 3.9 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023q.151 0 .303.01V4.211A4.2 4.2 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.4 1.4 0 0 0-.342-.047m-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z"/></g>`,
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
