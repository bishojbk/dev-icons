import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const OvhIcon = defineComponent({
  name: 'OvhIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#123F6D' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m19.881 10.095 2.563-4.45A11.93 11.93 0 0 1 24 11.555c0 2.88-1.017 5.523-2.71 7.594h-6.62l2.04-3.541h-2.696l3.176-5.513zm-2.32-5.243L9.333 19.14l.003.009H2.709A11.95 11.95 0 0 1 0 11.555c0-2.152.57-4.17 1.561-5.918L5.855 13.1 10.6 4.852z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='m19.881 10.095 2.563-4.45A11.93 11.93 0 0 1 24 11.555c0 2.88-1.017 5.523-2.71 7.594h-6.62l2.04-3.541h-2.696l3.176-5.513zm-2.32-5.243L9.333 19.14l.003.009H2.709A11.95 11.95 0 0 1 0 11.555c0-2.152.57-4.17 1.561-5.918L5.855 13.1 10.6 4.852z'/></g>`,
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
