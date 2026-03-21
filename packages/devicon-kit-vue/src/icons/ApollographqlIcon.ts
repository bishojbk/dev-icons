import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ApollographqlIcon = defineComponent({
  name: 'ApollographqlIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#311C87' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.372 12-12a12 12 0 0 0-.473-3.343.6.6 0 0 0-1.127.409h-.002c.265.943.402 1.928.402 2.934a10.73 10.73 0 0 1-3.163 7.637A10.73 10.73 0 0 1 12 22.8a10.73 10.73 0 0 1-7.637-3.163A10.73 10.73 0 0 1 1.2 12a10.73 10.73 0 0 1 3.163-7.637A10.73 10.73 0 0 1 12 1.2c2.576 0 5.013.896 6.958 2.54a1.466 1.466 0 1 0 .862-.84A11.95 11.95 0 0 0 12 0m-1.44 5.88-4.2 10.902h2.63l.687-1.848h3.969l-.719-2.042h-2.613l1.7-4.691 3.024 8.58h2.631L13.47 5.88Z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.372 12-12a12 12 0 0 0-.473-3.343.6.6 0 0 0-1.127.409h-.002c.265.943.402 1.928.402 2.934a10.73 10.73 0 0 1-3.163 7.637A10.73 10.73 0 0 1 12 22.8a10.73 10.73 0 0 1-7.637-3.163A10.73 10.73 0 0 1 1.2 12a10.73 10.73 0 0 1 3.163-7.637A10.73 10.73 0 0 1 12 1.2c2.576 0 5.013.896 6.958 2.54a1.466 1.466 0 1 0 .862-.84A11.95 11.95 0 0 0 12 0m-1.44 5.88-4.2 10.902h2.63l.687-1.848h3.969l-.719-2.042h-2.613l1.7-4.691 3.024 8.58h2.631L13.47 5.88Z'/></g>`,
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
