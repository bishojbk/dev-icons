import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const CircleciIcon = defineComponent({
  name: 'CircleciIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#343434' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M8.963 12a2.854 2.854 0 0 1 2.855-2.855A2.863 2.863 0 0 1 14.674 12a2.863 2.863 0 0 1-2.856 2.856A2.863 2.863 0 0 1 8.963 12m2.855-12C6.215 0 1.522 3.84.19 9.025c-.01.036-.01.07-.01.12 0 .313.252.576.575.576H5.59c.23 0 .433-.13.517-.333.997-2.16 3.18-3.672 5.712-3.672a6.293 6.293 0 0 1 6.286 6.287c0 3.47-2.82 6.29-6.29 6.29a6.28 6.28 0 0 1-5.71-3.673.59.59 0 0 0-.517-.336H.755a.576.576 0 0 0-.575.576c0 .037.014.072.014.12C1.514 20.16 6.214 24 11.818 24c6.624 0 12-5.375 12-12 0-6.623-5.376-12-12-12'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M8.963 12a2.854 2.854 0 0 1 2.855-2.855A2.863 2.863 0 0 1 14.674 12a2.863 2.863 0 0 1-2.856 2.856A2.863 2.863 0 0 1 8.963 12m2.855-12C6.215 0 1.522 3.84.19 9.025c-.01.036-.01.07-.01.12 0 .313.252.576.575.576H5.59c.23 0 .433-.13.517-.333.997-2.16 3.18-3.672 5.712-3.672a6.293 6.293 0 0 1 6.286 6.287c0 3.47-2.82 6.29-6.29 6.29a6.28 6.28 0 0 1-5.71-3.673.59.59 0 0 0-.517-.336H.755a.576.576 0 0 0-.575.576c0 .037.014.072.014.12C1.514 20.16 6.214 24 11.818 24c6.624 0 12-5.375 12-12 0-6.623-5.376-12-12-12'/></g>`,
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
