import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const TrelloIcon = defineComponent({
  name: 'TrelloIcon',
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
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M21.147 0H2.853A2.86 2.86 0 0 0 0 2.853v18.294A2.86 2.86 0 0 0 2.853 24h18.294A2.86 2.86 0 0 0 24 21.147V2.853A2.86 2.86 0 0 0 21.147 0M10.34 17.287a.953.953 0 0 1-.953.953h-4a.954.954 0 0 1-.954-.953V5.38a.953.953 0 0 1 .954-.953h4a.954.954 0 0 1 .953.953zm9.233-5.467a.944.944 0 0 1-.953.947h-4a.947.947 0 0 1-.953-.947V5.38a.953.953 0 0 1 .953-.953h4a.954.954 0 0 1 .953.953z'/></g>`,
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
