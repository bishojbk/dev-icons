import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const NumpyIcon = defineComponent({
  name: 'NumpyIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#013243' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='m10.315 4.876-4.01-2.024-4.401 2.196 4.118 2.068zm1.838.928 4.205 2.122-4.363 2.19-4.125-2.07zm5.615-2.922 4.32 2.166-3.863 1.94-4.213-2.125zM15.91 1.95 12.021 0 8.174 1.92l4.007 2.02zm-3.04 16.744V24l4.711-2.35-.005-5.31zm4.704-4.206-.005-5.253-4.699 2.336v5.254zm5.655-.984v5.327l-4.018 2.005-.002-5.303zm0-1.863v-5.22l-4.025 2.001.003 5.264zm-12.022-.07L8.033 9.976v6.895s-3.88-8.257-4.24-8.998c-.046-.096-.237-.201-.285-.227A358 358 0 0 0 .773 6.25v12.18l2.82 1.508V13.57s3.84 7.378 3.878 7.458c.04.08.425.858.837 1.132.548.363 2.899 1.776 2.899 1.776z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='m10.315 4.876-4.01-2.024-4.401 2.196 4.118 2.068zm1.838.928 4.205 2.122-4.363 2.19-4.125-2.07zm5.615-2.922 4.32 2.166-3.863 1.94-4.213-2.125zM15.91 1.95 12.021 0 8.174 1.92l4.007 2.02zm-3.04 16.744V24l4.711-2.35-.005-5.31zm4.704-4.206-.005-5.253-4.699 2.336v5.254zm5.655-.984v5.327l-4.018 2.005-.002-5.303zm0-1.863v-5.22l-4.025 2.001.003 5.264zm-12.022-.07L8.033 9.976v6.895s-3.88-8.257-4.24-8.998c-.046-.096-.237-.201-.285-.227A358 358 0 0 0 .773 6.25v12.18l2.82 1.508V13.57s3.84 7.378 3.878 7.458c.04.08.425.858.837 1.132.548.363 2.899 1.776 2.899 1.776z'/></g>`,
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
