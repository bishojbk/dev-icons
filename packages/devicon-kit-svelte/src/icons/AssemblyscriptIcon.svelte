<script lang="ts">
  const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };
  const ANIM_MAP: Record<string, string> = {
    spin: 'animation: devicon-spin 1s linear infinite',
    pulse: 'animation: devicon-pulse 2s ease-in-out infinite',
    bounce: 'animation: devicon-bounce 1s ease infinite',
  };

  export let size: number | string = 'md';
  export let color: string = '#007ACC';
  export let variant: string = 'default';
  export let animate: string = 'none';
  export let title: string | undefined = undefined;

  const variants: Record<string, string> = {
  'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0h-9.225c0 1.406-1.04 2.813-2.756 2.813A2.766 2.766 0 0 1 9.234 0zm18.204 10.947q1.06 0 1.82.412.775.396 1.33 1.361l-1.726 1.108q-.285-.507-.617-.728a1.4 1.4 0 0 0-.807-.222q-.49 0-.776.27a.9.9 0 0 0-.285.68q0 .506.317.775.333.255 1.045.57l.554.238q.711.3 1.25.633.554.315.918.728a2.6 2.6 0 0 1 .57.918q.206.506.206 1.203a3 3 0 0 1-.285 1.33q-.27.57-.76.965a3.4 3.4 0 0 1-1.171.601q-.665.19-1.456.19a5.3 5.3 0 0 1-1.41-.174 4.6 4.6 0 0 1-1.139-.475 4 4 0 0 1-.886-.712 4.5 4.5 0 0 1-.602-.902L16.1 18.67q.363.585.855.966.505.38 1.33.38.695 0 1.091-.301.412-.316.412-.792 0-.57-.428-.854-.427-.285-1.187-.618l-.554-.237a8 8 0 0 1-1.092-.554 3.6 3.6 0 0 1-.839-.696 2.9 2.9 0 0 1-.538-.903 3.4 3.4 0 0 1-.19-1.187 3 3 0 0 1 .222-1.155 2.9 2.9 0 0 1 .649-.934q.428-.396 1.029-.617.6-.222 1.345-.222zm-8.796.032h.19l4.922 10.858h-2.327l-.506-1.219H7.318l-.506 1.219H4.675zm.063 3.988a22 22 0 0 1-.206.697l-.205.649a7 7 0 0 1-.222.585l-.776 1.868h2.834l-.776-1.868a16 16 0 0 1-.237-.633 24 24 0 0 1-.412-1.298"/></g>`,
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
