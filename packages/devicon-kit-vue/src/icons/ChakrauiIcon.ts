import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ChakrauiIcon = defineComponent({
  name: 'ChakrauiIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#1BB2A9' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M7.678 1.583a3.49 3.49 0 0 0-3.03 1.76L.265 10.997a2.04 2.04 0 0 0-.064 1.886l4.486 7.784a3.49 3.49 0 0 0 3.03 1.751l8.602-.01a3.5 3.5 0 0 0 3.026-1.759l4.39-7.655a2.03 2.03 0 0 0-.002-2.008L19.339 3.34a3.5 3.5 0 0 0-3.028-1.756Zm4.365 1.244V9.11c0 .32.226.595.54.656l6.089 1.187q-3.006 5.2-6.008 10.4c-.17.296-.62.176-.62-.166v-6.286a.67.67 0 0 0-.538-.656l-6.072-1.193 5.988-10.393c.168-.29.621-.178.621.168'/></g>`,
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
