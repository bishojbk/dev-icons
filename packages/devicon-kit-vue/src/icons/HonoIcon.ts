import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const HonoIcon = defineComponent({
  name: 'HonoIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#E36002' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12.445.002a45.5 45.5 0 0 0-5.252 8.146 9 9 0 0 1-.555-.53 28 28 0 0 0-1.205-1.542 8.8 8.8 0 0 0-1.251 2.12 20.7 20.7 0 0 0-1.448 5.88 8.9 8.9 0 0 0 .338 3.468q1.968 5.22 7.445 6.337 4.583.657 8.097-2.312 4.015-3.885 2.047-9.132a33.3 33.3 0 0 0-2.988-5.59A91 91 0 0 0 12.615.053a.22.22 0 0 0-.17-.051m-.336 3.906a51 51 0 0 1 4.794 6.552q.672 1.15 1.108 2.41.91 3.579-1.951 5.904-2.768 1.947-6.072 1.156-3.564-1.105-4.121-4.794a5.1 5.1 0 0 1 .242-2.266q.536-1.361 1.3-2.601l1.446-2.121a397 397 0 0 0 3.254-4.24'/></g>`,
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
