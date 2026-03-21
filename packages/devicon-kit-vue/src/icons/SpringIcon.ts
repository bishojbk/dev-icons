import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SpringIcon = defineComponent({
  name: 'SpringIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#6DB33F' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M21.854 1.416a10.5 10.5 0 0 1-1.284 2.247A11.967 11.967 0 1 0 3.852 20.776l.444.395a11.954 11.954 0 0 0 19.632-8.297c.346-3.013-.568-6.865-2.074-11.458M5.58 20.875a1.017 1.017 0 1 1-.149-1.433 1.04 1.04 0 0 1 .149 1.432m16.199-3.581c-2.939 3.926-9.26 2.593-13.286 2.79 0 0-.716.05-1.432.148 0 0 .272-.123.618-.247 2.84-.987 4.173-1.185 5.901-2.074 3.235-1.654 6.47-5.284 7.112-9.038-1.235 3.606-4.988 6.717-8.396 7.976-2.346.865-6.568 1.704-6.568 1.704l-.173-.099c-2.865-1.407-2.963-7.63 2.272-9.63 2.296-.89 4.47-.395 6.963-.988 2.643-.617 5.705-2.593 6.94-5.186 1.382 4.174 3.061 10.643.049 14.644'/></g>`,
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
