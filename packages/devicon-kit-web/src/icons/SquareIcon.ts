const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SquareIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M4.01 0A4.01 4.01 0 0 0 0 4.01v15.98c0 2.21 1.8 4 4.01 4.01h15.98C22.2 24 24 22.2 24 19.99V4a4.01 4.01 0 0 0-4.01-4H4zm1.62 4.36h12.74c.7 0 1.26.57 1.26 1.27v12.74c0 .7-.56 1.27-1.26 1.27H5.63c-.7 0-1.26-.57-1.26-1.27V5.63a1.27 1.27 0 0 1 1.26-1.27m3.83 4.35a.73.73 0 0 0-.73.73v5.09c0 .4.32.72.72.72h5.1a.73.73 0 0 0 .73-.72V9.44a.73.73 0 0 0-.73-.73h-5.1Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#3E4348';
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

export function registerSquareIcon(name = 'devicon-square') {
  if (!customElements.get(name)) {
    customElements.define(name, SquareIconElement);
  }
}
