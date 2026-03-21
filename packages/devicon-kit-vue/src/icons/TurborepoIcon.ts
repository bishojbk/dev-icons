import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const TurborepoIcon = defineComponent({
  name: 'TurborepoIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF1E56' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.99 4.196c-4.3 0-7.797 3.5-7.797 7.804s3.498 7.804 7.798 7.804 7.798-3.5 7.798-7.804-3.498-7.804-7.798-7.804m0 11.843A4.037 4.037 0 0 1 7.955 12a4.037 4.037 0 1 1 8.071 0 4.037 4.037 0 0 1-4.035 4.039m.653-13.125V0C18.973.339 24 5.582 24 12s-5.027 11.66-11.356 12v-2.914c4.717-.337 8.452-4.281 8.452-9.086s-3.735-8.749-8.452-9.086M5.113 17.959a9.08 9.08 0 0 1-2.2-5.305H0a11.97 11.97 0 0 0 3.051 7.367l2.06-2.062zM11.337 24v-2.914a9.05 9.05 0 0 1-5.302-2.202l-2.06 2.063A11.95 11.95 0 0 0 11.335 24z'/></g>`,
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
