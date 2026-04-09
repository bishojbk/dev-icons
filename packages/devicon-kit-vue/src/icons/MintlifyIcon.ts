import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const MintlifyIcon = defineComponent({
  name: 'MintlifyIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#18E299' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M15.158.002a8.8 8.8 0 0 0-6.249 2.59l-.062.063h-.003L2.655 8.844l-.062.058a8.84 8.84 0 0 0-.83 11.55l6.251-6.249.065-.063a8.78 8.78 0 0 1-1.758-5.385 8.8 8.8 0 0 1 .283-2.151 9 9 0 0 1 2.151-.286 8.8 8.8 0 0 1 5.386 1.76 8.8 8.8 0 0 1 3.032 4.11 8.9 8.9 0 0 1 .225 5.21 9 9 0 0 0-.341.082 8.85 8.85 0 0 1-4.868-.303 8.7 8.7 0 0 1-2.323-1.25l-.064.065L3.55 22.24a8.85 8.85 0 0 0 11.548-.83l.06-.062 6.19-6.187a9 9 0 0 1-.367.337q.188-.165.366-.341l.063-.058A8.82 8.82 0 0 0 24 8.844V.002Zm3.289 17.05'/></g>`,
    };

    const innerHTML = computed(() => {
      const titleTag = props.title ? `<title>${props.title}</title>` : '';
      const svgInner = variants[props.variant] || variants['default'] || '';
      return titleTag + svgInner;
    });

    const animStyle = computed(() => {
      if (props.animate === 'spin') return 'animation: devicon-spin 1s linear infinite';
      if (props.animate === 'pulse') return 'animation: devicon-pulse 2s ease-in-out infinite';
      if (props.animate === 'bounce') return 'animation: devicon-bounce 1s ease infinite';
      return '';
    });

    return () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: resolvedSize.value,
      height: resolvedSize.value,
      viewBox: '0 0 128 128',
      fill: props.color,
      style: `color: ${props.color}; ${animStyle.value}`,
      role: props.title ? 'img' : 'presentation',
      'aria-hidden': !props.title,
      innerHTML: innerHTML.value,
    });
  },
});
