import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const OpencvIcon = defineComponent({
  name: 'OpencvIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#5C3EE8' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.9.853a5.73 5.73 0 0 0-2.91 10.665l1.641-2.785a.154.154 0 0 0-.05-.204 2.35 2.35 0 1 1 2.635 0 .154.154 0 0 0-.049.204l1.642 2.785A5.73 5.73 0 0 0 11.899.852M5.73 11.689a5.73 5.73 0 1 0 0 11.458c3.179 0 5.807-2.699 5.727-5.876H8.23a.155.155 0 0 0-.152.157c-.008 1.266-1.064 2.34-2.35 2.34a2.35 2.35 0 1 1 .955-4.498.154.154 0 0 0 .196-.06l1.646-2.793a5.7 5.7 0 0 0-2.797-.728m15.442.761-1.637 2.788a.154.154 0 0 0 .05.205 2.35 2.35 0 0 1-1.31 4.3 2.35 2.35 0 0 1-1.325-4.295.154.154 0 0 0 .049-.205l-1.646-2.782a5.73 5.73 0 1 0 5.82-.01'/></g>`,
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
