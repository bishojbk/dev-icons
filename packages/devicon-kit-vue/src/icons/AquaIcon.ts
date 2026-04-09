import { defineComponent, h, computed } from 'vue';
import type { DevIconProps } from '../lib/types';
import { SIZE_MAP } from '../lib/types';

export const AquaIcon = defineComponent({
  name: 'AquaIcon',
  props: {
    size: { type: [Number, String], default: 'md' },
    color: { type: String, default: '#1904DA' },
    variant: { type: String, default: 'default' },
    animate: { type: String, default: 'none' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const resolvedSize = computed(() =>
      typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size as string] ?? 24)
    );

    const variants: Record<string, string> = {
      default: `<g fill='currentColor' transform='translate(8, 8) scale(4.667)'><path d='M17.788 18.681c.768 0 .769.71.769.752 0 .289-.105.43-.223.553L14.728 23.6a1.35 1.35 0 0 1-.957.401H.879a.8.8 0 0 1-.424-.123.96.96 0 0 1-.455-.804v-4.392zM23.063.001c.32-.006.65.188.802.45A.83.83 0 0 1 24 .876v12.882c0 .36-.14.705-.395.96L20.06 18.27c-.137.137-.274.274-.603.274-.041 0-.822 0-.822-.768V0zm-18.51 5.48s.825 0 .825.77v12.093H0V10.28c0-.361.14-.708.395-.963l3.555-3.56c.137-.138.274-.275.604-.275M18.299 0v5.377H6.255c-.767 0-.767-.823-.767-.823 0-.33.137-.466.274-.604L9.309.398A1.36 1.36 0 0 1 10.267 0z'/></g>`,
      'light': `<g fill='#f8fafc' transform='translate(8, 8) scale(4.667)'><path d='M17.788 18.681c.768 0 .769.71.769.752 0 .289-.105.43-.223.553L14.728 23.6a1.35 1.35 0 0 1-.957.401H.879a.8.8 0 0 1-.424-.123.96.96 0 0 1-.455-.804v-4.392zM23.063.001c.32-.006.65.188.802.45A.83.83 0 0 1 24 .876v12.882c0 .36-.14.705-.395.96L20.06 18.27c-.137.137-.274.274-.603.274-.041 0-.822 0-.822-.768V0zm-18.51 5.48s.825 0 .825.77v12.093H0V10.28c0-.361.14-.708.395-.963l3.555-3.56c.137-.138.274-.275.604-.275M18.299 0v5.377H6.255c-.767 0-.767-.823-.767-.823 0-.33.137-.466.274-.604L9.309.398A1.36 1.36 0 0 1 10.267 0z'/></g>`,
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
