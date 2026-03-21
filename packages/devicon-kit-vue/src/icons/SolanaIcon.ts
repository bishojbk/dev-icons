import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SolanaIcon = defineComponent({
  name: 'SolanaIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#9945FF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m23.876 18.031-3.962 4.14a.9.9 0 0 1-.306.21.9.9 0 0 1-.367.074H.46a.47.47 0 0 1-.252-.073.45.45 0 0 1-.17-.196.44.44 0 0 1-.031-.255.44.44 0 0 1 .117-.23l3.965-4.139a.9.9 0 0 1 .305-.21.9.9 0 0 1 .366-.075h18.78a.47.47 0 0 1 .252.074.45.45 0 0 1 .17.196.44.44 0 0 1 .031.255.44.44 0 0 1-.117.23m-3.962-8.335a.9.9 0 0 0-.306-.21.9.9 0 0 0-.367-.075H.46a.47.47 0 0 0-.252.073.45.45 0 0 0-.17.197.44.44 0 0 0-.031.254.44.44 0 0 0 .117.23l3.965 4.14a.9.9 0 0 0 .305.21.9.9 0 0 0 .366.074h18.78a.47.47 0 0 0 .252-.073.45.45 0 0 0 .17-.196.44.44 0 0 0 .031-.255.44.44 0 0 0-.117-.23zM.46 6.723h18.782a.9.9 0 0 0 .367-.075.9.9 0 0 0 .306-.21l3.962-4.14a.44.44 0 0 0 .117-.23.44.44 0 0 0-.032-.254.45.45 0 0 0-.17-.196.47.47 0 0 0-.252-.073H4.76a.9.9 0 0 0-.366.074.9.9 0 0 0-.305.21L.125 5.97a.44.44 0 0 0-.117.23.44.44 0 0 0 .03.254.45.45 0 0 0 .17.196.47.47 0 0 0 .252.074z'/></g>`,
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
