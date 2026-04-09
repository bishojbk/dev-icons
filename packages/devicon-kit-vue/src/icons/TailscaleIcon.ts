import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const TailscaleIcon = defineComponent({
  name: 'TailscaleIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#242424' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'/></g>`,
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
