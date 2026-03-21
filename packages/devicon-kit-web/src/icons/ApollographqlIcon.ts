const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class ApollographqlIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.372 12-12a12 12 0 0 0-.473-3.343.6.6 0 0 0-1.127.409h-.002c.265.943.402 1.928.402 2.934a10.73 10.73 0 0 1-3.163 7.637A10.73 10.73 0 0 1 12 22.8a10.73 10.73 0 0 1-7.637-3.163A10.73 10.73 0 0 1 1.2 12a10.73 10.73 0 0 1 3.163-7.637A10.73 10.73 0 0 1 12 1.2c2.576 0 5.013.896 6.958 2.54a1.466 1.466 0 1 0 .862-.84A11.95 11.95 0 0 0 12 0m-1.44 5.88-4.2 10.902h2.63l.687-1.848h3.969l-.719-2.042h-2.613l1.7-4.691 3.024 8.58h2.631L13.47 5.88Z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12 6.627 0 12-5.372 12-12a12 12 0 0 0-.473-3.343.6.6 0 0 0-1.127.409h-.002c.265.943.402 1.928.402 2.934a10.73 10.73 0 0 1-3.163 7.637A10.73 10.73 0 0 1 12 22.8a10.73 10.73 0 0 1-7.637-3.163A10.73 10.73 0 0 1 1.2 12a10.73 10.73 0 0 1 3.163-7.637A10.73 10.73 0 0 1 12 1.2c2.576 0 5.013.896 6.958 2.54a1.466 1.466 0 1 0 .862-.84A11.95 11.95 0 0 0 12 0m-1.44 5.88-4.2 10.902h2.63l.687-1.848h3.969l-.719-2.042h-2.613l1.7-4.691 3.024 8.58h2.631L13.47 5.88Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#311C87';
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

export function registerApollographqlIcon(name = 'devicon-apollographql') {
  if (!customElements.get(name)) {
    customElements.define(name, ApollographqlIconElement);
  }
}
