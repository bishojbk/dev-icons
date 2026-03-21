import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const WebpackIcon = defineComponent({
  name: 'WebpackIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#8DD6F9' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M22.199 18.498 12.429 24v-4.285l6.087-3.334zm.668-.603V6.388l-3.575 2.055v7.396zm-21.066.603L11.571 24v-4.285L5.484 16.38zm-.668-.603V6.388l3.575 2.055v7.396zm.418-12.251L11.571 0v4.143L5.152 7.66l-.049.028zm20.898 0L12.429 0v4.143l6.419 3.516.049.028zM11.57 18.74l-6.005-3.287V8.938l6.005 3.453zm.858 0 6.005-3.287V8.938l-6.005 3.453zM5.972 8.185l6.03-3.302 6.028 3.302-6.029 3.466z'/></g>`,
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
