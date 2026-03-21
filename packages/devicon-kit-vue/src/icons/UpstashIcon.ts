import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const UpstashIcon = defineComponent({
  name: 'UpstashIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#00E9A3' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M13.803 0c-2.61 0-5.22.995-7.211 2.986-3.982 3.983-3.982 10.44 0 14.422a5.1 5.1 0 0 0 7.21-7.21L12 12a2.55 2.55 0 0 1-3.605 3.605A7.649 7.649 0 0 1 19.21 4.79l1.803-1.803A10.17 10.17 0 0 0 13.803 0M12 12a2.55 2.55 0 0 1 3.605-3.605A7.649 7.649 0 0 1 4.79 19.21l-1.803 1.803c3.983 3.982 10.44 3.982 14.422 0s3.982-10.44 0-14.422A5.08 5.08 0 0 0 13.803 5.1a5.1 5.1 0 0 0-3.605 8.703z'/></g>`,
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
