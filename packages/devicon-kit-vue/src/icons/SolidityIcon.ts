import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const SolidityIcon = defineComponent({
  name: 'SolidityIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#363636' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M4.409 6.608 7.981.255l3.572 6.353zM8.411 0l3.569 6.348L15.552 0zm4.036 17.392 3.572 6.354 3.575-6.354zm-.608-10.284h-7.43l3.715 6.605zm.428-.25h7.428L15.982.255zM15.589 24l-3.569-6.349L8.448 24zm-3.856-6.858H4.306l3.712 6.603zm.428-.25h7.433l-3.718-6.605z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M4.409 6.608 7.981.255l3.572 6.353zM8.411 0l3.569 6.348L15.552 0zm4.036 17.392 3.572 6.354 3.575-6.354zm-.608-10.284h-7.43l3.715 6.605zm.428-.25h7.428L15.982.255zM15.589 24l-3.569-6.349L8.448 24zm-3.856-6.858H4.306l3.712 6.603zm.428-.25h7.433l-3.718-6.605z'/></g>`,
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
