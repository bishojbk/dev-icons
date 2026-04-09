import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const KritaIcon = defineComponent({
  name: 'KritaIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#3BABFF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M.652.76a.63.63 0 0 0-.5.246c-.352.448-.035.898.362 1.262.206.189 1.77 1.794 3.428 3.527a11 11 0 0 1 1.815-1.983C3.667 2.515 1.694 1.266 1.461 1.1 1.201.914.917.762.652.76m5.105 3.052c1.848 1.148 3.786 2.332 4.693 2.84 1.469.821 3.758 2.684 4.092 4.434.535.466 2.182 1.916 2.596 2.413.698-.211 1.518.133 2.06 1.12.866 1.583.227 3.747-1.968 4.988a5 5 0 0 1-.296.267l.296-.267c1.14-1.468-.714-2.44-1.175-3.864a2.1 2.1 0 0 1-.11-.78c-.533-.282-2.11-1.452-2.795-1.965-1.801.16-4.207-1.773-5.35-3.08-.7-.802-2.32-2.517-3.858-4.123a11.05 11.05 0 0 0-2.046 6.393A11.052 11.052 0 1 0 12.948 1.136c-2.64.004-5.19.954-7.19 2.676zm8.71 7.552c-.515.126-.968.831-1.118 1.306-.038.115-.04.303.066.342.802.592 1.556 1.168 2.4 1.7.162-.393.746-.963 1.096-1.2zm-11.53 1.639c.812 1.898 5.798 7.17 12.06 2.695a2.1 2.1 0 0 0 .114.715c.46 1.42 2.36 2.427 1.238 3.89-2.135 1.364-5 1.201-6.989.528-3.558-1.204-5.914-4.332-6.424-7.828zm13.782.7-.065.049q-.006.006-.011.008.005-.006.01-.008c.024-.015.044-.034.066-.048z'/></g>`,
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
