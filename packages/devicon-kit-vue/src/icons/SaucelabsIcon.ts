import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SaucelabsIcon = defineComponent({
  name: 'SaucelabsIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#3DDC91' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M23.434 7.344a3.02 3.02 0 0 0-2.435-1.22h-7l-2 5.876h4.838l-2 5.876H10L8 23.75h9c1.291 0 2.438-.809 2.847-2.009l3.999-11.75a2.89 2.89 0 0 0-.412-2.647M10 11.999H7.162l2-5.876h4.837L16 .25H7c-1.291 0-2.438.809-2.847 2.009L.154 14.008a2.89 2.89 0 0 0 .412 2.647 3.02 3.02 0 0 0 2.435 1.22h7l2-5.876z'/></g>`,
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
