import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const OculusIcon = defineComponent({
  name: 'OculusIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#1C1E20' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M18.135 13.949c-.319.221-.675.355-1.057.416s-.761.049-1.142.049H8.063c-.382 0-.762.014-1.145-.049a2.6 2.6 0 0 1-1.057-.416 2.38 2.38 0 0 1-1.027-1.951c0-.796.387-1.515 1.029-1.95.314-.225.674-.359 1.049-.42s.75-.061 1.141-.061h7.875c.375 0 .765-.014 1.14.046s.735.194 1.051.405a2.34 2.34 0 0 1 1.02 1.949c0 .78-.391 1.5-1.035 1.95zm3.174-7.555a7.2 7.2 0 0 0-2.865-1.398 8.8 8.8 0 0 0-1.822-.23c-.449-.015-.899-.01-1.364-.01H8.76c-.457 0-.915-.005-1.372.01a9 9 0 0 0-1.825.23 7.3 7.3 0 0 0-2.865 1.4A7.17 7.17 0 0 0 0 12c0 2.182.99 4.241 2.689 5.606a7.3 7.3 0 0 0 2.865 1.4 8.8 8.8 0 0 0 1.823.229c.45.016.9.012 1.365.012h6.496c.449 0 .914.004 1.364-.012a8.6 8.6 0 0 0 1.814-.229 7.4 7.4 0 0 0 2.866-1.402A7.13 7.13 0 0 0 24 12c0-2.181-.99-4.241-2.691-5.606'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M18.135 13.949c-.319.221-.675.355-1.057.416s-.761.049-1.142.049H8.063c-.382 0-.762.014-1.145-.049a2.6 2.6 0 0 1-1.057-.416 2.38 2.38 0 0 1-1.027-1.951c0-.796.387-1.515 1.029-1.95.314-.225.674-.359 1.049-.42s.75-.061 1.141-.061h7.875c.375 0 .765-.014 1.14.046s.735.194 1.051.405a2.34 2.34 0 0 1 1.02 1.949c0 .78-.391 1.5-1.035 1.95zm3.174-7.555a7.2 7.2 0 0 0-2.865-1.398 8.8 8.8 0 0 0-1.822-.23c-.449-.015-.899-.01-1.364-.01H8.76c-.457 0-.915-.005-1.372.01a9 9 0 0 0-1.825.23 7.3 7.3 0 0 0-2.865 1.4A7.17 7.17 0 0 0 0 12c0 2.182.99 4.241 2.689 5.606a7.3 7.3 0 0 0 2.865 1.4 8.8 8.8 0 0 0 1.823.229c.45.016.9.012 1.365.012h6.496c.449 0 .914.004 1.364-.012a8.6 8.6 0 0 0 1.814-.229 7.4 7.4 0 0 0 2.866-1.402A7.13 7.13 0 0 0 24 12c0-2.181-.99-4.241-2.691-5.606'/></g>`,
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
