import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const TeamcityIcon = defineComponent({
  name: 'TeamcityIcon',
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
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M0 0v24h24V0zm2.664 2.964h7.48v1.832H7.396v7.196H5.412V4.796H2.664zm9.328 18h-9v-1.5h9zm5.564-9.218a4.6 4.6 0 0 1-2.036.374 4.556 4.556 0 0 1-4.628-4.616V7.48A4.584 4.584 0 0 1 15.6 2.812 4.66 4.66 0 0 1 19.16 4.2l-1.264 1.456a3.34 3.34 0 0 0-2.312-1.02 2.67 2.67 0 0 0-2.616 2.8v.028a2.68 2.68 0 0 0 2.616 2.836 3.23 3.23 0 0 0 2.376-1.056l1.264 1.276a4.6 4.6 0 0 1-1.668 1.226'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M0 0v24h24V0zm2.664 2.964h7.48v1.832H7.396v7.196H5.412V4.796H2.664zm9.328 18h-9v-1.5h9zm5.564-9.218a4.6 4.6 0 0 1-2.036.374 4.556 4.556 0 0 1-4.628-4.616V7.48A4.584 4.584 0 0 1 15.6 2.812 4.66 4.66 0 0 1 19.16 4.2l-1.264 1.456a3.34 3.34 0 0 0-2.312-1.02 2.67 2.67 0 0 0-2.616 2.8v.028a2.68 2.68 0 0 0 2.616 2.836 3.23 3.23 0 0 0 2.376-1.056l1.264 1.276a4.6 4.6 0 0 1-1.668 1.226'/></g>`,
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
