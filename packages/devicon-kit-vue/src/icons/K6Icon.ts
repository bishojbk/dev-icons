import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const K6Icon = defineComponent({
  name: 'K6Icon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#7D64FF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M24 23.646H0L7.99 6.603l4.813 3.538L19.08.354Zm-8.8-3.681h.052a2.3 2.3 0 0 0 1.593-.64 2.1 2.1 0 0 0 .685-1.576 1.91 1.91 0 0 0-.66-1.511 2 2 0 0 0-1.37-.59h-.04a.7.7 0 0 0-.199.027l1.267-1.883-1.01-.705-.477.705-1.22 1.864c-.21.31-.386.582-.495.77q-.169.301-.29.625a1.9 1.9 0 0 0-.138.719 2.1 2.1 0 0 0 .676 1.558c.422.411.989.641 1.578.64Zm-5.365-2.027 1.398 1.978h1.496l-1.645-2.295 1.46-2.029-.97-.671-.427.565-1.314 1.853v-3.725l-1.31-1.068v7.37h1.31v-1.98Zm5.367.792a.963.963 0 1 1 0-1.927h.009a.94.94 0 0 1 .679.29.9.9 0 0 1 .29.668.98.98 0 0 1-.977.967Z'/></g>`,
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
