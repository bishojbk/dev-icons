const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class UnrealengineIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0 23.52A11.52 11.52 0 1 1 23.52 12 11.52 11.52 0 0 1 12 23.52m7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.34 7.34 0 0 1-5.804-2.978 3 3 0 0 0 .65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 0 0-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.3 7.3 0 0 1 2.528-5.597 7.4 7.4 0 0 1 3.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.2 1.2 0 0 0 .148.256 1.08 1.08 0 0 0 .88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a6 6 0 0 1 .387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0 23.52A11.52 11.52 0 1 1 23.52 12 11.52 11.52 0 0 1 12 23.52m7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.34 7.34 0 0 1-5.804-2.978 3 3 0 0 0 .65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 0 0-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.3 7.3 0 0 1 2.528-5.597 7.4 7.4 0 0 1 3.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.2 1.2 0 0 0 .148.256 1.08 1.08 0 0 0 .88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a6 6 0 0 1 .387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#0E1128';
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

export function registerUnrealengineIcon(name = 'devicon-unrealengine') {
  if (!customElements.get(name)) {
    customElements.define(name, UnrealengineIconElement);
  }
}
