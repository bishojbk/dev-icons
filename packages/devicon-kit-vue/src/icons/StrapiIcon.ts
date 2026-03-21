import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const StrapiIcon = defineComponent({
  name: 'StrapiIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#4945FF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M8.32 0c-3.922 0-5.882 0-7.1 1.219C0 2.438 0 4.399 0 8.32v7.36c0 3.922 0 5.882 1.219 7.101S4.399 24 8.32 24h7.36c3.922 0 5.882 0 7.101-1.219S24 19.601 24 15.68V8.32c0-3.922 0-5.882-1.219-7.101S19.601 0 15.68 0zm.41 7.28h7.83a.16.16 0 0 1 .16.16v7.83h-3.87v-3.71a.41.41 0 0 0-.313-.398l-.086-.012h-3.72zm-.5.25v3.87H4.553a.08.08 0 0 1-.057-.136L8.23 7.529zm.25 4.12h3.87v3.87H8.64a.16.16 0 0 1-.16-.16zm4.12 4.12h3.87l-3.734 3.734a.08.08 0 0 1-.136-.057z'/></g>`,
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
