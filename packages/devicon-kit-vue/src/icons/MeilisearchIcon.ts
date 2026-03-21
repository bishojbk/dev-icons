import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const MeilisearchIcon = defineComponent({
  name: 'MeilisearchIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF5CAA' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m6.505 18.998 4.434-11.345a4.17 4.17 0 0 1 3.882-2.651h2.674l-4.434 11.345a4.17 4.17 0 0 1-3.883 2.651zm6.505 0 4.434-11.345a4.17 4.17 0 0 1 3.883-2.651H24l-4.434 11.345a4.17 4.17 0 0 1-3.882 2.651zm-13.01 0L4.434 7.653a4.17 4.17 0 0 1 3.882-2.651h2.674L6.556 16.347a4.17 4.17 0 0 1-3.883 2.651z'/></g>`,
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
