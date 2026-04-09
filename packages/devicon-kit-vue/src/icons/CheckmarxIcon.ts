import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const CheckmarxIcon = defineComponent({
  name: 'CheckmarxIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#54B848' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M6.544.12A6.553 6.553 0 0 0 0 6.664v10.674a6.55 6.55 0 0 0 6.544 6.542h10.912A6.55 6.55 0 0 0 24 17.338v-.831a2.193 2.193 0 0 0-4.388 0v.83c0 1.19-.967 2.157-2.156 2.157H6.544a2.16 2.16 0 0 1-2.158-2.156V6.748c0-1.19.969-2.16 2.158-2.16 3.843.004 7.814-.009 11.612.001.556.138.892.445 1.058.848.193.47.343 1.118-.404 1.748l-6.26 4.596-1.892-2.441a2.19 2.19 0 0 0-3.075-.391 2.19 2.19 0 0 0-.391 3.076l3.198 4.133a2.197 2.197 0 0 0 3.035.424l7.252-5.301a57 57 0 0 0 1.22-.977c2.106-1.926 2.517-4.393 1.627-6.553C22.603 1.51 20.268.12 17.435.12Z'/></g>`,
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
