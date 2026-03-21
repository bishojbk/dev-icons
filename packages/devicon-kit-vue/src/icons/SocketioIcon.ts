import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SocketioIcon = defineComponent({
  name: 'SocketioIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#010101' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.936.014a12.2 12.2 0 0 0-2.975.378C4.281 1.555.568 5.794.091 10.602c-.59 4.548 1.709 9.285 5.644 11.634 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.916-5.76-9.98C16.355.589 14.144.006 11.937.015m-.063 1.696c4.945-.007 9.789 3.813 10.282 8.924.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.724-4.08-10.88-9.557-.406-4.434 2.517-8.834 6.698-10.3a9.1 9.1 0 0 1 3.388-.646zm5.091 3.225c-2.687 2.084-5.26 4.307-7.889 6.456 1.203.017 2.412.016 3.621.01 1.41-2.165 2.86-4.3 4.268-6.467M11.3 12.588c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255 255 0 0 0-3.632-.018'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M11.936.014a12.2 12.2 0 0 0-2.975.378C4.281 1.555.568 5.794.091 10.602c-.59 4.548 1.709 9.285 5.644 11.634 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.916-5.76-9.98C16.355.589 14.144.006 11.937.015m-.063 1.696c4.945-.007 9.789 3.813 10.282 8.924.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.724-4.08-10.88-9.557-.406-4.434 2.517-8.834 6.698-10.3a9.1 9.1 0 0 1 3.388-.646zm5.091 3.225c-2.687 2.084-5.26 4.307-7.889 6.456 1.203.017 2.412.016 3.621.01 1.41-2.165 2.86-4.3 4.268-6.467M11.3 12.588c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255 255 0 0 0-3.632-.018'/></g>`,
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
