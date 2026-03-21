import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const QwikIcon = defineComponent({
  name: 'QwikIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#AC7EF4' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M7.547 0a2.96 2.96 0 0 0-2.56 1.479L.532 9.19a2.96 2.96 0 0 0 0 2.957l4.453 7.713a2.96 2.96 0 0 0 2.561 1.477H12l8.594 2.648a.284.284 0 0 0 .336-.402l-1.916-3.723 4.453-7.713a2.96 2.96 0 0 0 0-2.957l-4.453-7.71A2.96 2.96 0 0 0 16.453 0zm0 .766 10.185 9.904-1.896 1.899.578 7.533L6.268 10.67l2.37-2.373z'/></g>`,
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
