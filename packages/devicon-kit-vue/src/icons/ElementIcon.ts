import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ElementIcon = defineComponent({
  name: 'ElementIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#0DBD8B' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m-1.314 4.715c3.289 0 5.956 2.66 5.956 5.943a.879.879 0 0 1-1.758 0 4.194 4.194 0 0 0-4.198-4.189.878.878 0 1 1 0-1.754m-5.092 9.504a.88.88 0 0 1-.879-.877 5.95 5.95 0 0 1 5.956-5.945.878.878 0 1 1 0 1.753 4.195 4.195 0 0 0-4.198 4.191.88.88 0 0 1-.879.878m7.735 5.067c-3.29 0-5.957-2.662-5.957-5.944a.88.88 0 0 1 1.758 0 4.194 4.194 0 0 0 4.199 4.189.879.879 0 1 1 0 1.755m0-2.683a.88.88 0 0 1-.88-.876.88.88 0 0 1 .88-.878 4.195 4.195 0 0 0 4.199-4.19.878.878 0 0 1 1.758 0c0 3.282-2.667 5.944-5.957 5.944'/></g>`,
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
