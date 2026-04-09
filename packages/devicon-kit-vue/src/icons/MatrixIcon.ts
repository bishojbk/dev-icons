import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const MatrixIcon = defineComponent({
  name: 'MatrixIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#000000' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033a3.3 3.3 0 0 1 1.117-1.024c.433-.245.936-.365 1.5-.365q.81.002 1.481.314c.448.208.785.582 1.02 1.108q.382-.562 1.034-.992.651-.43 1.546-.43.679 0 1.26.167c.388.11.716.286.993.53.276.245.489.559.646.951q.229.587.23 1.417v5.728h-2.349V11.52q0-.43-.032-.812a1.8 1.8 0 0 0-.18-.66 1.1 1.1 0 0 0-.438-.448q-.292-.165-.785-.166-.498 0-.803.189a1.4 1.4 0 0 0-.48.499 2 2 0 0 0-.231.696 6 6 0 0 0-.06.785v4.768h-2.35v-4.8q.002-.38-.018-.752a2.1 2.1 0 0 0-.143-.688 1.05 1.05 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19q-.168 0-.439.074c-.18.051-.36.143-.53.282a1.64 1.64 0 0 0-.439.595q-.18.39-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033a3.3 3.3 0 0 1 1.117-1.024c.433-.245.936-.365 1.5-.365q.81.002 1.481.314c.448.208.785.582 1.02 1.108q.382-.562 1.034-.992.651-.43 1.546-.43.679 0 1.26.167c.388.11.716.286.993.53.276.245.489.559.646.951q.229.587.23 1.417v5.728h-2.349V11.52q0-.43-.032-.812a1.8 1.8 0 0 0-.18-.66 1.1 1.1 0 0 0-.438-.448q-.292-.165-.785-.166-.498 0-.803.189a1.4 1.4 0 0 0-.48.499 2 2 0 0 0-.231.696 6 6 0 0 0-.06.785v4.768h-2.35v-4.8q.002-.38-.018-.752a2.1 2.1 0 0 0-.143-.688 1.05 1.05 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19q-.168 0-.439.074c-.18.051-.36.143-.53.282a1.64 1.64 0 0 0-.439.595q-.18.39-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z'/></g>`,
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
