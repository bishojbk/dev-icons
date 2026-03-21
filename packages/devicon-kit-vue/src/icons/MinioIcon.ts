import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const MinioIcon = defineComponent({
  name: 'MinioIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#C72E49' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M13.207.006a2.16 2.16 0 0 0-1.62.582 2.15 2.15 0 0 0-.095 3.035l3.408 3.55a3.042 3.042 0 0 1-.663 4.688l-.463.239V7.285a15.42 15.42 0 0 0-8.018 10.487v.017l6.549-3.328v7.621L13.779 24V13.682l.897-.463a4.443 4.443 0 0 0 1.22-7.03l-3.37-3.525a.75.75 0 0 1 .037-1.055.75.75 0 0 1 1.056.038l.467.486-.006.006 4.07 4.244a.057.057 0 0 0 .082 0 .06.06 0 0 0 0-.07l-3.14-5.143-.149.143.149-.145C14.494.393 13.829.054 13.207.006m-.902 9.865v2.994l-4.152 2.149a14 14 0 0 1 2.767-3.928 14 14 0 0 1 1.385-1.215'/></g>`,
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
