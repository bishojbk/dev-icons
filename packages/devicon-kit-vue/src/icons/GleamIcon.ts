import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GleamIcon = defineComponent({
  name: 'GleamIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FFAFF3' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M10.614.003a2 2 0 0 0-.229.026 1.78 1.78 0 0 0-1.388 1.158l-1.785 5.06A1.8 1.8 0 0 1 6.17 7.322l-5 1.959c-1.282.503-1.53 2.267-.437 3.103l4.265 3.257a1.8 1.8 0 0 1 .703 1.32l.318 5.355C6.1 23.69 7.702 24.47 8.838 23.69l4.421-3.047a1.8 1.8 0 0 1 1.476-.26l5.196 1.35c1.334.347 2.573-.936 2.18-2.254l-1.533-5.14a1.8 1.8 0 0 1 .21-1.482l2.893-4.52c.742-1.158-.095-2.732-1.472-2.765l-5.368-.13a1.8 1.8 0 0 1-1.347-.656L12.086.642a1.76 1.76 0 0 0-1.472-.64m5.707 10.41a.95.95 0 0 1 .959.786.953.953 0 0 1-.773 1.104.953.953 0 1 1-.186-1.89m-7.677 1.353a.95.95 0 0 1 .959.787.953.953 0 1 1-1.104-.773 1 1 0 0 1 .145-.014m4.928 1.384a.5.5 0 0 1 .34.15.5.5 0 0 1 .133.346 1.26 1.26 0 0 1-.391.886 1.27 1.27 0 0 1-.903.349 1.3 1.3 0 0 1-.482-.108 1.3 1.3 0 0 1-.403-.284 1.3 1.3 0 0 1-.265-.417.485.485 0 0 1 .278-.627.48.48 0 0 1 .371.009.5.5 0 0 1 .257.268.3.3 0 0 0 .061.097.3.3 0 0 0 .094.066.3.3 0 0 0 .225.006.3.3 0 0 0 .163-.155.3.3 0 0 0 .026-.112.5.5 0 0 1 .15-.34.5.5 0 0 1 .346-.134'/></g>`,
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
