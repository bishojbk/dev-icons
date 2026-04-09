import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const DroneIcon = defineComponent({
  name: 'DroneIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#212121' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M15.07 13.633a3.07 3.07 0 1 1-6.14 0 3.07 3.07 0 0 1 6.14 0M12 1.856c5.359.042 11.452 3.82 12 10.94h-7.256S15.809 8.863 12 8.889s-4.744 3.907-4.744 3.907H0C.353 5.802 6.344 1.812 12 1.856m.05 20.288c-3.996.011-7.729-3.005-9.259-7.674h4.465s.963 3.889 4.773 3.863 4.716-3.863 4.716-3.863h4.465c-.995 4.94-5.164 7.664-9.159 7.674z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M15.07 13.633a3.07 3.07 0 1 1-6.14 0 3.07 3.07 0 0 1 6.14 0M12 1.856c5.359.042 11.452 3.82 12 10.94h-7.256S15.809 8.863 12 8.889s-4.744 3.907-4.744 3.907H0C.353 5.802 6.344 1.812 12 1.856m.05 20.288c-3.996.011-7.729-3.005-9.259-7.674h4.465s.963 3.889 4.773 3.863 4.716-3.863 4.716-3.863h4.465c-.995 4.94-5.164 7.664-9.159 7.674z'/></g>`,
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
