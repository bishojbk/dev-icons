import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const DatagripIcon = defineComponent({
  name: 'DatagripIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#000000' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003H4.62v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037A2.85 2.85 0 0 0 6.51 5.088M2.208 19.495h9v1.5h-9z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003H4.62v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037A2.85 2.85 0 0 0 6.51 5.088M2.208 19.495h9v1.5h-9z'/></g>`,
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
