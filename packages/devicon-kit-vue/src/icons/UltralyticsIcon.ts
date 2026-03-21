import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const UltralyticsIcon = defineComponent({
  name: 'UltralyticsIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#111F68' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m12.736 7.341-.002 2.897c.012 3.953-3.188 7.177-7.098 7.171-1.553-.003-2.967-.48-4.112-1.313 2.056 3.725 5.999 6.24 10.48 6.245 6.511-.003 11.891-5.343 11.992-11.91l-.002-.027c.006-.151 0-2.951.006-3.075-.01-3.116-2.538-5.677-5.63-5.67-3.105-.006-5.645 2.54-5.634 5.683zM5.629 4.573C2.525 4.573 0 7.118 0 10.246s2.525 5.673 5.63 5.673c3.103 0 5.629-2.545 5.629-5.673s-2.526-5.673-5.63-5.673'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='m12.736 7.341-.002 2.897c.012 3.953-3.188 7.177-7.098 7.171-1.553-.003-2.967-.48-4.112-1.313 2.056 3.725 5.999 6.24 10.48 6.245 6.511-.003 11.891-5.343 11.992-11.91l-.002-.027c.006-.151 0-2.951.006-3.075-.01-3.116-2.538-5.677-5.63-5.67-3.105-.006-5.645 2.54-5.634 5.683zM5.629 4.573C2.525 4.573 0 7.118 0 10.246s2.525 5.673 5.63 5.673c3.103 0 5.629-2.545 5.629-5.673s-2.526-5.673-5.63-5.673'/></g>`,
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
