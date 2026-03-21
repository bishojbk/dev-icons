const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class GleamIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M10.614.003a2 2 0 0 0-.229.026 1.78 1.78 0 0 0-1.388 1.158l-1.785 5.06A1.8 1.8 0 0 1 6.17 7.322l-5 1.959c-1.282.503-1.53 2.267-.437 3.103l4.265 3.257a1.8 1.8 0 0 1 .703 1.32l.318 5.355C6.1 23.69 7.702 24.47 8.838 23.69l4.421-3.047a1.8 1.8 0 0 1 1.476-.26l5.196 1.35c1.334.347 2.573-.936 2.18-2.254l-1.533-5.14a1.8 1.8 0 0 1 .21-1.482l2.893-4.52c.742-1.158-.095-2.732-1.472-2.765l-5.368-.13a1.8 1.8 0 0 1-1.347-.656L12.086.642a1.76 1.76 0 0 0-1.472-.64m5.707 10.41a.95.95 0 0 1 .959.786.953.953 0 0 1-.773 1.104.953.953 0 1 1-.186-1.89m-7.677 1.353a.95.95 0 0 1 .959.787.953.953 0 1 1-1.104-.773 1 1 0 0 1 .145-.014m4.928 1.384a.5.5 0 0 1 .34.15.5.5 0 0 1 .133.346 1.26 1.26 0 0 1-.391.886 1.27 1.27 0 0 1-.903.349 1.3 1.3 0 0 1-.482-.108 1.3 1.3 0 0 1-.403-.284 1.3 1.3 0 0 1-.265-.417.485.485 0 0 1 .278-.627.48.48 0 0 1 .371.009.5.5 0 0 1 .257.268.3.3 0 0 0 .061.097.3.3 0 0 0 .094.066.3.3 0 0 0 .225.006.3.3 0 0 0 .163-.155.3.3 0 0 0 .026-.112.5.5 0 0 1 .15-.34.5.5 0 0 1 .346-.134"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FFAFF3';
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

export function registerGleamIcon(name = 'devicon-gleam') {
  if (!customElements.get(name)) {
    customElements.define(name, GleamIconElement);
  }
}
