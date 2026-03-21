import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const AntdesignIcon = defineComponent({
  name: 'AntdesignIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#0170FE' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M17.451 6.68c.51-.506.51-1.33 0-1.837L15.578 2.97l.003.002-2.554-2.55a1.463 1.463 0 0 0-2.05.013L.427 10.98a1.443 1.443 0 0 0 0 2.047l10.549 10.54a1.45 1.45 0 0 0 2.05 0l4.423-4.42a1.297 1.297 0 0 0 0-1.838 1.305 1.305 0 0 0-1.84 0l-3.35 3.354a.346.346 0 0 1-.495 0l-8.427-8.419a.346.346 0 0 1 0-.495l8.424-8.42.035-.029a.34.34 0 0 1 .46.03l3.354 3.35a1.3 1.3 0 0 0 1.841 0m-8.244 5.376a2.848 2.846 0 1 0 5.696 0 2.848 2.846 0 1 0-5.696 0m14.367-1.034L20.28 7.743a1.303 1.303 0 0 0-1.841.003 1.297 1.297 0 0 0 0 1.838l2.224 2.222c.14.139.14.356 0 .495l-2.192 2.19a1.297 1.297 0 0 0 0 1.837 1.305 1.305 0 0 0 1.84 0l3.264-3.26a1.445 1.445 0 0 0-.002-2.047'/></g>`,
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
