import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const InkscapeIcon = defineComponent({
  name: 'InkscapeIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#000000' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M7.666 14.871c.237.147 3.818.875 4.693 1.02.303.064.088.376-.33.587-.943.251-5.517-1.607-4.363-1.607m5.647-13.264 3.505 3.56c.333.34.328.998.142 1.187l-1.74-1.392-.342 2.061-1.455-.767-2.328 1.47-.771-3.1L9.073 6.79H7.16c-.78 0-.871-.99-.163-1.698 1.237-1.335 2.657-2.696 3.429-3.485.776-.793 2.127-.77 2.887 0M9.786.97l-8.86 9.066c-2.993 3.707 2.038 3.276 4.194 4.343.774.791-2.965 1.375-2.191 2.166.773.791 4.678 1.524 5.453 2.314.773.791-1.584 1.63-.81 2.42.773.792 2.563.042 2.898 1.868.238 1.304 3.224.56 4.684-.508.774-.791-1.48-.717-.706-1.508 1.923-1.967 3.715-.714 4.373-2.686.325-.974-2.832-1.501-2.057-2.292 2.226-1.3 9.919-2.146 6.268-5.796L13.85.97c-1.123-1.078-2.998-1.09-4.063 0zm10.177 17.475c0 .45 3.314.745 3.314-.106-.472-1.366-2.922-1.274-3.314.106m-14.928 2.39c.784.679 1.997-.169 2.36-1.116-.76-1.01-3.607.037-2.36 1.116m14.512-1.466c-1.011.908.114 1.828 1.111 1.242.222-.225-.006-1.016-1.11-1.242Z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M7.666 14.871c.237.147 3.818.875 4.693 1.02.303.064.088.376-.33.587-.943.251-5.517-1.607-4.363-1.607m5.647-13.264 3.505 3.56c.333.34.328.998.142 1.187l-1.74-1.392-.342 2.061-1.455-.767-2.328 1.47-.771-3.1L9.073 6.79H7.16c-.78 0-.871-.99-.163-1.698 1.237-1.335 2.657-2.696 3.429-3.485.776-.793 2.127-.77 2.887 0M9.786.97l-8.86 9.066c-2.993 3.707 2.038 3.276 4.194 4.343.774.791-2.965 1.375-2.191 2.166.773.791 4.678 1.524 5.453 2.314.773.791-1.584 1.63-.81 2.42.773.792 2.563.042 2.898 1.868.238 1.304 3.224.56 4.684-.508.774-.791-1.48-.717-.706-1.508 1.923-1.967 3.715-.714 4.373-2.686.325-.974-2.832-1.501-2.057-2.292 2.226-1.3 9.919-2.146 6.268-5.796L13.85.97c-1.123-1.078-2.998-1.09-4.063 0zm10.177 17.475c0 .45 3.314.745 3.314-.106-.472-1.366-2.922-1.274-3.314.106m-14.928 2.39c.784.679 1.997-.169 2.36-1.116-.76-1.01-3.607.037-2.36 1.116m14.512-1.466c-1.011.908.114 1.828 1.111 1.242.222-.225-.006-1.016-1.11-1.242Z'/></g>`,
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
