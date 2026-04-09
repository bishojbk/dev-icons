import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const HackeroneIcon = defineComponent({
  name: 'HackeroneIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#494649' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M7.207 0q-.725.002-1.182.3c-.305.2-.46.463-.46.78v21.809q0 .414.476.76.472.351 1.166.351.663 0 1.168-.35.504-.346.506-.761V1.082c0-.32-.163-.577-.49-.782Q7.901.002 7.207 0m9.523 8.662q-.724-.001-1.168.3l-4.439 2.783c-.199.186-.284.469-.247.855q.052.575.524 1.09c.314.347.666.563 1.068.655q.596.134.896-.143l1.755-1.095v9.782q0 .414.461.76c.3.234.687.351 1.15.351q.695 0 1.199-.35c.337-.233.506-.484.506-.761V9.739q-.001-.48-.49-.776-.488-.303-1.215-.301'/></g>`,
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
