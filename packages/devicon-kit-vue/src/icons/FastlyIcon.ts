import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const FastlyIcon = defineComponent({
  name: 'FastlyIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF282D' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M13.919 3.036V1.3h.632V0H9.377v1.3h.631v1.749a10.57 10.57 0 0 0-8.575 10.384C1.433 19.275 6.17 24 12 24c5.842 0 10.567-4.737 10.567-10.567 0-5.186-3.729-9.486-8.648-10.397m-1.628 15.826v-.607h-.619v.607c-2.757-.158-4.955-2.38-5.101-5.137h.607v-.62h-.607a5.436 5.436 0 0 1 5.101-5.089v.607h.62v-.607a5.435 5.435 0 0 1 5.137 5.114h-.607v.619h.607a5.444 5.444 0 0 1-5.138 5.113m2.26-7.712-.39-.389-1.979 1.725a.9.9 0 0 0-.316-.06.986.986 0 0 0-.971.995c0 .547.437.996.971.996.535 0 .972-.45.972-.996a.8.8 0 0 0-.049-.304Z'/></g>`,
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
