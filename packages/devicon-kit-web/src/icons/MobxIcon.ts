const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class MobxIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M1.402 0C.625 0 0 .625 0 1.402v21.196C0 23.375.625 24 1.402 24h21.196c.777 0 1.402-.625 1.402-1.402V1.402C24 .625 23.375 0 22.598 0zm2.882 5.465h3.038v13.068H4.284v-.986h1.863V6.45H4.284zm12.394 0h3.038v.985h-1.863v11.098h1.863v.986h-3.038zm-7.856 3.55h1.35q.162.662.378 1.418.23.742.472 1.485.257.729.513 1.417.256.69.486 1.229.23-.54.486-1.229.257-.688.5-1.417.256-.742.472-1.485.23-.756.392-1.418h1.296a34 34 0 0 1-1.242 3.78 56 56 0 0 1-1.364 3.24h-1.134a63 63 0 0 1-1.377-3.24 36 36 0 0 1-1.228-3.78"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FF9955';
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

export function registerMobxIcon(name = 'devicon-mobx') {
  if (!customElements.get(name)) {
    customElements.define(name, MobxIconElement);
  }
}
