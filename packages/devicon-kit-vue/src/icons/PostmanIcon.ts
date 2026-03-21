import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const PostmanIcon = defineComponent({
  name: 'PostmanIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FF6C37' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099m2.471 7.485a.86.86 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753m-4.863 4.861 4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125zm.33.694-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645zm-2.803-.459 1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.07.07 0 0 1 .013-.093m-3.646 6.058a.076.076 0 0 1-.069-.083.1.1 0 0 1 .022-.046h.002l.946-.946 1.222 1.222zm2.425-1.256a.23.23 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268m5.279-3.428h-.002l-.839-.839 4.699-4.125a1 1 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091m3.657-6.46-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.12.12 0 0 0 0 .169l1.247 1.247a1.82 1.82 0 0 1-2.093-.343m2.578 0a1.7 1.7 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522m-.1-1.544a.14.14 0 0 0-.053.157.42.42 0 0 1-.053.45.14.14 0 0 0 .023.197.14.14 0 0 0 .084.03.14.14 0 0 0 .106-.05.69.69 0 0 0 .087-.751.14.14 0 0 0-.194-.033'/></g>`,
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
