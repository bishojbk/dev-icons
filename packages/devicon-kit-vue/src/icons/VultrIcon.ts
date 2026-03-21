import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const VultrIcon = defineComponent({
  name: 'VultrIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#007BFC' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M8.36 2.172A1.2 1.2 0 0 0 7.348 1.6H1.2A1.2 1.2 0 0 0 0 2.8a1.2 1.2 0 0 0 .182.64l11.6 18.4a1.206 1.206 0 0 0 2.035 0l3.075-4.874a1.23 1.23 0 0 0 .182-.64 1.2 1.2 0 0 0-.182-.642zm10.349 8.68a1.206 1.206 0 0 0 2.035 0L21.8 9.178l2.017-3.2a1.2 1.2 0 0 0 .183-.64 1.23 1.23 0 0 0-.183-.64l-1.6-2.526a1.2 1.2 0 0 0-1.016-.571h-6.148a1.2 1.2 0 0 0-1.201 1.2 1.14 1.14 0 0 0 .188.64z'/></g>`,
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
