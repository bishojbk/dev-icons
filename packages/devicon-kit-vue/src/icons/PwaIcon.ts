import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const PwaIcon = defineComponent({
  name: 'PwaIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#5A0FC8' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M20.597 7.482 24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0 1.772 5.84 2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237-1.72 5.237H7.404L6.17 14.402l1.214-3.742 1.342 2.661 1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358.285-.323.284-.873 0-.546-.323-.871-.324-.326-1.103-.326'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M20.597 7.482 24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0 1.772 5.84 2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237-1.72 5.237H7.404L6.17 14.402l1.214-3.742 1.342 2.661 1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358.285-.323.284-.873 0-.546-.323-.871-.324-.326-1.103-.326'/></g>`,
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
