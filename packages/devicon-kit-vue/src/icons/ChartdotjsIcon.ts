import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ChartdotjsIcon = defineComponent({
  name: 'ChartdotjsIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF6384' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 0 1.605 6v12L12 24l10.395-6V6zm0 1.41 9.172 5.295v10.59L12 22.59l-9.172-5.295V6.705zM5.902 8.334c-1.306 0-1.983.956-2.574 2.41v6.262L12 22.014l8.672-5.008v-5.971c-.447-.264-.894-.412-1.336-.412-4.275 0-3.97 4.885-6.717 5.8-2.748.917-3.511-8.089-6.717-8.089m12.364.457c-2.9 0-2.137 4.732-5.342 4.732-1.63 0-2.52-1.317-3.477-1.981.148.326.3.655.442.98.467 1.068.922 2.09 1.379 2.734.228.322.455.541.644.644a.6.6 0 0 0 .549.05c.558-.187.968-.571 1.36-1.112.39-.541.74-1.228 1.154-1.916s.894-1.385 1.59-1.918c.695-.534 1.607-.881 2.77-.881.465 0 .908.136 1.337.352v-.121c-.633-.849-1.348-1.563-2.406-1.563m-6.68.152c-.868 0-1.491.82-2.076 2.06.094.055.192.106.277.167 1.06.761 1.798 1.853 3.137 1.853.678 0 1.067-.218 1.418-.585-.722-1.546-1.432-3.492-2.756-3.495'/></g>`,
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
