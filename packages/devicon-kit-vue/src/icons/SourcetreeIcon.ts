import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SourcetreeIcon = defineComponent({
  name: 'SourcetreeIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#0052CC' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.999 0C6.756 0 2.474 4.245 2.474 9.525c0 4.21 2.769 7.792 6.572 9.047v4.764c0 .37.295.664.664.664h4.506a.66.66 0 0 0 .664-.664v-4.764l.074-.027v.064c3.694-1.22 6.412-4.634 6.565-8.687q.007-.187.007-.375v-.022q-.001-.228-.013-.455C21.275 4.037 17.125 0 11.999 0m0 6.352a3.214 3.214 0 0 1 2.664 5.005v.002A3.22 3.22 0 0 1 12 12.775a3.212 3.212 0 0 1 0-6.424z'/></g>`,
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
