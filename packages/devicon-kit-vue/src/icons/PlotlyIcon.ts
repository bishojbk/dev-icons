import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const PlotlyIcon = defineComponent({
  name: 'PlotlyIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#7A76FF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M1.713.002A1.713 1.713 0 0 0 0 1.715a1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.714-1.713A1.713 1.713 0 0 0 1.713.002m6.861 0a1.713 1.713 0 0 0-1.713 1.713 1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.713-1.713A1.713 1.713 0 0 0 8.574.002m6.857 0a1.713 1.713 0 0 0-1.714 1.713 1.713 1.713 0 0 0 1.714 1.713 1.713 1.713 0 0 0 1.713-1.713A1.713 1.713 0 0 0 15.431.002m6.856 0a1.713 1.713 0 0 0-1.713 1.713 1.713 1.713 0 0 0 1.713 1.713A1.713 1.713 0 0 0 24 1.715 1.713 1.713 0 0 0 22.287.002M1.713 6.859A1.713 1.713 0 0 0 0 8.572a1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.714-1.713A1.713 1.713 0 0 0 1.713 6.86Zm6.861 0a1.71 1.71 0 0 0-1.713 1.713v13.713c0 .947.765 1.713 1.713 1.713s1.713-.766 1.713-1.713V8.572a1.71 1.71 0 0 0-1.713-1.713m6.857 0a1.713 1.713 0 0 0-1.714 1.713 1.713 1.713 0 0 0 1.714 1.713 1.713 1.713 0 0 0 1.713-1.713 1.713 1.713 0 0 0-1.713-1.713m6.856 0c-.947 0-1.713.765-1.713 1.713v13.713c0 .947.766 1.713 1.713 1.713S24 23.232 24 22.285V8.572a1.71 1.71 0 0 0-1.713-1.713M1.713 13.715C.766 13.715 0 14.48 0 15.428v6.857a1.713 1.713 0 1 0 3.427 0v-6.857c0-.948-.766-1.713-1.714-1.713m13.718 0c-.948 0-1.714.765-1.714 1.713v6.857c0 .947.766 1.713 1.714 1.713.947 0 1.713-.766 1.713-1.713v-6.857c0-.948-.766-1.713-1.713-1.713'/></g>`,
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
