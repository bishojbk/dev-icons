import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const GunicornIcon = defineComponent({
  name: 'GunicornIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#499848' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M10.145 20.014c-.266-.085-.267-.122-.022-.865.244-.743.132-1.432-.32-1.974-.617-.737-.914-1.366-1.009-2.135-.08-.66-.107-.713-.376-.764-.18-.035-.43.034-1.023.281-.864.36-1.07.52-1.273.98-.108.242-.12.387-.06.667.075.342.378.892.494.893.03 0 .196.114.368.252.287.23.307.27.225.458-.176.408-.595.902-.764.902-.095 0-.482-.272-.91-.637-.836-.717-.872-.79-.96-1.965-.1-1.403.244-2.058 1.78-3.375l.964-.827.062-.5c.063-.518-.026-1.748-.177-2.427-.09-.4-.382-.783-.66-.86-.303-.084-.48.09-.712.694-.25.654-.486.882-.92.882-.27 0-.52-.173-.694-.477C4.033 9 3.96 7.691 4.035 7.002c.036-.33.038-.666.005-.745-.054-.128-.52-.405-1.62-.962a4 4 0 0 1-.518-.303 3 3 0 0 0-.49-.267C.994 4.54-.095 3.903.007 3.903c.193 0 1.01.252 1.446.445.266.118.52.215.565.215s.558.165 1.14.366c.58.202 1.111.367 1.18.367.16 0 .185-.14.134-.746-.024-.275-.023-.5.002-.5s.132.053.238.118c.324.198 1.02.32 1.84.32.783.002 1.806.157 2.196.335.56.254 1.211 1.05 2.036 2.49.574 1.002 1.19 1.426 2.073 1.427.357 0 1.31-.147 2.6-.4 1.063-.21 2.467-.259 3.012-.103.665.19 1.545.7 2.27 1.314.68.576.786.704 1.204 1.468.5.912 1.05 2.207 1.54 3.622.07.202.216.54.326.753.294.568.28.603-.255.603-.58 0-.853-.092-1.233-.415-.365-.31-.46-.5-1.032-2.05-.292-.796-.577-1.273-.76-1.273-.124 0-.376.852-.376 1.273 0 .3.187.702.67 1.447.788 1.21 1.202 2.922 1.036 4.28l-.07.586-.526.022c-.825.034-.817.046-.817-1.135 0-1.257-.085-1.529-.64-2.035-.23-.21-.748-.81-1.149-1.33-.402-.52-.786-.946-.854-.946-.158 0-.236.428-.244 1.332-.006.595-.03.696-.205.88-.476.497-.81 1.403-1.016 2.754-.046.3-.085.355-.279.398-.285.064-1.075.075-1.143.015-.059-.05.044-.863.278-2.19.088-.504.185-1.18.214-1.503.053-.574-.065-1.65-.204-1.867-.058-.09-.353-.11-1.732-.116-.915-.003-1.918-.033-2.23-.066l-.565-.06v.25c0 .27.07.506.53 1.822.162.464.397 1.17.523 1.57l.227.728-.192.592a6 6 0 0 1-.348.867c-.152.266-.17.274-.595.27a3 3 0 0 1-.677-.083'/></g>`,
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
