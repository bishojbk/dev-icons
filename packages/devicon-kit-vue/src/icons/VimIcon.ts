import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const VimIcon = defineComponent({
  name: 'VimIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#019733' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M24 11.986h-.027l-4.318-4.318 4.303-4.414V1.461l-.649-.648h-8.198l-.66.605v1.045L12.015.027V0L12 .014 11.986 0v.027l-1.29 1.291-.538-.539H2.035l-.638.692v1.885l.616.616h.72v5.31L.027 11.987H0L.014 12 0 12.014h.027l2.706 2.706v6.467l.907.523h2.322l1.857-1.904 4.166 4.166V24l.015-.014.014.014v-.028l2.51-2.509h.485c.111 0 .211-.07.25-.179l.146-.426a.26.26 0 0 0-.037-.239l1.462-1.462-.612 1.962a.265.265 0 0 0 .255.344h1.824a.27.27 0 0 0 .243-.163l.165-.394a.27.27 0 0 0-.247-.365h-.075l.84-2.644h1.232l-1.016 3.221a.266.266 0 0 0 .255.344h2.002c.11 0 .207-.066.248-.17l.164-.428a.266.266 0 0 0-.249-.358h-.145l1.131-3.673a.26.26 0 0 0-.039-.24l-.375-.504-.003-.005a.27.27 0 0 0-.209-.102h-1.436a.27.27 0 0 0-.19.081l-.4.439h-.624l-.042-.046 4.445-4.445H24L23.986 12zM9.838 21.139l1.579-4.509h-.501l.297-.304h1.659l-1.563 4.555h.623l-.079.258zm3.695-7.516.15.151-.269.922-.225.226h-.969l-.181-.181.311-.871.288-.247zM5.59 20.829H3.877l-.262-.15V3.091H2.379l-.1-.1V1.815l.143-.154h7.371l.213.214v1.108l-.142.173H8.785v8.688l8.807-8.688h-2.086l-.175-.188V1.805l.121-.111h7.49l.132.133v1.07L12.979 13.25h-.373q-.022-.001-.042.001l-.02.003a.26.26 0 0 0-.119.06l-.343.295-.004.003a.3.3 0 0 0-.073.111l-.296.83zm14.768-3.952.474-.519h1.334l.309.415-1.265 4.107h.493l-.08.209H19.84l1.124-3.564h-2.015l-1.077 3.391h.424l-.073.174h-1.605l1.107-3.548h-2.096l-1.062 3.339h.436l-.072.209H13.27l1.514-4.46h-.586l.091-.271h1.65l.519.537h.906l.491-.554h1.061l.489.535z'/></g>`,
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
