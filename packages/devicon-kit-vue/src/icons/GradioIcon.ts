import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GradioIcon = defineComponent({
  name: 'GradioIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#F97316' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 1.527a1.53 1.53 0 0 0-.76.203L.77 7.732A1.53 1.53 0 0 0 0 9.021v.088A1.53 1.53 0 0 0 .77 10.4l2.8 1.6-2.8 1.61c-.514.29-.77.81-.77 1.33 0 .51.256 1.03.77 1.32l10.47 6.01c.47.27 1.05.27 1.52 0l10.47-6.01c.5-.28.76-.78.77-1.29v-.07c-.01-.5-.27-1.01-.77-1.29L20.42 12l2.81-1.6A1.53 1.53 0 0 0 24 9.223V8.91a1.53 1.53 0 0 0-.77-1.178L12.76 1.73a1.53 1.53 0 0 0-.76-.203m0 3.299 7.39 4.235-2.05 1.179-4.58-2.638a1.52 1.52 0 0 0-1.52 0L6.652 10.24 4.613 9.061zm0 5.874 2.27 1.3L12 13.3 9.734 12zm-5.348 3.07 4.588 2.62a1.53 1.53 0 0 0 1.52 0l4.58-2.62 2.05 1.17L12 19.17l-7.387-4.23z'/></g>`,
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
