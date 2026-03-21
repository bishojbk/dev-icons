import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ConsulIcon = defineComponent({
  name: 'ConsulIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#F24C53' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M14.075 12.029a2.506 2.506 0 0 0-2.506-2.507 2.506 2.506 0 0 0-2.505 2.506 2.506 2.506 0 0 0 2.506 2.506 2.506 2.506 0 0 0 2.505-2.506m3.532 0a1.156 1.156 0 0 0-1.156-1.156 1.156 1.156 0 0 0-1.156 1.156 1.156 1.156 0 0 0 1.156 1.155 1.156 1.156 0 0 0 1.156-1.155m4.792 5.51a1.158 1.156 0 0 0-1.158-1.156 1.158 1.156 0 0 0-1.158 1.156 1.158 1.156 0 0 0 1.158 1.156A1.158 1.156 0 0 0 22.4 17.54m-1.651-3.651a1.153 1.157 0 0 0-1.153-1.157 1.153 1.157 0 0 0-1.154 1.157 1.153 1.157 0 0 0 1.154 1.157 1.153 1.157 0 0 0 1.153-1.157m3.251.062a1.154 1.154 0 0 0-1.154-1.154 1.154 1.154 0 0 0-1.154 1.154 1.154 1.154 0 0 0 1.154 1.154A1.154 1.154 0 0 0 24 13.951m-3.279-3.883a1.156 1.154 0 0 0-1.156-1.154 1.156 1.154 0 0 0-1.156 1.154 1.156 1.154 0 0 0 1.156 1.153 1.156 1.154 0 0 0 1.156-1.153m3.28.045a1.161 1.157 0 0 0-1.161-1.157 1.161 1.157 0 0 0-1.162 1.157 1.161 1.157 0 0 0 1.162 1.157A1.161 1.157 0 0 0 24 10.112M22.374 6.48a1.158 1.16 0 0 0-1.157-1.16 1.158 1.16 0 0 0-1.158 1.16 1.158 1.16 0 0 0 1.158 1.16 1.158 1.16 0 0 0 1.157-1.16M11.617.383c-3.11 0-6.029 1.207-8.22 3.398A11.58 11.58 0 0 0 0 12c0 3.109 1.207 6.028 3.397 8.22a11.58 11.58 0 0 0 8.22 3.397c2.578 0 5.018-.825 7.055-2.386l-1.42-1.852a9.2 9.2 0 0 1-5.635 1.904 9.26 9.26 0 0 1-6.572-2.715A9.23 9.23 0 0 1 2.334 12c0-2.478.964-4.812 2.715-6.57a9.22 9.22 0 0 1 6.568-2.713c2.058 0 4.007.659 5.637 1.905l1.417-1.854A11.52 11.52 0 0 0 11.617.383'/></g>`,
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
