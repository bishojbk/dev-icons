const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class PwaIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M20.597 7.482 24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0 1.772 5.84 2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237-1.72 5.237H7.404L6.17 14.402l1.214-3.742 1.342 2.661 1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358.285-.323.284-.873 0-.546-.323-.871-.324-.326-1.103-.326"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M20.597 7.482 24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0 1.772 5.84 2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237-1.72 5.237H7.404L6.17 14.402l1.214-3.742 1.342 2.661 1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358.285-.323.284-.873 0-.546-.323-.871-.324-.326-1.103-.326"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#5A0FC8';
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

export function registerPwaIcon(name = 'devicon-pwa') {
  if (!customElements.get(name)) {
    customElements.define(name, PwaIconElement);
  }
}
