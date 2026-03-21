import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SvelteIcon = defineComponent({
  name: 'SvelteIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF3E00' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.1 4.1 0 0 1-.703-3.107 4 4 0 0 1 .134-.522l.105-.321.287.21a7.2 7.2 0 0 0 2.186 1.092l.208.063-.02.208a1.25 1.25 0 0 0 .226.83 1.34 1.34 0 0 0 1.435.533 1.2 1.2 0 0 0 .343-.15l5.59-3.562a1.16 1.16 0 0 0 .524-.778 1.24 1.24 0 0 0-.211-.937 1.34 1.34 0 0 0-1.435-.533 1.2 1.2 0 0 0-.343.15l-2.133 1.36a4 4 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.1 4.1 0 0 1-.702-3.108 3.86 3.86 0 0 1 1.742-2.582l5.589-3.563a4 4 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.1 4.1 0 0 1 .703 3.107 4 4 0 0 1-.134.522l-.105.321-.286-.21a7.2 7.2 0 0 0-2.187-1.093l-.208-.063.02-.207a1.25 1.25 0 0 0-.226-.831 1.34 1.34 0 0 0-1.435-.532 1.2 1.2 0 0 0-.343.15L8.62 9.368a1.16 1.16 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.34 1.34 0 0 0 1.435.533 1.2 1.2 0 0 0 .344-.151l2.132-1.36a4 4 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.1 4.1 0 0 1 .702 3.108 3.86 3.86 0 0 1-1.742 2.583l-5.589 3.562a4 4 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.4 6.4 0 0 0-2.896 4.295 6.75 6.75 0 0 0 .666 4.336 6.4 6.4 0 0 0-.96 2.396 6.83 6.83 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.4 6.4 0 0 0 2.896-4.295 6.76 6.76 0 0 0-.665-4.336 6.4 6.4 0 0 0 .958-2.396 6.83 6.83 0 0 0-1.167-5.168'/></g>`,
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
