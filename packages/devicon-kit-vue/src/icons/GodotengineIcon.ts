import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GodotengineIcon = defineComponent({
  name: 'GodotengineIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#478CBF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M9.56.683c-1.096.244-2.181.583-3.199 1.095.023.898.081 1.758.2 2.632-.396.253-.81.47-1.179.766-.375.288-.758.564-1.097.902A21 21 0 0 0 2.15 4.836C1.353 5.693.608 6.62 0 7.655c.458.74.936 1.435 1.452 2.094h.014v6.356q.018 0 .035.003l3.896.376a.42.42 0 0 1 .378.39l.12 1.72 3.4.241.234-1.587a.42.42 0 0 1 .415-.358h4.111c.208 0 .385.152.415.358l.234 1.587 3.4-.242.12-1.72a.42.42 0 0 1 .377-.389l3.896-.376.035-.003v-.507h.002V9.75h.014c.516-.66.994-1.353 1.452-2.094-.608-1.036-1.354-1.961-2.151-2.82-.74.372-1.457.793-2.135 1.242-.34-.337-.721-.613-1.096-.901-.37-.296-.785-.514-1.179-.767.117-.874.175-1.734.2-2.632-1.018-.512-2.102-.85-3.199-1.095a23 23 0 0 0-1.187 2.312 8 8 0 0 0-1.246-.099h-.016c-.417.005-.832.03-1.246.1A23 23 0 0 0 9.557.682zM6.476 9.989a2.349 2.349 0 1 1 .001 4.697 2.349 2.349 0 0 1 0-4.697m11.05 0a2.349 2.349 0 1 1-.001 4.697 2.349 2.349 0 0 1 0-4.697m-10.824.93a1.559 1.559 0 1 0 0 3.118 1.559 1.559 0 0 0 0-3.118m10.598 0a1.558 1.558 0 1 0 0 3.116 1.558 1.558 0 0 0 0-3.116m-5.3.453c.417 0 .757.308.757.687v2.162c0 .38-.339.687-.757.687s-.756-.308-.756-.687V12.06c0-.379.339-.687.756-.687M1.46 16.947c.001.377.005.79.005.871 0 3.702 4.695 5.48 10.527 5.5h.014c5.833-.02 10.526-1.798 10.526-5.5 0-.084.005-.495.007-.87l-3.502.338-.121 1.729a.42.42 0 0 1-.39.39l-4.18.296a.42.42 0 0 1-.416-.358l-.238-1.614h-3.386l-.238 1.614a.42.42 0 0 1-.445.357l-4.151-.296a.42.42 0 0 1-.39-.39l-.12-1.729-3.504-.337z'/></g>`,
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
