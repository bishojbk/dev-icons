import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const BehanceIcon = defineComponent({
  name: 'BehanceIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#1769FF' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M16.969 16.927a2.56 2.56 0 0 0 1.901.677 2.5 2.5 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.1 5.1 0 0 1-1.9 2.896 5.3 5.3 0 0 1-3.091.88 5.8 5.8 0 0 1-2.284-.433 4.9 4.9 0 0 1-1.723-1.211 5.7 5.7 0 0 1-1.08-1.874 7 7 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.31 5.31 0 0 1 5.088-3.604 4.9 4.9 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187M6.947 4.084a8 8 0 0 1 1.928.198 4.3 4.3 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.5 3.5 0 0 1-.506 1.961 3.7 3.7 0 0 1-1.503 1.287 3.6 3.6 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.6 4.6 0 0 1-.423 2.032 3.95 3.95 0 0 1-1.163 1.413 5.1 5.1 0 0 1-1.683.807 7 7 0 0 1-1.928.259H0V4.084zm-.235 12.9q.464.006.916-.099a2.2 2.2 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.62 2.62 0 0 0-1.696-.505h-3.54v4.279zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.34 2.34 0 0 0-1.163.259 2.5 2.5 0 0 0-.738.62 2.4 2.4 0 0 0-.396.792q-.111.36-.137.734h4.769a3.24 3.24 0 0 0-.679-1.785zm-13.813-.648a2.25 2.25 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.9 1.9 0 0 0-.178-.891 1.3 1.3 0 0 0-.495-.533 1.85 1.85 0 0 0-.711-.274 4 4 0 0 0-.835-.073H3.241v3.631h3.293zM21.62 5.122h-5.976v1.527h5.976z'/></g>`,
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
