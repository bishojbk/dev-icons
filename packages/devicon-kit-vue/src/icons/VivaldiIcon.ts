import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const VivaldiIcon = defineComponent({
  name: 'VivaldiIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#EF3939' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 0C6.75 0 3.817 0 1.912 1.904.007 3.81 0 6.75 0 12s0 8.175 1.912 10.08C3.825 23.985 6.75 24 12 24s8.183 0 10.088-1.904C23.993 20.19 24 17.25 24 12s0-8.175-1.912-10.08C20.175.015 17.25 0 12 0m-.168 3a9 9 0 0 1 6.49 2.648 9 9 0 0 1 0 12.704A9 9 0 1 1 11.832 3M7.568 7.496a1 1 0 0 0-.142.004A1.5 1.5 0 0 0 6.21 9.75l1.701 3c.93 1.582 1.839 3.202 2.791 4.822a1.42 1.42 0 0 0 1.41.75 1.5 1.5 0 0 0 1.223-.81l4.447-7.762A1.56 1.56 0 0 0 18 8.768a1.5 1.5 0 1 0-2.828.914 2.5 2.5 0 0 1 .256 1.119v.246a2.393 2.393 0 0 1-2.52 2.13 2.35 2.35 0 0 1-1.965-1.214c-.307-.51-.6-1.035-.9-1.553-.42-.72-.826-1.41-1.246-2.16a1.43 1.43 0 0 0-1.229-.754'/></g>`,
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
