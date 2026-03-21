import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GolandIcon = defineComponent({
  name: 'GolandIcon',
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
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M0 0v24h24V0Zm6.764 3a5.45 5.45 0 0 1 3.892 1.356L9.284 6.012A3.65 3.65 0 0 0 6.696 5c-1.6 0-2.844 1.4-2.844 3.08v.028c0 1.812 1.244 3.14 3 3.14a3.47 3.47 0 0 0 2.048-.596V9.228H6.708v-1.88H11v4.296a6.43 6.43 0 0 1-4.228 1.572c-3.076 0-5.196-2.164-5.196-5.092v-.028A5.08 5.08 0 0 1 6.764 3m10.432 0c3.052 0 5.244 2.276 5.244 5.088v.028a5.116 5.116 0 0 1-5.272 5.12c-3.056-.02-5.248-2.296-5.248-5.112v-.028A5.116 5.116 0 0 1 17.196 3m-.028 2A2.96 2.96 0 0 0 14.2 8.068v.028a3.01 3.01 0 0 0 3 3.112 2.96 2.96 0 0 0 2.964-3.084v-.028A3.004 3.004 0 0 0 17.168 5M2.252 19.5h9V21h-9z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M0 0v24h24V0Zm6.764 3a5.45 5.45 0 0 1 3.892 1.356L9.284 6.012A3.65 3.65 0 0 0 6.696 5c-1.6 0-2.844 1.4-2.844 3.08v.028c0 1.812 1.244 3.14 3 3.14a3.47 3.47 0 0 0 2.048-.596V9.228H6.708v-1.88H11v4.296a6.43 6.43 0 0 1-4.228 1.572c-3.076 0-5.196-2.164-5.196-5.092v-.028A5.08 5.08 0 0 1 6.764 3m10.432 0c3.052 0 5.244 2.276 5.244 5.088v.028a5.116 5.116 0 0 1-5.272 5.12c-3.056-.02-5.248-2.296-5.248-5.112v-.028A5.116 5.116 0 0 1 17.196 3m-.028 2A2.96 2.96 0 0 0 14.2 8.068v.028a3.01 3.01 0 0 0 3 3.112 2.96 2.96 0 0 0 2.964-3.084v-.028A3.004 3.004 0 0 0 17.168 5M2.252 19.5h9V21h-9z'/></g>`,
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
