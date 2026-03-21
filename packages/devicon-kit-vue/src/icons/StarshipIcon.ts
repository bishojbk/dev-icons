import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const StarshipIcon = defineComponent({
  name: 'StarshipIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#DD0B78' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M15.521 9.62a1.057 1.057 0 1 1-2.115 0 1.057 1.057 0 0 1 2.115 0M24 12c0 6.627-5.373 12-12 12q-.525 0-1.04-.044c2.019-1.89 2.548-5.061 2.548-5.061l-3.226-1.053s-1.499 3.23-5.599 3.67A11.98 11.98 0 0 1 0 12C0 5.373 5.373 0 12 0s12 5.373 12 12M8.628 6.606c-1.23-.13-1.885-.83-2.03-2.031-.142 1.159-.77 1.88-2.032 2.031 1.168.227 1.83.918 2.031 2.032-.02-1.154.666-1.825 2.031-2.032m7.786 5.207c1.11-2.483.392-4.252-1.233-6.246-2.043 1.5-3.759 3.023-3.636 5.149-1.375.675-2.261 1.206-3.147 2.289l2.779 1.103-.368 1.267 3.637 1.062.443-1.181 2.825.651c.014-1.496-.38-3.097-1.3-4.094'/></g>`,
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
