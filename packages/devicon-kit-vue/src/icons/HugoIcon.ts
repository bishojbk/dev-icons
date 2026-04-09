import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const HugoIcon = defineComponent({
  name: 'HugoIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF4088' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M11.754 0a4 4 0 0 0-2.049.596L3.33 4.532a4.25 4.25 0 0 0-2.017 3.615v8.03a4.13 4.13 0 0 0 2.067 3.574l6.486 3.733a3.88 3.88 0 0 0 3.835.018l7.043-3.966a3.82 3.82 0 0 0 1.943-3.323V7.752a3.57 3.57 0 0 0-1.774-3.084L13.817.541a4 4 0 0 0-2.063-.54zm.022 1.674c.413-.006.828.1 1.2.315l7.095 4.127c.584.34.941.96.94 1.635v8.462c0 .774-.414 1.484-1.089 1.864l-7.042 3.966a2.2 2.2 0 0 1-2.179-.01l-6.485-3.734a2.45 2.45 0 0 1-1.228-2.123v-8.03c0-.893.461-1.72 1.221-2.19l6.376-3.935a2.3 2.3 0 0 1 1.19-.347zm-4.7 3.844V18.37h2.69v-5.62h4.46v5.62h2.696V5.518h-2.696v4.681h-4.46V5.518Z'/></g>`,
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
