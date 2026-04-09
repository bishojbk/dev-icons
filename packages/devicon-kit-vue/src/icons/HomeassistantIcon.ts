import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const HomeassistantIcon = defineComponent({
  name: 'HomeassistantIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#18BCF2' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M22.939 10.627 13.061.749a1.505 1.505 0 0 0-2.121 0l-9.879 9.878C.478 11.21 0 12.363 0 13.187v9c0 .826.675 1.5 1.5 1.5h9.227l-4.063-4.062a2 2 0 0 1-.664.113c-1.13 0-2.05-.92-2.05-2.05s.92-2.05 2.05-2.05 2.05.92 2.05 2.05c0 .233-.041.456-.113.665l3.163 3.163V9.928a2.05 2.05 0 0 1-1.15-1.84c0-1.13.92-2.05 2.05-2.05s2.05.92 2.05 2.05a2.05 2.05 0 0 1-1.15 1.84v8.127l3.146-3.146A2.05 2.05 0 0 1 18 12.239c1.13 0 2.05.92 2.05 2.05s-.92 2.05-2.05 2.05a2 2 0 0 1-.709-.13L12.9 20.602v3.088h9.6c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.477-1.977-1.061-2.561z'/></g>`,
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
