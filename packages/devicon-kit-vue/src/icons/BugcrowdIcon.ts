import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const BugcrowdIcon = defineComponent({
  name: 'BugcrowdIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#F26822' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M24 12 18 1.387H6L0 12l6 10.613h12zm-5.782 1.658q-.005 1.238-.354 2.231a5 5 0 0 1-.99 1.708 4.3 4.3 0 0 1-1.503 1.093 4.7 4.7 0 0 1-1.896.385 4.2 4.2 0 0 1-1.145-.152 3.8 3.8 0 0 1-.868-.36 4 4 0 0 1-.601-.435 3 3 0 0 1-.466-.514h-.04l.02.193q.017.248.02.497v.528H7.961V7.062q-.002-.226-.114-.337c-.077-.074-.19-.109-.33-.109h-.811V4.425h2.452q.71-.004 1.048.331c.222.223.333.576.33 1.049v3.003q-.005.387-.02.626l-.02.247h.04a3 3 0 0 1 .463-.507q.232-.214.6-.426t.876-.36c.38-.1.77-.15 1.162-.148q1.053.005 1.894.395a4.1 4.1 0 0 1 1.446 1.11q.6.72.92 1.715.317.988.32 2.198m-2.803 1.406q.206-.597.209-1.366-.004-.988-.328-1.718-.324-.726-.902-1.125a2.35 2.35 0 0 0-1.344-.404 2.6 2.6 0 0 0-.969.186 2.4 2.4 0 0 0-.83.589 2.8 2.8 0 0 0-.579 1.015q-.21.62-.216 1.477c0 .397.053.792.159 1.174.101.366.265.712.483 1.02.211.3.486.548.805.722q.482.265 1.127.27c.343.002.683-.07.997-.213a2.4 2.4 0 0 0 .824-.623q.36-.409.564-1.004'/></g>`,
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
