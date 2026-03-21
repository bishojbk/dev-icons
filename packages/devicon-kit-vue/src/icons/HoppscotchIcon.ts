import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const HoppscotchIcon = defineComponent({
  name: 'HoppscotchIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#09090B' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M15.632 4.746a8.89 8.89 0 0 1 5.29 7.938c1.867 1.47 3.723 3.527 2.86 5.465-.968 2.174-4.415 2.085-8.334.985A7.113 7.113 0 0 1 5.063 14.51C1.623 12.334-.75 9.832.218 7.658c.863-1.939 3.634-1.936 5.975-1.532a8.89 8.89 0 0 1 9.439-1.38M1.862 8.39c-.47 1.056 2.056 4.054 8.972 7.133 6.916 3.08 10.834 2.95 11.304 1.894.39-.874-1.212-2.554-3.046-3.856-1.426-1.02-3.38-2.143-5.929-3.278-.694-.309-.964-1.133-.673-1.788.292-.655.933-1.093 2.282-1.156.635-.002.718-.178.747-.329.036-.233-.287-.47-.62-.618-2.647-1.179-5.888-.685-8.134 1.68-2.195-.491-4.514-.556-4.903.318m11.083 5.666c-.24.54-.98.735-1.651.436s-1.02-.979-.78-1.518c.24-.54.979-.735 1.65-.436s1.021.979.78 1.518zm4.02 2.327c.703.202 1.404-.093 1.566-.658.162-.564-.276-1.186-.98-1.387-.702-.202-1.403.093-1.565.658-.162.564.276 1.186.98 1.387zM7.218 9.737c.62.388.87 1.106.559 1.604s-1.066.588-1.686.2-.87-1.105-.56-1.604c.312-.498 1.067-.588 1.687-.2'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M15.632 4.746a8.89 8.89 0 0 1 5.29 7.938c1.867 1.47 3.723 3.527 2.86 5.465-.968 2.174-4.415 2.085-8.334.985A7.113 7.113 0 0 1 5.063 14.51C1.623 12.334-.75 9.832.218 7.658c.863-1.939 3.634-1.936 5.975-1.532a8.89 8.89 0 0 1 9.439-1.38M1.862 8.39c-.47 1.056 2.056 4.054 8.972 7.133 6.916 3.08 10.834 2.95 11.304 1.894.39-.874-1.212-2.554-3.046-3.856-1.426-1.02-3.38-2.143-5.929-3.278-.694-.309-.964-1.133-.673-1.788.292-.655.933-1.093 2.282-1.156.635-.002.718-.178.747-.329.036-.233-.287-.47-.62-.618-2.647-1.179-5.888-.685-8.134 1.68-2.195-.491-4.514-.556-4.903.318m11.083 5.666c-.24.54-.98.735-1.651.436s-1.02-.979-.78-1.518c.24-.54.979-.735 1.65-.436s1.021.979.78 1.518zm4.02 2.327c.703.202 1.404-.093 1.566-.658.162-.564-.276-1.186-.98-1.387-.702-.202-1.403.093-1.565.658-.162.564.276 1.186.98 1.387zM7.218 9.737c.62.388.87 1.106.559 1.604s-1.066.588-1.686.2-.87-1.105-.56-1.604c.312-.498 1.067-.588 1.687-.2'/></g>`,
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
