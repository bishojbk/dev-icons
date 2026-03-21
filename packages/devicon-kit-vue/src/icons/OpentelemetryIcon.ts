import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const OpentelemetryIcon = defineComponent({
  name: 'OpentelemetryIcon',
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
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M12.697 13.117A2.618 2.618 0 1 0 16.4 16.82a2.618 2.618 0 0 0-3.703-3.703m2.768 2.77a1.296 1.296 0 1 1-1.833-1.832 1.296 1.296 0 0 1 1.833 1.832M16.356.236 14.752 1.84a.81.81 0 0 0 0 1.144l6.263 6.263a.81.81 0 0 0 1.144 0l1.604-1.604a.81.81 0 0 0 0-1.144L17.498.235a.81.81 0 0 0-1.142 0M5.117 20.734a.733.733 0 0 0 0-1.034l-.815-.816a.733.733 0 0 0-1.035 0l-1.684 1.685-.003.002-.462-.463a.654.654 0 1 0-.925.925l2.775 2.775a.654.654 0 1 0 .925-.925l-.463-.462.003-.002zm8.486-15.893-3.564 3.564a.82.82 0 0 0 0 1.154l2.2 2.2a3.98 3.98 0 0 1 5.137.419l1.782-1.782a.82.82 0 0 0 0-1.154l-4.401-4.4a.815.815 0 0 0-1.154 0m-2.288 7.846-1.3-1.3a.786.786 0 0 0-1.108 0l-4.583 4.586a.786.786 0 0 0 0 1.107l2.597 2.598a.786.786 0 0 0 1.108 0l2.947-2.953a3.99 3.99 0 0 1 .339-4.038'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M12.697 13.117A2.618 2.618 0 1 0 16.4 16.82a2.618 2.618 0 0 0-3.703-3.703m2.768 2.77a1.296 1.296 0 1 1-1.833-1.832 1.296 1.296 0 0 1 1.833 1.832M16.356.236 14.752 1.84a.81.81 0 0 0 0 1.144l6.263 6.263a.81.81 0 0 0 1.144 0l1.604-1.604a.81.81 0 0 0 0-1.144L17.498.235a.81.81 0 0 0-1.142 0M5.117 20.734a.733.733 0 0 0 0-1.034l-.815-.816a.733.733 0 0 0-1.035 0l-1.684 1.685-.003.002-.462-.463a.654.654 0 1 0-.925.925l2.775 2.775a.654.654 0 1 0 .925-.925l-.463-.462.003-.002zm8.486-15.893-3.564 3.564a.82.82 0 0 0 0 1.154l2.2 2.2a3.98 3.98 0 0 1 5.137.419l1.782-1.782a.82.82 0 0 0 0-1.154l-4.401-4.4a.815.815 0 0 0-1.154 0m-2.288 7.846-1.3-1.3a.786.786 0 0 0-1.108 0l-4.583 4.586a.786.786 0 0 0 0 1.107l2.597 2.598a.786.786 0 0 0 1.108 0l2.947-2.953a3.99 3.99 0 0 1 .339-4.038'/></g>`,
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
