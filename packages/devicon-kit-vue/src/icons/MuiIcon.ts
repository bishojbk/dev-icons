import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const MuiIcon = defineComponent({
  name: 'MuiIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#007FFF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M20.229 15.793a.7.7 0 0 0 .244-.243.7.7 0 0 0 .09-.333l.012-3.858a.7.7 0 0 1 .09-.333.7.7 0 0 1 .245-.243L23 9.58a.7.7 0 0 1 .333-.088.7.7 0 0 1 .333.09.7.7 0 0 1 .244.243.7.7 0 0 1 .089.333v7.014a.67.67 0 0 1-.335.578l-7.893 4.534a.67.67 0 0 1-.662 0l-6.194-3.542a.67.67 0 0 1-.246-.244.67.67 0 0 1-.09-.335v-3.537q.001-.007.008-.004.01.003.008-.005v-.004q0-.004.004-.007l5.102-2.93c.004-.003.002-.01-.003-.01l-.004-.002-.001-.004.01-3.467a.67.67 0 0 0-.333-.58.67.67 0 0 0-.667 0L8.912 9.799a.67.67 0 0 1-.665 0l-3.804-2.19a.667.667 0 0 0-.999.577v6.267a.67.67 0 0 1-.332.577.7.7 0 0 1-.332.09.7.7 0 0 1-.333-.088L.336 13.825a.67.67 0 0 1-.246-.244.67.67 0 0 1-.09-.336L.019 2.292a.667.667 0 0 1 .998-.577l7.23 4.153a.67.67 0 0 0 .665 0l7.228-4.153a.7.7 0 0 1 .333-.088.7.7 0 0 1 .333.09.7.7 0 0 1 .244.244.7.7 0 0 1 .088.333V13.25c0 .117-.03.232-.089.334a.67.67 0 0 1-.245.244l-3.785 2.18a.67.67 0 0 0-.245.245.67.67 0 0 0-.089.334.67.67 0 0 0 .09.334.67.67 0 0 0 .247.244l2.088 1.189a.7.7 0 0 0 .33.087.7.7 0 0 0 .332-.089zm.438-9.828a.67.67 0 0 0 .09.335.67.67 0 0 0 .248.244.67.67 0 0 0 .67-.008l2.001-1.2a.7.7 0 0 0 .237-.243.7.7 0 0 0 .087-.329V2.32a.67.67 0 0 0-.091-.335.67.67 0 0 0-.584-.33.67.67 0 0 0-.334.094l-2 1.2a.7.7 0 0 0-.238.243.7.7 0 0 0-.086.329z'/></g>`,
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
