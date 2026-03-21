import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const CloudflareIcon = defineComponent({
  name: 'CloudflareIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#F38020' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M16.509 16.845c.147-.507.09-.971-.155-1.316-.225-.316-.605-.499-1.062-.52l-8.66-.113a.16.16 0 0 1-.133-.07.2.2 0 0 1-.02-.156.24.24 0 0 1 .203-.156l8.736-.113c1.035-.049 2.16-.886 2.554-1.913l.499-1.302a.27.27 0 0 0 .014-.168 5.689 5.689 0 0 0-10.937-.584 2.58 2.58 0 0 0-1.794-.498 2.56 2.56 0 0 0-2.223 3.18A3.634 3.634 0 0 0 0 16.751q.002.264.035.527a.174.174 0 0 0 .17.148h15.98a.22.22 0 0 0 .204-.155zm2.757-5.564c-.077 0-.161 0-.239.011-.056 0-.105.042-.127.098l-.337 1.174c-.148.507-.092.971.154 1.317.225.316.605.498 1.062.52l1.844.113c.056 0 .105.026.133.07a.2.2 0 0 1 .021.156.24.24 0 0 1-.204.156l-1.92.112c-1.042.049-2.159.887-2.553 1.914l-.141.358c-.028.072.021.142.099.142h6.597a.174.174 0 0 0 .17-.126 5 5 0 0 0 .175-1.28 4.74 4.74 0 0 0-4.734-4.727'/></g>`,
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
