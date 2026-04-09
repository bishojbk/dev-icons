const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class AquaIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M17.788 18.681c.768 0 .769.71.769.752 0 .289-.105.43-.223.553L14.728 23.6a1.35 1.35 0 0 1-.957.401H.879a.8.8 0 0 1-.424-.123.96.96 0 0 1-.455-.804v-4.392zM23.063.001c.32-.006.65.188.802.45A.83.83 0 0 1 24 .876v12.882c0 .36-.14.705-.395.96L20.06 18.27c-.137.137-.274.274-.603.274-.041 0-.822 0-.822-.768V0zm-18.51 5.48s.825 0 .825.77v12.093H0V10.28c0-.361.14-.708.395-.963l3.555-3.56c.137-.138.274-.275.604-.275M18.299 0v5.377H6.255c-.767 0-.767-.823-.767-.823 0-.33.137-.466.274-.604L9.309.398A1.36 1.36 0 0 1 10.267 0z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M17.788 18.681c.768 0 .769.71.769.752 0 .289-.105.43-.223.553L14.728 23.6a1.35 1.35 0 0 1-.957.401H.879a.8.8 0 0 1-.424-.123.96.96 0 0 1-.455-.804v-4.392zM23.063.001c.32-.006.65.188.802.45A.83.83 0 0 1 24 .876v12.882c0 .36-.14.705-.395.96L20.06 18.27c-.137.137-.274.274-.603.274-.041 0-.822 0-.822-.768V0zm-18.51 5.48s.825 0 .825.77v12.093H0V10.28c0-.361.14-.708.395-.963l3.555-3.56c.137-.138.274-.275.604-.275M18.299 0v5.377H6.255c-.767 0-.767-.823-.767-.823 0-.33.137-.466.274-.604L9.309.398A1.36 1.36 0 0 1 10.267 0z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#1904DA';
    const variant = this.getAttribute('variant') || 'default';
    const animate = this.getAttribute('animate') || 'none';
    const titleText = this.getAttribute('title');

    const resolvedSize = /^\d+$/.test(size) ? Number(size) : (SIZE_MAP[size] ?? 24);
    const inner = this._variants[variant] || this._variants['default'] || '';
    const titleTag = titleText ? `<title>${titleText}</title>` : '';

    let animStyle = '';
    if (animate === 'spin') animStyle = 'animation: devicon-spin 1s linear infinite;';
    else if (animate === 'pulse') animStyle = 'animation: devicon-pulse 2s ease-in-out infinite;';
    else if (animate === 'bounce') animStyle = 'animation: devicon-bounce 1s ease infinite;';

    this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${resolvedSize}" height="${resolvedSize}" viewBox="0 0 128 128" fill="${color}" style="color: ${color}; ${animStyle}" role="${titleText ? 'img' : 'presentation'}" aria-hidden="${!titleText}">${titleTag}${inner}</svg>`;
  }
}

export function registerAquaIcon(name = 'devicon-aqua') {
  if (!customElements.get(name)) {
    customElements.define(name, AquaIconElement);
  }
}
