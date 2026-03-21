const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class YoloIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M18.25 0a5.523 5.523 0 0 0-5.52 5.523c0 3.842-3.125 6.967-6.972 6.967a6.96 6.96 0 0 1-4.03-1.26 11.9 11.9 0 0 0 4.759 4.67v2.51c0 3.04 2.428 5.56 5.463 5.59 3.07 0 5.58-2.46 5.58-5.52V15.9c3.64-1.96 6.16-5.8 6.23-10.208v-.165C23.76 2.477 21.28 0 18.25 0M5.758 0A5.526 5.526 0 0 0 .24 5.523a5.52 5.52 0 0 0 5.518 5.517 5.517 5.517 0 0 0 5.512-5.517C11.27 2.477 8.802 0 5.758 0"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M18.25 0a5.523 5.523 0 0 0-5.52 5.523c0 3.842-3.125 6.967-6.972 6.967a6.96 6.96 0 0 1-4.03-1.26 11.9 11.9 0 0 0 4.759 4.67v2.51c0 3.04 2.428 5.56 5.463 5.59 3.07 0 5.58-2.46 5.58-5.52V15.9c3.64-1.96 6.16-5.8 6.23-10.208v-.165C23.76 2.477 21.28 0 18.25 0M5.758 0A5.526 5.526 0 0 0 .24 5.523a5.52 5.52 0 0 0 5.518 5.517 5.517 5.517 0 0 0 5.512-5.517C11.27 2.477 8.802 0 5.758 0"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#111F68';
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

export function registerYoloIcon(name = 'devicon-yolo') {
  if (!customElements.get(name)) {
    customElements.define(name, YoloIconElement);
  }
}
