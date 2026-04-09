import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const PagespeedinsightsIcon = defineComponent({
  name: 'PagespeedinsightsIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#4285F4' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M22.363 1.636H1.635C.732 1.636 0 2.37.001 3.273L0 20.727v.003c0 .903.733 1.634 1.635 1.634h20.73c.904 0 1.635-.734 1.635-1.637V3.273c.016-.89-.76-1.64-1.637-1.637M3.979 2.886c.492-.507 1.279.28.77.772-.491.508-1.278-.279-.77-.771zM1.8 2.89c.507-.509 1.28.265.772.771-.493.502-1.274-.28-.772-.771m21.7 17.838c.012.611-.524 1.148-1.137 1.136H1.635A1.137 1.137 0 0 1 .5 20.727L.501 4.91H23.5zM11 16.159l5.946-4.577c.235-.2.576.129.389.372l-.002-.002-3.936 6.35a1.638 1.638 0 0 1-2.448.405c-.785-.668-.811-1.835.05-2.548zm4.763-.75c.09-.168 2.002-3.181 2.06-3.35 2.056 1.813 3.029 4.382 2.898 7.026h-3.819c.073-1.39-.29-2.678-1.139-3.676m-8.679 3.682H3.278c-.357-7.022 7.148-11.735 13.39-7.92l-3.461 2.618c-3.3-.762-6.364 1.71-6.123 5.302'/></g>`,
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
