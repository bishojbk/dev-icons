import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const WasmcloudIcon = defineComponent({
  name: 'WasmcloudIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#00BC8E' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M21.805 5.477 12.797.215a1.59 1.59 0 0 0-1.6 0L2.19 5.477a1.41 1.41 0 0 0-.697 1.215v10.604a1.44 1.44 0 0 0 .715 1.243l9.023 5.251a1.55 1.55 0 0 0 1.558 0l8.998-5.25a1.44 1.44 0 0 0 .72-1.244V6.692a1.41 1.41 0 0 0-.702-1.215m-2.001 10.428a.28.28 0 0 1-.139.238l-7.527 4.388a.28.28 0 0 1-.282 0l-7.524-4.385a.29.29 0 0 1-.14-.257v-7.8a.28.28 0 0 1 .138-.239l2.732-1.6a.28.28 0 0 1 .279 0 .28.28 0 0 1 .14.242v7.324l2.469-1.432v-7.65a.27.27 0 0 1 .138-.241l1.781-1.04a.28.28 0 0 1 .282 0l1.794 1.042a.28.28 0 0 1 .136.241v7.642l2.455 1.43V6.484a.28.28 0 0 1 .141-.24.28.28 0 0 1 .28 0l2.731 1.603a.28.28 0 0 1 .139.239z'/></g>`,
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
