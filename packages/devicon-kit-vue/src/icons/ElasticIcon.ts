import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ElasticIcon = defineComponent({
  name: 'ElasticIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#005571' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m20.345 16.33-3.959-.926-1.05-2.01 5.177-4.535a3.96 3.96 0 0 1 2.559 3.702 4.01 4.01 0 0 1-2.727 3.77m-2.976 4.68c-.616 0-1.22-.207-1.714-.587l.782-4.077 3.596.841c.115.31.172.642.172.987a2.84 2.84 0 0 1-2.836 2.836m-2.637-.586a5.92 5.92 0 0 1-4.908 2.6A5.947 5.947 0 0 1 4 15.905l5.167-4.67 5.272 2.403 1.167 2.23zM.928 11.443a4.01 4.01 0 0 1 2.726-3.77l3.95.933.927 1.98-5.05 4.565a3.97 3.97 0 0 1-2.553-3.708m5.703-8.45a2.84 2.84 0 0 1 1.723.58l-.789 4.092-3.598-.85a2.8 2.8 0 0 1-.172-.986A2.84 2.84 0 0 1 6.63 2.992m2.66.59A5.92 5.92 0 0 1 20.1 6.93c0 .4-.038.781-.114 1.164l-5.299 4.643-5.251-2.394-1.026-2.19zM24 12.571a4.72 4.72 0 0 0-3.124-4.454 6.7 6.7 0 0 0 .126-1.29A6.79 6.79 0 0 0 14.22.047 6.77 6.77 0 0 0 8.727 2.86a3.6 3.6 0 0 0-2.204-.754A3.604 3.604 0 0 0 3.15 6.959 4.79 4.79 0 0 0 0 11.431 4.73 4.73 0 0 0 3.139 15.9a7 7 0 0 0-.124 1.289 6.773 6.773 0 0 0 6.765 6.765c2.19 0 4.22-1.052 5.49-2.824a3.57 3.57 0 0 0 2.207.769 3.603 3.603 0 0 0 3.374-4.854A4.785 4.785 0 0 0 24 12.572'/></g>`,
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
