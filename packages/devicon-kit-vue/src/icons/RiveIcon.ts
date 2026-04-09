import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const RiveIcon = defineComponent({
  name: 'RiveIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#1D1D1D' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M.643 1.475c0 .814.668 1.475 1.49 1.475H14.49q2.112 0 3.48 1.29 1.366 1.291 1.366 3.32 0 1.875-1.367 3.072-1.366 1.169-3.479 1.168H9.12c-.824 0-1.491.66-1.491 1.475s.667 1.475 1.491 1.475h5.93l5.342 8.482q.497.768 1.398.768.995 0 1.398-.768.403-.8-.155-1.69l-4.753-7.56q1.926-.861 3.044-2.52 1.119-1.69 1.119-3.902 0-2.244-1.026-3.934-.993-1.69-2.795-2.643Q16.82 0 14.49 0H2.134C1.311 0 .643.66.643 1.475'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M.643 1.475c0 .814.668 1.475 1.49 1.475H14.49q2.112 0 3.48 1.29 1.366 1.291 1.366 3.32 0 1.875-1.367 3.072-1.366 1.169-3.479 1.168H9.12c-.824 0-1.491.66-1.491 1.475s.667 1.475 1.491 1.475h5.93l5.342 8.482q.497.768 1.398.768.995 0 1.398-.768.403-.8-.155-1.69l-4.753-7.56q1.926-.861 3.044-2.52 1.119-1.69 1.119-3.902 0-2.244-1.026-3.934-.993-1.69-2.795-2.643Q16.82 0 14.49 0H2.134C1.311 0 .643.66.643 1.475'/></g>`,
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
