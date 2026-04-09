import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const EmbyIcon = defineComponent({
  name: 'EmbyIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#52B54B' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.041 0c-.007 0-1.456 1.43-3.219 3.176L4.615 6.352l.512.513.512.512-2.819 2.791L0 12.961l1.83 1.848 3.182 3.209 1.351 1.359.508-.496c.28-.273.515-.498.524-.498.008 0 1.266 1.264 2.794 2.808L12.97 24l.187-.182c.23-.225 5.007-4.95 5.717-5.656l.52-.516-.502-.513c-.276-.282-.5-.52-.496-.53.003-.009 1.264-1.26 2.802-2.783s2.8-2.776 2.803-2.785c.005-.012-3.617-3.684-6.107-6.193L17.65 4.6l-.505.505c-.279.278-.517.501-.53.497s-1.27-1.267-2.793-2.805A450 450 0 0 0 11.041 0M9.223 7.367c.091.038 7.951 4.608 7.957 4.627.003.013-1.781 1.056-3.965 2.32a1000 1000 0 0 1-3.996 2.307c-.019.006-.026-1.266-.026-4.629 0-3.7.007-4.634.03-4.625'/></g>`,
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
