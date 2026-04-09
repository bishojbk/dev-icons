import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const CiliumIcon = defineComponent({
  name: 'CiliumIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#F8C517' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M13.607 14.583h-3.215l-1.626-2.764 1.626-2.802h3.215l1.626 2.802zM14.186 8H9.799l-2.2 3.813 2.2 3.787h4.387l2.213-3.787zm-4.387 8.4-2.2 3.813L9.799 24h4.387l2.213-3.787-2.213-3.813zm-1.034 3.819 1.627-2.802h3.215l1.626 2.802-1.626 2.765h-3.215zM9.799 0l-2.2 3.813 2.2 3.787h4.387l2.213-3.787L14.186 0zM8.765 3.819l1.627-2.802h3.215l1.626 2.802-1.626 2.764h-3.215zm8.234 8.581-2.2 3.813 2.2 3.787h4.388l2.213-3.787-2.213-3.813zm-1.034 3.819 1.627-2.802h3.215l1.626 2.802-1.626 2.765h-3.215zM16.999 4l-2.2 3.813 2.2 3.787h4.388L23.6 7.813 21.387 4zm-1.034 3.819 1.627-2.802h3.215l1.626 2.802-1.626 2.764h-3.215zM2.599 12.4l-2.2 3.813L2.599 20h4.387l2.213-3.787L6.986 12.4zm-1.034 3.819 1.627-2.802h3.214l1.627 2.802-1.627 2.765H3.192zM2.599 4l-2.2 3.813 2.2 3.787h4.387l2.213-3.787L6.986 4zM1.565 7.819l1.627-2.802h3.214l1.627 2.802-1.627 2.764H3.192z'/></g>`,
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
