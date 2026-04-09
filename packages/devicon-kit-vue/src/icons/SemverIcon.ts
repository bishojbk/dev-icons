import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SemverIcon = defineComponent({
  name: 'SemverIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#3F4551' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M.357 9.024A12.07 12.07 0 0 0 2.97 19.867a12.05 12.05 0 0 0 10.38 4.063c7.768-.703 13.086-9.799 9.517-16.8-.416-1.19-2.07-.368-1.903.596q.431 1.052.713 2.155a9.98 9.98 0 0 1-3.926 10.25 9.965 9.965 0 0 1-14.807-3.809A9.98 9.98 0 0 1 4.44 5.448a9.97 9.97 0 0 1 4.85-3.044 9.87 9.87 0 0 1 7.02.631.333.333 0 0 1 .155.429l-3.962 10.62c-.107.81-.69.786-.797 0l-2.38-7.37a1.57 1.57 0 0 0-.773-.988c-1.19-.56-3.093.667-2.379 2.155l3.914 10.441c.524 1.393 1.023 1.834 2.058 1.834s1.535-.44 2.058-1.834L20 3.94a1.036 1.036 0 0 0-.369-1.19C13.1-2.907 2.32.641.357 9.023z'/></g>`,
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
