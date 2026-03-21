import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GitpodIcon = defineComponent({
  name: 'GitpodIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FFAE33' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M14.033 1.195a2.387 2.387 0 0 1-.87 3.235l-6.98 4.04a.6.6 0 0 0-.3.522v6.342a.6.6 0 0 0 .3.521l5.524 3.199a.59.59 0 0 0 .586 0l5.527-3.199a.6.6 0 0 0 .299-.52V11.39l-4.969 2.838a2.326 2.326 0 0 1-3.19-.9 2.39 2.39 0 0 1 .89-3.23l7.108-4.062C20.123 4.8 22.8 6.384 22.8 8.901v6.914a4.52 4.52 0 0 1-2.245 3.919l-6.345 3.672a4.41 4.41 0 0 1-4.422 0l-6.344-3.672A4.52 4.52 0 0 1 1.2 15.816V8.51a4.52 4.52 0 0 1 2.245-3.918l7.393-4.28a2.326 2.326 0 0 1 3.195.883'/></g>`,
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
