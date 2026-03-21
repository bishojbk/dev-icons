import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const PolkadotIcon = defineComponent({
  name: 'PolkadotIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#E6007A' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 0c2.39 0 4.328 1.127 4.328 2.517S14.39 5.034 12 5.034 7.672 3.907 7.672 2.517 9.61 0 12 0m0 18.966c2.39 0 4.328 1.127 4.328 2.517S14.39 24 12 24s-4.328-1.127-4.328-2.517S9.61 18.966 12 18.966M1.606 6C2.8 3.93 4.747 2.816 5.952 3.511s1.212 2.937.017 5.007-3.141 3.182-4.345 2.489S.411 8.07 1.606 6m16.427 9.483c1.2-2.07 3.139-3.184 4.343-2.489s1.211 2.936.016 5.006-3.14 3.185-4.344 2.49-1.211-2.937-.015-5.007m-16.409-2.49c1.205-.7 3.15.419 4.346 2.489s1.187 4.311-.018 5.007S2.8 20.07 1.607 18s-1.187-4.311.017-5.007m16.425-9.481c1.2-.695 3.149.419 4.344 2.489s1.188 4.311-.016 5.007-3.148-.42-4.343-2.49-1.188-4.311.015-5.006'/></g>`,
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
