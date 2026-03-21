import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const LogseqIcon = defineComponent({
  name: 'LogseqIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#85C8C8' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M19.3 9.838c-2.677-1.366-5.467-1.56-8.316-.607-1.738.58-3.197 1.58-4.267 3.088-1.031 1.452-1.45 3.071-1.184 4.837.268 1.781 1.164 3.228 2.505 4.4C9.96 23.231 12.24 23.942 15.092 24c.41-.053 1.157-.103 1.883-.255 2.004-.418 3.754-1.325 5.08-2.915 1.621-1.942 2.108-4.148 1.272-6.562-.704-2.034-2.138-3.467-4.027-4.43M7.515 6.295c.507-2.162-.88-4.664-2.988-5.37-1.106-.37-2.156-.267-3.075.492C.61 2.114.294 3.064.271 4.146c.009.135.016.285.029.435.01.102.021.205.042.305.351 1.703 1.262 2.98 2.9 3.636 1.912.766 3.808-.244 4.273-2.227m4.064-1.146c1.075.377 2.152.31 3.22-.033.94-.3 1.755-.793 2.341-1.609.803-1.117.5-2.387-.717-3.027-.6-.317-1.246-.438-1.927-.48-.47.076-.95.117-1.41.234-1.068.27-2.002.781-2.653 1.7-.495.697-.64 1.45-.174 2.227.303.504.779.799 1.32.988'/></g>`,
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
