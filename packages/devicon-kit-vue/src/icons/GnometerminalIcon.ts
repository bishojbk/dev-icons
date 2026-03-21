import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GnometerminalIcon = defineComponent({
  name: 'GnometerminalIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#241F31' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M1.846 0A1.84 1.84 0 0 0 0 1.846v18.463c0 1.022.823 1.845 1.846 1.845h20.308A1.84 1.84 0 0 0 24 20.31V1.846A1.84 1.84 0 0 0 22.154 0zm0 .924h20.308c.512 0 .922.41.922.922v18.463c0 .511-.41.921-.922.921H1.846a.92.92 0 0 1-.922-.921V1.846c0-.512.41-.922.922-.922m0 .922v18.463h20.308V1.846zm1.845 2.14 3.235 1.758v.836L3.69 8.477V7.385l2.243-1.207v-.033L3.69 5.076zM7.846 9.23h3.693v.924H7.846zM0 21.736v.418C0 23.177.823 24 1.846 24h20.308A1.84 1.84 0 0 0 24 22.154v-.418a2.33 2.33 0 0 1-1.846.918H1.846A2.33 2.33 0 0 1 0 21.736'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M1.846 0A1.84 1.84 0 0 0 0 1.846v18.463c0 1.022.823 1.845 1.846 1.845h20.308A1.84 1.84 0 0 0 24 20.31V1.846A1.84 1.84 0 0 0 22.154 0zm0 .924h20.308c.512 0 .922.41.922.922v18.463c0 .511-.41.921-.922.921H1.846a.92.92 0 0 1-.922-.921V1.846c0-.512.41-.922.922-.922m0 .922v18.463h20.308V1.846zm1.845 2.14 3.235 1.758v.836L3.69 8.477V7.385l2.243-1.207v-.033L3.69 5.076zM7.846 9.23h3.693v.924H7.846zM0 21.736v.418C0 23.177.823 24 1.846 24h20.308A1.84 1.84 0 0 0 24 22.154v-.418a2.33 2.33 0 0 1-1.846.918H1.846A2.33 2.33 0 0 1 0 21.736'/></g>`,
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
