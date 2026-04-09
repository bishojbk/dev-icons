import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const ChromaticIcon = defineComponent({
  name: 'ChromaticIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#FC521F' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0m-.006 3.43a3.37 3.37 0 0 1 3.37 3.369v2.199L9.628 5.689a4.3 4.3 0 0 0-.688-.32 3.35 3.35 0 0 1 3.053-1.94zm-4.498 2.6c.588 0 1.17.156 1.684.452l5.734 3.311-2.91 1.678-3.6-2.076a.46.46 0 0 0-.459 0L5.35 10.893a4 4 0 0 0-.621.433 3.35 3.35 0 0 1-.155-3.61A3.39 3.39 0 0 1 7.496 6.03m8.723.015a3.38 3.38 0 0 1 3.205 1.672 3.37 3.37 0 0 1-1.235 4.6l-5.736 3.308v-3.357l3.602-2.077a.46.46 0 0 0 .228-.398V6.799a4.4 4.4 0 0 0-.064-.754m-8.504 4.543v6.617q0 .38.066.754a3 3 0 0 1-.285.012 3.38 3.38 0 0 1-2.92-1.684 3.34 3.34 0 0 1-.338-2.555 3.34 3.34 0 0 1 1.57-2.044zm.908 0 2.912 1.68v4.152a.46.46 0 0 0 .23.396l2.594 1.498h.002q.33.191.688.32a3.35 3.35 0 0 1-3.055 1.938 3.373 3.373 0 0 1-3.371-3.367zm10.647 2.088a3.35 3.35 0 0 1 .154 3.611 3.37 3.37 0 0 1-4.604 1.233l-1.908-1.1 5.738-3.309a4.3 4.3 0 0 0 .62-.435'/></g>`,
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
