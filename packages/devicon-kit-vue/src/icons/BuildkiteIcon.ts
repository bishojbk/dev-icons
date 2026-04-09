import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const BuildkiteIcon = defineComponent({
  name: 'BuildkiteIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#14CC80' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m23.613 8.143-7.668-3.856v7.712zM8.166 15.857V8.143L.387 4.287V12l7.78 3.857zM.183 3.958a.38.38 0 0 1 .377-.017l7.606 3.771 7.607-3.771a.39.39 0 0 1 .346 0l7.668 3.857a.39.39 0 0 1 .213.345v7.71a.39.39 0 0 1-.213.346l-7.668 3.86a.39.39 0 0 1-.562-.345v-7.09l-7.219 3.58a.4.4 0 0 1-.344 0L.215 12.346A.39.39 0 0 1 0 12V4.287a.39.39 0 0 1 .183-.329'/></g>`,
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
