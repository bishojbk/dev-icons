import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const IosIcon = defineComponent({
  name: 'IosIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#000000' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M1.1 6.05c-.614 0-1.1.48-1.1 1.08a1.08 1.08 0 0 0 1.1 1.08c.62 0 1.11-.48 1.11-1.08S1.72 6.05 1.1 6.05m7.61.02c-3.36 0-5.46 2.29-5.46 5.93 0 3.67 2.1 5.95 5.46 5.95 3.34 0 5.45-2.28 5.45-5.95 0-3.64-2.11-5.93-5.45-5.93m10.84 0c-2.5 0-4.28 1.38-4.28 3.43 0 1.63 1.01 2.65 3.13 3.14l1.49.36c1.45.33 2.04.81 2.04 1.64 0 .96-.97 1.64-2.35 1.64-1.41 0-2.47-.69-2.58-1.75h-2c.08 2.12 1.82 3.42 4.46 3.42 2.79 0 4.54-1.37 4.54-3.55 0-1.71-1-2.68-3.32-3.21l-1.33-.3c-1.41-.34-1.99-.79-1.99-1.55 0-.96.88-1.6 2.18-1.6 1.31 0 2.21.65 2.31 1.72h1.96c-.05-2.02-1.72-3.39-4.26-3.39M8.71 7.82c2.04 0 3.35 1.63 3.35 4.18 0 2.57-1.31 4.2-3.35 4.2-2.06 0-3.36-1.63-3.36-4.2 0-2.55 1.3-4.18 3.36-4.18M.111 9.31v8.45H2.1V9.31z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M1.1 6.05c-.614 0-1.1.48-1.1 1.08a1.08 1.08 0 0 0 1.1 1.08c.62 0 1.11-.48 1.11-1.08S1.72 6.05 1.1 6.05m7.61.02c-3.36 0-5.46 2.29-5.46 5.93 0 3.67 2.1 5.95 5.46 5.95 3.34 0 5.45-2.28 5.45-5.95 0-3.64-2.11-5.93-5.45-5.93m10.84 0c-2.5 0-4.28 1.38-4.28 3.43 0 1.63 1.01 2.65 3.13 3.14l1.49.36c1.45.33 2.04.81 2.04 1.64 0 .96-.97 1.64-2.35 1.64-1.41 0-2.47-.69-2.58-1.75h-2c.08 2.12 1.82 3.42 4.46 3.42 2.79 0 4.54-1.37 4.54-3.55 0-1.71-1-2.68-3.32-3.21l-1.33-.3c-1.41-.34-1.99-.79-1.99-1.55 0-.96.88-1.6 2.18-1.6 1.31 0 2.21.65 2.31 1.72h1.96c-.05-2.02-1.72-3.39-4.26-3.39M8.71 7.82c2.04 0 3.35 1.63 3.35 4.18 0 2.57-1.31 4.2-3.35 4.2-2.06 0-3.36-1.63-3.36-4.2 0-2.55 1.3-4.18 3.36-4.18M.111 9.31v8.45H2.1V9.31z'/></g>`,
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
