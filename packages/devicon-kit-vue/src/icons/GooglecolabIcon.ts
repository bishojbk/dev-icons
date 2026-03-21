import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GooglecolabIcon = defineComponent({
  name: 'GooglecolabIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#F9AB00' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M16.941 4.976a7.03 7.03 0 0 0-4.93 2.064 7.033 7.033 0 0 0-.124 9.807l2.395-2.395a3.646 3.646 0 0 1 5.15-5.148l2.397-2.399a7.03 7.03 0 0 0-4.888-1.93m-9.871.01a7.03 7.03 0 0 0-4.888 1.931l2.391 2.391a3.643 3.643 0 0 1 5.023.127l1.734-2.973-.1-.08a7.03 7.03 0 0 0-4.16-1.396m15.01 2.172-2.39 2.39a3.646 3.646 0 0 1-5.15 5.15l-2.406 2.407a7.036 7.036 0 0 0 9.945-9.947m-20.148.01a7.033 7.033 0 0 0-.002 9.681l2.397-2.397a3.643 3.643 0 0 1-.004-4.892zm7.664 7.423a3.635 3.635 0 0 1-5.017.113L2.182 17.1a7.03 7.03 0 0 0 9.007.546l.137-.112z'/></g>`,
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
