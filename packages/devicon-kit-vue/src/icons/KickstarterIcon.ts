import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const KickstarterIcon = defineComponent({
  name: 'KickstarterIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#05CE78' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M7.168 0c-3.2 0-5.797 2.579-5.797 5.758v12.484C1.371 21.42 3.968 24 7.168 24a5.8 5.8 0 0 0 4.768-2.479l.794.79c2.26 2.245 5.943 2.245 8.203 0a5.72 5.72 0 0 0 1.696-4.075 5.72 5.72 0 0 0-1.696-4.074l-2.182-2.168 2.182-2.156a5.72 5.72 0 0 0 1.696-4.074 5.72 5.72 0 0 0-1.696-4.074c-2.26-2.246-5.942-2.246-8.203 0l-.794.789A5.8 5.8 0 0 0 7.168 0'/></g>`,
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
