import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const LetsencryptIcon = defineComponent({
  name: 'LetsencryptIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#003A70' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.991 0a.883.883 0 0 0-.871.817v3.02a.883.883 0 0 0 .88.884.883.883 0 0 0 .88-.88V.816A.883.883 0 0 0 11.991 0m7.705 3.109a.88.88 0 0 0-.521.174L16.8 5.231a.88.88 0 0 0 .559 1.563.88.88 0 0 0 .56-.2l2.37-1.951a.88.88 0 0 0-.594-1.534M4.32 3.122a.883.883 0 0 0-.611 1.52l2.37 1.951a.88.88 0 0 0 .56.2v-.002a.88.88 0 0 0 .56-1.56L4.828 3.283a.9.9 0 0 0-.508-.16zm7.66 3.228a5.046 5.046 0 0 0-5.026 5.045v1.488H5.787a.967.967 0 0 0-.965.964v9.189a.967.967 0 0 0 .965.964h12.426a.967.967 0 0 0 .964-.964v-9.19a.967.967 0 0 0-.964-.963h-1.168v-1.488A5.046 5.046 0 0 0 11.98 6.35m.012 2.893a2.15 2.15 0 0 1 2.16 2.152v1.488H9.847v-1.488a2.15 2.15 0 0 1 2.145-2.152m7.382.503a.883.883 0 1 0 .07 1.763h3.027a.883.883 0 0 0 0-1.76h-3.027zM1.529 9.75a.883.883 0 0 0 0 1.76h2.999a.883.883 0 0 0 0-1.76zm10.46 6.774a1.28 1.28 0 0 1 .64 2.393v1.245a.63.63 0 0 1-1.259 0v-1.245a1.28 1.28 0 0 1 .619-2.393'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M11.991 0a.883.883 0 0 0-.871.817v3.02a.883.883 0 0 0 .88.884.883.883 0 0 0 .88-.88V.816A.883.883 0 0 0 11.991 0m7.705 3.109a.88.88 0 0 0-.521.174L16.8 5.231a.88.88 0 0 0 .559 1.563.88.88 0 0 0 .56-.2l2.37-1.951a.88.88 0 0 0-.594-1.534M4.32 3.122a.883.883 0 0 0-.611 1.52l2.37 1.951a.88.88 0 0 0 .56.2v-.002a.88.88 0 0 0 .56-1.56L4.828 3.283a.9.9 0 0 0-.508-.16zm7.66 3.228a5.046 5.046 0 0 0-5.026 5.045v1.488H5.787a.967.967 0 0 0-.965.964v9.189a.967.967 0 0 0 .965.964h12.426a.967.967 0 0 0 .964-.964v-9.19a.967.967 0 0 0-.964-.963h-1.168v-1.488A5.046 5.046 0 0 0 11.98 6.35m.012 2.893a2.15 2.15 0 0 1 2.16 2.152v1.488H9.847v-1.488a2.15 2.15 0 0 1 2.145-2.152m7.382.503a.883.883 0 1 0 .07 1.763h3.027a.883.883 0 0 0 0-1.76h-3.027zM1.529 9.75a.883.883 0 0 0 0 1.76h2.999a.883.883 0 0 0 0-1.76zm10.46 6.774a1.28 1.28 0 0 1 .64 2.393v1.245a.63.63 0 0 1-1.259 0v-1.245a1.28 1.28 0 0 1 .619-2.393'/></g>`,
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
